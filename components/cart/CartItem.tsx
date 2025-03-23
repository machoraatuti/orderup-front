// components/cart/CartItem.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { MenuItem } from '@/types/restaurant';

interface CartItemProps {
  item: MenuItem & { quantity: number };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  
  return (
    <div className="flex py-4 border-b border-gray-100">
      <div className="relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="80px"
          style={{ objectFit: 'cover' }}
        />
      </div>
      
      <div className="ml-4 flex-1">
        <div className="flex justify-between">
          <div>
            <h3 className="text-base font-medium">{item.name}</h3>
            <p className="mt-1 text-sm text-gray-500 line-clamp-1">{item.description}</p>
          </div>
          <p className="text-base font-medium">KSh {item.price.toFixed(2)}</p>
        </div>
        
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center border border-gray-200 rounded-full">
            <button 
              className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-100"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
            >
              -
            </button>
            <span className="w-8 text-center">{item.quantity}</span>
            <button 
              className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-100"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              +
            </button>
          </div>
          
          <button 
            className="text-sm text-gray-500 hover:text-red-500"
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;