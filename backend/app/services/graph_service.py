from typing import List, Dict, Any, Optional, Tuple, Set
import networkx as nx
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.core.exceptions import (
    CycleDetectedError,
    ConceptNotFoundError,
    InvalidPrerequisiteError,
)
from app.models.subject import Subject
from app.models.concept import Concept, Prerequisite
from app.db.repositories import SubjectRepository, ConceptRepository


class KnowledgeGraphService:
    """
    Core graph processing engine utilizing NetworkX to model academic concept dependencies
    as a Directed Acyclic Graph (DAG).

    Edge Convention:
        Directed Edge: (u, v) means u -> v
        Direction: 'u' is a prerequisite for 'v' (Prerequisite -> Dependent Concept)
    """

    def __init__(self):
        self.graph = nx.DiGraph()

    def clear(self) -> None:
        """Clear all nodes and edges from in-memory graph."""
        self.graph.clear()

    # ==========================================
    # Node & Edge Management
    # ==========================================

    def add_concept(
        self,
        code: str,
        title: str,
        category: str,
        difficulty_level: int = 1,
        description: Optional[str] = None,
        learning_objectives: Optional[List[str]] = None,
        **extra_attrs: Any,
    ) -> None:
        """Add an academic concept as a graph node with metadata attributes."""
        self.graph.add_node(
            code,
            code=code,
            title=title,
            category=category,
            difficulty_level=difficulty_level,
            description=description or "",
            learning_objectives=learning_objectives or [],
            **extra_attrs,
        )

    def add_prerequisite(
        self,
        prereq_code: str,
        dependent_code: str,
        dependency_strength: float = 1.0,
        is_critical: bool = True,
        check_cycle: bool = True,
    ) -> None:
        """
        Add a directed prerequisite edge: prereq_code -> dependent_code.
        Enforces:
        1. Both concepts must exist.
        2. A concept cannot be its own prerequisite.
        3. DAG property: Rejects any relationship that introduces a circular cycle.
        """
        if prereq_code not in self.graph:
            raise ConceptNotFoundError(f"Prerequisite concept '{prereq_code}' not found in graph.")
        if dependent_code not in self.graph:
            raise ConceptNotFoundError(f"Dependent concept '{dependent_code}' not found in graph.")

        if prereq_code == dependent_code:
            raise InvalidPrerequisiteError(
                f"Self-dependency violation: Concept '{prereq_code}' cannot be its own prerequisite."
            )

        # Tentatively add edge
        self.graph.add_edge(
            prereq_code,
            dependent_code,
            dependency_strength=dependency_strength,
            is_critical=is_critical,
        )

        # Check for cycles
        if check_cycle and not nx.is_directed_acyclic_graph(self.graph):
            try:
                cycle_edges = nx.find_cycle(self.graph, source=dependent_code, orientation="original")
                cycle_nodes = [u for u, v, _ in cycle_edges] + [cycle_edges[-1][1]]
            except Exception:
                cycle_nodes = [prereq_code, dependent_code]

            # Revert the edge
            self.graph.remove_edge(prereq_code, dependent_code)
            raise CycleDetectedError(
                message=(
                    f"Invalid prerequisite relationship: Adding '{prereq_code}' -> '{dependent_code}' "
                    f"creates a circular dependency cycle: {' -> '.join(cycle_nodes)}"
                ),
                cycle=cycle_nodes,
            )

    # ==========================================
    # Traversal & Analysis Queries
    # ==========================================

    def get_direct_prerequisites(self, concept_code: str) -> List[Dict[str, Any]]:
        """Retrieve immediate prerequisite concepts that directly lead into concept_code."""
        if concept_code not in self.graph:
            raise ConceptNotFoundError(f"Concept '{concept_code}' not found in graph.")

        prereqs = []
        for pred in self.graph.predecessors(concept_code):
            edge_data = self.graph.get_edge_data(pred, concept_code)
            node_data = self.graph.nodes[pred]
            prereqs.append({
                **node_data,
                "dependency_strength": edge_data.get("dependency_strength", 1.0),
                "is_critical": edge_data.get("is_critical", True),
            })
        return prereqs

    def get_all_prerequisites(self, concept_code: str) -> List[Dict[str, Any]]:
        """
        Retrieve all transitive upstream prerequisite concepts required to learn concept_code.
        Returned in valid topological order so foundational topics appear before intermediate topics.
        """
        if concept_code not in self.graph:
            raise ConceptNotFoundError(f"Concept '{concept_code}' not found in graph.")

        ancestor_codes = nx.ancestors(self.graph, concept_code)
        if not ancestor_codes:
            return []

        # Restrict graph to ancestors and sort topologically
        subgraph = self.graph.subgraph(ancestor_codes)
        topological_order = list(nx.topological_sort(subgraph))

        return [dict(self.graph.nodes[code]) for code in topological_order]

    def get_direct_dependents(self, concept_code: str) -> List[Dict[str, Any]]:
        """Retrieve concepts that immediately depend on concept_code."""
        if concept_code not in self.graph:
            raise ConceptNotFoundError(f"Concept '{concept_code}' not found in graph.")

        dependents = []
        for succ in self.graph.successors(concept_code):
            edge_data = self.graph.get_edge_data(concept_code, succ)
            node_data = self.graph.nodes[succ]
            dependents.append({
                **node_data,
                "dependency_strength": edge_data.get("dependency_strength", 1.0),
                "is_critical": edge_data.get("is_critical", True),
            })
        return dependents

    def get_downstream_impact(self, missing_prereq_code: str) -> List[Dict[str, Any]]:
        """
        Identify all downstream concepts impacted or blocked if missing_prereq_code is unmastered.
        Computes reachability and topological depth for each dependent topic.
        """
        if missing_prereq_code not in self.graph:
            raise ConceptNotFoundError(f"Concept '{missing_prereq_code}' not found in graph.")

        descendant_codes = nx.descendants(self.graph, missing_prereq_code)
        if not descendant_codes:
            return []

        subgraph = self.graph.subgraph(descendant_codes)
        topological_descendants = list(nx.topological_sort(subgraph))

        impact_list = []
        for code in topological_descendants:
            node_data = dict(self.graph.nodes[code])
            # Shortest path distance indicates how directly dependent it is
            distance = nx.shortest_path_length(self.graph, source=missing_prereq_code, target=code)
            impact_list.append({
                **node_data,
                "dependency_distance": distance,
                "impact_severity": "Directly Blocked" if distance == 1 else "Cascading Block",
            })
        return impact_list

    def get_topological_learning_order(self) -> List[Dict[str, Any]]:
        """
        Generate a globally valid topological order of all concepts in the curriculum DAG,
        guaranteeing that every prerequisite appears prior to its dependent concepts.
        """
        if not nx.is_directed_acyclic_graph(self.graph):
            raise CycleDetectedError("Cannot generate topological order: Graph contains cycles.")

        order = list(nx.topological_sort(self.graph))
        return [dict(self.graph.nodes[code]) for code in order]

    def get_learning_path_for_target(self, target_concept_code: str) -> List[Dict[str, Any]]:
        """
        Generate the minimal, complete learning path for a target concept:
        all transitive prerequisites plus the target concept itself, ordered topologically.
        """
        if target_concept_code not in self.graph:
            raise ConceptNotFoundError(f"Concept '{target_concept_code}' not found in graph.")

        ancestors = nx.ancestors(self.graph, target_concept_code)
        path_codes = ancestors.union({target_concept_code})
        subgraph = self.graph.subgraph(path_codes)

        return [dict(self.graph.nodes[code]) for code in nx.topological_sort(subgraph)]

    # ==========================================
    # Seed & Database Persistence Synchronization
    # ==========================================

    def load_from_curriculum(
        self,
        concepts: List[Dict[str, Any]],
        prerequisites: List[Tuple[str, str, float, bool]],
    ) -> None:
        """Load curated concepts and explicit prerequisite tuples into the in-memory graph."""
        self.clear()
        for c in concepts:
            self.add_concept(**c)
        for prereq, dependent, strength, is_critical in prerequisites:
            self.add_prerequisite(prereq, dependent, strength, is_critical)

    def sync_to_db(self, db: Session, subject_code: str = "CS-301") -> None:
        """
        Persist in-memory knowledge graph concepts and prerequisite edges into PostgreSQL database.
        Ensures foreign key linkages and database constraints are applied.
        """
        subject = SubjectRepository.get_by_code(db, subject_code)
        if not subject:
            raise ValueError(f"Subject '{subject_code}' not found in database. Create subject first.")

        # 1. Upsert Concepts
        concept_db_map: Dict[str, Concept] = {}
        for code, node_data in self.graph.nodes(data=True):
            existing_concept = ConceptRepository.get_by_code(db, code)
            if existing_concept:
                existing_concept.title = node_data["title"]
                existing_concept.category = node_data["category"]
                existing_concept.description = node_data.get("description", "")
                existing_concept.difficulty_level = node_data.get("difficulty_level", 1)
                existing_concept.learning_objectives = node_data.get("learning_objectives", [])
                concept_db_map[code] = existing_concept
            else:
                new_concept = ConceptRepository.create_concept(
                    db=db,
                    subject_id=subject.id,
                    code=code,
                    title=node_data["title"],
                    category=node_data["category"],
                    description=node_data.get("description", ""),
                    difficulty_level=node_data.get("difficulty_level", 1),
                    learning_objectives=node_data.get("learning_objectives", []),
                )
                concept_db_map[code] = new_concept

        db.commit()

        # 2. Upsert Prerequisite Edges
        for u, v, edge_data in self.graph.edges(data=True):
            prereq_concept = concept_db_map[u]
            dependent_concept = concept_db_map[v]

            existing_edge = db.execute(
                select(Prerequisite).where(
                    Prerequisite.prerequisite_id == prereq_concept.id,
                    Prerequisite.concept_id == dependent_concept.id,
                )
            ).scalar_one_or_none()

            if not existing_edge:
                ConceptRepository.add_prerequisite(
                    db=db,
                    prerequisite_id=prereq_concept.id,
                    concept_id=dependent_concept.id,
                    dependency_strength=edge_data.get("dependency_strength", 1.0),
                    is_critical=edge_data.get("is_critical", True),
                )

        db.commit()

    def load_from_db(self, db: Session, subject_code: str = "CS-301") -> None:
        """
        Reconstruct the NetworkX graph from PostgreSQL database tables.
        """
        self.clear()
        subject = SubjectRepository.get_by_code(db, subject_code)
        if not subject:
            raise ValueError(f"Subject '{subject_code}' not found in database.")

        id_to_code: Dict[str, str] = {}
        for concept in subject.concepts:
            id_to_code[concept.id] = concept.code
            self.add_concept(
                code=concept.code,
                title=concept.title,
                category=concept.category,
                difficulty_level=concept.difficulty_level,
                description=concept.description,
                learning_objectives=concept.learning_objectives,
            )

        # Load prerequisite edges
        for concept in subject.concepts:
            prereqs = ConceptRepository.get_prerequisites_for_concept(db, concept.id)
            for edge in prereqs:
                if edge.prerequisite_id in id_to_code and edge.concept_id in id_to_code:
                    self.add_prerequisite(
                        prereq_code=id_to_code[edge.prerequisite_id],
                        dependent_code=id_to_code[edge.concept_id],
                        dependency_strength=edge.dependency_strength,
                        is_critical=edge.is_critical,
                        check_cycle=False,  # DB already guarantees integrity
                    )
