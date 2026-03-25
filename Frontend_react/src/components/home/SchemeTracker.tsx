import React, { useEffect, useState } from 'react';
import { useTranslation } from '../../i18n/LanguageContext';
import { api } from '../../services/api';
import GlassCard from '../shared/GlassCard';

interface Scheme {
  id: number;
  name: string;
  description: string;
  status: string;
  progress: number;
  deadline: string;
  beneficiaries: number;
  icon: string;
}

const SchemeTracker: React.FC = () => {
  const { t } = useTranslation();
  const [schemes, setSchemes] = useState<Scheme[]>([]);

  useEffect(() => {
    api.getSchemes().then((res) => setSchemes(res.data)).catch(() => {});
  }, []);

  if (schemes.length === 0) return null;

  return (
    <GlassCard className="p-6">
      <div className="flex items-center gap-2 mb-5">
        <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance</span>
        <h3 className="font-headline font-bold text-on-surface">{t('schemes.title')}</h3>
      </div>
      <div className="space-y-4">
        {schemes.slice(0, 3).map((scheme) => (
          <div key={scheme.id} className="p-4 bg-surface-container-low rounded-xl">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">{scheme.icon}</span>
                <h4 className="text-sm font-bold text-on-surface">{scheme.name}</h4>
              </div>
              {scheme.status === 'completed' && (
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">✓ DONE</span>
              )}
            </div>
            <p className="text-xs text-outline mb-3">{scheme.description}</p>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${
                  scheme.progress >= 80 ? 'bg-emerald-500' : scheme.progress >= 50 ? 'bg-amber-400' : 'bg-red-400'
                }`}
                style={{ width: `${scheme.progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[10px] font-bold text-outline">
              <span>{scheme.progress}% {t('admin.serviceCompletion')}</span>
              <span>{scheme.beneficiaries.toLocaleString()} {t('schemes.beneficiaries')}</span>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

export default SchemeTracker;
