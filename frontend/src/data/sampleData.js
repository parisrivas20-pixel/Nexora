/**
 * NEXORA Illustrative Sample Academic Data
 * 
 * NOTE: This is clearly labelled sample data designed exclusively for frontend
 * UI layout development, graph rendering, and interaction testing.
 * This is NOT live machine learning or database output.
 */

export const SAMPLE_DATA_NOTICE = "Preview Mode: Displaying illustrative sample academic data for UI development.";

export const studentProfile = {
  name: "Alex Mercer",
  studentId: "CS-2024-8841",
  major: "Computer Science & Engineering",
  course: "Operating Systems (CS-301)",
  semester: "Fall 2026",
  email: "alex.mercer@univ.edu",
  avatarUrl: null,
};

export const systemStats = {
  totalConceptsInCurriculum: 24,
  conceptsStudied: 18,
  conceptsMastered: 11,
  conceptsInProgress: 4,
  conceptsRequiringRevision: 3,
  averageReadinessScore: 68.4,
  totalQuizzesAttempted: 8,
  averageQuizScore: 71.5,
  overallMasteryPercent: 62.5,
};

export const recentQuizPerformance = [
  {
    id: "QZ-008",
    title: "Virtual Memory & Demand Paging Diagnostic",
    concept: "Virtual Memory",
    category: "Memory Management",
    date: "Oct 25, 2026",
    score: 9,
    maxScore: 20,
    percentage: 45.0,
    status: "Needs Revision",
    timeSpent: "14m 12s",
    questionsTotal: 10,
    questionsCorrect: 4,
  },
  {
    id: "QZ-007",
    title: "Paging & Segmentation Core Assessment",
    concept: "Paging & Address Translation",
    category: "Memory Management",
    date: "Oct 22, 2026",
    score: 10,
    maxScore: 20,
    percentage: 50.0,
    status: "Needs Revision",
    timeSpent: "12m 45s",
    questionsTotal: 10,
    questionsCorrect: 5,
  },
  {
    id: "QZ-006",
    title: "Deadlock Detection & Avoidance",
    concept: "Deadlocks",
    category: "Concurrency",
    date: "Oct 19, 2026",
    score: 13,
    maxScore: 20,
    percentage: 65.0,
    status: "Borderline",
    timeSpent: "15m 00s",
    questionsTotal: 10,
    questionsCorrect: 6,
  },
  {
    id: "QZ-005",
    title: "Process Synchronization & Semaphores",
    concept: "Process Synchronization",
    category: "Concurrency",
    date: "Oct 15, 2026",
    score: 8,
    maxScore: 20,
    percentage: 40.0,
    status: "Needs Revision",
    timeSpent: "13m 20s",
    questionsTotal: 10,
    questionsCorrect: 4,
  },
  {
    id: "QZ-004",
    title: "CPU Scheduling Algorithms (SJF, RR, Priority)",
    concept: "CPU Scheduling",
    category: "Process Management",
    date: "Oct 10, 2026",
    score: 17,
    maxScore: 20,
    percentage: 85.0,
    status: "Mastered",
    timeSpent: "11m 30s",
    questionsTotal: 10,
    questionsCorrect: 8,
  },
  {
    id: "QZ-003",
    title: "Process State Transitions & PCB Structure",
    concept: "Process Concept & PCB",
    category: "Process Management",
    date: "Oct 04, 2026",
    score: 19,
    maxScore: 20,
    percentage: 95.0,
    status: "Mastered",
    timeSpent: "09m 40s",
    questionsTotal: 10,
    questionsCorrect: 9,
  },
];

export const conceptsRequiringRevision = [
  {
    id: "OS-CON-005",
    code: "OS_PROC_SYNC",
    title: "Process Synchronization",
    category: "Concurrency",
    masteryScore: 0.42,
    confidence: "High (3 attempts)",
    primaryGapReason: "Unresolved race condition and mutex lock semantics in recent quizzes",
    downstreamBlockedCount: 4,
    blockedTopics: ["Semaphores & Monitors", "Classic IPC Problems", "Deadlock Prevention", "Deadlock Avoidance"],
    severity: "Critical Bottleneck",
  },
  {
    id: "OS-CON-009",
    code: "OS_MEM_PAGING",
    title: "Paging & Address Translation",
    category: "Memory Management",
    masteryScore: 0.48,
    confidence: "High (2 attempts)",
    primaryGapReason: "Errors in multi-level page table offsets and TLB miss penalty calculations",
    downstreamBlockedCount: 3,
    blockedTopics: ["Virtual Memory", "Page Replacement (LRU/FIFO)", "Thrashing & Working Set"],
    severity: "Critical Bottleneck",
  },
  {
    id: "OS-CON-006",
    code: "OS_DEADLOCK_CORE",
    title: "Deadlock Conditions",
    category: "Concurrency",
    masteryScore: 0.58,
    confidence: "Medium (1 attempt)",
    primaryGapReason: "Weak identification of Resource Allocation Graph circular wait conditions",
    downstreamBlockedCount: 2,
    blockedTopics: ["Banker's Algorithm", "Deadlock Recovery"],
    severity: "Moderate Gap",
  },
];

export const learningReadinessSummaries = [
  {
    id: "READ-001",
    targetConceptCode: "OS_MEM_VIRTUAL",
    targetConceptTitle: "Virtual Memory & Demand Paging",
    category: "Memory Management",
    difficultyLevel: 4,
    readinessScore: 0.46,
    status: "Blocked",
    prerequisiteSatisfaction: "1 of 3 Prerequisites Met",
    blockingPrerequisite: "Paging & Address Translation (48% Mastery)",
    recommendation: "Review two-level page tables and TLB lookups before starting Demand Paging.",
  },
  {
    id: "READ-002",
    targetConceptCode: "OS_DEADLOCK_AVOID",
    targetConceptTitle: "Banker's Algorithm & Deadlock Avoidance",
    category: "Concurrency",
    difficultyLevel: 4,
    readinessScore: 0.52,
    status: "Needs Review",
    prerequisiteSatisfaction: "2 of 3 Prerequisites Met",
    blockingPrerequisite: "Process Synchronization (42% Mastery)",
    recommendation: "Solidify critical section mutex constraints before evaluating safe state matrices.",
  },
  {
    id: "READ-003",
    targetConceptCode: "OS_FS_INODE",
    targetConceptTitle: "File System Architecture & Inodes",
    category: "Storage & File Systems",
    difficultyLevel: 3,
    readinessScore: 0.88,
    status: "Ready",
    prerequisiteSatisfaction: "All 2 Prerequisites Mastered",
    blockingPrerequisite: "None",
    recommendation: "Student possesses strong foundational knowledge to excel in this topic.",
  },
  {
    id: "READ-004",
    targetConceptCode: "OS_THREAD_CONCUR",
    targetConceptTitle: "Multi-Threading & Kernel vs User Threads",
    category: "Process Management",
    difficultyLevel: 3,
    readinessScore: 0.84,
    status: "Ready",
    prerequisiteSatisfaction: "All 2 Prerequisites Mastered",
    blockingPrerequisite: "None",
    recommendation: "Process Concept & PCB mastery is above 90%. Student is fully prepared.",
  },
  {
    id: "READ-005",
    targetConceptCode: "OS_MEM_PAGEREPL",
    targetConceptTitle: "Page Replacement Algorithms (LRU, Optimal)",
    category: "Memory Management",
    difficultyLevel: 4,
    readinessScore: 0.41,
    status: "Blocked",
    prerequisiteSatisfaction: "0 of 2 Prerequisites Satisfied",
    blockingPrerequisite: "Virtual Memory & Paging",
    recommendation: "Severe dependency gap. Do not proceed until address translation is resolved.",
  },
];

export const recentAnalysisReports = [
  {
    id: "REP-2026-1025",
    title: "Diagnostic Analysis: Virtual Memory Readiness",
    targetConcept: "Virtual Memory & Demand Paging",
    date: "Oct 25, 2026",
    readinessScore: 0.46,
    readinessStatus: "Blocked",
    unmasteredPrerequisites: [
      { title: "Paging & Address Translation", score: 0.48, benchmark: 0.65, status: "Critical Gap" },
      { title: "Memory Allocation & Fragmentation", score: 0.72, benchmark: 0.65, status: "Mastered" },
    ],
    impactedDownstream: [
      "Page Replacement Algorithms",
      "Thrashing Prevention",
      "Memory-Mapped Files"
    ],
    evidenceSummary: "Student attempted Quiz #8 (Virtual Memory Diagnostic) scoring 45%. Item analysis reveals 3 out of 4 errors stemmed from misunderstanding page table base registers and frame offset resolution rather than demand paging concepts.",
    explanationText: "Based on assessment evidence, the student exhibits a foundational prerequisite gap in 'Paging & Address Translation'. Because Virtual Memory is mechanically layered on top of paging, proceeding into page fault handling without solid address translation will compound learning obstacles.",
    recommendedNextStep: "Complete the 15-minute remedial module on Paging Offset Calculations and re-attempt Quiz #7.",
  },
  {
    id: "REP-2026-1019",
    title: "Diagnostic Analysis: Deadlock Avoidance Preparedness",
    targetConcept: "Deadlock Avoidance & Banker's Algorithm",
    date: "Oct 19, 2026",
    readinessScore: 0.52,
    readinessStatus: "Needs Review",
    unmasteredPrerequisites: [
      { title: "Process Synchronization", score: 0.42, benchmark: 0.65, status: "Critical Gap" },
      { title: "Deadlock Necessary Conditions", score: 0.62, benchmark: 0.65, status: "Borderline" },
      { title: "Process States & Scheduling", score: 0.90, benchmark: 0.65, status: "Mastered" },
    ],
    impactedDownstream: [
      "Distributed Deadlocks",
      "Real-time Resource Allocation"
    ],
    evidenceSummary: "In Quiz #6, questions regarding Mutual Exclusion and Hold-and-Wait conditions had an error rate of 60%. The student struggled with semaphore wait/signal order dependencies.",
    explanationText: "While the student understands general process lifecycle mechanics, their foundational understanding of concurrent synchronization primitives remains incomplete. Banker's Algorithm relies heavily on understanding mutually exclusive claim states.",
    recommendedNextStep: "Review the Producer-Consumer semaphore synchronization lab.",
  },
  {
    id: "REP-2026-1012",
    title: "Diagnostic Analysis: File System Implementation",
    targetConcept: "File System Architecture & Inodes",
    date: "Oct 12, 2026",
    readinessScore: 0.88,
    readinessStatus: "Ready",
    unmasteredPrerequisites: [
      { title: "Disk Structure & Sectors", score: 0.85, benchmark: 0.65, status: "Mastered" },
      { title: "Secondary Storage Management", score: 0.90, benchmark: 0.65, status: "Mastered" },
    ],
    impactedDownstream: [],
    evidenceSummary: "High performance across all storage foundation quizzes with 88% overall accuracy.",
    explanationText: "Prerequisites are fully satisfied. The student has demonstrated consistent proficiency in block allocation and disk architecture.",
    recommendedNextStep: "Proceed directly to Inode Data Structures and Directory Implementation.",
  },
];

export const knowledgeGraphData = {
  nodes: [
    // Layer 1: Core Fundamentals
    { id: "c1", code: "OS_INTRO", title: "OS Architecture & Dual-Mode", category: "Fundamentals", x: 60, y: 180, mastery: 95, difficulty: 1, level: "Mastered" },
    { id: "c2", code: "OS_PROC_STATE", title: "Process Concept & PCB", category: "Process Management", x: 220, y: 100, mastery: 92, difficulty: 2, level: "Mastered" },
    { id: "c3", code: "OS_MEM_BASE", title: "Physical Memory & Contiguous Alloc", category: "Memory Management", x: 220, y: 260, mastery: 82, difficulty: 2, level: "Mastered" },
    { id: "c4", code: "OS_IO_BASE", title: "I/O Hardware & Disk Basics", category: "Storage", x: 220, y: 390, mastery: 85, difficulty: 2, level: "Mastered" },
    
    // Layer 2: Intermediate Building Blocks
    { id: "c5", code: "OS_CPU_SCHED", title: "CPU Scheduling Algorithms", category: "Process Management", x: 420, y: 70, mastery: 85, difficulty: 3, level: "Mastered" },
    { id: "c6", code: "OS_PROC_SYNC", title: "Process Synchronization", category: "Concurrency", x: 420, y: 150, mastery: 42, difficulty: 3, level: "Needs Revision" },
    { id: "c7", code: "OS_MEM_PAGING", title: "Paging & Address Translation", category: "Memory Management", x: 420, y: 260, mastery: 48, difficulty: 3, level: "Needs Revision" },
    { id: "c8", code: "OS_DISK_SCHED", title: "Disk Scheduling (SCAN, SSTF)", category: "Storage", x: 420, y: 390, mastery: 78, difficulty: 2, level: "Mastered" },

    // Layer 3: Advanced Prerequisite Dependents
    { id: "c9", code: "OS_SEM_MON", title: "Semaphores & Mutex Locks", category: "Concurrency", x: 640, y: 120, mastery: 38, difficulty: 4, level: "Blocked" },
    { id: "c10", code: "OS_DEADLOCK_COND", title: "Deadlock Conditions", category: "Concurrency", x: 640, y: 190, mastery: 58, difficulty: 3, level: "Needs Revision" },
    { id: "c11", code: "OS_MEM_VIRTUAL", title: "Virtual Memory & Demand Paging", category: "Memory Management", x: 640, y: 260, mastery: 45, difficulty: 4, level: "Blocked" },
    { id: "c12", code: "OS_FS_ALLOC", title: "File Allocation Methods", category: "Storage", x: 640, y: 390, mastery: 72, difficulty: 3, level: "Mastered" },

    // Layer 4: Capstone / Complex Topics
    { id: "c13", code: "OS_DEADLOCK_AVOID", title: "Banker's Algorithm & Avoidance", category: "Concurrency", x: 860, y: 150, mastery: 30, difficulty: 5, level: "Blocked" },
    { id: "c14", code: "OS_PAGE_REPL", title: "Page Replacement Algorithms", category: "Memory Management", x: 860, y: 230, mastery: 35, difficulty: 5, level: "Blocked" },
    { id: "c15", code: "OS_THRASHING", title: "Thrashing & Working Set Model", category: "Memory Management", x: 860, y: 300, mastery: 25, difficulty: 4, level: "Blocked" },
    { id: "c16", code: "OS_FS_INODE", title: "File System Inodes & Directory", category: "Storage", x: 860, y: 390, mastery: 80, difficulty: 4, level: "Ready" },
  ],
  edges: [
    // Layer 1 to 2
    { source: "c1", target: "c2", strength: 1.0, critical: true },
    { source: "c1", target: "c3", strength: 1.0, critical: true },
    { source: "c1", target: "c4", strength: 0.9, critical: false },
    { source: "c2", target: "c5", strength: 1.0, critical: true },
    { source: "c2", target: "c6", strength: 1.0, critical: true },
    { source: "c3", target: "c7", strength: 1.0, critical: true },
    { source: "c4", target: "c8", strength: 0.9, critical: false },
    
    // Layer 2 to 3
    { source: "c6", target: "c9", strength: 1.0, critical: true },
    { source: "c6", target: "c10", strength: 0.95, critical: true },
    { source: "c5", target: "c10", strength: 0.7, critical: false },
    { source: "c7", target: "c11", strength: 1.0, critical: true },
    { source: "c8", target: "c12", strength: 0.85, critical: false },

    // Layer 3 to 4
    { source: "c9", target: "c13", strength: 0.9, critical: true },
    { source: "c10", target: "c13", strength: 1.0, critical: true },
    { source: "c11", target: "c14", strength: 1.0, critical: true },
    { source: "c11", target: "c15", strength: 1.0, critical: true },
    { source: "c14", target: "c15", strength: 0.9, critical: false },
    { source: "c12", target: "c16", strength: 0.95, critical: true },
  ]
};

export const assessmentsCatalog = [
  {
    id: "QZ-001",
    title: "Process State Machine & PCB Diagnostics",
    category: "Process Management",
    difficulty: "Beginner",
    durationMinutes: 15,
    questionsCount: 10,
    passingScore: 70,
    completed: true,
    lastScore: 95,
    conceptsTested: ["Process Concept & PCB", "Context Switching"],
    sampleQuestions: [
      {
        id: 1,
        question: "When a process transitions from Running to Ready state, what primary event has occurred?",
        options: [
          "An I/O operation completed",
          "The CPU scheduler timer interrupt expired (time slice ended)",
          "A page fault occurred in physical memory",
          "The process called exit() system call"
        ],
        correctIndex: 1,
        explanation: "A transition from Running to Ready occurs when an operating system preempts the process due to a timer interrupt."
      },
      {
        id: 2,
        question: "Which of the following information is NOT typically stored inside a Process Control Block (PCB)?",
        options: [
          "Process identification number (PID)",
          "CPU register values and program counter",
          "The compiler source code symbol table",
          "Memory management limits and page table base"
        ],
        correctIndex: 2,
        explanation: "The compiler symbol table is an artifact of the build chain, not kernel-level PCB runtime state."
      }
    ]
  },
  {
    id: "QZ-002",
    title: "CPU Scheduling Algorithms & Gantt Charts",
    category: "Process Management",
    difficulty: "Intermediate",
    durationMinutes: 20,
    questionsCount: 10,
    passingScore: 70,
    completed: true,
    lastScore: 85,
    conceptsTested: ["CPU Scheduling Algorithms", "Turnaround & Waiting Time"],
    sampleQuestions: [
      {
        id: 1,
        question: "Which scheduling algorithm is provably optimal in terms of minimizing average waiting time for a given set of stationary processes?",
        options: [
          "First-Come, First-Served (FCFS)",
          "Shortest Job First (SJF / SRTF)",
          "Round Robin (RR)",
          "Priority Scheduling with Aging"
        ],
        correctIndex: 1,
        explanation: "SJF minimizes average waiting time by scheduling shorter burst times ahead of longer burst times."
      }
    ]
  },
  {
    id: "QZ-003",
    title: "Process Synchronization & Critical Sections",
    category: "Concurrency",
    difficulty: "Advanced",
    durationMinutes: 20,
    questionsCount: 10,
    passingScore: 75,
    completed: true,
    lastScore: 40,
    conceptsTested: ["Process Synchronization", "Peterson's Algorithm", "Mutexes"],
    sampleQuestions: [
      {
        id: 1,
        question: "What are the three essential requirements that any valid solution to the Critical Section problem must satisfy?",
        options: [
          "Speed, Efficiency, and Low Memory Overhead",
          "Mutual Exclusion, Progress, and Bounded Waiting",
          "Preemption, Atomicity, and Deadlock Avoidance",
          "Starvation Freedom, Multi-threading, and Paging"
        ],
        correctIndex: 1,
        explanation: "Any critical section solution must ensure Mutual Exclusion (only one process), Progress (selection cannot be indefinitely postponed), and Bounded Waiting (no starvation)."
      }
    ]
  },
  {
    id: "QZ-004",
    title: "Paging, TLB & Address Translation",
    category: "Memory Management",
    difficulty: "Intermediate",
    durationMinutes: 15,
    questionsCount: 10,
    passingScore: 70,
    completed: true,
    lastScore: 50,
    conceptsTested: ["Paging & Address Translation", "Translation Lookaside Buffer"],
    sampleQuestions: [
      {
        id: 1,
        question: "In a 32-bit architecture with 4 KB page sizes, how many bits are used for the page offset?",
        options: [
          "10 bits",
          "12 bits (2^12 = 4096 bytes)",
          "16 bits",
          "20 bits"
        ],
        correctIndex: 1,
        explanation: "Since 4 KB = 4096 bytes = 2^12 bytes, the lowest 12 bits of a virtual address represent the in-page offset."
      }
    ]
  },
  {
    id: "QZ-005",
    title: "Virtual Memory, Page Faults & Demand Paging",
    category: "Memory Management",
    difficulty: "Advanced",
    durationMinutes: 20,
    questionsCount: 10,
    passingScore: 75,
    completed: true,
    lastScore: 45,
    conceptsTested: ["Virtual Memory & Demand Paging", "Page Fault Handling"],
    sampleQuestions: [
      {
        id: 1,
        question: "What hardware interrupt triggers when a running program references a virtual page marked invalid in the page table?",
        options: [
          "Arithmetic Overflow Interrupt",
          "Page Fault Trap",
          "Bus Error Exception",
          "I/O Completion Signal"
        ],
        correctIndex: 1,
        explanation: "Referencing an unmapped or swapped-out virtual page triggers an MMU page fault trap, transferring control to the OS page fault handler."
      }
    ]
  },
  {
    id: "QZ-006",
    title: "Deadlock Necessary Conditions & RAG Graphs",
    category: "Concurrency",
    difficulty: "Intermediate",
    durationMinutes: 15,
    questionsCount: 10,
    passingScore: 70,
    completed: true,
    lastScore: 65,
    conceptsTested: ["Deadlock Conditions", "Resource Allocation Graph"],
    sampleQuestions: [
      {
        id: 1,
        question: "Which Coffman condition states that resources cannot be forcibly seized from a process holding them?",
        options: [
          "Mutual Exclusion",
          "Hold and Wait",
          "No Preemption",
          "Circular Wait"
        ],
        correctIndex: 2,
        explanation: "The 'No Preemption' condition dictates that allocated resources can only be released voluntarily by the holding process."
      }
    ]
  },
  {
    id: "QZ-007",
    title: "File Systems, Directory Structures & Inodes",
    category: "Storage",
    difficulty: "Intermediate",
    durationMinutes: 15,
    questionsCount: 10,
    passingScore: 70,
    completed: false,
    lastScore: null,
    conceptsTested: ["File System Inodes", "Directory Layouts"],
    sampleQuestions: []
  },
  {
    id: "QZ-008",
    title: "Banker's Algorithm & Safe State Verification",
    category: "Concurrency",
    difficulty: "Advanced",
    durationMinutes: 25,
    questionsCount: 8,
    passingScore: 80,
    completed: false,
    lastScore: null,
    conceptsTested: ["Banker's Algorithm", "Deadlock Avoidance Matrices"],
    sampleQuestions: []
  }
];

export const gapAnalysisMatrix = [
  {
    id: "GAP-01",
    rootConceptCode: "OS_PROC_SYNC",
    rootConceptTitle: "Process Synchronization",
    category: "Concurrency",
    studentMastery: 42,
    threshold: 65,
    gapDelta: -23,
    status: "Severe Foundational Bottleneck",
    evidenceDescription: "Scored 40% on Quiz #5. Specific struggles on mutex locking discipline and race conditions in shared memory.",
    impactedCount: 4,
    impactedChain: [
      { code: "OS_SEM_MON", title: "Semaphores & Mutexes", impactLevel: "Directly Blocked" },
      { code: "OS_DEADLOCK_COND", title: "Deadlock Conditions", impactLevel: "Vulnerable" },
      { code: "OS_DEADLOCK_AVOID", title: "Banker's Algorithm", impactLevel: "Cascading Block" },
      { code: "OS_CLASSIC_IPC", title: "Dining Philosophers & Bounded Buffer", impactLevel: "Directly Blocked" },
    ]
  },
  {
    id: "GAP-02",
    rootConceptCode: "OS_MEM_PAGING",
    rootConceptTitle: "Paging & Address Translation",
    category: "Memory Management",
    studentMastery: 48,
    threshold: 65,
    gapDelta: -17,
    status: "Severe Foundational Bottleneck",
    evidenceDescription: "Scored 50% on Quiz #4. Inability to correctly compute physical addresses from logical page number + offset.",
    impactedCount: 3,
    impactedChain: [
      { code: "OS_MEM_VIRTUAL", title: "Virtual Memory & Demand Paging", impactLevel: "Directly Blocked" },
      { code: "OS_PAGE_REPL", title: "Page Replacement Algorithms", impactLevel: "Cascading Block" },
      { code: "OS_THRASHING", title: "Thrashing & Working Set", impactLevel: "Cascading Block" },
    ]
  },
  {
    id: "GAP-03",
    rootConceptCode: "OS_DEADLOCK_COND",
    rootConceptTitle: "Deadlock Conditions & RAG",
    category: "Concurrency",
    studentMastery: 58,
    threshold: 65,
    gapDelta: -7,
    status: "Moderate Prerequisite Gap",
    evidenceDescription: "Scored 65% on Quiz #6. Mistakes identifying circular wait in multi-instance resource allocation graphs.",
    impactedCount: 2,
    impactedChain: [
      { code: "OS_DEADLOCK_AVOID", title: "Banker's Algorithm", impactLevel: "Directly Blocked" },
      { code: "OS_DEADLOCK_REC", title: "Deadlock Detection & Recovery", impactLevel: "Vulnerable" },
    ]
  }
];
