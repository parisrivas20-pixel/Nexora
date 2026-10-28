from typing import List, Optional, Dict, Any
from sqlalchemy.orm import Session
from sqlalchemy import select, and_
from app.models.student import Student
from app.models.subject import Subject
from app.models.concept import Concept, Prerequisite
from app.models.assessment import Assessment, Question
from app.models.attempt import QuizAttempt, AttemptResponse
from app.models.analytics import MasteryRecord, AnalysisReport
from app.models.audit import AuditLog


# ==========================================
# Student Operations
# ==========================================
class StudentRepository:
    @staticmethod
    def create_student(
        db: Session,
        email: str,
        hashed_password: str,
        full_name: str,
        student_id_number: Optional[str] = None,
        institution: Optional[str] = None,
        role: str = "student",
    ) -> Student:
        student = Student(
            email=email,
            hashed_password=hashed_password,
            full_name=full_name,
            student_id_number=student_id_number,
            institution=institution,
            role=role,
        )
        db.add(student)
        db.commit()
        db.refresh(student)
        return student

    @staticmethod
    def get_by_email(db: Session, email: str) -> Optional[Student]:
        return db.execute(select(Student).where(Student.email == email)).scalar_one_or_none()

    @staticmethod
    def get_by_id(db: Session, student_id: str) -> Optional[Student]:
        return db.execute(select(Student).where(Student.id == student_id)).scalar_one_or_none()


# ==========================================
# Subject Operations
# ==========================================
class SubjectRepository:
    @staticmethod
    def create_subject(
        db: Session,
        code: str,
        name: str,
        description: Optional[str] = None,
    ) -> Subject:
        subject = Subject(code=code, name=name, description=description)
        db.add(subject)
        db.commit()
        db.refresh(subject)
        return subject

    @staticmethod
    def get_by_code(db: Session, code: str) -> Optional[Subject]:
        return db.execute(select(Subject).where(Subject.code == code)).scalar_one_or_none()

    @staticmethod
    def get_all(db: Session) -> List[Subject]:
        return list(db.execute(select(Subject)).scalars().all())


# ==========================================
# Concept & Prerequisite Operations
# ==========================================
class ConceptRepository:
    @staticmethod
    def create_concept(
        db: Session,
        subject_id: str,
        code: str,
        title: str,
        category: str,
        description: Optional[str] = None,
        difficulty_level: int = 1,
        learning_objectives: Optional[List[str]] = None,
    ) -> Concept:
        concept = Concept(
            subject_id=subject_id,
            code=code,
            title=title,
            category=category,
            description=description,
            difficulty_level=difficulty_level,
            learning_objectives=learning_objectives or [],
        )
        db.add(concept)
        db.commit()
        db.refresh(concept)
        return concept

    @staticmethod
    def get_by_code(db: Session, code: str) -> Optional[Concept]:
        return db.execute(select(Concept).where(Concept.code == code)).scalar_one_or_none()

    @staticmethod
    def add_prerequisite(
        db: Session,
        prerequisite_id: str,
        concept_id: str,
        dependency_strength: float = 1.0,
        is_critical: bool = True,
    ) -> Prerequisite:
        """
        Creates a directed prerequisite edge.
        Database constraints ensure:
        1. prerequisite_id != concept_id (self-prerequisite prevention)
        2. UNIQUE(prerequisite_id, concept_id) (duplicate edge prevention)
        """
        edge = Prerequisite(
            prerequisite_id=prerequisite_id,
            concept_id=concept_id,
            dependency_strength=dependency_strength,
            is_critical=is_critical,
        )
        db.add(edge)
        db.commit()
        db.refresh(edge)
        return edge

    @staticmethod
    def get_prerequisites_for_concept(db: Session, concept_id: str) -> List[Prerequisite]:
        return list(
            db.execute(
                select(Prerequisite).where(Prerequisite.concept_id == concept_id)
            ).scalars().all()
        )

    @staticmethod
    def get_downstream_dependents(db: Session, concept_id: str) -> List[Prerequisite]:
        return list(
            db.execute(
                select(Prerequisite).where(Prerequisite.prerequisite_id == concept_id)
            ).scalars().all()
        )


# ==========================================
# Assessment & Attempt Operations
# ==========================================
class AssessmentRepository:
    @staticmethod
    def create_assessment(
        db: Session,
        subject_id: str,
        title: str,
        concept_id: Optional[str] = None,
        description: Optional[str] = None,
        difficulty_level: str = "Intermediate",
        duration_minutes: int = 15,
        passing_percentage: float = 70.0,
    ) -> Assessment:
        assessment = Assessment(
            subject_id=subject_id,
            concept_id=concept_id,
            title=title,
            description=description,
            difficulty_level=difficulty_level,
            duration_minutes=duration_minutes,
            passing_percentage=passing_percentage,
        )
        db.add(assessment)
        db.commit()
        db.refresh(assessment)
        return assessment

    @staticmethod
    def create_question(
        db: Session,
        assessment_id: str,
        concept_id: str,
        prompt: str,
        options: List[Dict[str, Any]],
        difficulty: int = 2,
        explanation: Optional[str] = None,
        points: float = 1.0,
    ) -> Question:
        question = Question(
            assessment_id=assessment_id,
            concept_id=concept_id,
            prompt=prompt,
            options=options,
            difficulty=difficulty,
            explanation=explanation,
            points=points,
        )
        db.add(question)
        db.commit()
        db.refresh(question)
        return question

    @staticmethod
    def record_attempt(
        db: Session,
        student_id: str,
        assessment_id: str,
        score: float,
        max_possible_score: float,
        percentage: float,
        status: str = "completed",
    ) -> QuizAttempt:
        attempt = QuizAttempt(
            student_id=student_id,
            assessment_id=assessment_id,
            score=score,
            max_possible_score=max_possible_score,
            percentage=percentage,
            status=status,
        )
        db.add(attempt)
        db.commit()
        db.refresh(attempt)
        return attempt

    @staticmethod
    def record_response(
        db: Session,
        attempt_id: str,
        question_id: str,
        is_correct: bool,
        selected_option_id: Optional[str] = None,
        points_awarded: float = 0.0,
        time_spent_seconds: int = 0,
    ) -> AttemptResponse:
        response = AttemptResponse(
            attempt_id=attempt_id,
            question_id=question_id,
            selected_option_id=selected_option_id,
            is_correct=is_correct,
            points_awarded=points_awarded,
            time_spent_seconds=time_spent_seconds,
        )
        db.add(response)
        db.commit()
        db.refresh(response)
        return response


# ==========================================
# Mastery & Explainable Analytics Operations
# ==========================================
class AnalyticsRepository:
    @staticmethod
    def upsert_mastery(
        db: Session,
        student_id: str,
        concept_id: str,
        mastery_score: float,
        confidence_score: float = 0.5,
        questions_attempted: int = 0,
        questions_correct: int = 0,
    ) -> MasteryRecord:
        record = db.execute(
            select(MasteryRecord).where(
                and_(
                    MasteryRecord.student_id == student_id,
                    MasteryRecord.concept_id == concept_id,
                )
            )
        ).scalar_one_or_none()

        if record:
            record.mastery_score = mastery_score
            record.confidence_score = confidence_score
            record.questions_attempted += questions_attempted
            record.questions_correct += questions_correct
        else:
            record = MasteryRecord(
                student_id=student_id,
                concept_id=concept_id,
                mastery_score=mastery_score,
                confidence_score=confidence_score,
                questions_attempted=questions_attempted,
                questions_correct=questions_correct,
            )
            db.add(record)

        db.commit()
        db.refresh(record)
        return record

    @staticmethod
    def save_analysis_report(
        db: Session,
        student_id: str,
        target_concept_id: str,
        readiness_score: float,
        readiness_status: str,
        unmastered_prerequisites: List[Dict[str, Any]],
        impacted_downstream_topics: List[Dict[str, Any]],
        evidence_summary: Dict[str, Any],
        explanation_text: str,
        recommendations: Optional[str] = None,
    ) -> AnalysisReport:
        report = AnalysisReport(
            student_id=student_id,
            target_concept_id=target_concept_id,
            readiness_score=readiness_score,
            readiness_status=readiness_status,
            unmastered_prerequisites=unmastered_prerequisites,
            impacted_downstream_topics=impacted_downstream_topics,
            evidence_summary=evidence_summary,
            explanation_text=explanation_text,
            recommendations=recommendations,
        )
        db.add(report)
        db.commit()
        db.refresh(report)
        return report


# ==========================================
# Audit Log Operations
# ==========================================
class AuditRepository:
    @staticmethod
    def log_event(
        db: Session,
        action: str,
        entity_type: str,
        actor_id: Optional[str] = None,
        entity_id: Optional[str] = None,
        details: Optional[Dict[str, Any]] = None,
        ip_address: Optional[str] = None,
    ) -> AuditLog:
        log = AuditLog(
            action=action,
            entity_type=entity_type,
            actor_id=actor_id,
            entity_id=entity_id,
            details=details or {},
            ip_address=ip_address,
        )
        db.add(log)
        db.commit()
        db.refresh(log)
        return log
