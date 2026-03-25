import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from '../../i18n/LanguageContext';

const BottomNavBar: React.FC = () => {
  const { t } = useTranslation();

  const items = [
    { icon: 'home', label: t('nav.home'), to: '/' },
    { icon: 'dashboard', label: t('nav.dashboard'), to: '/admin' },
    { icon: 'report_problem', label: t('nav.services'), to: '/report' },
    { icon: 'groups', label: t('nav.community'), to: '/' },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-xl border-t border-slate-100/50 shadow-[0_-4px_30px_rgba(0,0,0,0.03)]">
      <div className="flex justify-around items-center py-2">
        {items.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-4 py-2 rounded-2xl transition-all ${
                isActive ? 'text-primary' : 'text-on-surface-variant'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-primary-container/20' : ''}`}>
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
                    {item.icon}
                  </span>
                </div>
                <span className="text-[10px] font-bold">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavBar;
