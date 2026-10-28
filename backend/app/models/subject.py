import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Text, DateTime
from sqlalchemy.orm import relationship
from app.core.database import Base


def get_utc_now():
    return datetime.now(timezone.utc)


class Subject(Base):
    __tablename__ = "subjects"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    code = Column(String(50), unique=True, index=True, nullable=False)  # e.g. 'CS-301'
    name = Column(String(150), nullable=False)                         # e.g. 'Operating Systems'
    description = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), default=get_utc_now, nullable=False)

    # Relationships
    concepts = relationship("Concept", back_populates="subject", cascade="all, delete-orphan")
    assessments = relationship("Assessment", back_populates="subject", cascade="all, delete-orphan")

    def __repr__(self) -> str:
        return f"<Subject {self.code}: {self.name}>"
