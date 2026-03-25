import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from '../../i18n/LanguageContext';
import { type Language } from '../../i18n/translations';

const TopNavBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, language, setLanguage, languageNames } = useTranslation();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const isAdmin = location.pathname === '/admin';

  const navLinks = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.services'), path: '/report' },
    { label: t('nav.dashboard'), path: '/admin' },
  ];

  return (
    <header className="flex items-center justify-between py-6 px-2 lg:pl-24 fixed top-0 left-0 right-0 z-40 bg-surface/80 backdrop-blur-xl">
      <div>
        {isAdmin ? (
          <p className="text-primary font-bold tracking-widest uppercase text-xs">{t('admin.controlCenter')}</p>
        ) : (
          <>
            <h1 className="text-2xl font-headline font-extrabold text-on-surface">{t('home.greeting')}</h1>
            <p className="text-outline text-sm">{t('home.subtitle')}</p>
          </>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Nav links (desktop) */}
        <nav className="hidden md:flex items-center gap-1 bg-surface-container-highest rounded-full p-1">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                location.pathname === link.path
                  ? 'bg-primary-container text-white shadow-md'
                  : 'text-on-surface-variant hover:bg-white/50'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Language Picker */}
        <div className="relative">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center gap-1.5 px-3 py-2 bg-surface-container-highest rounded-full text-sm font-bold text-on-surface-variant hover:bg-white transition-all"
          >
            <span className="material-symbols-outlined text-lg">translate</span>
            <span className="hidden sm:inline">{languageNames[language]}</span>
          </button>

          {showLangMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowLangMenu(false)} />
              <div className="absolute right-0 top-12 z-50 bg-white rounded-xl shadow-2xl border border-slate-100/50 overflow-hidden min-w-[160px]">
                {(Object.keys(languageNames) as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => { setLanguage(lang); setShowLangMenu(false); }}
                    className={`w-full px-4 py-3 text-left text-sm font-medium hover:bg-emerald-50 transition-all flex items-center justify-between ${
                      language === lang ? 'bg-emerald-50 text-primary font-bold' : 'text-on-surface'
                    }`}
                  >
                    {languageNames[lang]}
                    {language === lang && <span className="material-symbols-outlined text-primary text-sm">check</span>}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Search (admin only) */}
        {isAdmin && (
          <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-surface-container-highest rounded-full">
            <span className="material-symbols-outlined text-lg text-outline">search</span>
            <input className="bg-transparent outline-none text-sm w-48" placeholder={t('common.searchData')} />
          </div>
        )}
      </div>
    </header>
  );
};

export default TopNavBar;
