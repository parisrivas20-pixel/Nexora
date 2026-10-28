import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import SampleDataBanner from './components/common/SampleDataBanner';

// Page components
import DashboardPage from './pages/DashboardPage';
import KnowledgeGraphPage from './pages/KnowledgeGraphPage';
import AssessmentsPage from './pages/AssessmentsPage';
import GapAnalysisPage from './pages/GapAnalysisPage';
import LearningReadinessPage from './pages/LearningReadinessPage';
import AnalysisHistoryPage from './pages/AnalysisHistoryPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sync with URL hash for bookmarking and direct navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validPages = ['dashboard', 'graph', 'assessments', 'gaps', 'readiness', 'history', 'login', 'register'];
      if (validPages.includes(hash)) {
        setActivePage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handlePageChange = (newPage) => {
    setActivePage(newPage);
    window.location.hash = newPage;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActivePage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardPage setActivePage={handlePageChange} />;
      case 'graph':
        return <KnowledgeGraphPage setActivePage={handlePageChange} />;
      case 'assessments':
        return <AssessmentsPage setActivePage={handlePageChange} />;
      case 'gaps':
        return <GapAnalysisPage setActivePage={handlePageChange} />;
      case 'readiness':
        return <LearningReadinessPage setActivePage={handlePageChange} />;
      case 'history':
        return <AnalysisHistoryPage setActivePage={handlePageChange} />;
      case 'login':
        return <LoginPage setActivePage={handlePageChange} />;
      case 'register':
        return <RegisterPage setActivePage={handlePageChange} />;
      default:
        return <DashboardPage setActivePage={handlePageChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30">
      {/* Sample Data Disclaimer Banner */}
      <SampleDataBanner />

      <div className="flex-1 flex">
        {/* Persistent Collapsible Sidebar */}
        <Sidebar
          activePage={activePage}
          setActivePage={handlePageChange}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
          <Navbar
            activePage={activePage}
            setActivePage={handlePageChange}
            onMenuClick={() => setIsSidebarOpen(true)}
          />

          <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl w-full mx-auto">
            {renderActivePage()}
          </main>

          {/* Academic Footer */}
          <footer className="border-t border-navy-800/80 bg-navy-950 py-6 px-6 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-slate-400">NEXORA</span>
              <span>—</span>
              <span>AI-Powered Knowledge Dependency & Learning Readiness Analysis System</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Department of Computer Science & Engineering • College Project
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
