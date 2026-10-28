import pytest
from sqlalchemy.exc import IntegrityError
from app.models.student import Student
from app.models.subject import Subject
from app.models.concept import Concept, Prerequisite
from app.models.assessment import Assessment, Question
from app.models.attempt import QuizAttempt, AttemptResponse
from app.models.analytics import MasteryRecord, AnalysisReport
from app.models.audit import AuditLog
from app.db.repositories import (
    StudentRepository,
    SubjectRepository,
    ConceptRepository,
    AssessmentRepository,
    AnalyticsRepository,
    AuditRepository,
)


def test_student_crud_and_unique_constraints(db_session):
    """Test Student creation, retrieval, and unique email/student_id constraints."""
    student = StudentRepository.create_student(
        db=db_session,
        email="alex.mercer@univ.edu",
        hashed_password="bcrypt_hashed_secret_123",
        full_name="Alex Mercer",
        student_id_number="CS-2024-8841",
        institution="Institute of Technology",
    )
    assert student.id is not None
    assert student.email == "alex.mercer@univ.edu"
    assert student.role == "student"

    # Query via repository
    fetched = StudentRepository.get_by_email(db_session, "alex.mercer@univ.edu")
    assert fetched is not None
    assert fetched.full_name == "Alex Mercer"

    # 1. Attempt to insert duplicate email - must fail
    dup_email = Student(
        email="alex.mercer@univ.edu",
        hashed_password="another_password",
        full_name="Duplicate Email Student",
        student_id_number="CS-2024-9999",
    )
    db_session.add(dup_email)
    with pytest.raises(IntegrityError):
        db_session.commit()
    db_session.rollback()

    # Re-insert base student after rollback to test student_id_number uniqueness
    StudentRepository.create_student(
        db=db_session,
        email="alex.mercer@univ.edu",
        hashed_password="bcrypt_hashed_secret_123",
        full_name="Alex Mercer",
        student_id_number="CS-2024-8841",
    )

    # 2. Attempt to insert duplicate student_id_number - must fail
    dup_id = Student(
        email="other.student@univ.edu",
        hashed_password="another_password",
        full_name="Duplicate ID Student",
        student_id_number="CS-2024-8841",
    )
    db_session.add(dup_id)
    with pytest.raises(IntegrityError):
        db_session.commit()
    db_session.rollback()


def test_subject_and_concept_relationship(db_session):
    """Test Subject creation and Concept relationship with cascading support."""
    subject = SubjectRepository.create_subject(
        db=db_session,
        code="CS-301",
        name="Operating Systems",
        description="Core undergraduate systems course covering concurrency, memory, and storage.",
    )
    assert subject.id is not None

    concept = ConceptRepository.create_concept(
        db=db_session,
        subject_id=subject.id,
        code="OS_MEM_PAGING",
        title="Paging & Address Translation",
        category="Memory Management",
        difficulty_level=3,
        learning_objectives=["Calculate page offsets", "Trace 2-level page tables"],
    )
    assert concept.id is not None
    assert concept.subject_id == subject.id
    assert concept.learning_objectives == ["Calculate page offsets", "Trace 2-level page tables"]

    # Verify back-population
    assert len(subject.concepts) == 1
    assert subject.concepts[0].code == "OS_MEM_PAGING"


def test_prerequisite_prevent_self_dependency(db_session):
    """Requirement: Prevent a concept from being its own prerequisite via CheckConstraint."""
    subject = SubjectRepository.create_subject(
        db=db_session, code="CS-TEST-1", name="Test Subject"
    )
    c1 = ConceptRepository.create_concept(
        db=db_session, subject_id=subject.id, code="C_SELF", title="Self Concept", category="Test"
    )

    # Attempt self-dependency: prerequisite_id == concept_id
    self_prereq = Prerequisite(
        prerequisite_id=c1.id,
        concept_id=c1.id,
        dependency_strength=1.0,
    )
    db_session.add(self_prereq)
    with pytest.raises(IntegrityError):
        db_session.commit()
    db_session.rollback()


def test_prerequisite_prevent_duplicate_relationship(db_session):
    """Requirement: Prevent duplicate prerequisite edges via UniqueConstraint."""
    subject = SubjectRepository.create_subject(
        db=db_session, code="CS-TEST-2", name="Test Subject 2"
    )
    c1 = ConceptRepository.create_concept(
        db=db_session, subject_id=subject.id, code="C_BASE", title="Base Concept", category="Test"
    )
    c2 = ConceptRepository.create_concept(
        db=db_session, subject_id=subject.id, code="C_ADV", title="Advanced Concept", category="Test"
    )

    # Add valid prerequisite
    edge1 = ConceptRepository.add_prerequisite(
        db=db_session,
        prerequisite_id=c1.id,
        concept_id=c2.id,
        dependency_strength=0.95,
        is_critical=True,
    )
    assert edge1.id is not None

    # Attempt to add exact duplicate edge
    edge2 = Prerequisite(
        prerequisite_id=c1.id,
        concept_id=c2.id,
        dependency_strength=0.5,
    )
    db_session.add(edge2)
    with pytest.raises(IntegrityError):
        db_session.commit()
    db_session.rollback()


def test_assessment_question_attempt_response_lifecycle(db_session):
    """Test full cycle: Subject -> Assessment -> Question -> Attempt -> AttemptResponse."""
    student = StudentRepository.create_student(
        db=db_session,
        email="learner.lifecycle@univ.edu",
        hashed_password="hashed_pw",
        full_name="Lifecycle Learner",
    )
    subject = SubjectRepository.create_subject(
        db=db_session, code="CS-302", name="Systems Lifecycle"
    )
    concept = ConceptRepository.create_concept(
        db=db_session, subject_id=subject.id, code="OS_PAGING_EX", title="Paging", category="Memory"
    )

    assessment = AssessmentRepository.create_assessment(
        db=db_session,
        subject_id=subject.id,
        concept_id=concept.id,
        title="Paging Diagnostic",
        duration_minutes=20,
        passing_percentage=75.0,
    )
    assert assessment.id is not None

    question = AssessmentRepository.create_question(
        db=db_session,
        assessment_id=assessment.id,
        concept_id=concept.id,
        prompt="In 32-bit paging with 4KB pages, how many offset bits exist?",
        options=[
            {"id": "A", "text": "10 bits", "is_correct": False},
            {"id": "B", "text": "12 bits", "is_correct": True},
        ],
        difficulty=3,
        explanation="4KB = 2^12 bytes, requiring 12 offset bits.",
        points=2.0,
    )
    assert question.id is not None
    assert len(question.options) == 2

    # Record attempt
    attempt = AssessmentRepository.record_attempt(
        db=db_session,
        student_id=student.id,
        assessment_id=assessment.id,
        score=2.0,
        max_possible_score=2.0,
        percentage=100.0,
        status="completed",
    )
    assert attempt.id is not None
    assert attempt.percentage == 100.0

    # Record item response
    response = AssessmentRepository.record_response(
        db=db_session,
        attempt_id=attempt.id,
        question_id=question.id,
        is_correct=True,
        selected_option_id="B",
        points_awarded=2.0,
        time_spent_seconds=45,
    )
    assert response.id is not None
    assert response.is_correct is True
    assert response.selected_option_id == "B"


def test_mastery_record_upsert_logic(db_session):
    """Test longitudinal mastery upsert without creating duplicate rows."""
    student = StudentRepository.create_student(
        db=db_session, email="mastery.user@univ.edu", hashed_password="pw", full_name="Mastery User"
    )
    subject = SubjectRepository.create_subject(db=db_session, code="CS-MST", name="Mastery Subject")
    concept = ConceptRepository.create_concept(
        db=db_session, subject_id=subject.id, code="OS_MST_01", title="Mastery Concept", category="Test"
    )

    # Initial mastery insertion
    m1 = AnalyticsRepository.upsert_mastery(
        db=db_session,
        student_id=student.id,
        concept_id=concept.id,
        mastery_score=0.45,
        confidence_score=0.6,
        questions_attempted=5,
        questions_correct=2,
    )
    assert m1.mastery_score == 0.45
    assert m1.questions_attempted == 5

    # Subsequent update (e.g. after remedial quiz)
    m2 = AnalyticsRepository.upsert_mastery(
        db=db_session,
        student_id=student.id,
        concept_id=concept.id,
        mastery_score=0.80,
        confidence_score=0.85,
        questions_attempted=5,
        questions_correct=4,
    )
    # Must be the exact same database record updated
    assert m2.id == m1.id
    assert m2.mastery_score == 0.80
    assert m2.questions_attempted == 10
    assert m2.questions_correct == 6

    # Verify only 1 mastery record exists for this student & concept
    records = db_session.query(MasteryRecord).filter_by(student_id=student.id, concept_id=concept.id).all()
    assert len(records) == 1


def test_analysis_report_and_audit_logging(db_session):
    """Test explainable analysis report creation and security audit log recording."""
    student = StudentRepository.create_student(
        db=db_session, email="report.audit@univ.edu", hashed_password="pw", full_name="Report User"
    )
    subject = SubjectRepository.create_subject(db=db_session, code="CS-AUD", name="Audit Subject")
    concept = ConceptRepository.create_concept(
        db=db_session, subject_id=subject.id, code="OS_AUD_01", title="Audit Concept", category="Test"
    )

    # Save diagnostic analysis report
    report = AnalyticsRepository.save_analysis_report(
        db=db_session,
        student_id=student.id,
        target_concept_id=concept.id,
        readiness_score=0.48,
        readiness_status="Blocked",
        unmastered_prerequisites=[{"code": "OS_BASE", "mastery": 0.42}],
        impacted_downstream_topics=[{"code": "OS_ADV", "impact": "Blocked"}],
        evidence_summary={"quiz_attempt_id": "test_attempt", "error_rate": 0.60},
        explanation_text="Assessment evidence indicates foundational gap in OS_BASE.",
        recommendations="Review foundational module before advancing.",
    )
    assert report.id is not None
    assert report.readiness_status == "Blocked"
    assert report.target_concept.code == "OS_AUD_01"

    # Log audit event
    audit = AuditRepository.log_event(
        db=db_session,
        action="DIAGNOSTIC_REPORT_GENERATED",
        entity_type="analysis_report",
        actor_id=student.id,
        entity_id=report.id,
        details={"readiness_score": 0.48, "target_concept": "OS_AUD_01"},
        ip_address="127.0.0.1",
    )
    assert audit.id is not None
    assert audit.action == "DIAGNOSTIC_REPORT_GENERATED"
    assert audit.actor.email == "report.audit@univ.edu"
