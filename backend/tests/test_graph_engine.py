import pytest
import networkx as nx
from app.services.graph_service import KnowledgeGraphService
from app.core.exceptions import (
    CycleDetectedError,
    ConceptNotFoundError,
    InvalidPrerequisiteError,
)
from app.data.os_curriculum import OS_SUBJECT, OS_CONCEPTS, OS_PREREQUISITES
from app.db.repositories import SubjectRepository


@pytest.fixture
def os_graph_service():
    """Provides a fresh KnowledgeGraphService loaded with the textbook OS curriculum."""
    service = KnowledgeGraphService()
    service.load_from_curriculum(OS_CONCEPTS, OS_PREREQUISITES)
    return service


def test_graph_initialization_and_dag_property(os_graph_service):
    """Requirement 1, 2, 7: Verify academic concepts are nodes, edges are directed, and graph is a DAG."""
    assert len(os_graph_service.graph.nodes) == len(OS_CONCEPTS)
    assert len(os_graph_service.graph.edges) == len(OS_PREREQUISITES)
    
    # Assert DAG property
    assert nx.is_directed_acyclic_graph(os_graph_service.graph) is True

    # Check node attributes
    node_data = os_graph_service.graph.nodes["OS_PAGING"]
    assert node_data["title"] == "Paging & Address Translation"
    assert node_data["category"] == "Memory Management"
    assert node_data["difficulty_level"] == 3
    assert len(node_data["learning_objectives"]) == 3


def test_prerequisite_edge_direction_convention(os_graph_service):
    """Requirement 3: Verify prerequisite direction is strictly: prerequisite -> dependent."""
    # OS_DUAL_MODE is a prerequisite for OS_PROC_STATE
    assert os_graph_service.graph.has_edge("OS_DUAL_MODE", "OS_PROC_STATE")
    assert not os_graph_service.graph.has_edge("OS_PROC_STATE", "OS_DUAL_MODE")

    # Direct predecessors are prerequisites
    prereqs = [p["code"] for p in os_graph_service.get_direct_prerequisites("OS_PROC_STATE")]
    assert "OS_DUAL_MODE" in prereqs

    # Direct successors are dependents
    dependents = [d["code"] for d in os_graph_service.get_direct_dependents("OS_PROC_STATE")]
    assert "OS_CPU_SCHED" in dependents
    assert "OS_PROC_SYNC" in dependents
    assert "OS_PAGING" in dependents


def test_cycle_detection_rejects_direct_cycle(os_graph_service):
    """Requirement 7: Detect cycles and reject invalid prerequisite relationships (direct 2-node cycle)."""
    # OS_PAGING -> OS_VIRTUAL_MEM currently exists
    assert os_graph_service.graph.has_edge("OS_PAGING", "OS_VIRTUAL_MEM")

    # Attempting to add reverse edge: OS_VIRTUAL_MEM -> OS_PAGING creates cycle: OS_PAGING -> OS_VIRTUAL_MEM -> OS_PAGING
    with pytest.raises(CycleDetectedError) as exc_info:
        os_graph_service.add_prerequisite("OS_VIRTUAL_MEM", "OS_PAGING")

    assert "creates a circular dependency cycle" in str(exc_info.value)
    
    # Verify edge was NOT added and graph remains a valid DAG
    assert not os_graph_service.graph.has_edge("OS_VIRTUAL_MEM", "OS_PAGING")
    assert nx.is_directed_acyclic_graph(os_graph_service.graph) is True


def test_cycle_detection_rejects_transitive_cycle(os_graph_service):
    """Requirement 7: Detect and reject transitive multi-node cycle."""
    # Existing chain: OS_DUAL_MODE -> OS_PROC_STATE -> OS_PROC_SYNC -> OS_DEADLOCKS -> OS_BANKERS
    # Adding OS_BANKERS -> OS_DUAL_MODE creates a 5-node cycle
    with pytest.raises(CycleDetectedError) as exc_info:
        os_graph_service.add_prerequisite("OS_BANKERS", "OS_DUAL_MODE")

    assert "creates a circular dependency cycle" in str(exc_info.value)
    assert not os_graph_service.graph.has_edge("OS_BANKERS", "OS_DUAL_MODE")
    assert nx.is_directed_acyclic_graph(os_graph_service.graph) is True


def test_self_prerequisite_rejected(os_graph_service):
    """Requirement 7: Concept cannot be its own prerequisite."""
    with pytest.raises(InvalidPrerequisiteError) as exc_info:
        os_graph_service.add_prerequisite("OS_PAGING", "OS_PAGING")

    assert "Self-dependency violation" in str(exc_info.value)


def test_retrieve_all_prerequisites_transitive_and_ordered(os_graph_service):
    """Requirement 4: Retrieve all transitive prerequisites of a target concept in topological order."""
    # Target: OS_PAGE_REPL
    all_prereqs = os_graph_service.get_all_prerequisites("OS_PAGE_REPL")
    prereq_codes = [p["code"] for p in all_prereqs]

    # Required ancestors for Page Replacement
    expected_ancestors = {
        "OS_DUAL_MODE",
        "OS_PROC_STATE",
        "OS_MEM_PHYS",
        "OS_PAGING",
        "OS_VIRTUAL_MEM",
    }
    assert expected_ancestors.issubset(set(prereq_codes))

    # Concurrency concepts must NOT be prerequisites for Page Replacement
    assert "OS_DEADLOCKS" not in prereq_codes
    assert "OS_SEMAPHORES" not in prereq_codes

    # Topological order check: OS_DUAL_MODE must appear before OS_PAGING, OS_PAGING before OS_VIRTUAL_MEM
    assert prereq_codes.index("OS_DUAL_MODE") < prereq_codes.index("OS_PAGING")
    assert prereq_codes.index("OS_PAGING") < prereq_codes.index("OS_VIRTUAL_MEM")


def test_downstream_impact_analysis_for_missing_prerequisite(os_graph_service):
    """Requirement 5: Identify downstream concepts connected to a missing prerequisite."""
    # Missing prerequisite: Process Synchronization (OS_PROC_SYNC)
    impacted = os_graph_service.get_downstream_impact("OS_PROC_SYNC")
    impacted_map = {item["code"]: item for item in impacted}

    # Direct dependents (distance 1)
    assert "OS_SEMAPHORES" in impacted_map
    assert impacted_map["OS_SEMAPHORES"]["dependency_distance"] == 1
    assert impacted_map["OS_SEMAPHORES"]["impact_severity"] == "Directly Blocked"

    assert "OS_DEADLOCKS" in impacted_map
    assert impacted_map["OS_DEADLOCKS"]["dependency_distance"] == 1

    # Transitive dependent (distance 2)
    assert "OS_BANKERS" in impacted_map
    assert impacted_map["OS_BANKERS"]["dependency_distance"] == 2
    assert impacted_map["OS_BANKERS"]["impact_severity"] == "Cascading Block"

    # Unrelated memory concepts must not be impacted
    assert "OS_PAGE_REPL" not in impacted_map
    assert "OS_MEM_PHYS" not in impacted_map


def test_valid_topological_order_for_learning(os_graph_service):
    """Requirement 6: Generate a valid topological order for curriculum learning."""
    order = os_graph_service.get_topological_learning_order()
    assert len(order) == len(OS_CONCEPTS)

    code_to_position = {c["code"]: idx for idx, c in enumerate(order)}

    # For every edge (u, v) in the curriculum, position of u must be < position of v
    for u, v in os_graph_service.graph.edges:
        assert code_to_position[u] < code_to_position[v], (
            f"Topological violation: Prerequisite '{u}' at index {code_to_position[u]} "
            f"appears after dependent '{v}' at index {code_to_position[v]}"
        )


def test_learning_path_for_target_concept(os_graph_service):
    """Verify minimal targeted learning path for advanced topic (Banker's Algorithm)."""
    path = os_graph_service.get_learning_path_for_target("OS_BANKERS")
    path_codes = [c["code"] for c in path]

    # Target concept must be last in the sequence
    assert path_codes[-1] == "OS_BANKERS"

    # Concurrency ancestors must be included
    assert "OS_DUAL_MODE" in path_codes
    assert "OS_PROC_STATE" in path_codes
    assert "OS_PROC_SYNC" in path_codes
    assert "OS_SEMAPHORES" in path_codes
    assert "OS_DEADLOCKS" in path_codes

    # Unrelated memory hierarchy must be excluded
    assert "OS_PAGING" not in path_codes
    assert "OS_VIRTUAL_MEM" not in path_codes


def test_postgres_sync_and_load_roundtrip(db_session, os_graph_service):
    """Requirement 8: Store concept relationships in PostgreSQL and load them back."""
    # Ensure Subject exists
    SubjectRepository.create_subject(
        db=db_session,
        code=OS_SUBJECT["code"],
        name=OS_SUBJECT["name"],
        description=OS_SUBJECT["description"],
    )

    # 1. Sync from in-memory NetworkX graph into PostgreSQL
    os_graph_service.sync_to_db(db=db_session, subject_code=OS_SUBJECT["code"])

    # 2. Instantiate a fresh service and load directly from PostgreSQL
    db_service = KnowledgeGraphService()
    db_service.load_from_db(db=db_session, subject_code=OS_SUBJECT["code"])

    # 3. Verify graph structure matches exactly
    assert len(db_service.graph.nodes) == len(os_graph_service.graph.nodes)
    assert len(db_service.graph.edges) == len(os_graph_service.graph.edges)
    assert nx.is_directed_acyclic_graph(db_service.graph) is True

    # Verify identical topological ordering
    orig_order = [c["code"] for c in os_graph_service.get_topological_learning_order()]
    db_order = [c["code"] for c in db_service.get_topological_learning_order()]
    assert orig_order == db_order
