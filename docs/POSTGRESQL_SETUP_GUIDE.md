# NEXORA: PostgreSQL Local Configuration & Migration Guide

This guide walks through configuring a local PostgreSQL instance on Windows (or macOS/Linux), applying Alembic migrations, and verifying database connectivity for NEXORA.

---

## 1. PostgreSQL Installation

### Option A: Windows Package Manager (PowerShell as Administrator)
```powershell
winget install PostgreSQL.PostgreSQL.16
```

### Option B: Official Graphical Installer
Download and run the installer from the official PostgreSQL portal:  
👉 [https://www.postgresql.org/download/windows/](https://www.postgresql.org/download/windows/)

During installation:
- Set a master password for the default `postgres` superuser (e.g. `postgres` or your preferred secure password).
- Keep the default port `5432`.

---

## 2. Start PostgreSQL Service

In PowerShell (Administrator):
```powershell
# Verify service is running
Get-Service -Name *postgres*

# If stopped, start the service
Start-Service -Name postgresql*
```

---

## 3. Create NEXORA Database & User

Open **SQL Shell (psql)** or run from PowerShell:
```powershell
psql -U postgres -h localhost -p 5432
```

Execute the following SQL commands:
```sql
-- 1. Create a dedicated database for NEXORA
CREATE DATABASE nexora_db;

-- 2. Create a dedicated application user
CREATE USER nexora_user WITH ENCRYPTED PASSWORD 'nexora_secure_password';

-- 3. Grant privileges to the user on the database
GRANT ALL PRIVILEGES ON DATABASE nexora_db TO nexora_user;

-- 4. Connect to nexora_db and grant schema privileges
\c nexora_db
GRANT ALL ON SCHEMA public TO nexora_user;
```

---

## 4. Configure Backend Environment (`backend/.env`)

Edit `backend/.env` with your PostgreSQL credentials:

```env
# PostgreSQL Connection URL
DATABASE_URL="postgresql+psycopg2://nexora_user:nexora_secure_password@localhost:5432/nexora_db"

# Or if connecting directly as postgres user during development:
# DATABASE_URL="postgresql+psycopg2://postgres:YOUR_PASSWORD@localhost:5432/nexora_db"
```

> **Security Reminder**: Never commit real database passwords to version control. The `.env` file is excluded in `.gitignore`. Use `.env.example` as a template.

---

## 5. Run Alembic Migrations

With the virtual environment activated, apply the migrations:

```powershell
cd backend
.\venv\Scripts\Activate.ps1

# Run migrations to create all 11 database entities
python -m alembic -c alembic.ini upgrade head
```

### Migration Verification:
Alembic will report:
```
INFO  [alembic.runtime.migration] Context impl PostgresqlImpl.
INFO  [alembic.runtime.migration] Will assume transactional DDL.
INFO  [alembic.runtime.migration] Running upgrade -> d1d4066adcfd, create_initial_11_entities
```

---

## 6. Inspect Database Schema

To verify in `psql`:
```sql
\c nexora_db
\dt
```

Expected 11 tables:
1. `students`
2. `subjects`
3. `concepts`
4. `prerequisites`
5. `assessments`
6. `questions`
7. `quiz_attempts`
8. `attempt_responses`
9. `mastery_records`
10. `analysis_reports`
11. `audit_logs`

---

## 7. Run Automated Tests

Run the test suite to verify foreign keys, unique constraints, and check constraints:
```powershell
python -m pytest tests/test_database_operations.py -v
```
All 7 database operation tests will validate CRUD, constraints, and relational cascade integrity.
