import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavBar from './TopNavBar';
import BottomNavBar from './BottomNavBar';
import VoiceAssistantModal from '../voice/VoiceAssistantModal';
import { useApp } from '../../context/AppContext';

const Layout: React.FC = () => {
  const { setVoiceModalOpen } = useApp();

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      {/* Paper Texture Overlay */}
      <div className="fixed inset-0 paper-texture z-0"></div>

      <Sidebar />
      <TopNavBar />

      {/* Main Content */}
      <main className="pt-24 pb-32 lg:ml-24 px-6 relative z-10 max-w-7xl">
        <Outlet />
      </main>

      {/* Citizen FAB */}
      <button
        onClick={() => setVoiceModalOpen(true)}
        className="fixed bottom-24 right-8 z-50 bg-tertiary-container text-on-tertiary-container px-6 py-4 rounded-full shadow-2xl shadow-tertiary-container/40 flex items-center gap-3 hover:scale-105 active:scale-95 transition-all group border-2 border-white/50 hidden md:flex"
      >
        <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">smart_toy</span>
        <span className="font-bold text-sm">Ask GramAI</span>
      </button>

      <BottomNavBar />
      <VoiceAssistantModal />
    </div>
  );
};

export default Layout;
