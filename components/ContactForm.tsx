import React, { useState } from 'react';
import { Send, CheckCircle, Loader2, Mail, Phone, MapPin } from 'lucide-react';
import { ContactFormState, LoadingState } from '../types';
import { CONTACT_INFO } from '../constants';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormState>({
    name: '',
    phone: '',
    email: '',
    goal: ''
  });
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(LoadingState.LOADING);

    // Construct mailto link
    const subject = encodeURIComponent(`פנייה חדשה לשגיא אברהמי: ${formData.name}`);
    const body = encodeURIComponent(
      `שלום שגיא,\n\n` +
      `התקבלה פנייה חדשה מהאתר:\n` +
      `------------------------\n` +
      `שם מלא: ${formData.name}\n` +
      `טלפון: ${formData.phone}\n` +
      `אימייל: ${formData.email}\n` +
      `מטרה עיקרית: ${formData.goal}\n\n` +
      `נשלח מאתר הנחיתה.`
    );
    
    // Simulate brief processing delay for UX then trigger mailto
    setTimeout(() => {
      // Explicitly sending to sagiavtahami@gmail.com as configured in constants
      window.location.href = `mailto:${CONTACT_INFO.EMAIL}?subject=${subject}&body=${body}`;
      setStatus(LoadingState.SUCCESS);
      
      // Reset form after delay
      setTimeout(() => {
        setFormData({ name: '', phone: '', email: '', goal: '' });
        setStatus(LoadingState.IDLE);
      }, 3000);
    }, 1000);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -right-20 top-20 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-800/20 rounded-full blur-[100px] opacity-50"></div>
        <div className="absolute -left-20 bottom-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-purple-900/20 rounded-full blur-[100px] opacity-50"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          
          {/* Info Side */}
          <div className="lg:w-1/2 space-y-8 lg:space-y-10 text-center lg:text-right relative z-10 w-full">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-6xl font-black text-white mb-4 md:mb-6 leading-tight">
                מוכן לשינוי <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-300">האמיתי שלך?</span>
              </h2>
              <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
                אל תחכה למחר. השאר פרטים עכשיו ואחזור אליך בהקדם לשיחת יעוץ קצרה והתאמת תוכנית אימון מנצחת.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 w-full">
              <a href={`tel:${CONTACT_INFO.PHONE_DISPLAY}`} className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-2xl border border-white/5 hover:bg-slate-900/80 hover:border-blue-500/30 transition-all group">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-500 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Phone className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="text-right overflow-hidden">
                  <div className="text-sm text-slate-400">חייג אלינו</div>
                  <div className="text-lg md:text-xl font-bold text-white font-mono truncate dir-ltr text-right">{CONTACT_INFO.PHONE_DISPLAY}</div>
                </div>
              </a>
              
              <a href={`mailto:${CONTACT_INFO.EMAIL}`} className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-2xl border border-white/5 hover:bg-slate-900/80 hover:border-blue-500/30 transition-all group">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-500 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Mail className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="text-right overflow-hidden">
                  <div className="text-sm text-slate-400">שלח אימייל</div>
                  <div className="text-lg md:text-xl font-bold text-white font-mono truncate text-sm md:text-base">{CONTACT_INFO.EMAIL}</div>
                </div>
              </a>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:w-1/2 w-full relative z-20">
            <div className="glass-card p-6 md:p-10 rounded-[24px] md:rounded-[30px] relative group isolate">
              {/* Background Glow - Pointer Events None */}
              <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-[24px] md:rounded-[30px] opacity-20 group-hover:opacity-40 transition duration-500 blur pointer-events-none -z-10"></div>
              
              <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6 relative z-30">
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2 relative">
                    <label htmlFor="name" className="text-sm font-medium text-slate-300">שם מלא</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="relative z-40 w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white text-base focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all cursor-text"
                      placeholder="ישראל ישראלי"
                    />
                  </div>
                  <div className="space-y-2 relative">
                    <label htmlFor="phone" className="text-sm font-medium text-slate-300">טלפון</label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      required
                      dir="ltr"
                      inputMode="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="relative z-40 w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white text-base text-left focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder-slate-500 cursor-text"
                      placeholder="054-805-9582"
                    />
                  </div>
                </div>

                <div className="space-y-2 relative">
                  <label htmlFor="email" className="text-sm font-medium text-slate-300">אימייל</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="relative z-40 w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white text-base focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all cursor-text"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="space-y-2 relative">
                  <label htmlFor="goal" className="text-sm font-medium text-slate-300">מטרה עיקרית</label>
                  <div className="relative z-40">
                    <select
                      name="goal"
                      id="goal"
                      required
                      value={formData.goal}
                      onChange={handleChange}
                      className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white text-base focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled>בחר מהרשימה</option>
                      <option value="חיטוב והרזיה">🔥 חיטוב והרזיה</option>
                      <option value="עלייה במסת שריר">💪 עלייה במסת שריר</option>
                      <option value="שיפור כושר כללי">🏃 שיפור כושר כללי</option>
                      <option value="הכנה לצבא/תחרות">🏆 הכנה לצבא/תחרות</option>
                    </select>
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === LoadingState.LOADING || status === LoadingState.SUCCESS}
                  className={`
                    relative z-40 w-full py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer
                    ${status === LoadingState.SUCCESS 
                      ? 'bg-green-500 text-white hover:bg-green-600 shadow-[0_0_20px_rgba(34,197,94,0.4)]' 
                      : 'bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:scale-[1.02]'}
                    disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none
                  `}
                >
                  {status === LoadingState.LOADING ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      שולח פרטים...
                    </>
                  ) : status === LoadingState.SUCCESS ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      הפרטים נשלחו בהצלחה!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      אני רוצה להתחיל שינוי
                    </>
                  )}
                </button>
                <p className="text-xs text-center text-slate-500 mt-4 relative z-40">
                  * הפרטים שלך נשלחים ישירות לתיבת המייל של שגיא
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};