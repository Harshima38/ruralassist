import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface AppContextType {
  isVoiceModalOpen: boolean;
  setVoiceModalOpen: (v: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isVoiceModalOpen, setVoiceModalOpen] = useState(false);
  return (
    <AppContext.Provider value={{ isVoiceModalOpen, setVoiceModalOpen }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
