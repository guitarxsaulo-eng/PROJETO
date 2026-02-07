
import React from 'react';
import { Star, ShoppingCart, BookOpen } from 'lucide-react';
import { Ebook } from '../types';

interface EbookCardProps {
  ebook: Ebook;
  onAddToCart: (ebook: Ebook) => void;
  onViewDetails: (ebook: Ebook) => void;
}

const EbookCard: React.FC<EbookCardProps> = ({ ebook, onAddToCart, onViewDetails }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100">
      <div 
        className="relative h-72 overflow-hidden cursor-pointer"
        onClick={() => onViewDetails(ebook)}
      >
        <img 
          src={ebook.image} 
          alt={ebook.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-stone-800 shadow-sm">
          {ebook.category}
        </div>
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          <button 
             onClick={(e) => { e.stopPropagation(); onViewDetails(ebook); }}
             className="p-3 bg-white text-stone-800 rounded-full hover:bg-orange-600 hover:text-white transition-colors shadow-lg"
          >
            <BookOpen className="w-5 h-5" />
          </button>
          <button 
             onClick={(e) => { e.stopPropagation(); onAddToCart(ebook); }}
             className="p-3 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors shadow-lg"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
          <span className="text-xs font-bold text-stone-600">{ebook.rating}</span>
          <span className="text-xs text-stone-400">({ebook.reviews} avaliações)</span>
        </div>
        
        <h3 className="text-lg font-bold text-stone-800 mb-1 group-hover:text-orange-600 transition-colors cursor-pointer" onClick={() => onViewDetails(ebook)}>
          {ebook.title}
        </h3>
        <p className="text-sm text-stone-500 mb-4 italic">Por {ebook.author}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-orange-600">
            R$ {ebook.price.toFixed(2)}
          </span>
          <button 
            onClick={() => ebook.purchaseUrl?
            window.open(ebook.purchaseUrl,'_blank'):
            onAddtoCart(ebook)}
            className="text-xs font-bold text-stone-400 hover:text-orange-600 uppercase tracking-widest transition-colors"
          >
            Comprar Agora
          </button>
        </div>
      </div>
    </div>
  );
};

export default EbookCard;
