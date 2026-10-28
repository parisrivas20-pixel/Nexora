import React, { useState } from 'react';
import { 
  History, 
  FileText, 
  Calendar, 
  ArrowRight, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Download,
  Filter
} from 'lucide-react';
import Badge from '../components/common/Badge';
import { recentAnalysisReports } from '../data/sampleData';

export default function AnalysisHistoryPage({ setActivePage }) {
  const [selectedReport, setSelectedReport] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredReports = recentAnalysisReports.filter(r => 
    filterStatus === 'All' || r.readinessStatus === filterStatus
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-navy-800 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-indigo-400">
            <History className="h-4 w-4" />
            <span>Verifiable Diagnostic Archive</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight mt-1">
            Analysis Report History
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Complete audit trail of AI-synthesized learning readiness reports. Every diagnosis is stored with immutable evidence links to assessment attempts and curriculum graph edges.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs bg-navy-900 border border-navy-800 px-3.5 py-2 rounded-xl text-slate-300">
          <FileText className="h-4 w-4 text-indigo-400" />
          <span>{recentAnalysisReports.length} Historical Reports Available</span>
        </div>
      </div>

      {/* Filter toolbar */}
      <div className="flex items-center space-x-3 bg-navy-900/60 border border-navy-800/80 p-3 rounded-xl text-xs">
        <span className="text-slate-400 font-medium flex items-center gap-1.5">
          <Filter className="h-3.5 w-3.5 text-indigo-400" />
          Status Filter:
        </span>
        {['All', 'Ready', 'Needs Review', 'Blocked'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-3 py-1 rounded-lg transition ${
              filterStatus === status
                ? 'bg-indigo-600 text-white font-medium shadow'
                : 'bg-navy-850 text-slate-400 hover:text-white border border-navy-750'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            className="rounded-2xl border border-navy-750 bg-navy-900/80 p-6 shadow-xl hover:border-indigo-600/40 transition flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-2 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold text-indigo-400">{report.id}</span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-slate-500" />
                  {report.date}
                </span>
                <span className="text-slate-600">•</span>
                <Badge variant={report.readinessStatus === 'Ready' ? 'ready' : report.readinessStatus === 'Needs Review' ? 'review' : 'blocked'}>
                  {report.readinessStatus} ({Math.round(report.readinessScore * 100)}%)
                </Badge>
              </div>

              <h2 className="text-base font-bold text-white tracking-tight">{report.title}</h2>

              <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                {report.explanationText}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-1 text-[11px] text-slate-400">
                <span className="text-slate-300">
                  Target: <strong className="text-white">{report.targetConcept}</strong>
                </span>
                {report.unmasteredPrerequisites.length > 0 && (
                  <span className="text-rose-400">
                    Deficiencies: {report.unmasteredPrerequisites.map(p => p.title).join(', ')}
                  </span>
                )}
              </div>
            </div>

            <div className="shrink-0 flex sm:flex-col gap-2">
              <button
                onClick={() => setSelectedReport(report)}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md flex items-center justify-center space-x-1.5 transition active:scale-95"
              >
                <span>Read Full Report</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Full Explainable Report Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-navy-900 border border-navy-700 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-navy-800 pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-bold text-indigo-400">{selectedReport.id}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs text-slate-400">{selectedReport.date}</span>
                </div>
                <h2 className="text-lg md:text-xl font-extrabold text-white tracking-tight mt-1">
                  {selectedReport.title}
                </h2>
                <p className="text-xs text-slate-400">Target Concept: {selectedReport.targetConcept}</p>
              </div>

              <button
                onClick={() => setSelectedReport(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Readiness Summary Strip */}
            <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 flex items-center justify-between">
              <div>
                <span className="text-slate-400 text-xs">Evaluated Readiness Score</span>
                <p className="text-2xl font-black text-white mt-0.5">
                  {Math.round(selectedReport.readinessScore * 100)}%
                </p>
              </div>
              <Badge variant={selectedReport.readinessStatus === 'Ready' ? 'ready' : selectedReport.readinessStatus === 'Needs Review' ? 'review' : 'blocked'} className="text-sm px-3.5 py-1">
                {selectedReport.readinessStatus}
              </Badge>
            </div>

            {/* Assessment Evidence */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
                <AlertCircle className="h-4 w-4 text-indigo-400" />
                Assessment Evidence Foundation
              </h3>
              <div className="p-4 rounded-xl bg-navy-850 border border-navy-750 text-xs text-slate-200 leading-relaxed">
                {selectedReport.evidenceSummary}
              </div>
            </div>

            {/* Detailed Explanation */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-indigo-400" />
                Explainable Diagnostic Narrative
              </h3>
              <div className="p-4 rounded-xl bg-navy-850 border border-navy-750 text-xs text-slate-300 leading-relaxed space-y-2">
                <p>{selectedReport.explanationText}</p>
                <p className="text-slate-400 italic text-[11px]">
                  Note: This diagnostic narrative is derived directly from prerequisite dependencies in the Operating Systems curriculum DAG and question response outcomes.
                </p>
              </div>
            </div>

            {/* Prerequisite Breakdown */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wide">
                Prerequisite Status Breakdown
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedReport.unmasteredPrerequisites.map((p, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-navy-950 border border-navy-800 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-slate-200">{p.title}</p>
                      <span className="text-[10px] text-slate-400">Benchmark: {Math.round(p.benchmark * 100)}%</span>
                    </div>
                    <Badge variant={p.status === 'Mastered' ? 'ready' : 'blocked'}>
                      {Math.round(p.score * 100)}% ({p.status})
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Remedial Recommendation */}
            <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-700/50 space-y-1.5">
              <h4 className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Prescribed Remedial Action
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed">
                {selectedReport.recommendedNextStep}
              </p>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedReport(null)}
                className="px-5 py-2.5 rounded-xl bg-navy-800 text-slate-300 hover:text-white border border-navy-700 text-xs font-semibold"
              >
                Close Report
              </button>
              <button
                onClick={() => { setSelectedReport(null); setActivePage('assessments'); }}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md"
              >
                Take Prescribed Assessment
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
