import React, { useEffect, useState } from 'react';
import { useTranslation } from '../../i18n/LanguageContext';
import { api } from '../../services/api';
import GlassCard from '../shared/GlassCard';

interface MandiPrice {
  id: number;
  commodity: string;
  price: number;
  unit: string;
  market: string;
  change_percent: number;
  trend: string;
}

const MandiPrices: React.FC = () => {
  const { t } = useTranslation();
  const [prices, setPrices] = useState<MandiPrice[]>([]);

  useEffect(() => {
    api.getMandiPrices().then((res) => setPrices(res.data)).catch(() => {});
  }, []);

  if (prices.length === 0) return null;

  return (
    <GlassCard className="p-6">
      <div className="flex items-center gap-2 mb-5">
        <span className="material-symbols-outlined text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>storefront</span>
        <h3 className="font-headline font-bold text-on-surface">{t('mandi.title')}</h3>
        <span className="ml-auto text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full animate-pulse">LIVE</span>
      </div>
      <div className="space-y-3">
        {prices.slice(0, 4).map((item) => (
          <div key={item.id} className="flex items-center justify-between py-2 border-b border-slate-100/50 last:border-0">
            <div>
              <p className="text-sm font-bold text-on-surface">{item.commodity}</p>
              <p className="text-[10px] text-outline">{item.market}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-black font-headline text-on-surface">₹{item.price.toLocaleString()}</p>
              <p className={`text-[10px] font-bold flex items-center justify-end gap-0.5 ${
                item.trend === 'up' ? 'text-emerald-600' : 'text-red-500'
              }`}>
                <span className="material-symbols-outlined text-xs">
                  {item.trend === 'up' ? 'trending_up' : 'trending_down'}
                </span>
                {item.change_percent > 0 ? '+' : ''}{item.change_percent}%
              </p>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 py-2 text-xs font-bold text-primary hover:bg-emerald-50 rounded-lg transition-all">
        View All Prices →
      </button>
    </GlassCard>
  );
};

export default MandiPrices;
