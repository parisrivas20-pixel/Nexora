import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Integer, Float, Boolean, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base


def get_utc_now():
    return datetime.now(timezone.utc)


class QuizAttempt(Base):
    __tablename__ = "quiz_attempts"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    student_id = Column(String(36), ForeignKey("students.id", ondelete="CASCADE"), nullable=False, index=True)
    assessment_id = Column(String(36), ForeignKey("assessments.id", ondelete="CASCADE"), nullable=False, index=True)
    started_at = Column(DateTime(timezone=True), default=get_utc_now, nullable=False)
    submitted_at = Column(DateTime(timezone=True), nullable=True)
    score = Column(Float, default=0.0, nullable=False)
    max_possible_score = Column(Float, default=0.0, nullable=False)
    percentage = Column(Float, default=0.0, nullable=False)
    status = Column(String(20), default="in_progress", nullable=False)  # in_progress, completed, abandoned

    # Relationships
    student = relationship("Student", back_populates="attempts")
    assessment = relationship("Assessment", back_populates="attempts")
    responses = relationship("AttemptResponse", back_populates="attempt", cascade="all, delete-orphan")

    def __repr__(self) -> str:
        return f"<QuizAttempt {self.id[:8]} - Student {self.student_id[:8]} - {self.percentage}%>"


class AttemptResponse(Base):
    __tablename__ = "attempt_responses"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    attempt_id = Column(String(36), ForeignKey("quiz_attempts.id", ondelete="CASCADE"), nullable=False, index=True)
    question_id = Column(String(36), ForeignKey("questions.id", ondelete="CASCADE"), nullable=False, index=True)
    selected_option_id = Column(String(50), nullable=True)
    response_text = Column(Text, nullable=True)
    is_correct = Column(Boolean, default=False, nullable=False)
    points_awarded = Column(Float, default=0.0, nullable=False)
    time_spent_seconds = Column(Integer, default=0, nullable=False)
    created_at = Column(DateTime(timezone=True), default=get_utc_now, nullable=False)

    # Relationships
    attempt = relationship("QuizAttempt", back_populates="responses")
    question = relationship("Question", back_populates="responses")

    def __repr__(self) -> str:
        return f"<AttemptResponse Q:{self.question_id[:8]} Correct:{self.is_correct}>"
