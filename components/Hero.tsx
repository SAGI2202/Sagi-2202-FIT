import React, { useState, useEffect } from 'react';
import { ChevronDown, Activity, ShieldCheck } from 'lucide-react';

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop", // Dark Gym Atmosphere
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop", // Original Gym
  "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop", // Weights / Strength
  "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2069&auto=format&fit=crop"  // High Intensity
];

export const Hero: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000); // Switch every 6 seconds
    return () => clearInterval(timer);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12 md:pt-20 md:pb-0">
      {/* Dynamic Background Gallery */}
      <div className="absolute inset-0 z-0">
        {HERO_IMAGES.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImage ? 'opacity-30' : 'opacity-0'
            }`}
          >
            <img 
              src={img} 
              alt={`רקע כושר ${index + 1}`} 
              className="w-full h-full object-cover scale-105 animate-[pulse_15s_ease-in-out_infinite]"
            />
          </div>
        ))}
        
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-blue-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-black/60 to-black"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-20">
        
        {/* Text Content */}
        <div className="w-full md:w-1/2 space-y-6 md:space-y-8 text-center md:text-right order-2 md:order-1">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-blue-600/10 border border-blue-500/30 backdrop-blur-md mx-auto md:mx-0">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-500 rounded-full animate-pulse"></span>
            <span className="text-blue-400 text-[10px] md:text-xs font-bold tracking-widest uppercase">שגיא אברהמי - כושר וחיטוב</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1] md:leading-[0.9] tracking-tight">
            העתיד של <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-bl from-blue-400 via-blue-600 to-blue-800 text-glow">
              עולם הכושר
            </span>
          </h1>
          
          <p className="text-slate-300 text-base md:text-xl max-w-xl leading-relaxed font-light mx-auto md:mx-0 px-2 md:px-0">
            הגוף שאתה רוצה הוא לא חלום, הוא תוצאה של תוכנית מדויקת.
            הצטרף למהפכת הכושר של שגיא אברהמי ותתחיל לראות תוצאות אמיתיות.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-2 md:pt-4 justify-center md:justify-start w-full sm:w-auto px-4 sm:px-0">
            <a 
              href="#contact" 
              onClick={(e) => handleScroll(e, 'contact')}
              className="group relative px-8 py-3.5 md:py-4 bg-blue-600 rounded-xl font-bold text-white overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] cursor-pointer flex justify-center items-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <span className="relative flex items-center gap-2">
                מתחילים עכשיו <Activity className="w-5 h-5" />
              </span>
            </a>
            <a 
              href="#services" 
              onClick={(e) => handleScroll(e, 'services')}
              className="px-8 py-3.5 md:py-4 bg-white/5 border border-white/10 rounded-xl font-bold text-white hover:bg-white/10 hover:border-blue-500/30 transition-all backdrop-blur-sm flex items-center gap-2 justify-center cursor-pointer"
            >
              למידע נוסף
            </a>
          </div>
        </div>

        {/* Visual Element */}
        <div className="w-full md:w-1/2 relative flex justify-center md:justify-end order-1 md:order-2 mt-4 md:mt-0">
          <div className="relative w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[500px] md:h-[500px]">
            {/* Tech Circles */}
            <div className="absolute inset-0 border border-blue-500/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
            <div className="absolute inset-6 md:inset-8 border border-blue-400/10 rounded-full animate-[spin_15s_linear_infinite_reverse] border-dashed"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
            
            {/* Main Image */}
            <div className="absolute inset-4 md:inset-6 rounded-full overflow-hidden border-4 border-white/5 shadow-2xl shadow-blue-900/50">
              <img 
                src={HERO_IMAGES[currentImage]} 
                alt="Sagi Avrahami Fitness"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
            
            {/* Floating Stats Badge */}
            <div className="absolute bottom-0 -left-4 md:-left-10 bg-slate-900/90 backdrop-blur-xl border border-blue-500/30 p-4 rounded-2xl shadow-xl animate-bounce [animation-duration:3s]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-bold">תוצאות מוכחות</div>
                  <div className="text-lg font-black text-white">100% הצלחה</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
        <ChevronDown className="w-6 h-6 text-slate-500" />
      </div>
    </section>
  );
};