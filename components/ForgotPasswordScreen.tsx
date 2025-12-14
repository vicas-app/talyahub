import React, { useState } from 'react';
import { Icons } from '../constants';

interface ForgotPasswordScreenProps {
  onBack: () => void;
}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1500);
  };

  if (isSent) {
    return (
      <div className="min-h-screen flex flex-col justify-center px-6 py-12 bg-stone-50 animate-fadeIn">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-white p-8 shadow-xl shadow-slate-200/50 rounded-2xl border border-stone-100 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-emerald-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-serif mb-2">Check your mail</h3>
            <p className="text-sm text-slate-500 mb-6">
                We have sent a password recover instructions to your email.
            </p>
            <button
              onClick={onBack}
              className="w-full justify-center rounded-lg bg-slate-900 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-md hover:bg-slate-800 transition-all"
            >
              Back to Sign In
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 py-12 bg-stone-50 animate-fadeIn">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex justify-center mb-6">
           <div className="p-4 bg-white rounded-full shadow-lg">
             <div className="transform scale-75">
               <Icons.Cross />
             </div>
           </div>
        </div>
        <h2 className="mt-2 text-center text-3xl font-bold leading-9 tracking-tight text-slate-900 font-serif">
          Forgot Password?
        </h2>
        <p className="mt-2 text-center text-sm text-slate-500">
          No worries, we'll send you reset instructions.
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-white p-8 shadow-xl shadow-slate-200/50 rounded-2xl border border-stone-100">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-slate-700">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-lg border-0 py-3 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6 bg-stone-50"
              />
            </div>
          </div>

          <div>
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
                'Send Reset Link'
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
            <button 
                onClick={onBack}
                className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors mx-auto"
            >
                <Icons.ChevronLeft />
                Back to log in
            </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;