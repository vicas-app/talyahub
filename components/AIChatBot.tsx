import React, { useState, useRef, useEffect } from 'react';
import { Icons } from '../constants';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      role: 'model',
      text: 'Greetings! I am your prayer companion. How can I pray for or encourage you today?',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    const responseText = await sendMessageToGemini(inputText);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMsg]);
    setIsTyping(false);
  };

  return (
    <div className="fixed top-0 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-40 pointer-events-none">
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`absolute bottom-24 right-4 pointer-events-auto p-4 rounded-full shadow-2xl transition-all duration-300 border-2 border-white/10 ${
          isOpen ? 'bg-amber-600 rotate-90' : 'bg-slate-900 hover:bg-slate-800'
        } text-white`}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <Icons.Sparkles />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-0 w-full h-[80vh] pointer-events-auto bg-white shadow-2xl flex flex-col overflow-hidden border border-slate-200 rounded-t-2xl">
          {/* Header */}
          <div className="bg-slate-900 p-4 flex items-center gap-3 border-b-2 border-amber-500">
            <div className="p-2 bg-slate-800 rounded-full text-amber-500">
               <Icons.Sparkles />
            </div>
            <div>
              <h3 className="text-white font-serif font-semibold tracking-wide">Prayer Companion</h3>
              <p className="text-slate-400 text-xs uppercase tracking-wider">AI Spiritual Guide</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-slate-900 text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-slate-100">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-slate-100 pb-safe">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Share a prayer request..."
                className="flex-1 p-3 bg-stone-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm text-slate-900 placeholder:text-slate-400 transition-all"
              />
              <button
                onClick={handleSend}
                disabled={!inputText.trim() || isTyping}
                className="p-3 bg-slate-900 text-amber-500 rounded-xl hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Icons.Send />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChatBot;