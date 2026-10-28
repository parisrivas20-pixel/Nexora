import React, { useState } from 'react';
import { 
  AlertTriangle, 
  GitFork, 
  Layers, 
  ArrowRight, 
  CheckCircle, 
  AlertCircle, 
  BookOpen, 
  HelpCircle,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import Badge from '../components/common/Badge';
import { gapAnalysisMatrix } from '../data/sampleData';

export default function GapAnalysisPage({ setActivePage }) {
  const [selectedGapId, setSelectedGapId] = useState('GAP-01');

  const selectedGap = gapAnalysisMatrix.find(g => g.id === selectedGapId) || gapAnalysisMatrix[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-navy-800 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-rose-400">
            <AlertTriangle className="h-4 w-4" />
            <span>Root-Cause Prerequisite Diagnostic Tracing</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight mt-1">
            Foundational Knowledge Gap Analysis
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            NEXORA isolates unmastered prerequisite concepts using ancestor DAG traversal. Resolving these root bottlenecks unlocks downstream comprehension in advanced Operating Systems topics.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-navy-900 border border-navy-800 px-4 py-2 rounded-xl text-xs">
          <div className="text-center border-r border-navy-800 pr-3">
            <span className="block font-bold text-rose-400 text-base">{gapAnalysisMatrix.length}</span>
            <span className="text-[10px] text-slate-400">Active Bottlenecks</span>
          </div>
          <div className="text-center pl-1">
            <span className="block font-bold text-amber-400 text-base">9 Topics</span>
            <span className="text-[10px] text-slate-400">Downstream Blocked</span>
          </div>
        </div>
      </div>

      {/* Main Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column: Gap List Selector */}
        <div className="space-y-3">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
            Identified Knowledge Gaps
          </h2>

          {gapAnalysisMatrix.map((gap) => {
            const isSelected = gap.id === selectedGapId;
            return (
              <div
                key={gap.id}
                onClick={() => setSelectedGapId(gap.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-navy-850 border-rose-500/60 shadow-lg shadow-rose-950/20'
                    : 'bg-navy-900/60 border-navy-800 hover:border-navy-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400">{gap.rootConceptCode}</span>
                    <h3 className="text-sm font-bold text-white mt-0.5">{gap.rootConceptTitle}</h3>
                    <span className="text-[11px] text-slate-400">{gap.category}</span>
                  </div>
                  <Badge variant="blocked">
                    {gap.gapDelta}% Delta
                  </Badge>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-navy-800/80">
                  <span className="text-slate-400">Current: <strong className="text-rose-400">{gap.studentMastery}%</strong></span>
                  <span className="text-slate-400">Benchmark: 65%</span>
                </div>

                <div className="mt-2 text-[11px] text-rose-300/80 flex items-center gap-1 font-medium">
                  <Layers className="h-3 w-3 text-rose-400 shrink-0" />
                  <span>Blocks {gap.impactedCount} downstream curriculum topics</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Deep Diagnostic Inspector (2 Columns) */}
        <div className="lg:col-span-2 rounded-2xl border border-navy-750 bg-navy-900/80 p-6 shadow-xl space-y-6">
          
          {/* Header of Inspector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy-800 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-semibold text-rose-400">{selectedGap.id}</span>
                <span className="text-slate-600">•</span>
                <Badge variant="review">{selectedGap.category}</Badge>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-rose-400 font-semibold">{selectedGap.status}</span>
              </div>
              <h2 className="text-xl font-extrabold text-white tracking-tight mt-1">
                {selectedGap.rootConceptTitle}
              </h2>
            </div>

            <button
              onClick={() => setActivePage('assessments')}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shrink-0 shadow-md transition"
            >
              Take Remedial Quiz
            </button>
          </div>

          {/* Metric Comparison Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 space-y-1">
              <span className="text-slate-400 text-xs">Estimated Mastery</span>
              <p className="text-2xl font-bold text-rose-400">{selectedGap.studentMastery}%</p>
              <span className="text-[10px] text-slate-500">From recent assessments</span>
            </div>

            <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 space-y-1">
              <span className="text-slate-400 text-xs">Curriculum Benchmark</span>
              <p className="text-2xl font-bold text-white">{selectedGap.threshold}%</p>
              <span className="text-[10px] text-slate-500">Prerequisite threshold</span>
            </div>

            <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 space-y-1">
              <span className="text-slate-400 text-xs">Deficiency Margin</span>
              <p className="text-2xl font-bold text-amber-400">{selectedGap.gapDelta}%</p>
              <span className="text-[10px] text-slate-500">Below mastery baseline</span>
            </div>
          </div>

          {/* Assessment Evidence Box */}
          <div className="p-4 rounded-xl bg-navy-850 border border-navy-750 space-y-2">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
              <AlertCircle className="h-4 w-4 text-rose-400" />
              Empirical Assessment Evidence
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed bg-navy-900/80 p-3 rounded-lg border border-navy-800">
              {selectedGap.evidenceDescription}
            </p>
          </div>

          {/* Downstream Blast Radius / Impact Chain */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
                <GitFork className="h-4 w-4 text-indigo-400" />
                Downstream Impacted Topics (Blast Radius)
              </h3>
              <span className="text-[11px] text-slate-400 font-medium">
                {selectedGap.impactedChain.length} blocked topics
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedGap.impactedChain.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-xl bg-navy-950 border border-navy-800 flex items-center justify-between"
                >
                  <div>
                    <span className="text-[10px] font-mono text-slate-400">{item.code}</span>
                    <h4 className="text-xs font-semibold text-white mt-0.5">{item.title}</h4>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    item.impactLevel === 'Directly Blocked' 
                      ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30' 
                      : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                  }`}>
                    {item.impactLevel}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Actionable Remediation Guidance */}
          <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-700/40 space-y-2">
            <h4 className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-indigo-400" />
              Recommended Remedial Learning Path
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Prioritize reviewing the foundational theory for <strong>{selectedGap.rootConceptTitle}</strong>. Resolving this single bottleneck will elevate your readiness across {selectedGap.impactedCount} advanced Operating Systems concepts simultaneously.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
