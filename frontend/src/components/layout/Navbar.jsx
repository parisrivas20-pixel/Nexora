import React from 'react';
import { Menu, Search, Bell, Sparkles, User, RefreshCw } from 'lucide-react';
import { studentProfile } from '../../data/sampleData';

export default function Navbar({ activePage, setActivePage, onMenuClick }) {
  const getPageTitle = (page) => {
    switch (page) {
      case 'dashboard': return 'Student Academic Dashboard';
      case 'graph': return 'Knowledge Dependency Graph';
      case 'assessments': return 'Topic-Wise Diagnostic Assessments';
      case 'gaps': return 'Foundational Prerequisite Gap Analysis';
      case 'readiness': return 'Learning Readiness Evaluator';
      case 'history': return 'Explainable Analysis History';
      case 'login': return 'Student Portal Sign In';
      case 'register': return 'Student Registration';
      default: return 'Diagnostic Console';
    }
  };

  return (
    <header className="h-16 border-b border-navy-800/80 bg-navy-950/80 backdrop-blur-md sticky top-0 z-30 px-6 flex items-center justify-between">
      {/* Left side: Hamburger & Title */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <div className="flex items-center space-x-2 text-[11px] text-slate-400">
            <span>Operating Systems</span>
            <span>/</span>
            <span className="text-indigo-400 font-medium capitalize">{activePage}</span>
          </div>
          <h1 className="text-sm md:text-base font-semibold text-white tracking-tight">
            {getPageTitle(activePage)}
          </h1>
        </div>
      </div>

      {/* Right side: Quick stats, Demo Pill, and User */}
      <div className="flex items-center space-x-3">
        {/* Academic term tag */}
        <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-navy-850 border border-navy-700/80 text-xs text-slate-300">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
          <span>Fall 2026 Semester</span>
        </div>

        {/* Demo Indicator */}
        <span className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-indigo-950/70 border border-indigo-700/60 text-indigo-300 hidden md:inline-flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-indigo-400" />
          <span>UI Preview</span>
        </span>

        {/* Action to switch to Quick Readiness or Assessment */}
        {activePage !== 'readiness' && (
          <button
            onClick={() => setActivePage('readiness')}
            className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-950/50 transition-all active:scale-95"
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-200" />
            <span>Check Readiness</span>
          </button>
        )}

        {/* Quick Profile avatar / toggle to login */}
        <button
          onClick={() => setActivePage(activePage === 'login' ? 'dashboard' : 'login')}
          className="h-9 w-9 rounded-lg bg-navy-850 hover:bg-navy-800 border border-navy-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
          title={activePage === 'login' ? 'Return to Dashboard' : 'Open Login Page'}
        >
          <User className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
