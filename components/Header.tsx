
import React from 'react';
import { ShoppingCart, Search, Menu, ChefHat } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenChef: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart, onOpenChef }) => {
  return (
    <header className="sticky top-0 z-50 glass-morphism py-4 px-6 border-b border-stone-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ChefHat className="text-orange-600 w-8 h-8" />
          <h1 className="text-2xl font-bold tracking-tight text-stone-800">
            Cozinha <span className="text-orange-600">de</span> Bolso
          </h1>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <a href="#" className="hover:text-orange-600 transition-colors">Home</a>
          <a href="#" className="hover:text-orange-600 transition-colors">Ebooks</a>
          <button 
            onClick={onOpenChef}
            className="text-orange-600 font-bold hover:scale-105 transition-transform"
          >
            Falar com o Chef IA
          </button>
          <a href="#" className="hover:text-orange-600 transition-colors">Sobre</a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-stone-100 rounded-full transition-colors md:block hidden">
            <Search className="w-5 h-5 text-stone-600" />
          </button>
          <button 
            onClick={onOpenCart}
            className="relative p-2 hover:bg-stone-100 rounded-full transition-colors"
          >
            <ShoppingCart className="w-5 h-5 text-stone-600" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-orange-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </button>
          <button className="md:hidden p-2 hover:bg-stone-100 rounded-full transition-colors">
            <Menu className="w-5 h-5 text-stone-600" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
