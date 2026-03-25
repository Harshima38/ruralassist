import React, { useEffect, useState, useRef } from 'react';
import { BarChart, Bar, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from '../i18n/LanguageContext';
import { useToast } from '../components/shared/Toast';
import { api } from '../services/api';
import GlassCard from '../components/shared/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';

const chartData = [
  { month: 'Jan', infrastructure: 65, economic: 45 }, { month: 'Feb', infrastructure: 78, economic: 52 },
  { month: 'Mar', infrastructure: 62, economic: 60 }, { month: 'Apr', infrastructure: 85, economic: 65 },
  { month: 'May', infrastructure: 72, economic: 70 }, { month: 'Jun', infrastructure: 90, economic: 55 },
  { month: 'Jul', infrastructure: 55, economic: 80 }, { month: 'Aug', infrastructure: 88, economic: 68 },
  { month: 'Sep', infrastructure: 95, economic: 72 }, { month: 'Oct', infrastructure: 82, economic: 85 },
  { month: 'Nov', infrastructure: 75, economic: 78 }, { month: 'Dec', infrastructure: 92, economic: 88 },
];

const AdminDashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [_stats, setStats] = useState<any>({});
  const [activity, setActivity] = useState<any[]>([]);
  const [showInitiativeModal, setShowInitiativeModal] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [aiTyping, setAiTyping] = useState(false);
  const [counters, setCounters] = useState({ active: 0, funds: 0 });
  const initiativeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    api.getStats().then(r => setStats(r.data)).catch(() => {});
    api.getActivity().then(r => setActivity(r.data)).catch(() => {});
    // Counter animation
    const duration = 1500, steps = 60, interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCounters({ active: Math.round((step / steps) * 1482), funds: Math.round((step / steps) * 42) });
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, []);

  const handleExport = () => {
    const csv = 'Metric,Value\nActive Requests,1482\nFunds Allocated,₹4.2 Cr\nBudget Utilization,74%\nHealth Score,82\n';
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'gramai_report.csv'; a.click();
    URL.revokeObjectURL(url);
    toast('Report exported as CSV!', 'success');
  };

  const handleGenerateSolution = () => {
    setAiTyping(true);
    setAiResponse('');
    const response = 'SOLUTION: Deploy emergency water tankers to Ward 3. Activate borewell repair team (ETA: 4 hours). Notify 340 affected households via SMS. Divert 20% supply from Ward 5 reserve. Estimated resolution: 12 hours.';
    let idx = 0;
    const timer = setInterval(() => {
      setAiResponse(response.slice(0, idx));
      idx += 2;
      if (idx > response.length) { clearInterval(timer); setAiTyping(false); }
    }, 20);
  };

  const handleNewInitiative = () => {
    const title = initiativeRef.current?.value;
    if (!title?.trim()) { toast('Please enter initiative title', 'warning'); return; }
    toast(`Initiative "${title}" created!`, 'success');
    setShowInitiativeModal(false);
  };

  const statCards = [
    { label: t('admin.activeRequests'), value: counters.active.toLocaleString(), icon: 'assignment', change: '+12%', color: 'emerald', progress: 74 },
    { label: t('admin.fundsAllocated'), value: `₹${(counters.funds / 10).toFixed(1)} Cr`, icon: 'account_balance_wallet', change: '+₹8L', color: 'amber', progress: 0 },
    { label: t('admin.budgetUtilization'), value: '74%', icon: 'pie_chart', change: '+5%', color: 'emerald', progress: 74 },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      {/* Header */}
      <div className="mt-8 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-primary font-bold tracking-widest uppercase text-xs mb-2">{t('admin.districtOverview')}</p>
          <h1 className="text-4xl font-black font-headline text-on-surface tracking-tight">Kishanpura Panchayat</h1>
          <p className="text-outline mt-2">{t('admin.subtitle')}</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleExport} className="px-6 py-3 rounded-full bg-secondary-container text-on-secondary-container font-headline font-bold flex items-center gap-2 hover:shadow-lg transition-all">
            <span className="material-symbols-outlined text-lg">download</span>{t('admin.exportReport')}
          </button>
          <button onClick={() => setShowInitiativeModal(true)} className="px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-headline font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20 hover:scale-[1.02] transition-all">
            <span className="material-symbols-outlined text-lg">add</span>{t('admin.newInitiative')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Stat Cards */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          {statCards.map((stat, i) => (
            <GlassCard key={i} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>{stat.icon}</span>
                </div>
                <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-tighter ${stat.color === 'emerald' ? 'text-emerald-500 bg-emerald-50' : 'text-amber-500 bg-amber-50'}`}>{stat.change}</span>
              </div>
              <h3 className="text-outline text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</h3>
              <p className="text-3xl font-black font-headline text-on-surface tracking-tighter">{stat.value}</p>
              {stat.progress > 0 && (
                <div className="w-full h-1 bg-slate-100 mt-4 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${stat.progress}%` }}></div>
                </div>
              )}
            </GlassCard>
          ))}

          {/* AI Intelligence */}
          <div className="p-6 rounded-lg bg-emerald-900 text-white shadow-xl shadow-emerald-950/20 relative overflow-hidden group">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-primary-fixed animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                <h3 className="text-sm font-bold font-headline uppercase tracking-widest">{t('admin.aiIntelligence')}</h3>
              </div>
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md mb-4 border border-white/5">
                <p className="text-xs font-bold text-emerald-200 mb-1">{t('admin.urgentAnomaly')}</p>
                <p className="text-sm font-medium leading-relaxed">High Risk: Water shortage detected in Ward 3. Supply dropping by 40% below historical avg.</p>
              </div>
              {aiResponse && (
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md mb-4 border border-emerald-400/30">
                  <p className="text-xs font-bold text-emerald-300 mb-1">🤖 AI SOLUTION</p>
                  <p className="text-sm font-medium leading-relaxed text-emerald-50">{aiResponse}{aiTyping && <span className="animate-pulse">▊</span>}</p>
                </div>
              )}
              <button onClick={handleGenerateSolution} className="w-full py-2 bg-primary-fixed text-on-primary-fixed font-bold text-xs rounded-lg hover:brightness-110 transition-all">
                {t('admin.generateSolution')}
              </button>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="col-span-12 lg:col-span-9">
          <GlassCard className="p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-xl font-bold font-headline tracking-tight">{t('admin.devTrends')}</h3>
                <p className="text-sm text-outline">{t('admin.devTrendsDesc')}</p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-xs font-bold rounded-full bg-slate-100 text-slate-600">{t('admin.monthly')}</button>
                <button className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-700">{t('admin.yearly')}</button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e7e8e7" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#6c7a71' }} />
                <Tooltip contentStyle={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)', border: 'none', borderRadius: '1rem', boxShadow: '0 20px 40px rgba(25,28,28,0.06)' }} />
                <Bar dataKey="infrastructure" fill="url(#barGrad)" radius={[12, 12, 0, 0]} />
                <Bar dataKey="economic" fill="#4edea3" radius={[12, 12, 0, 0]} opacity={0.5} />
                <defs><linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#4edea3" /></linearGradient></defs>
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>
        </div>

        {/* Map */}
        <div className="col-span-12 lg:col-span-8 relative rounded-lg overflow-hidden group h-[500px] shadow-sm">
          <div className="absolute inset-0 bg-slate-200">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQLnW7gP2hqnvmKxjFMbye-lYvU-WV9KqNHGklDcC5v3MZBIUrhg67kiLkIsSQfz5C5z9KVqDN6rxhQuFGnSLo-yYvjBrRPpwd4W7kOb2rh1a8P5kdOgRstByegwCHOHDlZmyZ0Vh-KJI0hBQSg-1UhzXb7_vVrUrOeuUwZM_w1sUIIq-rYuqc4xvQwv0sBjL_bpk_bjnsV48tJysh-KjS9VIRlnqx7lFUWJigNLEIH-Hf_OR-pojGhyIl76A8M4h3h_AasJU3Hlun" alt="Satellite map" />
          </div>
          <div className="absolute inset-0 bg-emerald-950/20 group-hover:bg-transparent transition-colors duration-500"></div>
          {/* Map Pins */}
          <div className="absolute top-1/3 left-1/4"><div className="relative"><div className="absolute inset-0 bg-tertiary-container rounded-full animate-ping opacity-75"></div><div className="relative w-4 h-4 bg-tertiary-container rounded-full border-2 border-white shadow-lg"></div><div className="absolute top-6 -left-12 bg-white/90 backdrop-blur px-3 py-1 rounded-lg shadow-xl text-[10px] font-bold whitespace-nowrap">Broken Borewell</div></div></div>
          <div className="absolute bottom-1/4 right-1/3"><div className="relative"><div className="absolute inset-0 bg-error rounded-full animate-ping opacity-75"></div><div className="relative w-4 h-4 bg-error rounded-full border-2 border-white shadow-lg"></div><div className="absolute top-6 -left-12 bg-white/90 backdrop-blur px-3 py-1 rounded-lg shadow-xl text-[10px] font-bold whitespace-nowrap">Illegal Encroachment</div></div></div>
          <div className="absolute top-6 left-6 flex flex-col gap-2">
            <button className="w-10 h-10 bg-white/90 backdrop-blur rounded-lg flex items-center justify-center text-on-surface shadow-lg"><span className="material-symbols-outlined">add</span></button>
            <button className="w-10 h-10 bg-white/90 backdrop-blur rounded-lg flex items-center justify-center text-on-surface shadow-lg"><span className="material-symbols-outlined">remove</span></button>
          </div>
          <div className="absolute bottom-6 right-6 glass-card p-4 rounded-xl shadow-2xl border border-white/30 max-w-xs">
            <h4 className="font-bold text-sm mb-2">{t('admin.geoFeed')}</h4>
            <div className="flex gap-3 items-center"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div><p className="text-xs text-outline leading-tight">{t('admin.geoFeedDesc')}</p></div>
          </div>
        </div>

        {/* Right Stats */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <GlassCard className="p-6">
            <h3 className="text-sm font-bold font-headline mb-6">{t('admin.serviceCompletion')}</h3>
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24">
                <svg className="w-full h-full transform -rotate-90">
                  <circle className="text-slate-100" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeWidth="8" />
                  <circle className="text-tertiary-container" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeDasharray="251.2" strokeDashoffset="62.8" strokeWidth="8" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center"><span className="text-lg font-black font-headline">75%</span></div>
              </div>
              <div className="flex-1 space-y-3">
                <div><div className="flex justify-between text-[10px] font-bold uppercase mb-1"><span>{t('admin.pensions')}</span><span className="text-emerald-600">92%</span></div><div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 w-[92%]"></div></div></div>
                <div><div className="flex justify-between text-[10px] font-bold uppercase mb-1"><span>{t('admin.landRecords')}</span><span className="text-tertiary-container">64%</span></div><div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-tertiary-container w-[64%]"></div></div></div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold font-headline">{t('admin.recentActivity')}</h3>
              <button onClick={() => toast('Loading all activity...', 'info')} className="text-xs font-bold text-primary">{t('admin.viewAll')}</button>
            </div>
            <div className="space-y-6">
              {activity.map((item: any) => (
                <div key={item.id} className="flex gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${item.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : item.color === 'amber' ? 'bg-tertiary-fixed text-tertiary' : 'bg-slate-100 text-slate-600'}`}>
                    <span className="material-symbols-outlined text-xl">{item.icon}</span>
                  </div>
                  <div><p className="text-xs font-bold">{item.text}</p><p className="text-[10px] text-outline mt-0.5">{item.time_text}</p></div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* New Initiative Modal */}
      <AnimatePresence>
        {showInitiativeModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4">
              <h2 className="text-xl font-black font-headline mb-4">{t('admin.newInitiative')}</h2>
              <input ref={initiativeRef} className="w-full p-3 border border-slate-200 rounded-xl mb-3 text-sm focus:ring-2 focus:ring-primary/30 outline-none" placeholder="Initiative title..." />
              <textarea className="w-full p-3 border border-slate-200 rounded-xl mb-4 text-sm h-24 focus:ring-2 focus:ring-primary/30 outline-none resize-none" placeholder="Description..." />
              <div className="flex gap-3">
                <button onClick={() => setShowInitiativeModal(false)} className="flex-1 py-3 border border-slate-200 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all">Cancel</button>
                <button onClick={handleNewInitiative} className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-400 text-white rounded-xl font-bold text-sm hover:scale-[1.02] transition-all">Create</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdminDashboardPage;
