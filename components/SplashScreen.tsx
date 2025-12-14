import React, { useEffect, useState } from 'react';
import { Icons } from '../constants';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    // Fade out effect
    const timer = setTimeout(() => {
      setOpacity(0);
    }, 2000);

    // Unmount/Switch screen effect
    const finishTimer = setTimeout(() => {
      onFinish();
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div 
      className="fixed top-0 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 flex flex-col items-center justify-center bg-slate-900 transition-opacity duration-700 ease-out"
      style={{ opacity }}
    >
      <div className="animate-pulse mb-6 transform scale-125">
        <Icons.Cross />
      </div>
      <h1 className="text-4xl font-bold text-white tracking-wide font-serif">TalyaHub</h1>
      <div className="w-16 h-1 bg-amber-500 my-4 rounded-full"></div>
      <p className="text-slate-300 text-sm font-medium tracking-widest uppercase">Connect • Grow • Belong</p>
    </div>
  );
};

export default SplashScreen;