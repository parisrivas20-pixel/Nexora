import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.core.database import Base


def get_utc_now():
    return datetime.now(timezone.utc)


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    actor_id = Column(String(36), ForeignKey("students.id", ondelete="SET NULL"), nullable=True, index=True)
    action = Column(String(100), nullable=False)        # e.g. 'STUDENT_REGISTERED', 'ASSESSMENT_COMPLETED', 'REPORT_GENERATED'
    entity_type = Column(String(50), nullable=False)   # e.g. 'assessment', 'report', 'student', 'concept'
    entity_id = Column(String(50), nullable=True)      # Target entity ID
    details = Column(JSON, default=dict, nullable=False)
    ip_address = Column(String(45), nullable=True)
    timestamp = Column(DateTime(timezone=True), default=get_utc_now, nullable=False, index=True)

    # Relationships
    actor = relationship("Student", back_populates="audit_logs")

    def __repr__(self) -> str:
        return f"<AuditLog {self.action} on {self.entity_type}:{self.entity_id} at {self.timestamp}>"
