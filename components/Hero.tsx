
import React from 'react';
import { ChevronRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-[500px] flex items-center justify-center overflow-hidden bg-stone-900 text-white">
      <div className="absolute inset-0 z-0">
        <img 
          src="/top.jpeg" 
          alt="Culinária de alta qualidade" 
          className="w-full h-full object-cover opacity-50"
        />
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        <span className="inline-block px-4 py-1 mb-6 text-xs font-semibold uppercase tracking-widest bg-orange-600 rounded-full">
          Novidades de Outono
        </span>
        <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Transforme sua Cozinha em uma <br />
          <span className="text-orange-400 italic">Fábrica de Lucros</span>
        </h2>
        <p className="text-lg md:text-xl text-stone-300 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
          Missão Forno cheio : transformando Farinha e Afeto em Liberdade Financeira. 
          Do básico ao avançado, entregamos o sabor na palma da sua mão.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-all flex items-center gap-2 group shadow-xl shadow-orange-900/20">
            Explorar Coleção
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold rounded-lg transition-all border border-white/30">
            Ver Promoções
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
