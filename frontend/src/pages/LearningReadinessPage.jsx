import React, { useState } from 'react';
import { 
  BrainCircuit, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Sparkles, 
  ArrowRight, 
  HelpCircle,
  Layers,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import Badge from '../components/common/Badge';
import { learningReadinessSummaries } from '../data/sampleData';

export default function LearningReadinessPage({ setActivePage }) {
  const [selectedReadinessId, setSelectedReadinessId] = useState(learningReadinessSummaries[0].id);

  const selectedItem = learningReadinessSummaries.find(r => r.id === selectedReadinessId) || learningReadinessSummaries[0];

  // Prerequisite components sample breakdown for the selected concept
  const mockPrereqDetails = {
    'READ-001': [
      { code: 'OS_MEM_PAGING', title: 'Paging & Address Translation', weight: 'Critical Prerequisite', mastery: 48, threshold: 65, status: 'Unmet Bottleneck' },
      { code: 'OS_MEM_BASE', title: 'Physical Memory Management', weight: 'Standard Prerequisite', mastery: 82, threshold: 65, status: 'Satisfied' },
      { code: 'OS_PROC_STATE', title: 'Process Concept & Virtual Addresses', weight: 'Foundational', mastery: 92, threshold: 65, status: 'Satisfied' },
    ],
    'READ-002': [
      { code: 'OS_PROC_SYNC', title: 'Process Synchronization', weight: 'Critical Prerequisite', mastery: 42, threshold: 65, status: 'Unmet Bottleneck' },
      { code: 'OS_DEADLOCK_CORE', title: 'Deadlock Necessary Conditions', weight: 'Critical Prerequisite', mastery: 58, threshold: 65, status: 'Borderline' },
      { code: 'OS_CPU_SCHED', title: 'CPU Scheduling & States', weight: 'Foundational', mastery: 85, threshold: 65, status: 'Satisfied' },
    ],
    'READ-003': [
      { code: 'OS_IO_BASE', title: 'Secondary Storage Hardware', weight: 'Standard Prerequisite', mastery: 85, threshold: 65, status: 'Satisfied' },
      { code: 'OS_DISK_SCHED', title: 'Disk Scheduling Algorithms', weight: 'Standard Prerequisite', mastery: 78, threshold: 65, status: 'Satisfied' },
    ],
    'READ-004': [
      { code: 'OS_PROC_STATE', title: 'Process Concept & PCB', weight: 'Critical Prerequisite', mastery: 92, threshold: 65, status: 'Satisfied' },
      { code: 'OS_CPU_SCHED', title: 'CPU Scheduling', weight: 'Standard Prerequisite', mastery: 85, threshold: 65, status: 'Satisfied' },
    ],
    'READ-005': [
      { code: 'OS_MEM_VIRTUAL', title: 'Virtual Memory & Demand Paging', weight: 'Direct Prerequisite', mastery: 45, threshold: 65, status: 'Unmet Bottleneck' },
      { code: 'OS_MEM_PAGING', title: 'Paging & Address Translation', weight: 'Transitive Root Prerequisite', mastery: 48, threshold: 65, status: 'Unmet Bottleneck' },
    ],
  };

  const currentPrereqs = mockPrereqDetails[selectedItem.id] || mockPrereqDetails['READ-001'];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-navy-800 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-cyan-400">
            <BrainCircuit className="h-4 w-4" />
            <span>Harmonic Bottleneck Readiness Engine</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight mt-1">
            Learning Readiness Evaluator
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Simulate preparedness for advanced academic concepts. Readiness is constrained by the weakest critical prerequisite: high scores on peripheral topics cannot mask foundational gaps.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs bg-navy-900 border border-navy-800 px-3.5 py-2 rounded-xl text-slate-300">
          <Sparkles className="h-4 w-4 text-cyan-400" />
          <span>Formula: Bottleneck-Constrained Harmonic Index</span>
        </div>
      </div>

      {/* Concept Selector Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        <span className="text-xs text-slate-400 font-medium shrink-0 mr-1">Target Topic:</span>
        {learningReadinessSummaries.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedReadinessId(item.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center space-x-2 ${
              selectedReadinessId === item.id
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950/60 font-semibold'
                : 'bg-navy-900/80 text-slate-400 hover:text-white border border-navy-800'
            }`}
          >
            <span>{item.targetConceptTitle}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              item.status === 'Ready' ? 'bg-emerald-500/20 text-emerald-300' :
              item.status === 'Needs Review' ? 'bg-amber-500/20 text-amber-300' : 'bg-rose-500/20 text-rose-300'
            }`}>
              {Math.round(item.readinessScore * 100)}%
            </span>
          </button>
        ))}
      </div>

      {/* Main Analysis Display */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Readiness Meter & Score Summary (1 Column) */}
        <div className="rounded-2xl border border-navy-750 bg-navy-900/90 p-6 shadow-xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-mono text-indigo-400">{selectedItem.targetConceptCode}</span>
              <h2 className="text-lg font-bold text-white tracking-tight mt-0.5">{selectedItem.targetConceptTitle}</h2>
              <span className="text-xs text-slate-400">{selectedItem.category} • Bloom Level {selectedItem.difficultyLevel}/5</span>
            </div>

            {/* Circular / Radial Score Representation */}
            <div className="py-6 flex flex-col items-center justify-center relative">
              <div className="relative h-44 w-44 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#141e3d"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke={
                      selectedItem.status === 'Ready' ? '#10b981' :
                      selectedItem.status === 'Needs Review' ? '#f59e0b' : '#f43f5e'
                    }
                    strokeWidth="10"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 * (1 - selectedItem.readinessScore)}
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-extrabold text-white">
                    {Math.round(selectedItem.readinessScore * 100)}%
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
                    Readiness Index
                  </span>
                </div>
              </div>

              <div className="mt-4 text-center">
                <Badge variant={selectedItem.status === 'Ready' ? 'ready' : selectedItem.status === 'Needs Review' ? 'review' : 'blocked'} className="text-sm px-3 py-1">
                  Status: {selectedItem.status}
                </Badge>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-navy-950 border border-navy-800 text-xs space-y-1.5">
              <span className="text-slate-400 font-medium block">Diagnostic Assessment:</span>
              <p className="text-slate-300 leading-relaxed">
                {selectedItem.recommendation}
              </p>
            </div>
          </div>

          <button
            onClick={() => setActivePage('gaps')}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md flex items-center justify-center space-x-2 transition"
          >
            <span>Resolve Prerequisite Bottlenecks</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Detailed Prerequisite Breakdown (2 Columns) */}
        <div className="lg:col-span-2 rounded-2xl border border-navy-750 bg-navy-900/80 p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-navy-800 pb-4">
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">Prerequisite Dependency Audit</h3>
              <p className="text-xs text-slate-400">Incoming edges evaluated from student assessment performance</p>
            </div>
            <span className="text-xs text-indigo-400 font-mono font-medium">
              {selectedItem.prerequisiteSatisfaction}
            </span>
          </div>

          {/* Prerequisite Breakdown Table */}
          <div className="space-y-3">
            {currentPrereqs.map((prereq, pIdx) => {
              const isBottleneck = prereq.mastery < prereq.threshold;
              return (
                <div 
                  key={pIdx}
                  className={`p-4 rounded-xl border transition ${
                    isBottleneck 
                      ? 'bg-rose-950/20 border-rose-500/40' 
                      : 'bg-navy-950 border-navy-800'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono text-slate-400">{prereq.code}</span>
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${
                          prereq.weight.includes('Critical') ? 'bg-indigo-950 text-indigo-300 border border-indigo-700/50' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {prereq.weight}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-white mt-1">{prereq.title}</h4>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <span className={`text-sm font-bold ${isBottleneck ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {prereq.mastery}%
                        </span>
                        <span className="block text-[10px] text-slate-400">Threshold: {prereq.threshold}%</span>
                      </div>
                      <span className={`p-1.5 rounded-lg ${isBottleneck ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                        {isBottleneck ? <XCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-navy-900 rounded-full h-1.5 mt-3 overflow-hidden">
                    <div 
                      className={`h-1.5 rounded-full ${isBottleneck ? 'bg-rose-500' : 'bg-emerald-400'}`}
                      style={{ width: `${prereq.mastery}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mathematical Rationale Card */}
          <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 text-xs space-y-2">
            <h4 className="font-bold text-slate-200 flex items-center gap-1.5">
              <HelpCircle className="h-4 w-4 text-indigo-400" />
              Why can't high scores on other topics compensate?
            </h4>
            <p className="text-slate-400 leading-relaxed">
              NEXORA uses a <strong>bottleneck constraint</strong>: an advanced topic's readiness $R_t$ is bounded by the minimum mastery of any critical prerequisite. If a student understands physical memory allocation (82%) but lacks understanding of two-level page translation (48%), they cannot reliably comprehend Demand Paging or Inverted Page Tables.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
