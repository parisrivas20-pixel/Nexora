import React from 'react';

export default function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  badgeText, 
  badgeVariant = 'neutral',
  accentColor = 'from-indigo-500/20 to-navy-900/40',
  iconColor = 'text-indigo-400'
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-navy-700/80 bg-gradient-to-b from-navy-850 to-navy-900 p-5 shadow-lg shadow-black/40 hover:border-indigo-600/50 transition-all duration-200">
      <div className={`absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-gradient-to-br ${accentColor} blur-2xl pointer-events-none`} />
      
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-slate-400 tracking-wide uppercase">{title}</p>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold tracking-tight text-white">{value}</span>
            {badgeText && (
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                badgeVariant === 'positive' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                badgeVariant === 'warning' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                badgeVariant === 'danger' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                'bg-slate-800 text-slate-300'
              }`}>
                {badgeText}
              </span>
            )}
          </div>
        </div>

        {Icon && (
          <div className={`p-2.5 rounded-lg bg-navy-800/80 border border-navy-700 ${iconColor} shadow-inner`}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>

      {subtitle && (
        <p className="mt-3 text-xs text-slate-400 border-t border-navy-700/60 pt-2 flex items-center justify-between">
          <span>{subtitle}</span>
        </p>
      )}
    </div>
  );
}
