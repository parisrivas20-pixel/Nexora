# NEXORA
### An AI-Powered Knowledge Dependency and Learning Readiness Analysis System

NEXORA is an academic diagnostic system designed to analyze student quiz performance and prerequisite relationships between academic concepts (focused on **Operating Systems**) to identify potential foundational knowledge gaps.

Unlike standard LMS platforms that output simple percentage grades, NEXORA uses **NetworkX Knowledge Graphs** to map curriculum prerequisites as a Directed Acyclic Graph (DAG) and provides **evidence-grounded, explainable diagnostic reports** identifying which unmastered foundational topics are blocking learning readiness for advanced topics.

---

## 🛠️ Technology Stack

| Domain | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React (Vite) + Tailwind CSS | Component-based, responsive dark-mode UI with Lucide icons |
| **Backend** | Python 3.11+ + FastAPI | High-performance asynchronous REST API with Pydantic validation |
| **Graph Engine** | NetworkX | In-memory Directed Acyclic Graph (DAG) algorithms & traversal |
| **AI / ML** | Python + Scikit-learn + NumPy | Probabilistic concept mastery estimation and readiness modeling |
| **Database** | PostgreSQL *(SQLite supported in tests)* | Persistent relational storage with SQLAlchemy 2.0 ORM |
| **Testing** | Pytest + HTTPX | Automated unit and integration test coverage |

---

## 📂 Project Structure

```
nexora/
├── backend/                   # Python FastAPI Backend
│   ├── app/
│   │   ├── api/v1/            # API route controllers (auth, concepts, quizzes, analytics)
│   │   ├── core/              # Configuration (Pydantic Settings), database, security
│   │   ├── models/            # SQLAlchemy ORM models (Users, Concepts, Quizzes, Analytics)
│   │   ├── schemas/           # Pydantic request/response schemas
│   │   ├── services/          # Analytical engines (Graph, Mastery, Readiness, Explanations)
│   │   └── main.py            # FastAPI application entrypoint & healthchecks
│   ├── tests/                 # Automated test suite
│   ├── requirements.txt       # Backend dependencies
│   ├── pytest.ini             # Pytest discovery settings
│   └── .env.example           # Backend environment variable template
│
├── frontend/                  # React + Vite Frontend
│   ├── src/
│   │   ├── components/        # Reusable UI cards, graph canvas, quiz runner
│   │   ├── App.jsx            # Main application layout and telemetry dashboard
│   │   ├── index.css          # Tailwind CSS directives & typography
│   │   └── main.jsx           # React DOM mounting entrypoint
│   ├── public/                # Static public assets
│   ├── package.json           # Frontend npm dependencies
│   ├── tailwind.config.js     # Tailwind CSS configuration
│   └── .env.example           # Frontend environment variable template
│
├── docs/                      # Project documentation
│   └── PROJECT_PLAN.md        # Comprehensive system design, schema, and API blueprint
│
├── .gitignore                 # Version control ignore rules
├── pytest.ini                 # Root pytest configuration
└── README.md                  # Project overview and setup instructions
```

---

## 🚀 Quickstart: Running Backend & Frontend Independently

The frontend and backend are completely decoupled and can be run independently in separate terminal windows.

### 1. Backend Setup & Run

#### Prerequisites:
- Python 3.11+ (Tested on Python 3.14)

#### Steps:
```bash
# 1. Navigate to backend directory
cd backend

# 2. Activate virtual environment
# Windows (PowerShell):
.\venv\Scripts\Activate.ps1
# macOS/Linux:
source venv/bin/activate

# 3. Copy environment configuration template
cp .env.example .env

# 4. Run automated tests to verify backend health
python -m pytest tests/test_health.py -v

# 5. Start the FastAPI development server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

- **Interactive API Documentation (Swagger UI)**: [http://localhost:8000/api/v1/docs](http://localhost:8000/api/v1/docs)
- **Health Check Endpoint**: [http://localhost:8000/api/v1/health](http://localhost:8000/api/v1/health)

---

### 2. Frontend Setup & Run

#### Prerequisites:
- Node.js v18+ and npm v9+

#### Steps:
```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Copy environment configuration template
cp .env.example .env

# 3. Install dependencies (if not already installed)
npm install

# 4. Verify build compilation
npm run build

# 5. Start the Vite development server
npm run dev
```

- **Frontend Application URL**: [http://localhost:5173](http://localhost:5173)

---

## ⚙️ Environment Configuration

### Backend (`backend/.env.example`)
```env
PROJECT_NAME="NEXORA - AI Knowledge Dependency & Readiness System"
VERSION="1.0.0"
API_V1_STR="/api/v1"
ENVIRONMENT="development"

# Database Configuration (PostgreSQL by default; SQLite supported for local testing)
DATABASE_URL="sqlite:///./nexora.db"
# DATABASE_URL="postgresql+psycopg2://postgres:postgres@localhost:5432/nexora_db"

# Security & Tokens
SECRET_KEY="replace_with_a_secure_random_key_in_production"
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=120

# CORS Allowed Origins
CORS_ORIGINS="http://localhost:5173,http://127.0.0.1:5173"
```

### Frontend (`frontend/.env.example`)
```env
VITE_API_BASE_URL="http://localhost:8000"
VITE_APP_NAME="NEXORA"
VITE_APP_VERSION="1.0.0"
```

---

## 🗺️ Implementation Roadmap

| Phase | Description | Status |
| :---: | :--- | :---: |
| **Phase 1** | **Foundation & Scaffolding**: Decoupled React + FastAPI, docs, test suites. | **Completed** |
| **Phase 2** | **OS Knowledge Graph Core**: NetworkX DAG construction, cycle checks, taxonomy API. | *Upcoming* |
| **Phase 3** | **Authentication & Security**: Role-based access, JWT auth, user registration. | *Upcoming* |
| **Phase 4** | **Quiz Engine & Tracking**: Question taxonomy, timed attempts, answer evaluation. | *Upcoming* |
| **Phase 5** | **Mastery & Readiness Analytics**: Bayesian/decay mastery estimation, bottleneck logic. | *Upcoming* |
| **Phase 6** | **Explainable Diagnostics**: Grounded diagnostic reports linking performance to curriculum. | *Upcoming* |
| **Phase 7** | **Interactive Graph Visualizer**: React Flow graph canvas, dashboard, quiz runner. | *Upcoming* |
| **Phase 8** | **Hardening & Cloud Deployment**: End-to-end integration, Docker, Azure readiness. | *Upcoming* |

---

## 📄 Documentation
For detailed system mechanics, mathematical formulas, database table diagrams, and REST API specifications, refer to [PROJECT_PLAN.md](docs/PROJECT_PLAN.md).
