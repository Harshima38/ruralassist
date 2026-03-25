import React from 'react';
import { useTranslation } from '../../i18n/LanguageContext';
import GlassCard from '../shared/GlassCard';

const crops = [
  { season: 'Kharif', months: 'Jun–Oct', crops: 'Rice, Cotton, Soybean, Sugarcane', icon: '🌧️', active: true },
  { season: 'Rabi', months: 'Nov–Mar', crops: 'Wheat, Mustard, Chickpea, Barley', icon: '❄️', active: false },
  { season: 'Zaid', months: 'Mar–Jun', crops: 'Watermelon, Moong, Cucumber', icon: '☀️', active: false },
];

const CropCalendar: React.FC = () => {
  const { t } = useTranslation();

  return (
    <GlassCard className="p-6">
      <div className="flex items-center gap-2 mb-5">
        <span className="material-symbols-outlined text-emerald-600" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
        <h3 className="font-headline font-bold text-on-surface">{t('crop.title')}</h3>
      </div>
      <div className="space-y-3">
        {crops.map((crop) => (
          <div
            key={crop.season}
            className={`p-4 rounded-xl flex items-center gap-4 transition-all ${
              crop.active
                ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 shadow-md'
                : 'bg-surface-container-low'
            }`}
          >
            <span className="text-2xl">{crop.icon}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-on-surface">{crop.season}</h4>
                {crop.active && (
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full animate-pulse">
                    CURRENT
                  </span>
                )}
              </div>
              <p className="text-[10px] font-bold text-outline mt-0.5">{crop.months}</p>
              <p className="text-xs text-on-surface-variant mt-1">{crop.crops}</p>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

export default CropCalendar;
