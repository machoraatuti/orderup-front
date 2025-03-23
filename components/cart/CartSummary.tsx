// components/cart/CartSummary.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

interface CartSummaryProps {
  showCheckoutButton?: boolean;
}

const CartSummary: React.FC<CartSummaryProps> = ({ showCheckoutButton = true }) => {
  const { subtotal, serviceFee, total } = useCart();
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>KSh {subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Service Fee</span>
          <span>KSh {serviceFee.toFixed(2)}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>KSh {total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      {showCheckoutButton && (
        <Link 
          href="/checkout" 
          className="block w-full bg-primary text-white text-center py-3 rounded-lg mt-6 font-medium hover:bg-primary/90 transition"
        >
          Proceed to Checkout
        </Link>
      )}
    </div>
  );
};

export default CartSummary;