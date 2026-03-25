import React, { useState } from 'react';
import { useTranslation } from '../../i18n/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const contacts = [
  { label: 'Village Head', number: '112', icon: 'person', color: 'emerald' },
  { label: 'Health Center', number: '108', icon: 'local_hospital', color: 'red' },
  { label: 'Police', number: '100', icon: 'local_police', color: 'blue' },
  { label: 'Fire', number: '101', icon: 'fire_truck', color: 'orange' },
];

const SOSButton: React.FC = () => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full py-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-black rounded-xl shadow-2xl shadow-red-500/30 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all"
      >
        <span className="material-symbols-outlined text-2xl animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>
          emergency
        </span>
        <span className="text-lg">{t('sos.title')}</span>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-3">
              {contacts.map((c) => (
                <a
                  key={c.label}
                  href={`tel:${c.number}`}
                  className={`p-4 rounded-xl bg-white shadow-lg flex flex-col items-center gap-2 hover:shadow-xl transition-all group`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    c.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                    c.color === 'red' ? 'bg-red-50 text-red-600' :
                    c.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                    'bg-orange-50 text-orange-600'
                  } group-hover:scale-110 transition-transform`}>
                    <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>{c.icon}</span>
                  </div>
                  <p className="text-xs font-bold text-on-surface">{c.label}</p>
                  <p className="text-lg font-black font-headline text-on-surface">{c.number}</p>
                  <span className="text-[10px] font-bold text-primary">{t('sos.callNow')}</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SOSButton;
