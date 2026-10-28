import React from 'react';

export default function Badge({ variant = 'neutral', children, className = '' }) {
  const variants = {
    // Readiness states
    ready: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    review: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    blocked: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    
    // Mastery states
    mastered: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    inprogress: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
    revision: 'bg-orange-500/15 text-orange-300 border-orange-500/30',

    // Generic
    neutral: 'bg-slate-800 text-slate-300 border-slate-700',
    primary: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
  };

  const styleClass = variants[variant.toLowerCase()] || variants.neutral;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styleClass} ${className}`}>
      {children}
    </span>
  );
}
