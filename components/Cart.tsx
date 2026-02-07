
import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
}

const Cart: React.FC<CartProps> = ({ items, isOpen, onClose, onRemove, onUpdateQuantity }) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-300">
        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-orange-600" />
            <h2 className="text-xl font-bold">Seu Carrinho</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-stone-400 text-center">
              <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-lg font-medium">Seu carrinho está vazio</p>
              <button 
                onClick={onClose}
                className="mt-4 text-orange-600 font-bold hover:underline"
              >
                Continuar Comprando
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 group">
                  <div className="w-20 h-28 bg-stone-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-stone-800 leading-tight">{item.title}</h3>
                    <p className="text-xs text-stone-500 mb-2">Por {item.author}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center border border-stone-200 rounded-md">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="px-2 py-1 hover:bg-stone-50 text-stone-500"
                        > - </button>
                        <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-2 py-1 hover:bg-stone-50 text-stone-500"
                        > + </button>
                      </div>
                      <span className="font-bold text-stone-900">R$ {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => onRemove(item.id)}
                    className="p-2 text-stone-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 bg-stone-50 border-t border-stone-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-stone-600 font-medium">Subtotal</span>
              <span className="text-2xl font-bold text-stone-900">R$ {total.toFixed(2)}</span>
            </div>
            <button className="w-full py-4 bg-stone-900 hover:bg-black text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-black/10">
              Finalizar Compra
            </button>
            <p className="text-[10px] text-stone-400 text-center mt-4 uppercase tracking-widest">
              Entrega imediata em seu e-mail após a confirmação
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
