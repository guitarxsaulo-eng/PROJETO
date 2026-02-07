
import React from 'react';
import { Instagram, Mail, MapPin, Phone, ChefHat } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-white">
            <ChefHat className="text-orange-500 w-8 h-8" />
            <h1 className="text-2xl font-bold tracking-tight">
              Cozinha <span className="text-orange-500">&</span> Bolso
            </h1>
          </div>
          <p className="text-sm font-light leading-relaxed">
            Nossa missão é mostrar que o caminho para sua independência financeira não precisa ser amargo. Acreditamos que, entre uma batida de bolo e outra, é possivel construir uma vida doce, digna e lucrativa, usando apenas o que você ja tem na sua cozinha.
          </p>
          <div className="flex items-center gap-4">
           <div className="flex items-center gap-4">
        <a href="https://www.instagram.com/
cozinhadebolso1?igsh=Y3gwMzhrd2EyY3Nn" 
target="_blank" rel="noopener noreferrer" 
className="p-2 bg-white/5 rounded-full 
hover:bg-orange-500 transition-colors inline-flex 
items-center justify-center">
  <Instagram className="w-4 h-4" />
</a>
         </div>
            
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Categorias</h4>
          <ul className="space-y-4 text-sm font-light">
            <li><a href="#" className="hover:text-orange-500 transition-colors">Vegano & Vegetariano</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Sobremesas Gourmet</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Pratos Rápidos</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Cozinha Internacional</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Suporte</h4>
          <ul className="space-y-4 text-sm font-light">
            <li><a href="#" className="hover:text-orange-500 transition-colors">Minha Conta</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Termos de Uso</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Privacidade</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Contato</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Fale Conosco</h4>
          <ul className="space-y-4 text-sm font-light">
            <li className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-orange-500" />
              <span>Barra do garças, - MT</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-orange-500" />
              <span>(66) 99281 9097</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-orange-500" />
              <span>mackerlycustodio@gmail.com
</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-[2px] font-bold">
        <p>&copy; 2024 Cozinha de Bolso. TODOS OS DIREITOS RESERVADOS.</p>
        <p>DESENVOLVIDO COM PAIXÃO PELA GASTRONOMIA</p>
      </div>
    </footer>
  );
};

export default Footer;
