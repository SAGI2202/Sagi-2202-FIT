import React from 'react';
import { FEATURES } from '../constants';

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-16 md:py-32 bg-black relative">
       {/* Background Gradient */}
       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-10 md:mb-20">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-3 md:mb-6">
            למה דווקא <span className="text-blue-600">איתי?</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-lg px-4">
            השיטה שפיתחתי משלבת ידע מקצועי, ניסיון בשטח וטכנולוגיה מתקדמת כדי להבטיח שתגיע ליעד שלך.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {FEATURES.map((feature, index) => (
            <div 
              key={index}
              className="group relative p-5 md:p-8 rounded-2xl md:rounded-[30px] bg-slate-900/40 border border-white/5 hover:border-blue-500/50 transition-all duration-500 md:hover:-translate-y-2 hover:bg-slate-900/80 overflow-hidden flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0"
            >
              {/* Hover Gradient (Always visible but subtle on mobile, stronger on hover) */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 to-blue-600/10 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10 shrink-0">
                {/* Icon Container - Slightly smaller on mobile, always colorful accent */}
                <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-800 rounded-xl md:rounded-2xl flex items-center justify-center md:mb-6 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-500 shadow-lg border border-white/5">
                  <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-blue-500 group-hover:text-white transition-colors duration-500" />
                </div>
              </div>
              
              <div className="relative z-10 text-right flex-1">
                <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-4 group-hover:text-blue-400 transition-colors">{feature.title}</h3>
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed group-hover:text-slate-300 transition-colors pl-2 md:pl-0">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};