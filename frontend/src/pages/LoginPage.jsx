import React, { useState } from 'react';
import { 
  Network, 
  LogIn, 
  Mail, 
  Lock, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  Info
} from 'lucide-react';
import { studentProfile } from '../data/sampleData';

export default function LoginPage({ setActivePage }) {
  const [email, setEmail] = useState('alex.mercer@univ.edu');
  const [password, setPassword] = useState('••••••••••••');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Frontend-only state switch for UI preview
    setActivePage('dashboard');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-navy-900/90 border border-navy-750 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 h-48 w-48 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none" />

        {/* Brand header */}
        <div className="text-center space-y-2">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center mx-auto shadow-lg shadow-indigo-600/30">
            <Network className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            NEXORA Student Portal
          </h1>
          <p className="text-xs text-slate-400">
            Knowledge Dependency & Learning Readiness Analysis System
          </p>
        </div>

        {/* Preview Disclaimer Note */}
        <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-700/50 text-[11px] text-indigo-300 flex items-start space-x-2">
          <Info className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
          <span>
            <strong>UI Preview Mode:</strong> Backend authentication and JWT session validation will be integrated in Phase 3. You can click <em>Sign In to Demo Student</em> to enter the dashboard immediately.
          </span>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                University Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-slate-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="student@univ.edu"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Password
                </label>
                <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-[11px] text-indigo-400 hover:text-indigo-300">
                  Forgot credentials?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-500" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center space-x-2 text-slate-400 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded bg-navy-950 border-navy-700 text-indigo-600 focus:ring-0" />
              <span>Remember this workstation</span>
            </label>
          </div>

          <div className="space-y-3 pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold tracking-wide shadow-lg shadow-indigo-950/60 flex items-center justify-center space-x-2 transition active:scale-95"
            >
              <LogIn className="h-4 w-4" />
              <span>Sign In to Demo Student ({studentProfile.name})</span>
            </button>

            <button
              type="button"
              onClick={() => setActivePage('register')}
              className="w-full py-2.5 rounded-xl bg-navy-850 hover:bg-navy-800 text-slate-300 border border-navy-700 text-xs font-semibold flex items-center justify-center space-x-1 transition"
            >
              <span>New student? Register for course</span>
            </button>
          </div>
        </form>

        {/* Security badge footer */}
        <div className="pt-4 border-t border-navy-800/80 text-center flex items-center justify-center space-x-2 text-[11px] text-slate-500">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span>Role-Based Academic Security • Salted Hash Architecture</span>
        </div>
      </div>
    </div>
  );
}
