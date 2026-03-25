import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface ToastMessage {
  id: number;
  text: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface ToastContextType {
  toast: (text: string, type?: ToastMessage['type']) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

let toastId = 0;

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const toast = useCallback((text: string, type: ToastMessage['type'] = 'info') => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);

  const iconMap: Record<string, string> = {
    success: 'check_circle',
    info: 'info',
    warning: 'warning',
    error: 'error',
  };

  const colorMap: Record<string, string> = {
    success: 'bg-emerald-600',
    info: 'bg-blue-600',
    warning: 'bg-amber-500',
    error: 'bg-red-600',
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed top-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              className={`pointer-events-auto px-5 py-3 rounded-xl text-white shadow-2xl flex items-center gap-3 min-w-[280px] ${colorMap[t.type]}`}
            >
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                {iconMap[t.type]}
              </span>
              <p className="text-sm font-medium">{t.text}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};
