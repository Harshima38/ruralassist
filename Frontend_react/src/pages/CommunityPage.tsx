import React, { useEffect, useState } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { api } from '../services/api';
import GlassCard from '../components/shared/GlassCard';
import { motion } from 'framer-motion';

const CommunityPage: React.FC = () => {
  const { t } = useTranslation();
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    api.getCommunity().then((r) => setEvents(r.data)).catch(() => {});
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="mb-8">
        <h1 className="text-3xl font-black font-headline text-on-surface tracking-tight">{t('nav.community')}</h1>
        <p className="text-outline mt-1">{t('home.communitySubtitle')}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event: any) => (
          <GlassCard key={event.id} hover className="overflow-hidden">
            <div className="h-44 overflow-hidden relative">
              <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={event.image_url} alt={event.title} />
              <div className={`absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                event.tag_color === 'primary' ? 'text-primary' : event.tag_color === 'secondary' ? 'text-secondary' : 'text-tertiary'
              }`}>{event.tag}</div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-on-surface text-lg mb-2">{event.title}</h3>
              <div className="flex items-center gap-4 text-xs text-outline font-medium">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">calendar_today</span>{event.date_text}</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">group</span>{event.meta}</span>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </motion.div>
  );
};

export default CommunityPage;
