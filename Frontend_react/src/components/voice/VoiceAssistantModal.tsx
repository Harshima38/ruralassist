import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../i18n/LanguageContext';
import { api } from '../../services/api';

interface ChatMessage { role: 'ai' | 'user'; text: string }

const VoiceAssistantModal: React.FC = () => {
  const { isVoiceModalOpen, setVoiceModalOpen } = useApp();
  const { t, language } = useTranslation();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (isVoiceModalOpen) {
      setMessages([{ role: 'ai', text: t('voice.greeting') }]);
      setIsListening(false);
    }
  }, [isVoiceModalOpen, t]);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { role: 'user', text }]);
    setInputText('');
    setIsLoading(true);
    try {
      const res = await api.processVoice(text, language);
      setMessages((prev) => [...prev, { role: 'ai', text: res.data.response }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'ai', text: 'Sorry, something went wrong. Please try again.' }]);
    }
    setIsLoading(false);
  };

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMessages((prev) => [...prev, { role: 'ai', text: 'Speech recognition is not supported in your browser. Please type your question instead.' }]);
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    // Set language for speech recognition
    const langMap: Record<string, string> = {
      en: 'en-IN',
      hi: 'hi-IN',
      mr: 'mr-IN',
      ta: 'ta-IN',
      te: 'te-IN',
    };
    recognition.lang = langMap[language] || 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setIsListening(false);
      sendMessage(transcript);
    };

    recognition.onerror = () => {
      setIsListening(false);
      setMessages((prev) => [...prev, { role: 'ai', text: 'Could not understand. Please try again or type your question.' }]);
    };

    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const chips = [
    { label: t('voice.cropInsurance'), query: 'crop insurance status' },
    { label: t('voice.irrigationSubsidy'), query: 'irrigation subsidy' },
    { label: t('voice.applyPanCard'), query: 'apply pan card' },
    { label: 'Ration Card', query: 'ration card status' },
    { label: 'Mandi Prices', query: 'mandi wheat price' },
    { label: 'Weather', query: 'weather today' },
  ];

  return (
    <AnimatePresence>
      {isVoiceModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-300 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
              </div>
              <div>
                <h2 className="text-white font-headline font-bold">GramAI</h2>
                <p className="text-emerald-300 text-xs font-medium">
                  {isListening ? t('voice.listening') : 'Ready to help'}
                </p>
              </div>
            </div>
            <button
              onClick={() => { stopListening(); setVoiceModalOpen(false); }}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white/70 hover:bg-white/20 transition-all"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto px-6 space-y-4 custom-scrollbar">
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-emerald-500 text-white rounded-br-sm'
                    : 'bg-white/10 text-white/90 backdrop-blur rounded-bl-sm'
                }`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/10 backdrop-blur rounded-2xl rounded-bl-sm p-4 flex gap-1">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Waveform (only when listening) */}
          {isListening && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 64 }}
              exit={{ opacity: 0, height: 0 }}
              className="flex justify-center items-end gap-[3px] h-16 px-6"
            >
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[3px] bg-gradient-to-t from-emerald-500 to-emerald-300 rounded-full animate-waveform"
                  style={{
                    animationDelay: `${i * 50}ms`,
                    height: `${Math.random() * 40 + 10}px`,
                  }}
                />
              ))}
            </motion.div>
          )}

          {/* Mic Button */}
          <div className="flex justify-center py-4">
            <button
              onClick={isListening ? stopListening : startListening}
              className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-all ${
                isListening
                  ? 'bg-red-500 shadow-red-500/40 animate-pulse scale-110'
                  : 'bg-gradient-to-br from-emerald-400 to-teal-300 shadow-emerald-500/30 hover:scale-105 active:scale-95'
              }`}
            >
              <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                {isListening ? 'stop' : 'mic'}
              </span>
            </button>
          </div>
          <p className="text-center text-white/40 text-xs -mt-1 mb-2">
            {isListening ? t('voice.stopHint') : 'Tap to speak'}
          </p>

          {/* Chips */}
          <div className="px-6 py-2">
            <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
              {chips.map((chip) => (
                <button
                  key={chip.label}
                  onClick={() => sendMessage(chip.query)}
                  className="px-4 py-2 bg-white/10 backdrop-blur border border-white/10 text-white/80 text-sm font-medium rounded-full whitespace-nowrap hover:bg-white/20 transition-all"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="px-6 pb-8">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-full p-2 border border-white/10">
              <input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage(inputText)}
                className="flex-1 bg-transparent text-white px-4 py-2 outline-none text-sm placeholder-white/40"
                placeholder={t('home.voiceHint')}
              />
              <button
                onClick={() => sendMessage(inputText)}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-300 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-lg">send</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VoiceAssistantModal;
