import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../i18n/LanguageContext';

const Sidebar: React.FC = () => {
  const { setVoiceModalOpen } = useApp();
  const { t } = useTranslation();

  const links = [
    { icon: 'home', label: t('nav.home'), to: '/' },
    { icon: 'location_city', label: t('nav.myVillage'), to: '/village' },
    { icon: 'description', label: t('nav.applications'), to: '/report' },
    { icon: 'storefront', label: t('nav.markets'), to: '/markets' },
    { icon: 'dashboard', label: t('nav.dashboard'), to: '/admin' },
    { icon: 'report_problem', label: t('nav.grievances'), to: '/report' },
    { icon: 'groups', label: t('nav.community'), to: '/community' },
    { icon: 'settings', label: t('nav.settings'), to: '/settings' },
  ];

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-20 hover:w-64 transition-all duration-300 z-30 bg-white/80 backdrop-blur-xl flex-col shadow-xl shadow-emerald-950/5 group overflow-hidden">
      {/* Logo */}
      <div className="px-6 py-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-container to-inverse-primary flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">
          <span className="material-symbols-outlined text-white text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
        </div>
        <span className="font-headline font-black text-xl text-on-surface whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">GramAI</span>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 flex flex-col gap-1 px-3 mt-4 overflow-y-auto">
        {links.map((link) => (
          <NavLink
            key={link.label}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-4 w-full px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-primary-container to-inverse-primary text-white shadow-md shadow-emerald-500/20'
                  : 'text-on-surface-variant hover:bg-emerald-50'
              }`
            }
          >
            <span className="material-symbols-outlined text-xl shrink-0">{link.icon}</span>
            <span className="text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">{link.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom: Voice + Help */}
      <div className="px-3 pb-6 space-y-1">
        <button
          onClick={() => setVoiceModalOpen(true)}
          className="flex items-center gap-4 w-full px-4 py-3 rounded-xl text-primary hover:bg-emerald-50 transition-all"
        >
          <span className="material-symbols-outlined text-xl shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>mic</span>
          <span className="text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">{t('nav.voiceAssistant')}</span>
        </button>
        <NavLink to="/" className="flex items-center gap-4 w-full px-4 py-3 rounded-xl text-on-surface-variant hover:bg-slate-50 transition-all">
          <span className="material-symbols-outlined text-xl shrink-0">help</span>
          <span className="text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">{t('nav.help')}</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
