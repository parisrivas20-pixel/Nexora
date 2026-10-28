"""Explicitly defined Operating Systems curriculum concepts and textbook prerequisite relationships.

Based on standard computer science curriculum reference standards (Silberschatz, Galvin & Gagne, Operating System Concepts).
Prerequisite relationship format:
(prerequisite_code, dependent_code, dependency_strength, is_critical)
"""

OS_SUBJECT = {
    "code": "CS-301",
    "name": "Operating Systems",
    "description": "Foundational systems software course covering concurrency, CPU scheduling, memory management, and file systems."
}

OS_CONCEPTS = [
    {
        "code": "OS_DUAL_MODE",
        "title": "OS Structure & Dual-Mode Execution",
        "category": "Fundamentals",
        "description": "Kernel mode vs user mode, privileged instructions, system calls, and timer interrupts.",
        "difficulty_level": 1,
        "learning_objectives": [
            "Differentiate between kernel mode and user mode privileges",
            "Trace system call transitions using software traps",
            "Explain timer interrupt mechanisms preventing infinite loops"
        ]
    },
    {
        "code": "OS_PROC_STATE",
        "title": "Process Lifecycle & Process Control Block",
        "category": "Process Management",
        "description": "Process state transitions (New, Ready, Running, Waiting, Terminated), context switching, and PCB structures.",
        "difficulty_level": 2,
        "learning_objectives": [
            "Map state transitions driven by I/O and scheduler interrupts",
            "Identify architectural fields inside a Process Control Block (PCB)",
            "Analyze context switch latency overhead"
        ]
    },
    {
        "code": "OS_CPU_SCHED",
        "title": "CPU Scheduling Algorithms",
        "category": "Process Management",
        "description": "Preemptive vs non-preemptive scheduling: FCFS, SJF, Priority Scheduling, and Round Robin.",
        "difficulty_level": 3,
        "learning_objectives": [
            "Compute average waiting time and turnaround time for Gantt charts",
            "Compare preemptive vs non-preemptive scheduling trade-offs",
            "Evaluate starvation risks and aging remediation"
        ]
    },
    {
        "code": "OS_PROC_SYNC",
        "title": "Process Synchronization & Critical Sections",
        "category": "Concurrency",
        "description": "Race conditions, critical section criteria (Mutual Exclusion, Progress, Bounded Waiting), and Peterson's Algorithm.",
        "difficulty_level": 3,
        "learning_objectives": [
            "Identify race conditions in shared memory access",
            "Verify the three requirements of critical section solutions",
            "Analyze software-based mutual exclusion solutions"
        ]
    },
    {
        "code": "OS_SEMAPHORES",
        "title": "Semaphores, Mutexes & Monitors",
        "category": "Concurrency",
        "description": "Counting and binary semaphores, wait() and signal() operations, and classic IPC synchronization problems.",
        "difficulty_level": 4,
        "learning_objectives": [
            "Implement mutual exclusion using binary semaphores",
            "Coordinate producer-consumer processes with counting semaphores",
            "Identify semaphore misordering vulnerabilities leading to deadlock"
        ]
    },
    {
        "code": "OS_DEADLOCKS",
        "title": "Deadlock Conditions & Detection",
        "category": "Concurrency",
        "description": "The four Coffman conditions (Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait) and Resource Allocation Graphs.",
        "difficulty_level": 3,
        "learning_objectives": [
            "Diagnose whether all four Coffman conditions hold simultaneously",
            "Detect cycles in single-instance Resource Allocation Graphs",
            "Distinguish between starvation and deadlock states"
        ]
    },
    {
        "code": "OS_BANKERS",
        "title": "Banker's Algorithm & Deadlock Avoidance",
        "category": "Concurrency",
        "description": "Safe vs unsafe states, resource allocation matrices (Allocation, Max, Available, Need), and safety verification algorithm.",
        "difficulty_level": 5,
        "learning_objectives": [
            "Compute the Need matrix given Max and Allocation vectors",
            "Execute the Safety Algorithm to locate a safe execution sequence",
            "Evaluate resource request grants against safety constraints"
        ]
    },
    {
        "code": "OS_MEM_PHYS",
        "title": "Physical Memory Allocation & Fragmentation",
        "category": "Memory Management",
        "description": "Contiguous memory allocation, base and limit registers, internal vs external fragmentation, and compaction.",
        "difficulty_level": 2,
        "learning_objectives": [
            "Calculate memory address validation using base and limit registers",
            "Differentiate between internal and external fragmentation",
            "Compare First-Fit, Best-Fit, and Worst-Fit placement strategies"
        ]
    },
    {
        "code": "OS_PAGING",
        "title": "Paging & Address Translation",
        "category": "Memory Management",
        "description": "Non-contiguous memory allocation: Pages, frames, page tables, logical-to-physical address mapping, and TLBs.",
        "difficulty_level": 3,
        "learning_objectives": [
            "Deconstruct a logical address into Page Number (p) and Offset (d)",
            "Compute Effective Memory Access Time (EMAT) with TLB hit ratios",
            "Calculate physical frame addresses using page table lookups"
        ]
    },
    {
        "code": "OS_VIRTUAL_MEM",
        "title": "Virtual Memory & Demand Paging",
        "category": "Memory Management",
        "description": "Virtual address space, valid/invalid bit, page fault interrupt sequence, and dirty/modify bit mechanics.",
        "difficulty_level": 4,
        "learning_objectives": [
            "Trace the six-step operating system response to a page fault trap",
            "Compute effective access time with page fault service penalties",
            "Explain the role of backing store swap space"
        ]
    },
    {
        "code": "OS_PAGE_REPL",
        "title": "Page Replacement Algorithms",
        "category": "Memory Management",
        "description": "Page replacement policies: FIFO (and Belady's Anomaly), Optimal Replacement (OPT), and Least Recently Used (LRU).",
        "difficulty_level": 4,
        "learning_objectives": [
            "Simulate page reference strings for FIFO, OPT, and LRU algorithms",
            "Demonstrate Belady's Anomaly with increasing frame allocations",
            "Evaluate hardware approximations of LRU (reference and dirty bits)"
        ]
    }
]

# Directed prerequisite relationships:
# (prerequisite_code, dependent_code, dependency_strength, is_critical)
# Meaning: prerequisite_code MUST be understood before dependent_code
OS_PREREQUISITES = [
    # Process management foundations
    ("OS_DUAL_MODE", "OS_PROC_STATE", 1.0, True),
    ("OS_PROC_STATE", "OS_CPU_SCHED", 1.0, True),
    ("OS_PROC_STATE", "OS_PROC_SYNC", 1.0, True),
    
    # Concurrency and synchronization dependencies
    ("OS_PROC_SYNC", "OS_SEMAPHORES", 1.0, True),
    ("OS_PROC_SYNC", "OS_DEADLOCKS", 0.9, True),
    ("OS_CPU_SCHED", "OS_DEADLOCKS", 0.7, False),
    ("OS_DEADLOCKS", "OS_BANKERS", 1.0, True),
    ("OS_SEMAPHORES", "OS_BANKERS", 0.9, True),

    # Memory management foundations
    ("OS_DUAL_MODE", "OS_MEM_PHYS", 0.9, True),
    ("OS_MEM_PHYS", "OS_PAGING", 1.0, True),
    ("OS_PROC_STATE", "OS_PAGING", 0.8, True),
    ("OS_PAGING", "OS_VIRTUAL_MEM", 1.0, True),
    ("OS_VIRTUAL_MEM", "OS_PAGE_REPL", 1.0, True),
]
