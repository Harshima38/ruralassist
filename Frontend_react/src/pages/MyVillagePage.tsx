import React from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import GlassCard from '../components/shared/GlassCard';
import { motion } from 'framer-motion';

const MyVillagePage: React.FC = () => {
  const { t } = useTranslation();

  const villageInfo = [
    { icon: 'group', label: 'Population', value: '4,850' },
    { icon: 'home', label: 'Households', value: '1,120' },
    { icon: 'water_drop', label: 'Water Sources', value: '12' },
    { icon: 'school', label: 'Schools', value: '3' },
    { icon: 'local_hospital', label: 'Health Centers', value: '1' },
    { icon: 'agriculture', label: 'Farmland', value: '320 Ha' },
  ];

  const leaders = [
    { name: 'Ramesh Patel', role: 'Sarpanch', phone: '98765-43210', icon: 'person' },
    { name: 'Sunita Devi', role: 'Deputy Sarpanch', phone: '98765-43211', icon: 'person' },
    { name: 'Mohan Singh', role: 'Block Dev. Officer', phone: '98765-43212', icon: 'badge' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="mb-8">
        <h1 className="text-3xl font-black font-headline text-on-surface tracking-tight">{t('nav.myVillage')}</h1>
        <p className="text-outline mt-1">Kumbhalgarh North — Rajsamand District, Rajasthan</p>
      </div>

      {/* Village Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {villageInfo.map((item) => (
          <GlassCard key={item.label} className="p-5 text-center" hover>
            <span className="material-symbols-outlined text-3xl text-primary mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
            <p className="text-2xl font-black font-headline text-on-surface">{item.value}</p>
            <p className="text-xs font-bold text-outline mt-1">{item.label}</p>
          </GlassCard>
        ))}
      </div>

      {/* Map */}
      <GlassCard className="p-6 mb-8">
        <h2 className="text-lg font-bold font-headline text-on-surface mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">map</span>
          Village Map
        </h2>
        <div className="h-64 rounded-xl overflow-hidden bg-slate-200">
          <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtEW7bGq-sYvBVWdl7XHPwXbDqHRBrVm2Dfl3XqmWfpCTFhJiLCMbPfT9wgNwMiUvCBz5I3uyGWyK8EhpfaU1ENUOWFUWz7ZZxqPqrg66QdaGGPAHDvvthCiWFnQ0Ro9NijPH8yfRBbH4k5j9_CqfS1CfjVVYx6OdO_MtdQvOzCm37VjjnGCKQk3l1yjfp6Fkp-3RxDDCTaXr2a3QlLXs3k3m24ug3lHZyRNVUiVHfpLGCqj5xyHnVPWxzijwF-KWFMYCnDBfNy" alt="Village satellite view" />
        </div>
      </GlassCard>

      {/* Village Leaders */}
      <GlassCard className="p-6">
        <h2 className="text-lg font-bold font-headline text-on-surface mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">groups</span>
          Village Leaders
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {leaders.map((l) => (
            <div key={l.name} className="flex items-center gap-4 p-4 bg-surface-container-low rounded-xl">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>{l.icon}</span>
              </div>
              <div>
                <p className="font-bold text-on-surface">{l.name}</p>
                <p className="text-xs text-outline">{l.role}</p>
                <a href={`tel:${l.phone}`} className="text-xs text-primary font-bold">{l.phone}</a>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default MyVillagePage;
