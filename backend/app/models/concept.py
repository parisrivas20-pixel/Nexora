import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Integer, Float, Boolean, Text, DateTime, ForeignKey, UniqueConstraint, CheckConstraint, JSON
from sqlalchemy.orm import relationship
from app.core.database import Base


def get_utc_now():
    return datetime.now(timezone.utc)


class Concept(Base):
    __tablename__ = "concepts"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    subject_id = Column(String(36), ForeignKey("subjects.id", ondelete="CASCADE"), nullable=False, index=True)
    code = Column(String(50), unique=True, index=True, nullable=False)
    title = Column(String(150), nullable=False)
    category = Column(String(100), nullable=False, index=True)
    description = Column(Text, nullable=True)
    difficulty_level = Column(Integer, default=1, nullable=False)  # Scale: 1 to 5
    learning_objectives = Column(JSON, default=list, nullable=False)
    created_at = Column(DateTime(timezone=True), default=get_utc_now, nullable=False)

    # Subject Relationship
    subject = relationship("Subject", back_populates="concepts")

    # Knowledge Graph directed edges
    # Concepts that MUST be mastered BEFORE this concept (Incoming prerequisite edges)
    prerequisites = relationship(
        "Prerequisite",
        foreign_keys="[Prerequisite.concept_id]",
        back_populates="dependent_concept",
        cascade="all, delete-orphan",
    )
    # Concepts that depend on this concept (Outgoing dependent edges)
    downstream_dependents = relationship(
        "Prerequisite",
        foreign_keys="[Prerequisite.prerequisite_id]",
        back_populates="prerequisite_concept",
        cascade="all, delete-orphan",
    )

    # Assessments, Questions, Mastery, Reports
    assessments = relationship("Assessment", back_populates="concept")
    questions = relationship("Question", back_populates="concept", cascade="all, delete-orphan")
    mastery_records = relationship("MasteryRecord", back_populates="concept", cascade="all, delete-orphan")
    analysis_reports = relationship("AnalysisReport", back_populates="target_concept", cascade="all, delete-orphan")

    def __repr__(self) -> str:
        return f"<Concept {self.code}: {self.title}>"


class Prerequisite(Base):
    __tablename__ = "prerequisites"
    __table_args__ = (
        UniqueConstraint("prerequisite_id", "concept_id", name="uq_prerequisite_concept"),
        CheckConstraint("prerequisite_id != concept_id", name="chk_prevent_self_prerequisite"),
    )

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    prerequisite_id = Column(String(36), ForeignKey("concepts.id", ondelete="CASCADE"), nullable=False, index=True)
    concept_id = Column(String(36), ForeignKey("concepts.id", ondelete="CASCADE"), nullable=False, index=True)
    dependency_strength = Column(Float, default=1.0, nullable=False)  # Scale: 0.1 to 1.0
    is_critical = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime(timezone=True), default=get_utc_now, nullable=False)

    # Explicit relationships
    prerequisite_concept = relationship("Concept", foreign_keys=[prerequisite_id], back_populates="downstream_dependents")
    dependent_concept = relationship("Concept", foreign_keys=[concept_id], back_populates="prerequisites")

    def __repr__(self) -> str:
        return f"<Prerequisite {self.prerequisite_id} -> {self.concept_id} (Critical={self.is_critical})>"
