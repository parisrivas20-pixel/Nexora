"""Database seeder script for Operating Systems (CS-301) curriculum.

Seeds the Subject, all 11 Concepts, and 13 Prerequisite edges into the database
using the KnowledgeGraphService.
"""

from app.core.database import SessionLocal, init_db
from app.db.repositories import SubjectRepository
from app.data.os_curriculum import OS_SUBJECT, OS_CONCEPTS, OS_PREREQUISITES
from app.services.graph_service import KnowledgeGraphService


def seed_os_curriculum():
    """Populate database with verified Operating Systems curriculum and prerequisite DAG."""
    # Ensure tables exist
    init_db()

    db = SessionLocal()
    try:
        # 1. Ensure Subject exists
        subject = SubjectRepository.get_by_code(db, OS_SUBJECT["code"])
        if not subject:
            subject = SubjectRepository.create_subject(
                db=db,
                code=OS_SUBJECT["code"],
                name=OS_SUBJECT["name"],
                description=OS_SUBJECT["description"],
            )
            print(f"Created Subject: {subject.code} - {subject.name}")
        else:
            print(f"Subject '{subject.code}' already exists.")

        # 2. Load curriculum into KnowledgeGraphService
        graph_service = KnowledgeGraphService()
        graph_service.load_from_curriculum(OS_CONCEPTS, OS_PREREQUISITES)

        # 3. Synchronize NetworkX graph into PostgreSQL tables
        graph_service.sync_to_db(db=db, subject_code=OS_SUBJECT["code"])
        print(f"Successfully synchronized {len(OS_CONCEPTS)} concepts and {len(OS_PREREQUISITES)} prerequisite edges to database.")

    finally:
        db.close()


if __name__ == "__main__":
    seed_os_curriculum()
