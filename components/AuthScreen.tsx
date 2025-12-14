import React, { useState } from 'react';
import { Icons } from '../constants';

interface AuthScreenProps {
  onLogin: (role: 'member' | 'admin') => void;
  onForgotPassword: () => void;
  onAddChurch: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin, onForgotPassword, onAddChurch }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  
  // Login & Shared
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Signup only
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthday, setBirthday] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      if (isLogin) {
        // If logging in, ask for role
        setShowRoleSelection(true);
      } else {
        // If signing up (member flow), proceed directly
        onLogin('member');
      }
    }, 1000);
  };

  const handleRoleSelect = (role: 'member' | 'admin') => {
    setShowRoleSelection(false);
    onLogin(role);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 py-12 lg:px-8 bg-stone-50 animate-fadeIn relative">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex justify-center mb-6">
           <div className="p-4 bg-white rounded-full shadow-md border border-stone-100">
             <div className="transform scale-75 text-amber-600">
               <Icons.Cross />
             </div>
           </div>
        </div>
        <h2 className="mt-2 text-center text-3xl font-bold leading-9 tracking-tight text-slate-900 font-serif">
          {isLogin ? 'Welcome Home' : 'Join Our Community'}
        </h2>
        <p className="mt-2 text-center text-sm text-slate-500">
          {isLogin ? 'Sign in to access your spiritual dashboard' : 'Create an account to begin your journey'}
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-white p-8 shadow-xl shadow-slate-200/50 rounded-2xl border border-stone-100">
        <form className="space-y-4" onSubmit={handleSubmit}>
          
          {!isLogin && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-slate-700">
                  First Name
                </label>
                <div className="mt-1">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="block w-full rounded-lg border-0 py-3 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-1 focus:ring-inset focus:ring-slate-900 sm:text-sm sm:leading-6 bg-stone-50 outline-none"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-slate-700">
                  Last Name
                </label>
                <div className="mt-1">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="block w-full rounded-lg border-0 py-3 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-1 focus:ring-inset focus:ring-slate-900 sm:text-sm sm:leading-6 bg-stone-50 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-slate-700">
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-lg border-0 py-3 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-1 focus:ring-inset focus:ring-slate-900 sm:text-sm sm:leading-6 bg-stone-50 outline-none"
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-slate-700">
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="block w-full rounded-lg border-0 py-3 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-1 focus:ring-inset focus:ring-slate-900 sm:text-sm sm:leading-6 bg-stone-50 outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-slate-700">
                Password
              </label>
              {isLogin && (
                <div className="text-sm">
                  <button 
                    type="button"
                    onClick={onForgotPassword}
                    className="font-semibold text-amber-600 hover:text-amber-500"
                  >
                    Forgot password?
                  </button>
                </div>
              )}
            </div>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-lg border-0 py-3 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-1 focus:ring-inset focus:ring-slate-900 sm:text-sm sm:leading-6 bg-stone-50 outline-none"
              />
            </div>
          </div>

          {!isLogin && (
            <>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-slate-700">
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full rounded-lg border-0 py-3 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-1 focus:ring-inset focus:ring-slate-900 sm:text-sm sm:leading-6 bg-stone-50 outline-none"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="birthday" className="block text-sm font-medium leading-6 text-slate-700">
                  Birthday <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <div className="mt-1">
                  <input
                    id="birthday"
                    name="birthday"
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    className="block w-full rounded-lg border-0 py-3 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-1 focus:ring-inset focus:ring-slate-900 sm:text-sm sm:leading-6 bg-stone-50 outline-none"
                  />
                </div>
              </div>
            </>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center rounded-lg bg-slate-900 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-md hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                isLogin ? 'Sign in' : 'Create account'
              )}
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          {isLogin ? "Not a member yet? " : "Already have an account? "}
          <button
            onClick={toggleMode}
            className="font-bold leading-6 text-slate-900 hover:text-amber-600 transition-colors"
          >
            {isLogin ? 'Join the family' : 'Sign in'}
          </button>
        </p>
        
        <div className="mt-8 border-t border-slate-100 pt-6">
           <button
             type="button"
             onClick={onAddChurch}
             className="w-full flex justify-center items-center gap-2 rounded-lg bg-stone-50 px-3 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 hover:bg-stone-100 hover:text-slate-700 transition-all border border-transparent hover:border-slate-200"
           >
             <div className="transform scale-75">
               <Icons.Plus />
             </div>
             Register Church
           </button>
        </div>
      </div>

      {/* Role Selection Modal */}
      {showRoleSelection && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-sm rounded-2xl p-8 shadow-2xl animate-scaleIn">
            <h3 className="text-xl font-bold text-center text-slate-900 mb-2 font-serif">Continue as</h3>
            <p className="text-center text-slate-500 text-sm mb-6">Select your account type to proceed</p>
            
            <div className="space-y-3">
              <button
                onClick={() => handleRoleSelect('member')}
                className="w-full p-4 rounded-xl border border-slate-100 bg-stone-50 hover:bg-white hover:shadow-md hover:border-amber-200 transition-all group flex items-center gap-4 text-left"
              >
                <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 group-hover:text-amber-600 transition-colors">
                  <Icons.User />
                </div>
                <div>
                  <span className="block font-bold text-slate-900">Member</span>
                  <span className="text-xs text-slate-500">Access church community</span>
                </div>
                <div className="ml-auto text-slate-300 group-hover:text-amber-500">
                  <Icons.ChevronRight />
                </div>
              </button>

              <button
                onClick={() => handleRoleSelect('admin')}
                className="w-full p-4 rounded-xl border border-slate-100 bg-stone-50 hover:bg-white hover:shadow-md hover:border-slate-300 transition-all group flex items-center gap-4 text-left"
              >
                <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 group-hover:text-slate-900 transition-colors">
                  <Icons.Shield />
                </div>
                <div>
                  <span className="block font-bold text-slate-900">Admin</span>
                  <span className="text-xs text-slate-500">Manage church & events</span>
                </div>
                <div className="ml-auto text-slate-300 group-hover:text-slate-900">
                  <Icons.ChevronRight />
                </div>
              </button>
            </div>
            
            <button 
              onClick={() => setShowRoleSelection(false)}
              className="mt-6 w-full text-center text-xs text-slate-400 hover:text-slate-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthScreen;