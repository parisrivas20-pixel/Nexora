import React from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  BrainCircuit, 
  TrendingUp, 
  ArrowRight, 
  FileText, 
  Activity,
  Layers,
  ChevronRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import StatCard from '../components/common/StatCard';
import Badge from '../components/common/Badge';
import { 
  studentProfile, 
  systemStats, 
  recentQuizPerformance, 
  conceptsRequiringRevision, 
  learningReadinessSummaries, 
  recentAnalysisReports 
} from '../data/sampleData';

export default function DashboardPage({ setActivePage }) {
  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-indigo-500/20 bg-gradient-to-r from-navy-900 via-navy-850 to-indigo-950 p-6 md:p-8 shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <Zap className="h-3.5 w-3.5 text-indigo-400" />
              <span>Operating Systems Curriculum Analysis</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {studentProfile.name}
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Your overall curriculum progress is evaluated against <strong className="text-white">{systemStats.totalConceptsInCurriculum} core OS concepts</strong>. NEXORA has detected <span className="text-rose-400 font-semibold">{systemStats.conceptsRequiringRevision} foundational prerequisite gaps</span> that currently constrain your readiness for advanced topics like Virtual Memory and Deadlocks.
            </p>
          </div>

          <div className="flex flex-row md:flex-col gap-3 shrink-0">
            <button
              onClick={() => setActivePage('graph')}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950/60 flex items-center justify-center space-x-2 transition-all active:scale-95"
            >
              <span>Explore Knowledge Graph</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setActivePage('gaps')}
              className="px-4 py-2.5 rounded-xl bg-navy-800 hover:bg-navy-750 text-slate-200 border border-navy-700 text-xs font-semibold flex items-center justify-center space-x-2 transition-all"
            >
              <span>Review 3 Prerequisite Gaps</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stat Cards Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Concepts Studied"
          value={`${systemStats.conceptsStudied} / ${systemStats.totalConceptsInCurriculum}`}
          subtitle={`${systemStats.conceptsMastered} Mastered • ${systemStats.conceptsInProgress} In Progress`}
          icon={BookOpen}
          badgeText="75% Coverage"
          badgeVariant="positive"
          accentColor="from-cyan-500/20 to-navy-900/40"
          iconColor="text-cyan-400"
        />

        <StatCard
          title="Recent Quiz Performance"
          value={`${systemStats.averageQuizScore}%`}
          subtitle={`Across ${systemStats.totalQuizzesAttempted} diagnostic attempts`}
          icon={Activity}
          badgeText="Average Score"
          badgeVariant="neutral"
          accentColor="from-indigo-500/20 to-navy-900/40"
          iconColor="text-indigo-400"
        />

        <StatCard
          title="Concepts Requiring Revision"
          value={systemStats.conceptsRequiringRevision}
          subtitle="Foundational prerequisite bottlenecks"
          icon={AlertTriangle}
          badgeText="Action Required"
          badgeVariant="danger"
          accentColor="from-rose-500/20 to-navy-900/40"
          iconColor="text-rose-400"
        />

        <StatCard
          title="Curriculum Learning Readiness"
          value={`${systemStats.averageReadinessScore}%`}
          subtitle="Harmonic prerequisite fulfillment"
          icon={BrainCircuit}
          badgeText="Composite Index"
          badgeVariant="warning"
          accentColor="from-amber-500/20 to-navy-900/40"
          iconColor="text-amber-400"
        />
      </section>

      {/* Two Column Section: Concepts Requiring Revision & Learning Readiness Summaries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 1. Concepts Requiring Revision */}
        <section className="rounded-2xl border border-navy-700/80 bg-navy-900/60 p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-navy-800">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white tracking-tight">Concepts Requiring Revision</h2>
                  <p className="text-xs text-slate-400">Prerequisite bottlenecks blocking downstream comprehension</p>
                </div>
              </div>
              <button 
                onClick={() => setActivePage('gaps')}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center space-x-1"
              >
                <span>View Full Matrix</span>
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {conceptsRequiringRevision.map((concept) => (
                <div 
                  key={concept.id}
                  className="p-4 rounded-xl bg-navy-850/80 border border-navy-750 hover:border-navy-650 transition space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono font-semibold text-slate-400">{concept.code}</span>
                        <Badge variant="review">{concept.category}</Badge>
                      </div>
                      <h3 className="text-sm font-semibold text-white mt-1">{concept.title}</h3>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-rose-400">
                        {Math.round(concept.masteryScore * 100)}% Mastery
                      </span>
                      <span className="block text-[10px] text-slate-400">Benchmark: 65%</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed bg-navy-900/60 p-2.5 rounded-lg border border-navy-800">
                    <strong className="text-slate-300">Evidence Root Cause:</strong> {concept.primaryGapReason}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px]">
                    <span className="text-rose-300/90 font-medium flex items-center gap-1">
                      <Layers className="h-3.5 w-3.5 text-rose-400" />
                      Blocks {concept.downstreamBlockedCount} advanced topics: {concept.blockedTopics.slice(0, 2).join(', ')}...
                    </span>
                    <button
                      onClick={() => setActivePage('assessments')}
                      className="text-indigo-400 hover:text-indigo-300 font-medium underline-offset-2 hover:underline"
                    >
                      Take Remedial Quiz →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. Learning Readiness Summaries */}
        <section className="rounded-2xl border border-navy-700/80 bg-navy-900/60 p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-navy-800">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <BrainCircuit className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white tracking-tight">Learning Readiness Summaries</h2>
                  <p className="text-xs text-slate-400">Readiness calculated from direct prerequisite satisfaction</p>
                </div>
              </div>
              <button 
                onClick={() => setActivePage('readiness')}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center space-x-1"
              >
                <span>Readiness Simulator</span>
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {learningReadinessSummaries.slice(0, 4).map((item) => (
                <div 
                  key={item.id}
                  className="p-3.5 rounded-xl bg-navy-850/80 border border-navy-750 hover:border-navy-650 transition space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400">{item.targetConceptCode}</span>
                      <h3 className="text-sm font-medium text-white">{item.targetConceptTitle}</h3>
                    </div>
                    <Badge variant={item.status === 'Ready' ? 'ready' : item.status === 'Needs Review' ? 'review' : 'blocked'}>
                      {item.status} ({Math.round(item.readinessScore * 100)}%)
                    </Badge>
                  </div>

                  <div className="w-full bg-navy-950 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className={`h-1.5 rounded-full ${
                        item.status === 'Ready' ? 'bg-emerald-400' :
                        item.status === 'Needs Review' ? 'bg-amber-400' : 'bg-rose-500'
                      }`}
                      style={{ width: `${item.readinessScore * 100}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
                    <span>{item.prerequisiteSatisfaction}</span>
                    <span className="text-slate-300 font-medium truncate max-w-[200px]">
                      {item.blockingPrerequisite !== 'None' ? `Bottleneck: ${item.blockingPrerequisite}` : 'All prerequisites met'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Two Column Section: Recent Quiz Performance & Recent Analysis Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* 3. Recent Quiz Performance */}
        <section className="rounded-2xl border border-navy-700/80 bg-navy-900/60 p-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-navy-800">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <Activity className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white tracking-tight">Recent Quiz Performance</h2>
                <p className="text-xs text-slate-400">Empirical assessment attempts and scores</p>
              </div>
            </div>
            <button 
              onClick={() => setActivePage('assessments')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center space-x-1"
            >
              <span>All Quizzes</span>
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-navy-800 text-slate-400 text-[11px]">
                  <th className="pb-2.5 font-medium">Quiz Title</th>
                  <th className="pb-2.5 font-medium">Date</th>
                  <th className="pb-2.5 font-medium">Score</th>
                  <th className="pb-2.5 font-medium">Outcome</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-800/60">
                {recentQuizPerformance.slice(0, 5).map((q) => (
                  <tr key={q.id} className="hover:bg-navy-850/50 transition">
                    <td className="py-3 pr-2">
                      <p className="font-medium text-slate-200">{q.title}</p>
                      <span className="text-[10px] text-slate-400">{q.category}</span>
                    </td>
                    <td className="py-3 text-slate-400 text-[11px] whitespace-nowrap">{q.date}</td>
                    <td className="py-3 font-semibold text-white whitespace-nowrap">
                      {q.percentage}% <span className="text-[10px] text-slate-400 font-normal">({q.score}/{q.maxScore})</span>
                    </td>
                    <td className="py-3">
                      <Badge variant={q.status === 'Mastered' ? 'mastered' : q.status === 'Needs Revision' ? 'revision' : 'review'}>
                        {q.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. Recent Analysis Reports */}
        <section className="rounded-2xl border border-navy-700/80 bg-navy-900/60 p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-navy-800">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white tracking-tight">Recent Analysis Reports</h2>
                  <p className="text-xs text-slate-400">Evidence-grounded diagnostic logs</p>
                </div>
              </div>
              <button 
                onClick={() => setActivePage('history')}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center space-x-1"
              >
                <span>Full History</span>
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {recentAnalysisReports.map((report) => (
                <div 
                  key={report.id}
                  className="p-4 rounded-xl bg-navy-850/80 border border-navy-750 hover:border-indigo-600/40 transition space-y-2 cursor-pointer"
                  onClick={() => setActivePage('history')}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400">{report.id} • {report.date}</span>
                    <Badge variant={report.readinessStatus === 'Ready' ? 'ready' : report.readinessStatus === 'Needs Review' ? 'review' : 'blocked'}>
                      {report.readinessStatus} ({Math.round(report.readinessScore * 100)}%)
                    </Badge>
                  </div>

                  <h3 className="text-xs font-semibold text-white">{report.title}</h3>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {report.explanationText}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
