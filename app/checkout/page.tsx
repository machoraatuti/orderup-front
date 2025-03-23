'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import CartSummary from '@/components/cart/CartSummary';

const CheckoutPage = () => {
  const { items } = useCart();
  
  // Redirect to cart if there are no items
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">You need to add items to your cart before checking out.</p>
          
          <Link 
            href="/restaurants" 
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition"
          >
            Browse Restaurants
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <CheckoutForm />
          </div>
        </div>
        
        <div>
          <CartSummary showCheckoutButton={false} />
          
          <div className="mt-4">
            <Link 
              href="/cart" 
              className="text-primary hover:underline flex items-center"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;