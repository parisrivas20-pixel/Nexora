import pytest
from sqlalchemy import inspect
from app.core.database import engine, Base
from app.models.student import Student
from app.models.subject import Subject
from app.models.concept import Concept, Prerequisite
from app.models.assessment import Assessment, Question
from app.models.attempt import QuizAttempt, AttemptResponse
from app.models.analytics import MasteryRecord, AnalysisReport
from app.models.audit import AuditLog


def test_root_and_health_endpoints(client):
    """Test API root and health check endpoints."""
    root_res = client.get("/")
    assert root_res.status_code == 200
    assert root_res.json()["status"] == "online"

    health_res = client.get("/health")
    assert health_res.status_code == 200
    assert health_res.json()["status"] == "healthy"
    assert health_res.json()["service"] == "nexora-backend"


def test_all_11_tables_registered_in_metadata():
    """Verify that all 11 required database entities are properly registered in SQLAlchemy metadata."""
    expected_tables = {
        "students",
        "subjects",
        "concepts",
        "prerequisites",
        "assessments",
        "questions",
        "quiz_attempts",
        "attempt_responses",
        "mastery_records",
        "analysis_reports",
        "audit_logs",
    }
    registered_tables = set(Base.metadata.tables.keys())
    assert expected_tables.issubset(registered_tables), f"Missing tables: {expected_tables - registered_tables}"


def test_prerequisite_constraints_present_in_table():
    """Verify that the prerequisites table contains the unique constraint and check constraint."""
    prereq_table = Base.metadata.tables["prerequisites"]
    
    # Check constraint check
    check_constraints = [c.name for c in prereq_table.constraints if hasattr(c, "sqltext")]
    assert "chk_prevent_self_prerequisite" in check_constraints

    # Unique constraint check
    unique_constraints = [c.name for c in prereq_table.constraints if c.__class__.__name__ == "UniqueConstraint"]
    assert "uq_prerequisite_concept" in unique_constraints
