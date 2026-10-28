# NEXORA: Project Architecture, System Design & Implementation Roadmap

**Full Title**: An AI-Powered Knowledge Dependency and Learning Readiness Analysis System  
**Domain**: Operating Systems (OS) Concepts  
**Target Audience**: Students, Academic Instructors, and Project Evaluators  

---

## 1. System Overview & Core Scientific Logic

NEXORA evaluates a student's preparedness for advanced topics by mapping prerequisite structures as a Directed Acyclic Graph (DAG) and analyzing quiz performance evidence. Rather than treating scores as isolated numbers, it traces weaknesses back to foundational prerequisites and projects downstream learning obstacles.

```
       [ Assessment Evidence ]              [ Knowledge Graph (DAG) ]
       Quiz questions & options             OS Concepts & Prerequisite Edges
                  │                                         │
                  ▼                                         ▼
       ┌──────────────────────┐                  ┌──────────────────────┐
       │   Mastery Engine     │                  │   NetworkX Engine    │
       │ Bayesian / Decay     │                  │ Topological Traversal│
       └──────────┬───────────┘                  └──────────┬───────────┘
                  │                                         │
                  └───────────────────┬─────────────────────┘
                                      │
                                      ▼
                      ┌───────────────────────────────┐
                      │    Readiness & Gap Engine     │
                      │  Bottleneck Identification    │
                      └───────────────┬───────────────┘
                                      │
                                      ▼
                      ┌───────────────────────────────┐
                      │   Explainable Diagnostics     │
                      │   - Prerequisite Evidence     │
                      │   - Downstream Impact         │
                      │   - Actionable Remediation    │
                      └───────────────────────────────┘
```

### Ethical & Methodological Guardrails
1. **Academic Gap vs. Cognitive Diagnosis**: Low performance is strictly framed as *unmastered prerequisite material* based on quiz question evidence, never as a general learning disability or fixed cognitive limitation.
2. **Deterministic & Transparent Explainability**: Every diagnostic recommendation links to:
   - Direct quiz question results (the evidence).
   - Knowledge graph prerequisite edges (the structural dependency).
   - A mathematical readiness score with visible weights, avoiding non-verifiable black-box claims.
3. **No Fabricated Accuracy**: Model baselines and predictive performance will be reported with standard metrics ($R^2$, Precision, Recall, Brier score) against empirical evaluation criteria.

---

## 2. Technology Stack & Component Responsibilities

| Tier | Technology | Purpose & Rationale |
| :--- | :--- | :--- |
| **Frontend** | React + Vite + Tailwind CSS | Component-based UI, high rendering performance, flexible styling, rapid prototyping. |
| **Graph UI** | React Flow / Vis.js | Interactive DAG rendering with zoom, pan, node status color-coding, and path highlighting. |
| **Backend** | Python 3.11+ + FastAPI | Asynchronous REST API, native Pydantic validation, interactive OpenAPI/Swagger documentation. |
| **Graph Engine** | NetworkX | In-memory graph algorithms (topological sort, ancestor/descendant reachability, centrality, cycle detection). |
| **AI / ML** | Scikit-learn + NumPy | Probabilistic mastery estimation (logistic regression / weighted evidence decay), readiness clustering. |
| **Database** | PostgreSQL | Relational integrity for user data, quiz attempts, question taxonomy, and analytics snapshots. |
| **ORM & Migrations**| SQLAlchemy 2.0 + Alembic | Declarative database schema, connection pooling, and version-controlled migrations. |
| **Testing** | Pytest + HTTPX + Vitest | Comprehensive backend unit/integration tests and frontend component tests. |
| **Security** | Passlib (Bcrypt) + PyJWT | Industry-standard password hashing and stateless token-based authorization. |

---

## 3. Database Schema Design (PostgreSQL)

### 1. `users`
- `id` (VARCHAR(36), Primary Key)
- `email` (VARCHAR(255), Unique, Indexed)
- `hashed_password` (VARCHAR(255), Not Null)
- `full_name` (VARCHAR(150), Not Null)
- `role` (VARCHAR(20), Default: `'student'`) — `'student'`, `'instructor'`, `'admin'`
- `is_active` (BOOLEAN, Default: `true`)
- `created_at` (TIMESTAMP WITH TIME ZONE, Default: `NOW()`)
- `updated_at` (TIMESTAMP WITH TIME ZONE, Default: `NOW()`)

### 2. `concepts` (Operating Systems Taxonomy)
- `id` (VARCHAR(36), Primary Key)
- `code` (VARCHAR(50), Unique, Indexed) — e.g., `OS_MEM_VIRTUAL`
- `title` (VARCHAR(150), Not Null) — e.g., "Virtual Memory & Paging"
- `category` (VARCHAR(100), Not Null) — e.g., "Memory Management", "Process Synchronization"
- `description` (TEXT)
- `difficulty_level` (SMALLINT, 1 to 5)
- `learning_objectives` (JSON)
- `created_at` (TIMESTAMP WITH TIME ZONE, Default: `NOW()`)

### 3. `concept_dependencies` (Knowledge Graph Edges)
- `id` (VARCHAR(36), Primary Key)
- `prerequisite_id` (VARCHAR(36), Foreign Key -> `concepts.id`, Indexed)
- `dependent_id` (VARCHAR(36), Foreign Key -> `concepts.id`, Indexed)
- `dependency_strength` (FLOAT, Default: 1.0) — Range [0.1, 1.0] indicating strictness
- `is_critical` (BOOLEAN, Default: `true`)
- *Constraint*: `UNIQUE(prerequisite_id, dependent_id)`

### 4. `quizzes`
- `id` (VARCHAR(36), Primary Key)
- `title` (VARCHAR(200), Not Null)
- `description` (TEXT)
- `primary_concept_id` (VARCHAR(36), Foreign Key -> `concepts.id`, Indexed)
- `duration_minutes` (INTEGER, Default: 15)
- `passing_percentage` (FLOAT, Default: 60.0)
- `is_published` (BOOLEAN, Default: `true`)
- `created_at` (TIMESTAMP WITH TIME ZONE, Default: `NOW()`)

### 5. `questions`
- `id` (VARCHAR(36), Primary Key)
- `quiz_id` (VARCHAR(36), Foreign Key -> `quizzes.id`, Indexed)
- `concept_id` (VARCHAR(36), Foreign Key -> `concepts.id`, Indexed)
- `prompt` (TEXT, Not Null)
- `question_type` (VARCHAR(30), Default: `'single_choice'`)
- `difficulty` (SMALLINT, 1 to 5)
- `explanation` (TEXT)
- `created_at` (TIMESTAMP WITH TIME ZONE, Default: `NOW()`)

### 6. `question_options`
- `id` (VARCHAR(36), Primary Key)
- `question_id` (VARCHAR(36), Foreign Key -> `questions.id`, Indexed)
- `option_text` (TEXT, Not Null)
- `is_correct` (BOOLEAN, Not Null)
- `order_index` (SMALLINT, Default: 0)

### 7. `quiz_attempts`
- `id` (VARCHAR(36), Primary Key)
- `user_id` (VARCHAR(36), Foreign Key -> `users.id`, Indexed)
- `quiz_id` (VARCHAR(36), Foreign Key -> `quizzes.id`, Indexed)
- `started_at` (TIMESTAMP WITH TIME ZONE, Default: `NOW()`)
- `submitted_at` (TIMESTAMP WITH TIME ZONE, Nullable)
- `score` (FLOAT, Default: 0.0)
- `max_possible_score` (FLOAT, Default: 0.0)
- `percentage` (FLOAT, Default: 0.0)
- `status` (VARCHAR(20), Default: `'in_progress'`)

### 8. `attempt_answers`
- `id` (VARCHAR(36), Primary Key)
- `attempt_id` (VARCHAR(36), Foreign Key -> `quiz_attempts.id`, Indexed)
- `question_id` (VARCHAR(36), Foreign Key -> `questions.id`, Indexed)
- `selected_option_id` (VARCHAR(36), Foreign Key -> `question_options.id`)
- `is_correct` (BOOLEAN, Not Null)
- `time_spent_seconds` (INTEGER, Default: 0)

### 9. `student_concept_mastery`
- `id` (VARCHAR(36), Primary Key)
- `user_id` (VARCHAR(36), Foreign Key -> `users.id`, Indexed)
- `concept_id` (VARCHAR(36), Foreign Key -> `concepts.id`, Indexed)
- `mastery_score` (FLOAT, Not Null) — Range [0.0, 1.0]
- `confidence_interval` (FLOAT, Default: 0.5)
- `attempts_count` (INTEGER, Default: 0)
- `questions_tested` (INTEGER, Default: 0)
- `last_assessed_at` (TIMESTAMP WITH TIME ZONE, Default: `NOW()`)
- *Constraint*: `UNIQUE(user_id, concept_id)`

### 10. `analysis_reports`
- `id` (VARCHAR(36), Primary Key)
- `user_id` (VARCHAR(36), Foreign Key -> `users.id`, Indexed)
- `target_concept_id` (VARCHAR(36), Foreign Key -> `concepts.id`, Indexed)
- `readiness_score` (FLOAT, Not Null) — Range [0.0, 1.0]
- `readiness_status` (VARCHAR(30), Not Null) — `'Ready'`, `'Needs_Review'`, `'Blocked'`
- `unmastered_prerequisites` (JSON)
- `impacted_downstream_topics` (JSON)
- `evidence_summary` (JSON)
- `explanation_text` (TEXT, Not Null)
- `generated_at` (TIMESTAMP WITH TIME ZONE, Default: `NOW()`)

---

## 4. RESTful API Blueprint

- `/api/v1/auth`: Registration, OAuth2 Login, Token Refresh, Current User Profile.
- `/api/v1/concepts`: Concept listing, Category grouping, React Flow Graph Payload, Upstream Prerequisites, Downstream Impact.
- `/api/v1/quizzes`: Quiz metadata, Question Delivery, Attempt Submission & Scoring, Attempt History & Review.
- `/api/v1/analytics`: Student Mastery Profile, Learning Readiness Estimation, Prerequisite Gap Detection, Dependency Impact Analysis, Explainable Report Generation.

---

## 5. Mathematical Formulations & Analytical Logic

### 5.1 Concept Mastery Estimation ($M_c$)
$$M_c = \frac{\sum_{i=1}^{N_c} w_i \cdot r_i \cdot d_i}{\sum_{i=1}^{N_c} w_i \cdot d_i}$$
Where:
- $N_c$: Number of questions attempted for concept $c$.
- $r_i \in \{0, 1\}$: Binary result (0 = incorrect, 1 = correct).
- $d_i \in [1, 5]$: Question difficulty level.
- $w_i = \exp(-\lambda (t_{\text{current}} - t_i))$: Time-decay factor rewarding recent improvement.

### 5.2 Prerequisite Gap Detection
For a target concept $t$, ancestors in the DAG $G$ are traversed. A gap is flagged if:
$$M_u < \tau \quad (\tau = 0.65)$$

### 5.3 Learning Readiness Estimation ($R_t$)
$$R_t = \min_{u \in \text{DirectPrereqs}(t)} (M_u)^{\alpha} \times \left( \frac{1}{|\text{DirectPrereqs}(t)|} \sum_{u \in \text{DirectPrereqs}(t)} M_u \right)^{1-\alpha} \quad (\alpha = 0.60)$$
- **Ready**: $R_t \ge 0.75$ and no critical prerequisite $< 0.60$.
- **Needs Review**: $0.50 \le R_t < 0.75$.
- **Blocked**: $R_t < 0.50$ or any critical prerequisite $< 0.40$.

### 5.4 Dependency Impact (Blast Radius)
$$\text{Impact}(u) = \{ v \in V \mid \text{path exists from } u \text{ to } v \text{ in } G \}$$

---

## 6. Phased Implementation Roadmap

- **Phase 1: Project Scaffolding & Foundation**: Decoupled Frontend (React + Vite + Tailwind CSS) & Backend (Python + FastAPI) running independently with health checks.
- **Phase 2: Knowledge Graph Core & OS Concepts**: NetworkX DAG construction, cycle validation, OS curriculum seed dataset, `/api/v1/concepts` API.
- **Phase 3: Secure Access Controls & User Profiles**: User registration, bcrypt password hashing, JWT stateless authentication, role checks.
- **Phase 4: Quiz Engine & Performance Tracking**: Topic-wise assessment items, timed attempts, answer evaluation, attempt history.
- **Phase 5: Concept Mastery & Learning Readiness Analytics**: Bayesian/decay mastery estimation, prerequisite gap analysis, bottleneck readiness index.
- **Phase 6: Explainability Engine & Diagnostic Reports**: Evidence-backed reports explaining findings via quiz items and graph relationships.
- **Phase 7: Interactive Graph & Frontend Experience**: React Flow visualization, dashboard, quiz runner, diagnostic report viewer.
- **Phase 8: Comprehensive Verification & Azure Deployment Prep**: End-to-end user tests, edge-case hardening, Docker containerization.
