from typing import List, Optional, Any, Dict
from pydantic import BaseModel, Field


class ConceptBase(BaseModel):
    code: str
    title: str
    category: str
    difficulty_level: int = 1
    description: Optional[str] = None
    learning_objectives: List[str] = Field(default_factory=list)


class ConceptOut(ConceptBase):
    id: Optional[str] = None

    class Config:
        from_attributes = True


class PrerequisiteDetail(BaseModel):
    code: str
    title: str
    category: str
    difficulty_level: int
    dependency_strength: float = 1.0
    is_critical: bool = True


class ConceptPrerequisitesOut(BaseModel):
    concept_code: str
    concept_title: str
    direct_prerequisites: List[PrerequisiteDetail]
    all_transitive_prerequisites_topological: List[PrerequisiteDetail]


class DownstreamImpactItem(BaseModel):
    code: str
    title: str
    category: str
    dependency_distance: int
    impact_severity: str  # 'Directly Blocked' | 'Cascading Block'


class DownstreamImpactOut(BaseModel):
    missing_prerequisite_code: str
    missing_prerequisite_title: str
    impacted_concepts_count: int
    impacted_concepts: List[DownstreamImpactItem]


class LearningPathOut(BaseModel):
    target_concept_code: str
    target_concept_title: str
    total_steps: int
    topological_sequence: List[ConceptBase]


class VisualGraphNode(BaseModel):
    id: str
    label: str
    category: str
    difficulty: int


class VisualGraphEdge(BaseModel):
    source: str
    target: str
    strength: float
    is_critical: bool


class VisualGraphPayload(BaseModel):
    nodes: List[VisualGraphNode]
    edges: List[VisualGraphEdge]
