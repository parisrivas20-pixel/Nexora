import React from 'react';
import { 
  LayoutDashboard, 
  Network, 
  FileCheck2, 
  AlertTriangle, 
  BrainCircuit, 
  History, 
  LogIn, 
  UserPlus, 
  GraduationCap,
  Sparkles,
  ChevronRight,
  X
} from 'lucide-react';
import { studentProfile } from '../../data/sampleData';

export default function Sidebar({ activePage, setActivePage, isOpen, setIsOpen }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'graph', label: 'Knowledge Graph', icon: Network, badge: 'Interactive' },
    { id: 'assessments', label: 'Assessments', icon: FileCheck2, badge: '8 Quizzes' },
    { id: 'gaps', label: 'Gap Analysis', icon: AlertTriangle, badge: '3 Gaps' },
    { id: 'readiness', label: 'Learning Readiness', icon: BrainCircuit, badge: 'Evaluator' },
    { id: 'history', label: 'Analysis History', icon: History, badge: null },
  ];

  const authItems = [
    { id: 'login', label: 'Login (Preview)', icon: LogIn },
    { id: 'register', label: 'Registration (Preview)', icon: UserPlus },
  ];

  const handleSelect = (pageId) => {
    setActivePage(pageId);
    if (setIsOpen) setIsOpen(false);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-navy-950 border-r border-navy-800/80 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Brand Header */}
        <div className="h-16 border-b border-navy-800/80 px-5 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleSelect('dashboard')}>
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-600/30">
              <Network className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                NEXORA
              </span>
              <span className="block text-[10px] text-slate-400 font-medium -mt-0.5 tracking-wider">
                OS LEARNING DIAGNOSTICS
              </span>
            </div>
          </div>

          {setIsOpen && (
            <button 
              className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Current Course Badge */}
        <div className="px-4 py-3 border-b border-navy-800/60 bg-navy-900/40">
          <div className="flex items-center space-x-2 text-xs text-indigo-300">
            <GraduationCap className="h-4 w-4 text-indigo-400 shrink-0" />
            <span className="font-medium truncate">{studentProfile.course}</span>
          </div>
          <span className="text-[10px] text-slate-400 block mt-0.5 ml-6">
            Curriculum Dependency DAG
          </span>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            Diagnostic Modules
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-950/60'
                    : 'text-slate-300 hover:bg-navy-850 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`h-4 w-4 transition-colors ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'
                  }`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                    isActive 
                      ? 'bg-indigo-900 text-indigo-200' 
                      : 'bg-navy-800 text-slate-300 border border-navy-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-6 px-3 pb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            Access & Account
          </div>

          {authItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-navy-800 text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-400 hover:bg-navy-850 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="h-3 w-3 text-slate-600" />
              </button>
            );
          })}
        </nav>

        {/* User Profile Footer Card */}
        <div className="p-3 border-t border-navy-800/80 bg-navy-900/60">
          <div className="p-2.5 rounded-xl bg-navy-850 border border-navy-700/80 flex items-center justify-between">
            <div className="flex items-center space-x-2.5 min-w-0">
              <div className="h-8 w-8 rounded-lg bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 font-bold text-xs flex items-center justify-center shrink-0">
                AM
              </div>
              <div className="truncate">
                <p className="text-xs font-semibold text-white truncate">{studentProfile.name}</p>
                <p className="text-[10px] text-slate-400 truncate">{studentProfile.studentId}</p>
              </div>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-medium">
              Active
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
