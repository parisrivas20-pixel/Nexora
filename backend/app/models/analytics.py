import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Integer, Float, Text, DateTime, ForeignKey, UniqueConstraint, JSON
from sqlalchemy.orm import relationship
from app.core.database import Base


def get_utc_now():
    return datetime.now(timezone.utc)


class MasteryRecord(Base):
    __tablename__ = "mastery_records"
    __table_args__ = (
        UniqueConstraint("student_id", "concept_id", name="uq_student_concept_mastery"),
    )

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    student_id = Column(String(36), ForeignKey("students.id", ondelete="CASCADE"), nullable=False, index=True)
    concept_id = Column(String(36), ForeignKey("concepts.id", ondelete="CASCADE"), nullable=False, index=True)
    mastery_score = Column(Float, default=0.0, nullable=False)  # Scale: 0.0 to 1.0
    confidence_score = Column(Float, default=0.5, nullable=False)  # Reliability metric based on attempts
    questions_attempted = Column(Integer, default=0, nullable=False)
    questions_correct = Column(Integer, default=0, nullable=False)
    last_evaluated_at = Column(DateTime(timezone=True), default=get_utc_now, nullable=False)

    # Relationships
    student = relationship("Student", back_populates="mastery_records")
    concept = relationship("Concept", back_populates="mastery_records")

    def __repr__(self) -> str:
        return f"<MasteryRecord Student:{self.student_id[:8]} Concept:{self.concept_id[:8]} Score:{self.mastery_score:.2f}>"


class AnalysisReport(Base):
    __tablename__ = "analysis_reports"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    student_id = Column(String(36), ForeignKey("students.id", ondelete="CASCADE"), nullable=False, index=True)
    target_concept_id = Column(String(36), ForeignKey("concepts.id", ondelete="CASCADE"), nullable=False, index=True)
    readiness_score = Column(Float, nullable=False)  # Scale: 0.0 to 1.0
    readiness_status = Column(String(30), nullable=False)  # 'Ready', 'Needs Review', 'Blocked'
    unmastered_prerequisites = Column(JSON, default=list, nullable=False)
    impacted_downstream_topics = Column(JSON, default=list, nullable=False)
    evidence_summary = Column(JSON, default=dict, nullable=False)
    explanation_text = Column(Text, nullable=False)
    recommendations = Column(Text, nullable=True)
    generated_at = Column(DateTime(timezone=True), default=get_utc_now, nullable=False)

    # Relationships
    student = relationship("Student", back_populates="analysis_reports")
    target_concept = relationship("Concept", back_populates="analysis_reports")

    def __repr__(self) -> str:
        return f"<AnalysisReport Target:{self.target_concept_id[:8]} Readiness:{self.readiness_status} ({self.readiness_score:.2f})>"
