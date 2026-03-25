const API_BASE = 'http://localhost:3001/api';

export const api = {
  async get<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${API_BASE}${endpoint}`);
    if (!res.ok) throw new Error(`API Error: ${res.status}`);
    return res.json();
  },

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`API Error: ${res.status}`);
    return res.json();
  },

  // Specific endpoints
  getAlerts: () => api.get<{ success: boolean; data: Array<{ id: number; message: string; type: string }> }>('/alerts'),
  getWeather: () => api.get<{ success: boolean; data: { temperature: number; condition: string; humidity: number; wind: number; icon: string } }>('/weather'),
  getHealthScore: () => api.get<{ success: boolean; data: { score: number; status: string; description: string; highlight: string; suffix: string } }>('/health-score'),
  getStats: () => api.get<{ success: boolean; data: Record<string, unknown> }>('/stats'),
  getActivity: () => api.get<{ success: boolean; data: Array<{ id: number; text: string; time_text: string; icon: string; color: string }> }>('/stats/activity'),
  getCommunity: () => api.get<{ success: boolean; data: Array<Record<string, unknown>> }>('/stats/community'),
  getIssues: () => api.get<{ success: boolean; data: Array<Record<string, unknown>> }>('/issues'),
  submitIssue: (data: Record<string, unknown>) => api.post<{ success: boolean; data: Record<string, unknown>; message: string }>('/issues', data),
  getSchemes: () => api.get<{ success: boolean; data: Array<{ id: number; name: string; description: string; status: string; progress: number; deadline: string; beneficiaries: number; icon: string }> }>('/schemes'),
  getMandiPrices: () => api.get<{ success: boolean; data: Array<{ id: number; commodity: string; price: number; unit: string; market: string; change_percent: number; trend: string }> }>('/mandi-prices'),
  processVoice: (text: string, language?: string) => api.post<{ success: boolean; data: { input: string; response: string } }>('/voice/process', { text, language: language || 'en' }),
};
