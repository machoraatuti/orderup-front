export interface Restaurant {
    id: string;
    name: string;
    description: string;
    coverImage: string;
    logo: string;
    address: string;
    distance: string;
    rating: number;
    reviewCount: number;
    priceLevel: 1 | 2 | 3; // 1 = $, 2 = $$, 3 = $$$
    cuisine: string[];
    prepTime: string;
    isOpen: boolean;
  }
  
  export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    isPopular: boolean;
    isVegetarian: boolean;
  }
  
  export interface MenuCategory {
    id: string;
    name: string;
    items: MenuItem[];
  }