import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { LanguageProvider } from './i18n/LanguageContext';
import { ToastProvider } from './components/shared/Toast';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import IssueReportingPage from './pages/IssueReportingPage';
import MyVillagePage from './pages/MyVillagePage';
import MarketsPage from './pages/MarketsPage';
import CommunityPage from './pages/CommunityPage';
import SettingsPage from './pages/SettingsPage';
import './index.css';

function App() {
  return (
    <LanguageProvider>
      <AppProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/admin" element={<AdminDashboardPage />} />
                <Route path="/report" element={<IssueReportingPage />} />
                <Route path="/village" element={<MyVillagePage />} />
                <Route path="/markets" element={<MarketsPage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </AppProvider>
    </LanguageProvider>
  );
}

export default App;
