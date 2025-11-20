import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { ContactForm } from './components/ContactForm';
import { FloatingSocials } from './components/FloatingSocials';
import { AIChatbot } from './components/AIChatbot';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500 selection:text-white font-sans">
      <Header />
      
      <main>
        <Hero />
        
        {/* About / Philosophy Mini Section */}
        <section id="about" className="py-16 md:py-20 bg-slate-950 border-y border-white/5">
          <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-10 md:gap-12">
            <div className="w-full md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop" 
                alt="Training Philosophy" 
                className="rounded-[20px] md:rounded-3xl shadow-2xl border border-white/10 md:grayscale md:hover:grayscale-0 transition-all duration-500 w-full object-cover h-[300px] md:h-auto"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-6 text-center md:text-right">
              <h2 className="text-3xl md:text-4xl font-black">
                יותר מסתם אימון, <br />
                <span className="text-blue-500">זו דרך חיים.</span>
              </h2>
              <p className="text-slate-300 leading-relaxed text-base md:text-lg">
                אני מאמין שכושר הוא לא רק פיזי, הוא מנטלי. השיטה שלי מתמקדת בבניית הרגלים בריאים שישארו איתך לכל החיים.
                בלי דיאטות כאסח, בלי אימונים ששוברים את הגוף - אלא עבודה חכמה, מדויקת ועקבית.
              </p>
              <ul className="space-y-3 mt-4 inline-block text-right">
                {['מעקב צמוד 24/7', 'התאמה אישית לכל רמה', 'קהילה תומכת וחזקה'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300 text-base md:text-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <Services />
        <ContactForm />
      </main>

      {/* Footer */}
      <footer className="bg-black py-8 md:py-8 pb-32 md:pb-8 border-t border-white/10 text-center text-slate-500 text-sm relative z-10">
        <div className="container mx-auto px-6">
          <p>© {new Date().getFullYear()} שגיא אברהמי - כושר וחיטוב. כל הזכויות שמורות.</p>
          <p className="mt-2 text-xs text-slate-700">נבנה בטכנולוגיה מתקדמת.</p>
        </div>
      </footer>

      {/* Floating Elements - High Z-Index */}
      <FloatingSocials />
      <AIChatbot />
    </div>
  );
};

export default App;