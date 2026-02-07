
import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, User, Sparkles } from 'lucide-react';
import { getChefRecommendation } from '../services/geminiService';
import { Ebook, Message } from '../types';
import { EBOOKS_DATA } from '../constants';

interface ChefAIProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChefAI: React.FC<ChefAIProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Olá! Sou o Chef IA. Estou aqui para te ajudar a encontrar o livro de receitas perfeito para o seu momento. O que você gostaria de cozinhar hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const recommendation = await getChefRecommendation(userMsg, EBOOKS_DATA);
      setMessages(prev => [...prev, { role: 'model', text: recommendation || 'Desculpe, tive um problema para processar sua solicitação.' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Houve um erro técnico. Por favor, tente novamente.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-end justify-end p-4 md:p-6 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-lg h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-stone-200">
        <div className="bg-orange-600 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold flex items-center gap-2">
                Chef IA <Sparkles className="w-3 h-3 fill-white" />
              </h3>
              <p className="text-[10px] text-orange-100 uppercase tracking-widest font-bold">Assistente Gastronômico</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-orange-700 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl flex gap-3 ${
                m.role === 'user' 
                  ? 'bg-orange-600 text-white rounded-br-none shadow-md' 
                  : 'bg-white text-stone-800 rounded-bl-none shadow-sm border border-stone-200'
              }`}>
                {m.role === 'model' && <Bot className="w-5 h-5 flex-shrink-0 mt-1 text-orange-600" />}
                <p className="text-sm leading-relaxed">{m.text}</p>
                {m.role === 'user' && <User className="w-5 h-5 flex-shrink-0 mt-1" />}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white text-stone-400 p-3 rounded-2xl shadow-sm border border-stone-200 flex gap-2">
                <span className="w-2 h-2 bg-stone-300 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-stone-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 bg-stone-300 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-stone-100 bg-white">
          <div className="flex gap-2">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Pergunte algo como: Qual livro é bom para iniciantes?"
              className="flex-1 px-4 py-2 bg-stone-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-orange-600 transition-all outline-none"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="p-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 disabled:opacity-50 transition-all shadow-lg shadow-orange-600/20"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChefAI;
