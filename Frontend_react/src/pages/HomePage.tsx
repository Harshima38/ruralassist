import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../i18n/LanguageContext';
import { api } from '../services/api';
import { useToast } from '../components/shared/Toast';
import GlassCard from '../components/shared/GlassCard';
import MandiPrices from '../components/home/MandiPrices';
import SchemeTracker from '../components/home/SchemeTracker';
import CropCalendar from '../components/home/CropCalendar';
import SOSButton from '../components/home/SOSButton';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  const { setVoiceModalOpen } = useApp();
  const { t } = useTranslation();
  const { toast } = useToast();
  const [healthAnimated, setHealthAnimated] = useState(false);
  const [alerts, setAlerts] = useState<string[]>([]);
  const [weather, setWeather] = useState({ temperature: 32, condition: 'Partly Cloudy', humidity: 45, wind: 12, icon: 'partly_cloudy_day' });
  const [healthScore, setHealthScore] = useState({ score: 82, status: 'Healthy', description: '', highlight: 'Excellent', suffix: '' });
  const [events, setEvents] = useState<Array<Record<string, any>>>([]);

  useEffect(() => {
    const timer = setTimeout(() => setHealthAnimated(true), 300);
    // Fetch from backend
    api.getAlerts().then(r => setAlerts(r.data.map((a: any) => a.message))).catch(() => {});
    api.getWeather().then(r => setWeather(r.data)).catch(() => {});
    api.getHealthScore().then(r => setHealthScore(r.data)).catch(() => {});
    api.getCommunity().then(r => setEvents(r.data)).catch(() => {});
    return () => clearTimeout(timer);
  }, []);

  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (healthScore.score / 100) * circumference;

  const suggestions = [
    { id: 1, icon: 'water_drop', title: 'Water Shortage Alert', description: 'Ward 3 supply dropping by 40%. Backup plan recommended.', badge: 'CRITICAL', badgeColor: 'error', action: t('home.takeAction') },
    { id: 2, icon: 'agriculture', title: 'PM Kisan Update', description: '14th installment verification deadline approaching Oct 20.', badge: 'UPDATE', badgeColor: 'tertiary', action: t('home.updateNow') },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      {/* Alert Ticker */}
      {alerts.length > 0 && (
        <div className="mb-8 overflow-hidden glass-card rounded-xl py-3 px-6 shadow-sm flex items-center gap-4 border border-outline-variant/10">
          <span className="flex items-center gap-2 text-error font-bold text-sm shrink-0">
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>campaign</span>
            {t('home.alerts')}
          </span>
          <div className="flex-1 overflow-hidden relative h-6">
            <p className="absolute whitespace-nowrap animate-marquee flex gap-12 text-sm font-medium text-on-surface-variant">
              {alerts.map((alert, i) => (<span key={i}>• {alert}</span>))}
            </p>
          </div>
        </div>
      )}

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Weather + Health + SOS */}
        <div className="md:col-span-4 space-y-6">
          {/* Weather Widget */}
          <GlassCard hover className="p-6 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 border border-white">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-label uppercase tracking-widest text-outline">{t('home.weatherToday')}</p>
                <h3 className="text-4xl font-headline font-extrabold text-on-surface">{weather.temperature}°C</h3>
                <p className="text-on-surface-variant font-medium">{weather.condition}</p>
              </div>
              <span className="material-symbols-outlined text-6xl text-blue-400" style={{ fontVariationSettings: "'FILL' 1" }}>{weather.icon}</span>
            </div>
            <div className="flex justify-between text-xs font-bold text-outline">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">water_drop</span>{weather.humidity}% {t('home.humidity')}</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">air</span>{weather.wind}km/h {t('home.wind')}</span>
            </div>
          </GlassCard>

          {/* Village Health Score */}
          <GlassCard hover className="p-6 relative overflow-hidden">
            <p className="text-sm font-label uppercase tracking-widest text-outline mb-6">{t('home.healthScore')}</p>
            <div className="relative flex items-center justify-center">
              <svg className="w-40 h-40 transform -rotate-90">
                <circle className="text-surface-container-high" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeWidth="12" />
                <circle className="transition-all duration-1000" cx="80" cy="80" fill="transparent" r="70" stroke="url(#health-gradient)" strokeDasharray={circumference} strokeDashoffset={healthAnimated ? offset : circumference} strokeLinecap="round" strokeWidth="12" />
                <defs><linearGradient id="health-gradient" x1="0%" x2="100%" y1="0%" y2="0%"><stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#4edea3" /></linearGradient></defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-headline font-black text-on-surface">{healthScore.score}</span>
                <span className="text-[10px] font-bold text-primary uppercase tracking-tighter">{t('home.healthy')}</span>
              </div>
            </div>
            <p className="text-center mt-6 text-sm text-on-surface-variant font-medium leading-relaxed">
              {t('home.healthDesc')} <span className="text-emerald-600 font-bold">{t('home.excellent')}</span> {t('home.healthSuffix')}
            </p>
          </GlassCard>

          {/* SOS Emergency */}
          <SOSButton />
        </div>

        {/* Right Column */}
        <div className="md:col-span-8 flex flex-col gap-6">
          {/* Voice AI Centerpiece */}
          <div className="relative h-64 glass-card rounded-lg p-8 flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50/40 to-teal-50/40 border-2 border-emerald-100/20 group">
            <div className="absolute inset-0 opacity-20"><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-400 rounded-full blur-[100px] animate-pulse-slow"></div></div>
            <div className="relative z-10 flex flex-col items-center gap-6">
              <button onClick={() => setVoiceModalOpen(true)} className="relative group">
                <div className="absolute inset-0 bg-primary-container/20 rounded-full scale-150 animate-pulse-slow"></div>
                <div className="absolute inset-0 bg-primary-container/10 rounded-full scale-[2] animate-pulse-slow" style={{ animationDelay: '75ms' }}></div>
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-container to-inverse-primary shadow-2xl shadow-emerald-500/40 flex items-center justify-center text-white transform group-active:scale-95 transition-all duration-150">
                  <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>mic</span>
                </div>
              </button>
              <div className="text-center">
                <h2 className="text-xl font-headline font-bold text-on-surface mb-1">{t('home.voiceQuestion')}</h2>
                <p className="text-sm text-outline font-medium italic">{t('home.voiceHint')}</p>
              </div>
            </div>
          </div>

          {/* Smart Suggestions */}
          <div className="space-y-4">
            <h3 className="text-lg font-headline font-bold text-on-surface flex items-center gap-2 px-2">
              <span className="material-symbols-outlined text-primary">auto_awesome</span>{t('home.smartSuggestions')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {suggestions.map((s) => (
                <GlassCard key={s.id} hover className={`p-5 border-l-4 ${s.badgeColor === 'error' ? 'border-error' : 'border-tertiary'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${s.badgeColor === 'error' ? 'bg-error-container text-error' : 'bg-tertiary-fixed text-tertiary'}`}>
                      <span className="material-symbols-outlined">{s.icon}</span>
                    </div>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${s.badgeColor === 'error' ? 'text-error bg-error-container/50' : 'text-tertiary bg-tertiary-fixed/50'}`}>{s.badge}</span>
                  </div>
                  <h4 className="font-headline font-bold text-on-surface">{s.title}</h4>
                  <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">{s.description}</p>
                  <button onClick={() => toast(`Action started: ${s.title}`, 'success')} className={`mt-4 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all ${s.badgeColor === 'error' ? 'text-primary' : 'text-tertiary'}`}>
                    {s.action} <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </button>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Mandi + Schemes Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MandiPrices />
            <CropCalendar />
          </div>
        </div>
      </div>

      {/* Scheme Tracker */}
      <section className="mt-8">
        <SchemeTracker />
      </section>

      {/* Community Hearth */}
      <section className="mt-8">
        <div className="flex justify-between items-end mb-6 px-2">
          <div>
            <h3 className="text-xl font-headline font-bold text-on-surface">{t('home.communityHearth')}</h3>
            <p className="text-sm text-outline font-medium">{t('home.communitySubtitle')}</p>
          </div>
          <button onClick={() => toast('Loading all community updates...', 'info')} className="text-sm font-bold text-primary px-4 py-2 hover:bg-emerald-50 rounded-full transition-all">{t('home.viewAllUpdates')}</button>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-6 px-2 custom-scrollbar snap-x">
          {events.map((event: any) => (
            <div key={event.id} className="min-w-[300px] snap-start glass-card rounded-lg overflow-hidden shadow-xl shadow-emerald-950/5 group">
              <div className="h-40 overflow-hidden relative">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={event.image_url} alt={event.title} />
                <div className={`absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase ${event.tag_color === 'primary' ? 'text-primary' : event.tag_color === 'secondary' ? 'text-secondary' : 'text-tertiary'}`}>{event.tag}</div>
              </div>
              <div className="p-5">
                <h4 className="font-bold text-on-surface mb-2">{event.title}</h4>
                <div className="flex items-center gap-3 text-xs text-on-surface-variant font-medium">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">calendar_today</span>{event.date_text}</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">group</span>{event.meta}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default HomePage;
