import React, { useState } from 'react';
import { AppScreen } from './types';
import SplashScreen from './components/SplashScreen';
import AuthScreen from './components/AuthScreen';
import ForgotPasswordScreen from './components/ForgotPasswordScreen';
import ChurchCodeScreen from './components/ChurchCodeScreen';
import AddChurchScreen from './components/AddChurchScreen';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.SPLASH);
  const [userRole, setUserRole] = useState<'member' | 'admin'>('member');

  const handleSplashFinish = () => {
    setCurrentScreen(AppScreen.AUTH);
  };

  const handleLogin = (role: 'member' | 'admin') => {
    setUserRole(role);
    if (role === 'admin') {
      // Admins go directly to Dashboard
      setCurrentScreen(AppScreen.DASHBOARD);
    } else {
      // Members need to enter a church code to join a specific congregation
      setCurrentScreen(AppScreen.CHURCH_CODE);
    }
  };

  const handleLogout = () => {
    setCurrentScreen(AppScreen.AUTH);
    setUserRole('member'); // Reset role on logout
  };

  // Always show mobile view for consistency
  const isMobileView = true;

  return (
    <div className={isMobileView ? "w-full max-w-[430px] mx-auto min-h-screen relative shadow-2xl bg-slate-50 overflow-hidden" : "w-full min-h-screen bg-slate-50"}>
      {currentScreen === AppScreen.SPLASH && (
        <SplashScreen onFinish={handleSplashFinish} />
      )}

      {currentScreen === AppScreen.AUTH && (
        <AuthScreen 
          onLogin={handleLogin}
          onForgotPassword={() => setCurrentScreen(AppScreen.FORGOT_PASSWORD)}
          onAddChurch={() => setCurrentScreen(AppScreen.ADD_CHURCH)}
        />
      )}

      {currentScreen === AppScreen.FORGOT_PASSWORD && (
        <ForgotPasswordScreen onBack={() => setCurrentScreen(AppScreen.AUTH)} />
      )}

      {currentScreen === AppScreen.ADD_CHURCH && (
        <AddChurchScreen onBack={() => setCurrentScreen(AppScreen.AUTH)} />
      )}

      {currentScreen === AppScreen.CHURCH_CODE && (
        <ChurchCodeScreen onSuccess={() => setCurrentScreen(AppScreen.DASHBOARD)} />
      )}

      {currentScreen === AppScreen.DASHBOARD && (
        <>
          <Dashboard onLogout={handleLogout} userRole={userRole} />
        </>
      )}
    </div>
  );
};

export default App;