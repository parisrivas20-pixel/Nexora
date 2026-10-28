import React, { useState } from 'react';
import { 
  Network, 
  Filter, 
  Info, 
  ArrowRight, 
  CheckCircle, 
  AlertCircle, 
  Layers, 
  Sparkles,
  BookOpen,
  ArrowUpRight,
  RefreshCw,
  X
} from 'lucide-react';
import Badge from '../components/common/Badge';
import { knowledgeGraphData } from '../data/sampleData';

export default function KnowledgeGraphPage({ setActivePage }) {
  const [selectedNodeId, setSelectedNodeId] = useState('c7'); // Default to Paging
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const categories = ['All', 'Fundamentals', 'Process Management', 'Memory Management', 'Concurrency', 'Storage'];
  const statuses = ['All', 'Mastered', 'Needs Revision', 'Blocked', 'Ready'];

  // Filter nodes
  const filteredNodes = knowledgeGraphData.nodes.filter(node => {
    const matchCat = categoryFilter === 'All' || node.category === categoryFilter;
    const matchStatus = statusFilter === 'All' || node.level === statusFilter;
    return matchCat && matchStatus;
  });

  const selectedNode = knowledgeGraphData.nodes.find(n => n.id === selectedNodeId) || knowledgeGraphData.nodes[0];

  // Incoming prerequisite edges
  const directPrereqEdges = knowledgeGraphData.edges.filter(e => e.target === selectedNode.id);
  const directPrereqNodes = directPrereqEdges.map(e => ({
    node: knowledgeGraphData.nodes.find(n => n.id === e.source),
    edge: e,
  }));

  // Outgoing dependent edges
  const directDependentEdges = knowledgeGraphData.edges.filter(e => e.source === selectedNode.id);
  const directDependentNodes = directDependentEdges.map(e => ({
    node: knowledgeGraphData.nodes.find(n => n.id === e.target),
    edge: e,
  }));

  const getNodeColor = (level) => {
    switch (level) {
      case 'Mastered': return { bg: '#064e3b', border: '#10b981', text: '#6ee7b7' }; // Emerald
      case 'Needs Revision': return { bg: '#78350f', border: '#f59e0b', text: '#fde68a' }; // Amber
      case 'Blocked': return { bg: '#881337', border: '#f43f5e', text: '#fecdd3' }; // Rose
      case 'Ready': return { bg: '#1e3a8a', border: '#38bdf8', text: '#bae6fd' }; // Cyan
      default: return { bg: '#1e293b', border: '#64748b', text: '#cbd5e1' };
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-navy-800 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-indigo-400">
            <Network className="h-4 w-4" />
            <span>Curriculum Dependency DAG (Directed Acyclic Graph)</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight mt-1">
            Operating Systems Knowledge Graph
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Interactive visualization of academic concept dependencies. Edges indicate prerequisite requirements. Nodes are dynamically colored by your current estimated mastery state.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 bg-navy-900/80 border border-navy-800 px-3.5 py-2 rounded-xl text-xs">
          <div className="flex items-center space-x-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <span className="text-slate-300">Mastered (≥70%)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="text-slate-300">Needs Revision (&lt;65%)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
            <span className="text-slate-300">Blocked Prereq</span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-navy-900/60 border border-navy-800/80 p-3.5 rounded-xl">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium flex items-center gap-1.5 mr-1">
            <Filter className="h-3.5 w-3.5 text-indigo-400" />
            Category:
          </span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                categoryFilter === cat 
                  ? 'bg-indigo-600 text-white font-medium shadow-sm' 
                  : 'bg-navy-850 text-slate-400 hover:text-white border border-navy-750'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-400 font-medium">Status:</span>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-navy-850 border border-navy-700 text-slate-200 text-xs rounded-lg px-2.5 py-1 focus:outline-none focus:border-indigo-500"
          >
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Main Graph Grid: Interactive SVG Canvas + Node Inspector Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* SVG Graph Canvas (2 Columns on large screens) */}
        <div className="lg:col-span-2 rounded-2xl border border-navy-750 bg-navy-950 p-4 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[520px]">
          <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 text-[11px] text-slate-400 bg-navy-900/80 backdrop-blur px-3 py-1.5 rounded-lg border border-navy-800">
            <Info className="h-3.5 w-3.5 text-indigo-400" />
            <span>Click any node to inspect prerequisite dependencies and downstream impact</span>
          </div>

          {/* SVG Canvas Area */}
          <div className="w-full flex-1 overflow-x-auto py-8">
            <svg viewBox="0 0 980 480" className="w-full min-w-[750px] h-full select-none">
              <defs>
                <marker
                  id="arrow"
                  viewBox="0 0 10 10"
                  refX="18"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#475569" />
                </marker>
                <marker
                  id="arrow-active"
                  viewBox="0 0 10 10"
                  refX="18"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#818cf8" />
                </marker>
              </defs>

              {/* Render Directed Edges */}
              {knowledgeGraphData.edges.map((edge, idx) => {
                const sourceNode = knowledgeGraphData.nodes.find(n => n.id === edge.source);
                const targetNode = knowledgeGraphData.nodes.find(n => n.id === edge.target);
                if (!sourceNode || !targetNode) return null;

                const isConnected = selectedNodeId === edge.source || selectedNodeId === edge.target;

                return (
                  <g key={idx}>
                    <line
                      x1={sourceNode.x}
                      y1={sourceNode.y}
                      x2={targetNode.x}
                      y2={targetNode.y}
                      stroke={isConnected ? '#818cf8' : '#334155'}
                      strokeWidth={isConnected ? 2.5 : edge.critical ? 1.5 : 1}
                      strokeDasharray={edge.critical ? '0' : '4,4'}
                      markerEnd={isConnected ? 'url(#arrow-active)' : 'url(#arrow)'}
                      className="transition-all duration-200"
                    />
                  </g>
                );
              })}

              {/* Render Concept Nodes */}
              {knowledgeGraphData.nodes.map((node) => {
                const isSelected = node.id === selectedNodeId;
                const colors = getNodeColor(node.level);
                const isFilteredOut = !filteredNodes.some(fn => fn.id === node.id);

                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    onClick={() => setSelectedNodeId(node.id)}
                    className="cursor-pointer group"
                    opacity={isFilteredOut ? 0.25 : 1}
                  >
                    {/* Node Glow */}
                    {isSelected && (
                      <circle
                        r="32"
                        fill="none"
                        stroke="#6366f1"
                        strokeWidth="2"
                        className="animate-pulse"
                      />
                    )}

                    {/* Node Outer Circle */}
                    <circle
                      r="22"
                      fill={colors.bg}
                      stroke={isSelected ? '#ffffff' : colors.border}
                      strokeWidth={isSelected ? 3 : 2}
                      className="transition-all duration-150 group-hover:scale-110"
                    />

                    {/* Mastery text in circle */}
                    <text
                      textAnchor="middle"
                      dy="4"
                      fontSize="10"
                      fontWeight="bold"
                      fill="#ffffff"
                      pointerEvents="none"
                    >
                      {node.mastery}%
                    </text>

                    {/* Node Label Below */}
                    <text
                      textAnchor="middle"
                      dy="38"
                      fontSize="10"
                      fontWeight="600"
                      fill={isSelected ? '#ffffff' : '#cbd5e1'}
                      className="transition-colors group-hover:fill-indigo-300"
                      pointerEvents="none"
                    >
                      {node.title.length > 20 ? `${node.title.slice(0, 18)}...` : node.title}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="border-t border-navy-800/80 pt-3 flex items-center justify-between text-[11px] text-slate-400">
            <span>Showing {filteredNodes.length} of {knowledgeGraphData.nodes.length} concepts</span>
            <span>NetworkX DAG Traversal Engine Active</span>
          </div>
        </div>

        {/* Node Inspector Drawer (1 Column) */}
        <div className="rounded-2xl border border-navy-750 bg-navy-900/90 p-5 shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-navy-800">
              <div>
                <span className="text-[10px] font-mono text-indigo-400 font-semibold">{selectedNode.code}</span>
                <h2 className="text-base font-bold text-white tracking-tight mt-0.5">{selectedNode.title}</h2>
                <span className="text-xs text-slate-400">{selectedNode.category}</span>
              </div>
              <Badge variant={selectedNode.level === 'Mastered' ? 'mastered' : selectedNode.level === 'Needs Revision' ? 'revision' : 'blocked'}>
                {selectedNode.level}
              </Badge>
            </div>

            {/* Mastery Meter */}
            <div className="p-3.5 rounded-xl bg-navy-850 border border-navy-750 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-medium">Estimated Mastery</span>
                <span className="font-bold text-white">{selectedNode.mastery}%</span>
              </div>
              <div className="w-full bg-navy-950 rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-2 rounded-full ${
                    selectedNode.mastery >= 70 ? 'bg-emerald-400' :
                    selectedNode.mastery >= 60 ? 'bg-amber-400' : 'bg-rose-500'
                  }`}
                  style={{ width: `${selectedNode.mastery}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>Bloom Difficulty: Level {selectedNode.difficulty}/5</span>
                <span>Threshold: 65%</span>
              </div>
            </div>

            {/* Direct Prerequisites (Incoming) */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wide flex items-center justify-between">
                <span>Prerequisites ({directPrereqNodes.length})</span>
                <span className="text-[10px] text-slate-500 font-normal">Incoming Edges</span>
              </h3>

              {directPrereqNodes.length === 0 ? (
                <p className="text-xs text-slate-500 italic p-2 bg-navy-850/50 rounded-lg">
                  Foundational entry concept with no upstream prerequisites.
                </p>
              ) : (
                <div className="space-y-1.5 max-h-36 overflow-y-auto">
                  {directPrereqNodes.map(({ node, edge }, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setSelectedNodeId(node.id)}
                      className="p-2.5 rounded-lg bg-navy-850 hover:bg-navy-800 border border-navy-750 flex items-center justify-between cursor-pointer transition text-xs"
                    >
                      <div>
                        <p className="font-medium text-slate-200">{node.title}</p>
                        <span className="text-[10px] text-slate-400">{edge.critical ? 'Critical Prerequisite' : 'Recommended'}</span>
                      </div>
                      <Badge variant={node.level === 'Mastered' ? 'mastered' : 'revision'}>
                        {node.mastery}%
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Direct Downstream Dependents (Outgoing) */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wide flex items-center justify-between">
                <span>Downstream Dependents ({directDependentNodes.length})</span>
                <span className="text-[10px] text-slate-500 font-normal">Impact Radius</span>
              </h3>

              {directDependentNodes.length === 0 ? (
                <p className="text-xs text-slate-500 italic p-2 bg-navy-850/50 rounded-lg">
                  Terminal advanced concept in current curriculum scope.
                </p>
              ) : (
                <div className="space-y-1.5 max-h-36 overflow-y-auto">
                  {directDependentNodes.map(({ node }, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setSelectedNodeId(node.id)}
                      className="p-2.5 rounded-lg bg-navy-850 hover:bg-navy-800 border border-navy-750 flex items-center justify-between cursor-pointer transition text-xs"
                    >
                      <p className="font-medium text-slate-200">{node.title}</p>
                      <Badge variant={node.level === 'Mastered' ? 'ready' : 'blocked'}>
                        {node.level}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-3 border-t border-navy-800 space-y-2">
            <button
              onClick={() => setActivePage('readiness')}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-950/50 flex items-center justify-center space-x-2 transition"
            >
              <span>Evaluate Readiness for this Concept</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setActivePage('assessments')}
              className="w-full py-2 rounded-xl bg-navy-800 hover:bg-navy-750 text-slate-300 border border-navy-700 text-xs font-medium transition"
            >
              Take Assessment for {selectedNode.code}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
