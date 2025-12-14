import React, { useState } from 'react';
import { Icons } from '../constants';

interface ChurchCodeScreenProps {
  onSuccess: () => void;
}

const ChurchCodeScreen: React.FC<ChurchCodeScreenProps> = ({ onSuccess }) => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API validation
    setTimeout(() => {
        if (code.trim().length >= 4) {
             setIsLoading(false);
             onSuccess();
        } else {
            setIsLoading(false);
            setError('Please enter a valid church code (min 4 chars).');
        }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 py-12 bg-stone-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex justify-center mb-6">
           <div className="p-4 bg-white rounded-full shadow-lg">
             <div className="transform scale-75 text-slate-900">
               {/* Using a building/temple like icon using standard SVG for church context if Icons doesn't have one, or reusing Cross */}
               <Icons.Cross />
             </div>
           </div>
        </div>
        <h2 className="mt-2 text-center text-3xl font-bold leading-9 text-slate-900 font-serif">
          Find Your Sanctuary
        </h2>
        <p className="mt-2 text-center text-sm text-slate-500">
          Enter the unique ID provided by your congregation to connect.
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-white p-8 shadow-xl shadow-slate-200/50 rounded-2xl border border-stone-100">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="code" className="block text-sm font-medium leading-6 text-slate-700 text-center uppercase tracking-widest">
              Church Code
            </label>
            <div className="mt-2 relative">
              <input
                id="code"
                name="code"
                type="text"
                placeholder="Ex: GRACE-24"
                required
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="block w-full text-center text-2xl tracking-widest uppercase rounded-lg border-0 py-4 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-300 focus:ring-2 focus:ring-inset focus:ring-amber-500 bg-stone-50 font-serif font-bold transition-all"
              />
            </div>
            {error && <p className="mt-2 text-center text-sm text-red-600 animate-pulse">{error}</p>}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading || !code}
              className="flex w-full justify-center rounded-lg bg-slate-900 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-md hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                 <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                 </span>
              ) : (
                'Connect'
              )}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
            <button className="text-xs text-slate-400 hover:text-slate-600 underline decoration-slate-300">
                Where do I find my code?
            </button>
        </div>
      </div>
    </div>
  );
};

export default ChurchCodeScreen;