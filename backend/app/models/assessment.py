import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Integer, Float, Boolean, Text, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.core.database import Base


def get_utc_now():
    return datetime.now(timezone.utc)


class Assessment(Base):
    __tablename__ = "assessments"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    subject_id = Column(String(36), ForeignKey("subjects.id", ondelete="CASCADE"), nullable=False, index=True)
    concept_id = Column(String(36), ForeignKey("concepts.id", ondelete="SET NULL"), nullable=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    difficulty_level = Column(String(30), default="Intermediate", nullable=False)
    duration_minutes = Column(Integer, default=15, nullable=False)
    passing_percentage = Column(Float, default=70.0, nullable=False)
    is_published = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime(timezone=True), default=get_utc_now, nullable=False)

    # Relationships
    subject = relationship("Subject", back_populates="assessments")
    concept = relationship("Concept", back_populates="assessments")
    questions = relationship("Question", back_populates="assessment", cascade="all, delete-orphan")
    attempts = relationship("QuizAttempt", back_populates="assessment", cascade="all, delete-orphan")

    def __repr__(self) -> str:
        return f"<Assessment {self.title} ({self.difficulty_level})>"


class Question(Base):
    __tablename__ = "questions"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    assessment_id = Column(String(36), ForeignKey("assessments.id", ondelete="CASCADE"), nullable=False, index=True)
    concept_id = Column(String(36), ForeignKey("concepts.id", ondelete="CASCADE"), nullable=False, index=True)
    prompt = Column(Text, nullable=False)
    question_type = Column(String(30), default="single_choice", nullable=False)
    difficulty = Column(Integer, default=2, nullable=False)  # Scale: 1 to 5
    options = Column(JSON, default=list, nullable=False)     # e.g. [{"id": "A", "text": "...", "is_correct": True}]
    explanation = Column(Text, nullable=True)
    points = Column(Float, default=1.0, nullable=False)
    created_at = Column(DateTime(timezone=True), default=get_utc_now, nullable=False)

    # Relationships
    assessment = relationship("Assessment", back_populates="questions")
    concept = relationship("Concept", back_populates="questions")
    responses = relationship("AttemptResponse", back_populates="question", cascade="all, delete-orphan")

    def __repr__(self) -> str:
        return f"<Question {self.id[:8]} (Diff: {self.difficulty})>"
