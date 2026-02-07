
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import EbookCard from './components/EbookCard';
import Cart from './components/Cart';
import ChefAI from './components/ChefAI';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import { EBOOKS_DATA,BRAND_DATA } from './constants';
import { Ebook, CartItem, Category } from './types';
// Added Sparkles to the import list from lucide-react
import { Filter, SlidersHorizontal, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChefOpen, setIsChefOpen] = useState(false);
  const [selectedEbook, setSelectedEbook] = useState<Ebook | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>('Todos');

  const filteredEbooks = useMemo(() => {
    if (activeCategory === 'Todos') return EBOOKS_DATA;
    return EBOOKS_DATA.filter(eb => eb.category === activeCategory);
  }, [activeCategory]);

  const handleAddToCart = (ebook: Ebook) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === ebook.id);
      if (existing) {
        return prev.map(item => 
          item.id === ebook.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...ebook, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const categories: Category[] = ['Todos', 'Sobremesas', 'Rápido & Fácil', 'Internacional', 'Saudável'];

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        cartCount={cartItems.reduce((acc, curr) => acc + curr.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)}
        onOpenChef={() => setIsChefOpen(true)}
      />

      <main className="flex-grow">
        <Hero />

        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-bold text-stone-800 mb-2">Explore Nossa Biblioteca</h2>
              <p className="text-stone-500 font-light">Ebooks interativos com as melhores técnicas de culinária.</p>
            </div>

            <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
              <div className="flex items-center gap-2 p-2 bg-stone-100 rounded-lg md:hidden">
                <SlidersHorizontal className="w-4 h-4 text-stone-600" />
                <span className="text-xs font-bold text-stone-600">Filtros</span>
              </div>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                    activeCategory === cat 
                      ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' 
                      : 'bg-white text-stone-500 hover:bg-stone-50 border border-stone-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredEbooks.map(ebook => (
              <EbookCard 
                key={ebook.id} 
                ebook={ebook} 
                onAddToCart={handleAddToCart}
                onViewDetails={(eb) => setSelectedEbook(eb)}
              />
            ))}
          </div>

          {filteredEbooks.length === 0 && (
            <div className="py-20 text-center text-stone-400">
              <Filter className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>Nenhum ebook encontrado nesta categoria.</p>
            </div>
          )}
        </section>

        {/* Floating AI Trigger */}
        <button 
          onClick={() => setIsChefOpen(true)}
          className="fixed bottom-8 left-8 z-[90] group flex items-center gap-3 bg-stone-900 text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-all"
        >
          <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform">
            <Sparkles className="w-5 h-5 fill-white" />
          </div>
          <span className="font-bold text-sm mr-2 hidden md:inline">Pergunte ao Chef IA</span>
        </button>
      </main>

      <Footer />

      <Cart 
        isOpen={isCartOpen}
        items={cartItems}
        onClose={() => setIsCartOpen(false)}
        onRemove={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
      />

      <ChefAI 
        isOpen={isChefOpen}
        onClose={() => setIsChefOpen(false)}
      />

      <ProductModal 
        ebook={selectedEbook}
        onClose={() => setSelectedEbook(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default App;
