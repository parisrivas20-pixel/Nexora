import React, { useState } from 'react';
import { Info, X, ShieldAlert } from 'lucide-react';

export default function SampleDataBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-indigo-950/80 via-navy-900/90 to-navy-950/80 border-b border-indigo-500/30 px-4 py-2 text-xs text-indigo-200 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
        </span>
        <span className="font-semibold text-indigo-100 flex items-center gap-1.5">
          <ShieldAlert className="h-3.5 w-3.5 text-indigo-400" />
          Development UI Mode:
        </span>
        <span className="text-slate-300">
          All performance metrics, graph nodes, and diagnostic explanations shown are clearly labelled sample data for UI layout development. Not live AI output.
        </span>
      </div>
      <button 
        onClick={() => setDismissed(true)} 
        className="text-slate-400 hover:text-white transition-colors p-1"
        title="Dismiss notice"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
