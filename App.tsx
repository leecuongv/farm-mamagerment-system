
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import DashboardPage from './pages/DashboardPage';
import LivestockPage from './pages/LivestockPage';
import InventoryPage from './pages/InventoryPage';
import TasksPage from './pages/TasksPage';
import UsersPage from './pages/UsersPage';
import FarmsPage from './pages/FarmsPage';
import FinancePage from './pages/FinancePage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { FarmProvider } from './contexts/FarmContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <FarmProvider>
        <HashRouter>
          <Main />
        </HashRouter>
      </FarmProvider>
    </AuthProvider>
  );
};

const Main: React.FC = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
          <div className="container mx-auto px-6 py-8">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/livestock" element={<LivestockPage />} />
              <Route path="/inventory" element={<InventoryPage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/finance" element={<FinancePage />} />
              {user.role === 'ADMIN' && <Route path="/users" element={<UsersPage />} />}
              {user.role === 'ADMIN' && <Route path="/farms" element={<FarmsPage />} />}
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
