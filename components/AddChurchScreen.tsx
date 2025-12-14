import React, { useState } from 'react';
import { Icons } from '../constants';

interface AddChurchScreenProps {
  onBack: () => void;
}

const AddChurchScreen: React.FC<AddChurchScreenProps> = ({ onBack }) => {
  const [churchName, setChurchName] = useState('');
  const [pastorName, setPastorName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setIsLoading(true);

    // Generate Church Code
    // Take first 4 chars of name (or less if short), remove spaces, uppercase, add random 4 digit number
    const prefix = churchName.replace(/[^a-zA-Z]/g, '').substring(0, 4).toUpperCase();
    const randomNum = Math.floor(1000 + Math.random() * 9000); // Random 4 digit number
    const code = `${prefix || 'CHURCH'}-${randomNum}`;

    // Simulate API submission
    setTimeout(() => {
      setGeneratedCode(code);
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col justify-center px-6 py-12 bg-stone-50 animate-fadeIn">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-white p-8 shadow-xl shadow-slate-200/50 rounded-2xl border border-stone-100 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-emerald-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 font-serif mb-2">Registration Complete</h3>
            <p className="text-slate-500 mb-6 leading-relaxed">
                Welcome <strong>{churchName}</strong>! Your account has been created.
            </p>
            
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-8">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Your Church Code</p>
                <div className="flex items-center justify-center gap-2">
                    <p className="text-3xl font-serif font-bold text-slate-900 tracking-wider">{generatedCode}</p>
                    <button 
                        onClick={() => navigator.clipboard.writeText(generatedCode)}
                        className="p-2 text-slate-400 hover:text-amber-500 transition-colors"
                        title="Copy Code"
                    >
                        <Icons.Copy />
                    </button>
                </div>
                <p className="text-xs text-slate-400 mt-2">Share this code with your members to let them join.</p>
            </div>

            <button
              onClick={onBack}
              className="w-full justify-center rounded-lg bg-slate-900 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-md hover:bg-slate-800 transition-all"
            >
              Go to Login
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 bg-stone-50 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
            onClick={onBack}
            className="p-2 -ml-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
        >
            <Icons.ChevronLeft />
        </button>
        <h1 className="text-xl font-bold text-slate-900 font-serif">Register Your Church</h1>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="bg-white p-8 shadow-xl shadow-slate-200/50 rounded-3xl border border-stone-100">
            <div className="mb-6">
                <p className="text-sm text-slate-500">
                    Join the TalyaHub network. Fill out the details below to create a dedicated space for your congregation.
                </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Logo Upload */}
                <div className="flex justify-center mb-6">
                    <div className="relative group">
                        <div className="w-24 h-24 rounded-full bg-slate-50 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden group-hover:border-slate-400 transition-colors">
                            {logoPreview ? (
                                <img src={logoPreview} alt="Church Logo" className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-center p-2 text-slate-400">
                                    <div className="mx-auto w-6 h-6 mb-1">
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                      </svg>
                                    </div>
                                    <span className="text-[9px] uppercase font-bold tracking-wider">Logo</span>
                                </div>
                            )}
                        </div>
                        <label htmlFor="logo-upload" className="absolute bottom-0 right-0 bg-slate-900 text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-slate-800 transition-colors z-10">
                            <Icons.Edit />
                            <input id="logo-upload" type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
                        </label>
                    </div>
                </div>

                <div>
                    <label htmlFor="churchName" className="block text-sm font-medium leading-6 text-slate-700">
                    Church Name
                    </label>
                    <div className="mt-1">
                    <input
                        id="churchName"
                        name="churchName"
                        type="text"
                        required
                        value={churchName}
                        onChange={(e) => setChurchName(e.target.value)}
                        placeholder="Ex: Grace Community Church"
                        className="block w-full rounded-lg border-0 py-3 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6 bg-stone-50"
                    />
                    </div>
                </div>

                <div>
                    <label htmlFor="pastorName" className="block text-sm font-medium leading-6 text-slate-700">
                    Senior Pastor / Leader
                    </label>
                    <div className="mt-1">
                    <input
                        id="pastorName"
                        name="pastorName"
                        type="text"
                        required
                        value={pastorName}
                        onChange={(e) => setPastorName(e.target.value)}
                        className="block w-full rounded-lg border-0 py-3 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6 bg-stone-50"
                    />
                    </div>
                </div>

                <div>
                    <label htmlFor="address" className="block text-sm font-medium leading-6 text-slate-700">
                    Address
                    </label>
                    <div className="mt-1">
                    <input
                        id="address"
                        name="address"
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="123 Faith Street"
                        className="block w-full rounded-lg border-0 py-3 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6 bg-stone-50"
                    />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium leading-6 text-slate-700">
                        City
                        </label>
                        <div className="mt-1">
                        <input
                            id="city"
                            name="city"
                            type="text"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="block w-full rounded-lg border-0 py-3 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6 bg-stone-50"
                        />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium leading-6 text-slate-700">
                        Phone
                        </label>
                        <div className="mt-1">
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="block w-full rounded-lg border-0 py-3 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6 bg-stone-50"
                        />
                        </div>
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-slate-700">
                    Admin Email
                    </label>
                    <div className="mt-1">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@church.com"
                        className="block w-full rounded-lg border-0 py-3 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6 bg-stone-50"
                    />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-slate-700">
                        Password
                        </label>
                        <div className="mt-1">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full rounded-lg border-0 py-3 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6 bg-stone-50"
                        />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-slate-700">
                        Confirm
                        </label>
                        <div className="mt-1">
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="block w-full rounded-lg border-0 py-3 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6 bg-stone-50"
                        />
                        </div>
                    </div>
                </div>

                <div className="pt-4">
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
                        'Register Church'
                    )}
                    </button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default AddChurchScreen;