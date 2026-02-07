
export type Category = 'Todos' | 'Vegano' | 'Sobremesas' | 'Rápido & Fácil' | 'Internacional' | 'Saudável';

export interface Ebook {
  id: string;
  title: string;
  author: string;
  price: number;
  description: string;
  category: Category;
  rating: number;
  reviews: number;
  image: string;
  pages: number;
  format: string;
  purchaseUrl?: string;
}

export interface CartItem extends Ebook {
  quantity: number;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
