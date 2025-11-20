import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Sparkles } from 'lucide-react';
import { Message } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

export const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      text: 'היי! אני העוזר האישי של שגיא אברהמי 🤖. אני כאן כדי לענות על שאלות בנושאי כושר, תזונה או תוכניות האימון שלנו. איך אני יכול לעזור לך היום?',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isTyping]);

  // Hide the "Need help?" prompt after 10 seconds or when opened
  useEffect(() => {
    if (isOpen) setShowPrompt(false);
    const timer = setTimeout(() => setShowPrompt(false), 15000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const responseText = await sendMessageToGemini(userMsg.text, history);

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("Chat error", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: "סליחה, יש לי בעיה בתקשורת כרגע. נסה שוב מאוחר יותר או פנה לשגיא בוואצאפ.",
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  return (
    <div className="fixed bottom-6 left-6 z-[100] flex flex-col items-start font-sans pointer-events-none">
      
      {/* Chat Window */}
      <div 
        className={`
          pointer-events-auto
          transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) transform origin-bottom-left
          ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-10 pointer-events-none'}
          w-[300px] sm:w-[360px] h-[450px] sm:h-[550px] bg-slate-950/95 backdrop-blur-xl
          border border-blue-500/40 rounded-2xl shadow-[0_0_60px_rgba(37,99,235,0.3)]
          flex flex-col overflow-hidden mb-4 relative ring-1 ring-white/10
        `}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900/80 to-slate-900/80 p-4 border-b border-white/10 flex justify-between items-center backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h3 className="font-bold text-white text-base leading-none">העוזר של שגיא</h3>
              <span className="text-[11px] text-blue-300 font-medium tracking-wide">מחובר כעת</span>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-950">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}
            >
              <div 
                className={`
                  max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-md animate-in fade-in slide-in-from-bottom-2 duration-300
                  ${msg.role === 'user' 
                    ? 'bg-slate-800 text-white rounded-tr-sm border border-slate-700' 
                    : 'bg-blue-600 text-white rounded-tl-sm shadow-blue-900/20'}
                `}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-end">
              <div className="bg-blue-600/10 border border-blue-500/20 p-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-slate-900 border-t border-white/5">
          <div className="relative flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="שאל אותי כל דבר..."
              className="flex-1 bg-slate-950 text-white text-sm rounded-xl pl-4 pr-12 py-3 border border-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder-slate-500"
            />
            <button 
              onClick={handleSendMessage}
              disabled={isTyping || !inputText.trim()}
              className="absolute left-1.5 top-1.5 bottom-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white w-9 rounded-lg transition-all flex items-center justify-center shadow-lg"
            >
              <Send className="w-4 h-4 rotate-180" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Toggle Button */}
      <div className="relative pointer-events-auto flex items-center gap-4">
         {/* Prompt Bubble */}
        <div 
          className={`
            absolute left-full ml-4 bottom-2 bg-white text-black px-4 py-2 rounded-xl rounded-bl-none shadow-xl whitespace-nowrap
            transition-all duration-500 transform origin-bottom-left
            ${showPrompt && !isOpen ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-95 -translate-x-4 pointer-events-none'}
          `}
        >
          <div className="text-sm font-bold">צריך עזרה? שאל את ה-AI! 🤖</div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            group relative flex items-center justify-center w-16 h-16 
            bg-gradient-to-br from-blue-600 to-blue-800
            rounded-full shadow-[0_0_30px_rgba(37,99,235,0.5)] 
            hover:scale-110 transition-all duration-300 z-50
            border-2 border-blue-400/30
          `}
        >
          <span className="absolute inset-0 rounded-full bg-blue-400 opacity-20 animate-ping"></span>
          
          {isOpen ? (
            <X className="w-7 h-7 text-white relative z-10" />
          ) : (
            <>
              <Bot className="w-8 h-8 text-white relative z-10 animate-[bounce_2s_infinite]" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-white z-20">1</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};