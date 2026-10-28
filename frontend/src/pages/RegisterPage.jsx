import React, { useState } from 'react';
import { 
  Network, 
  UserPlus, 
  Mail, 
  Lock, 
  User, 
  GraduationCap, 
  Hash, 
  ShieldCheck, 
  ArrowRight,
  Info
} from 'lucide-react';

export default function RegisterPage({ setActivePage }) {
  const [formData, setFormData] = useState({
    fullName: 'Alex Mercer',
    email: 'alex.mercer@univ.edu',
    studentId: 'CS-2024-8841',
    course: 'Operating Systems (CS-301)',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setActivePage('dashboard');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 bg-navy-900/90 border border-navy-750 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 h-48 w-48 rounded-full bg-cyan-600/15 blur-3xl pointer-events-none" />

        {/* Brand header */}
        <div className="text-center space-y-2">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center mx-auto shadow-lg shadow-cyan-600/30">
            <UserPlus className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Create Student Profile
          </h1>
          <p className="text-xs text-slate-400">
            Enroll in NEXORA's Operating Systems Knowledge Graph System
          </p>
        </div>

        {/* Preview Note */}
        <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-700/50 text-[11px] text-cyan-300 flex items-start space-x-2">
          <Info className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
          <span>
            <strong>UI Preview Mode:</strong> Form fields represent the exact Pydantic schema required for user registration in Phase 3. Submitting will open the student dashboard with sample data.
          </span>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-slate-500" />
                </div>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Student ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Hash className="h-4 w-4 text-slate-500" />
                </div>
                <input
                  type="text"
                  required
                  value={formData.studentId}
                  onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              University Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-slate-500" />
              </div>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Enrolled Course
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <GraduationCap className="h-4 w-4 text-slate-500" />
              </div>
              <select
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="Operating Systems (CS-301)">Operating Systems (CS-301)</option>
                <option value="Computer Networks (CS-302)">Computer Networks (CS-302 - Upcoming)</option>
                <option value="Database Systems (CS-303)">Database Systems (CS-303 - Upcoming)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-500" />
                </div>
                <input
                  type="password"
                  placeholder="Min 8 characters"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-500" />
                </div>
                <input
                  type="password"
                  placeholder="Repeat password"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="pt-3 space-y-3">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-bold tracking-wide shadow-lg shadow-indigo-950/60 flex items-center justify-center space-x-2 transition active:scale-95"
            >
              <UserPlus className="h-4 w-4" />
              <span>Complete Registration & Open Dashboard</span>
            </button>

            <button
              type="button"
              onClick={() => setActivePage('login')}
              className="w-full py-2.5 rounded-xl bg-navy-850 hover:bg-navy-800 text-slate-300 border border-navy-700 text-xs font-semibold flex items-center justify-center space-x-1 transition"
            >
              <span>Already registered? Sign in</span>
            </button>
          </div>
        </form>

        <div className="pt-4 border-t border-navy-800/80 text-center flex items-center justify-center space-x-2 text-[11px] text-slate-500">
          <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
          <span>Academic Privacy Compliant • Student Consent Protected</span>
        </div>
      </div>
    </div>
  );
}
