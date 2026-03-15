export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface Brand {
  id: string;
  name: string;
  description: string;
  logo: string;
  coverImage: string;
  products: Product[];
}

export interface Category {
  id: string;
  name: string;
  image: string;
}