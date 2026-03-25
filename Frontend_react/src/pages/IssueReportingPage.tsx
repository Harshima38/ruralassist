import React, { useState, useRef } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { useToast } from '../components/shared/Toast';
import { api } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const IssueReportingPage: React.FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('road');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const progress = (step / 3) * 100;
  const categories = [
    { id: 'road', label: t('issues.roadFix'), icon: 'add_road' },
    { id: 'water', label: t('issues.waterLeak'), icon: 'water_damage' },
    { id: 'power', label: t('issues.powerCut'), icon: 'electric_bolt' },
    { id: 'waste', label: t('issues.wasteInfo'), icon: 'delete' },
    { id: 'drain', label: 'Drainage', icon: 'water' },
    { id: 'light', label: 'Street Light', icon: 'lightbulb' },
    { id: 'land', label: 'Land', icon: 'landscape' },
    { id: 'other', label: 'Other', icon: 'more_horiz' },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0].name);
      toast('Photo uploaded successfully!', 'success');
      setTimeout(() => setStep(2), 400);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await api.submitIssue({
        title: `${selectedCategory} issue`,
        description: notes,
        category: selectedCategory,
        photo_url: selectedFile || '',
        latitude: 25.1492,
        longitude: 73.5873,
        village: 'Kumbhalgarh North',
      });
      setSubmitted(true);
      toast('Issue submitted to Panchayat!', 'success');
      setTimeout(() => {
        setSubmitted(false);
        setStep(1);
        setSelectedFile(null);
        setSelectedCategory('road');
        setNotes('');
      }, 3500);
    } catch {
      toast('Failed to submit. Please try again.', 'error');
    }
    setSubmitting(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="max-w-2xl mx-auto pt-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-black font-headline text-on-surface tracking-tight mb-2">{t('issues.title')}</h1>
        <p className="text-outline font-medium">{t('issues.subtitle')}</p>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="w-full h-2 bg-primary-container/20 rounded-full overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-primary-container to-inverse-primary rounded-full" initial={{ width: '33%' }} animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} />
        </div>
        <div className="flex justify-between mt-3 text-xs font-bold uppercase tracking-widest text-outline">
          <span className={step >= 1 ? 'text-primary' : ''}>{t('issues.photo')}</span>
          <span className={step >= 2 ? 'text-primary' : ''}>{t('issues.location')}</span>
          <span className={step >= 3 ? 'text-primary' : ''}>{t('issues.category')}</span>
        </div>
      </div>

      {/* Step 1: Photo */}
      <div className="glass-card rounded-lg p-8 shadow-sm mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black ${step >= 1 ? 'bg-primary-container text-white' : 'bg-slate-100 text-slate-400'}`}>1</div>
          <h2 className="text-lg font-headline font-bold text-on-surface">{t('issues.captureIssue')}</h2>
        </div>
        {selectedFile ? (
          <div className="relative rounded-lg overflow-hidden mb-4">
            <img className="w-full h-60 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBe3W6lh1dpOkADCmpJiqOe_MUz44u42T0lP5Ld0-VRf0FZCo4U3VQMdxIlNv3ydSJhBHU4v0qnzpzqr3yZNLN5hMd_FVTGMpxIz64_kS3jg-rqo2GKnHnC5ZkFJNKDUFKxK7FRPtVB7fK0VW3kDiwz49dj--89G-I09rQNqXhJ3cWqOc9IQRFLNEkWyWpKNuXQbJFVPLnvR8pnACCG8IUXMFXS2Y_jNHNE_wqGqJ0BI2CpqcOBGCJMYVwxhfRFLwpNrA6TNtGlU7" alt="Captured" />
            <div className="absolute bottom-0 w-full bg-slate-900/80 backdrop-blur px-6 py-3 flex items-center gap-3 text-white text-sm">
              <span className="material-symbols-outlined text-emerald-400 text-lg">check_circle</span>
              <span className="font-medium">{selectedFile}</span>
              <span className="ml-auto text-slate-400 font-bold text-xs uppercase">Uploaded</span>
            </div>
          </div>
        ) : (
          <button onClick={() => fileRef.current?.click()} className="w-full h-60 border-2 border-dashed border-outline-variant/30 rounded-lg flex flex-col items-center justify-center gap-4 hover:bg-emerald-50/50 transition-all group">
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">photo_camera</span>
            </div>
            <div className="text-center">
              <p className="font-bold text-on-surface">{t('issues.uploadPrompt')}</p>
              <p className="text-xs text-outline mt-1">{t('issues.uploadHint')}</p>
            </div>
          </button>
        )}
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      </div>

      {/* Step 2: Location */}
      {step >= 2 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-lg p-8 shadow-sm mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center text-sm font-black">2</div>
            <h2 className="text-lg font-headline font-bold text-on-surface">{t('issues.detectLocation')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-lg overflow-hidden h-48 bg-slate-200">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtEW7bGq-sYvBVWdl7XHPwXbDqHRBrVm2Dfl3XqmWfpCTFhJiLCMbPfT9wgNwMiUvCBz5I3uyGWyK8EhpfaU1ENUOWFUWz7ZZxqPqrg66QdaGGPAHDvvthCiWFnQ0Ro9NijPH8yfRBbH4k5j9_CqfS1CfjVVYx6OdO_MtdQvOzCm37VjjnGCKQk3l1yjfp6Fkp-3RxDDCTaXr2a3QlLXs3k3m24ug3lHZyRNVUiVHfpLGCqj5xyHnVPWxzijwF-KWFMYCnDBfNy" alt="Location" />
            </div>
            <div className="space-y-4">
              <div className="bg-surface-container-low p-4 rounded-lg">
                <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">{t('issues.detectedVillage')}</p>
                <p className="font-headline font-bold text-on-surface text-lg">Kumbhalgarh North</p>
              </div>
              <div className="bg-surface-container-low p-4 rounded-lg">
                <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">{t('issues.coordinates')}</p>
                <p className="font-headline font-bold text-on-surface">25.1492° N, 73.5873° E</p>
              </div>
              <button onClick={() => { setStep(3); toast('Location confirmed!', 'success'); }} className="w-full py-3 border border-outline-variant/20 rounded-lg flex items-center justify-center gap-2 font-bold text-primary hover:bg-emerald-50 transition-all">
                <span className="material-symbols-outlined text-lg">my_location</span>{t('issues.adjustPin')}
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Step 3: Category */}
      {step >= 3 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-lg p-8 shadow-sm mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center text-sm font-black">3</div>
            <h2 className="text-lg font-headline font-bold text-on-surface">{t('issues.categorizeIssue')}</h2>
          </div>
          <div className="grid grid-cols-4 gap-3 mb-6">
            {categories.map((cat) => (
              <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`flex flex-col items-center gap-2 py-5 rounded-lg transition-all ${selectedCategory === cat.id ? 'bg-white border-2 border-primary shadow-lg shadow-emerald-500/10 text-primary' : 'bg-surface-container-low text-on-surface-variant hover:bg-white'}`}>
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: selectedCategory === cat.id ? "'FILL' 1" : "'FILL' 0" }}>{cat.icon}</span>
                <span className="text-xs font-bold">{cat.label}</span>
              </button>
            ))}
          </div>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={t('issues.notesPlaceholder')} className="w-full p-4 bg-surface-container-highest border-none rounded-lg resize-y min-h-[100px] focus:ring-2 focus:ring-primary/30 transition-all text-sm" />
          <p className="text-right text-xs text-outline mt-2">{notes.length} / 500</p>
        </motion.div>
      )}

      {/* Submit */}
      {step >= 3 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center pb-24">
          <button onClick={handleSubmit} disabled={submitting} className="mx-auto px-16 py-4 bg-tertiary-container text-on-tertiary-container font-black text-lg rounded-full shadow-2xl shadow-tertiary-container/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3 disabled:opacity-50">
            {submitting ? 'Submitting...' : t('issues.submitIssue')} <span className="material-symbols-outlined">arrow_forward</span>
          </button>
          <p className="mt-4 text-[10px] text-outline flex items-center justify-center gap-1">
            <span className="material-symbols-outlined text-[14px]">info</span>{t('issues.submissionNote')}
          </p>
        </motion.div>
      )}

      {/* Success */}
      <AnimatePresence>
        {submitted && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} className="bg-white rounded-lg p-12 text-center shadow-2xl max-w-md mx-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-50 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-5xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
              <h2 className="text-2xl font-black font-headline text-on-surface mb-2">{t('issues.successTitle')}</h2>
              <p className="text-outline mb-6">{t('issues.successMessage')}</p>
              <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                <motion.div className="h-full bg-primary-container" initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 3 }} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default IssueReportingPage;
