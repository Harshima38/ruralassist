import React from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { type Language } from '../i18n/translations';
import GlassCard from '../components/shared/GlassCard';
import { useToast } from '../components/shared/Toast';
import { motion } from 'framer-motion';

const SettingsPage: React.FC = () => {
  const { t, language, setLanguage, languageNames } = useTranslation();
  const { toast } = useToast();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="mb-8">
        <h1 className="text-3xl font-black font-headline text-on-surface tracking-tight">{t('nav.settings')}</h1>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Language */}
        <GlassCard className="p-6">
          <h2 className="text-lg font-bold font-headline text-on-surface mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">translate</span>
            {t('common.language')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {(Object.keys(languageNames) as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => { setLanguage(lang); toast(`Language changed to ${languageNames[lang]}`, 'success'); }}
                className={`py-4 rounded-xl text-center font-bold transition-all ${
                  language === lang
                    ? 'bg-gradient-to-br from-primary-container to-inverse-primary text-white shadow-lg shadow-emerald-500/20'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-emerald-50'
                }`}
              >
                {languageNames[lang]}
              </button>
            ))}
          </div>
        </GlassCard>

        {/* Profile */}
        <GlassCard className="p-6">
          <h2 className="text-lg font-bold font-headline text-on-surface mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">person</span>
            Profile
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-surface-container-low rounded-xl">
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-primary text-2xl font-black">H</div>
              <div>
                <p className="font-bold text-on-surface text-lg">Himanshu</p>
                <p className="text-sm text-outline">Citizen — Kumbhalgarh North</p>
                <p className="text-xs text-primary font-bold">Aadhaar Verified ✓</p>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* About */}
        <GlassCard className="p-6">
          <h2 className="text-lg font-bold font-headline text-on-surface mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">info</span>
            About GramAI
          </h2>
          <p className="text-sm text-outline leading-relaxed">
            GramAI is an AI-powered rural governance platform designed for Indian villages.
            It connects citizens with their Panchayat, tracks government schemes, monitors mandi prices,
            and provides voice-based assistance in multiple Indian languages.
          </p>
          <p className="text-xs text-outline mt-3">Version 2.0 — Made with ❤️ for Bharat</p>
        </GlassCard>
      </div>
    </motion.div>
  );
};

export default SettingsPage;
