import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Boolean, DateTime, UniqueConstraint
from sqlalchemy.orm import relationship
from app.core.database import Base


def get_utc_now():
    return datetime.now(timezone.utc)


class Student(Base):
    __tablename__ = "students"
    __table_args__ = (
        UniqueConstraint("student_id_number", name="uq_student_id_number"),
    )

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(150), nullable=False)
    student_id_number = Column(String(50), index=True, nullable=True)
    institution = Column(String(150), nullable=True)
    role = Column(String(20), default="student", nullable=False)  # student, instructor, admin
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime(timezone=True), default=get_utc_now, nullable=False)
    updated_at = Column(DateTime(timezone=True), default=get_utc_now, onupdate=get_utc_now, nullable=False)

    # Relationships
    attempts = relationship("QuizAttempt", back_populates="student", cascade="all, delete-orphan")
    mastery_records = relationship("MasteryRecord", back_populates="student", cascade="all, delete-orphan")
    analysis_reports = relationship("AnalysisReport", back_populates="student", cascade="all, delete-orphan")
    audit_logs = relationship("AuditLog", back_populates="actor")

    def __repr__(self) -> str:
        return f"<Student {self.email} ({self.student_id_number or 'No-ID'})>"
