
import React from 'react';
import { X, Star, CheckCircle, FileText, Globe } from 'lucide-react';
import { Ebook } from '../types';

interface ProductModalProps {
  ebook: Ebook | null;
  onClose: () => void;
  onAddToCart: (ebook: Ebook) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ ebook, onClose, onAddToCart }) => {
  if (!ebook) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white md:text-stone-800 md:bg-stone-100 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="w-full md:w-2/5 h-64 md:h-auto overflow-hidden">
          <img 
            src={ebook.image} 
            alt={ebook.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {ebook.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
              <span className="text-sm font-bold">{ebook.rating}</span>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-2">{ebook.title}</h2>
          <p className="text-stone-500 italic mb-6">Por {ebook.author}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-3 p-4 bg-stone-50 rounded-xl">
              <FileText className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-[10px] text-stone-400 uppercase font-bold">Páginas</p>
                <p className="text-sm font-bold">{ebook.pages}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-stone-50 rounded-xl">
              <Globe className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-[10px] text-stone-400 uppercase font-bold">Formato</p>
                <p className="text-sm font-bold">{ebook.format}</p>
              </div>
            </div>
          </div>

          <p className="text-stone-600 leading-relaxed mb-8">
            {ebook.description}
          </p>

          <div className="space-y-3 mb-10">
            <div className="flex items-center gap-3 text-sm text-stone-600">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Receitas testadas e aprovadas</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-stone-600">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Ilustrações de alta resolução</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-stone-600">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Dicas exclusivas do Chef</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-auto pt-8 border-t border-stone-100">
            <div>
              <p className="text-xs text-stone-400 uppercase font-bold mb-1">Preço Promocional</p>
              <p className="text-3xl font-bold text-stone-900">R$ {ebook.price.toFixed(2)}</p>
            </div>
            <button 
              onClick={() => { onAddToCart(ebook); onClose(); }}
              className="px-10 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-all shadow-xl shadow-orange-600/20"
            >
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
