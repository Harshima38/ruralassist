import React, { useEffect, useState } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { api } from '../services/api';
import GlassCard from '../components/shared/GlassCard';
import { motion } from 'framer-motion';

interface MandiPrice {
  id: number; commodity: string; price: number; unit: string; market: string; change_percent: number; trend: string;
}

const MarketsPage: React.FC = () => {
  const { t } = useTranslation();
  const [prices, setPrices] = useState<MandiPrice[]>([]);

  useEffect(() => {
    api.getMandiPrices().then((r) => setPrices(r.data)).catch(() => {});
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="mb-8">
        <h1 className="text-3xl font-black font-headline text-on-surface tracking-tight">{t('mandi.title')}</h1>
        <p className="text-outline mt-1">{t('mandi.subtitle')}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prices.map((item) => (
          <GlassCard key={item.id} hover className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold font-headline text-on-surface">{item.commodity}</h3>
                <p className="text-xs text-outline">{item.market}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-black flex items-center gap-1 ${
                item.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'
              }`}>
                <span className="material-symbols-outlined text-sm">{item.trend === 'up' ? 'trending_up' : 'trending_down'}</span>
                {item.change_percent > 0 ? '+' : ''}{item.change_percent}%
              </div>
            </div>
            <p className="text-3xl font-black font-headline text-on-surface">₹{item.price.toLocaleString()}</p>
            <p className="text-xs text-outline mt-1">per {item.unit}</p>
          </GlassCard>
        ))}
      </div>
    </motion.div>
  );
};

export default MarketsPage;
