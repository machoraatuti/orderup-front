'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import RestaurantInfo from '@/components/restaurant/RestaurantInfo';
import MenuSection from '@/components/restaurant/MenuSection';
import { Restaurant, MenuItem, MenuCategory } from '@/types/restaurant';

// Mock data - in a real app, this would come from an API
const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Burger Palace',
    description: 'Gourmet burgers and sides',
    coverImage: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    logo: 'https://via.placeholder.com/150',
    address: '123 Main St, Nairobi',
    distance: '1.5 km',
    rating: 4.7,
    reviewCount: 250,
    priceLevel: 2,
    cuisine: ['Burgers', 'American'],
    prepTime: '15-20 min',
    isOpen: true
  },
  // Add more restaurants from your previous mock data
];

// Mock menu data
const mockMenuCategories: Record<string, MenuCategory[]> = {
  '1': [
    {
      id: 'cat1',
      name: 'Popular Items',
      items: [
        {
          id: 'item1',
          name: 'Classic Cheeseburger',
          description: 'Beef patty with cheese, lettuce, tomato, and special sauce',
          price: 550,
          image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
          category: 'Popular Items',
          isPopular: true,
          isVegetarian: false
        },
        {
          id: 'item2',
          name: 'Crispy Chicken Burger',
          description: 'Crispy fried chicken with lettuce, mayo, and pickles',
          price: 600,
          image: 'https://images.unsplash.com/photo-1615297319597-fd8d2a472661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2hpY2tlbiUyMGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
          category: 'Popular Items',
          isPopular: true,
          isVegetarian: false
        }
      ]
    },
    {
      id: 'cat2',
      name: 'Burgers',
      items: [
        {
          id: 'item3',
          name: 'Double Bacon Burger',
          description: 'Two beef patties with bacon, cheese, and BBQ sauce',
          price: 750,
          image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
          category: 'Burgers',
          isPopular: false,
          isVegetarian: false
        },
        {
          id: 'item4',
          name: 'Veggie Burger',
          description: 'Plant-based patty with lettuce, tomato, and vegan mayo',
          price: 500,
          image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmVnZ2llJTIwYnVyZ2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
          category: 'Burgers',
          isPopular: false,
          isVegetarian: true
        }
      ]
    },
    {
      id: 'cat3',
      name: 'Sides',
      items: [
        {
          id: 'item5',
          name: 'French Fries',
          description: 'Crispy golden fries with seasoning',
          price: 250,
          image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZnJlbmNoJTIwZnJpZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
          category: 'Sides',
          isPopular: true,
          isVegetarian: true
        },
        {
          id: 'item6',
          name: 'Onion Rings',
          description: 'Battered and fried onion rings with dipping sauce',
          price: 300,
          image: 'https://images.unsplash.com/photo-1619983081563-430f63602796?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b25pb24lMjByaW5nc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
          category: 'Sides',
          isPopular: false,
          isVegetarian: true
        }
      ]
    },
    {
      id: 'cat4',
      name: 'Drinks',
      items: [
        {
          id: 'item7',
          name: 'Coca Cola',
          description: 'Classic cola soft drink (500ml)',
          price: 150,
          image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvY2ElMjBjb2xhfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
          category: 'Drinks',
          isPopular: false,
          isVegetarian: true
        },
        {
          id: 'item8',
          name: 'Chocolate Milkshake',
          description: 'Creamy chocolate milkshake with whipped cream',
          price: 350,
          image: 'https://images.unsplash.com/photo-1594488506255-a8bbfdeedbf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2hvY29sYXRlJTIwbWlsa3NoYWtlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
          category: 'Drinks',
          isPopular: false,
          isVegetarian: true
        }
      ]
    }
  ]
};

const RestaurantDetailPage = () => {
  const params = useParams();
  const id = params.id as string;
  
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('menu');
  const [cartCount, setCartCount] = useState(0);
  
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const foundRestaurant = mockRestaurants.find(r => r.id === id) || null;
      setRestaurant(foundRestaurant);
      
      // Get menu categories for this restaurant
      setMenuCategories(mockMenuCategories[id] || []);
      
      setIsLoading(false);
    }, 500);
  }, [id]);
  
  const handleAddToCart = (item: MenuItem) => {
    // In a real app, this would add to a cart context/state
    setCartCount(prev => prev + 1);
    console.log('Added to cart:', item);
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 animate-pulse">
        <div className="h-64 bg-gray-300 rounded-lg mb-6"></div>
        <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3 mb-8"></div>
        
        <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
        <div className="h-32 bg-gray-300 rounded mb-6"></div>
        
        <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
        <div className="h-32 bg-gray-300 rounded"></div>
      </div>
    );
  }
  
  if (!restaurant) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Restaurant not found</h2>
        <p className="text-gray-600 mb-8">The restaurant you're looking for doesn't exist or has been removed.</p>
        <Link href="/restaurants" className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90">
          Browse Restaurants
        </Link>
      </div>
    );
  }
  
  return (
    <div>
      {/* Cover Image */}
      <div className="relative h-64 md:h-80">
        <Image
          src={restaurant.coverImage}
          alt={restaurant.name}
          fill
          style={{ objectFit: 'cover' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-4">
          <Link href="/restaurants" className="inline-flex items-center text-white mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
              <path d="M15 19L8 12L15 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Restaurants
          </Link>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        {/* Restaurant Info */}
        <RestaurantInfo restaurant={restaurant} />
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-3 px-4 font-medium text-sm ${activeTab === 'menu' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
            onClick={() => setActiveTab('menu')}
          >
            Menu
          </button>
          <button
            className={`py-3 px-4 font-medium text-sm ${activeTab === 'reviews' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
          <button
            className={`py-3 px-4 font-medium text-sm ${activeTab === 'info' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
            onClick={() => setActiveTab('info')}
          >
            Info
          </button>
        </div>
        
        {/* Tab Content */}
        {activeTab === 'menu' && (
          <div>
            {menuCategories.map(category => (
              <MenuSection
                key={category.id}
                title={category.name}
                items={category.items}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
        
        {activeTab === 'reviews' && (
          <div className="py-4">
            <p className="text-gray-500">Reviews coming soon...</p>
          </div>
        )}
        
        {activeTab === 'info' && (
          <div className="py-4">
            <h3 className="font-medium mb-2">About {restaurant.name}</h3>
            <p className="text-gray-600 mb-4">{restaurant.description}</p>
            
            <h3 className="font-medium mb-2">Location</h3>
            <p className="text-gray-600">{restaurant.address}</p>
          </div>
        )}
      </div>
      
      {/* Cart Button (fixed at bottom) */}
      {cartCount > 0 && (
        <div className="fixed bottom-6 left-0 right-0 flex justify-center px-4">
          <Link 
            href="/cart" 
            className="bg-primary text-white py-3 px-6 rounded-full shadow-lg flex items-center"
          >
            <span className="bg-white text-primary rounded-full w-6 h-6 flex items-center justify-center mr-2">
              {cartCount}
            </span>
            View Cart
          </Link>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetailPage;