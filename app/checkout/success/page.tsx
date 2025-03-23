import React from 'react';
import Link from 'next/link';

const OrderSuccessPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
        
        <p className="text-gray-600 mb-6">
          Your order has been received and is being prepared. You will receive a confirmation email shortly.
        </p>
        
        <div className="p-4 bg-gray-50 rounded-lg mb-6 text-left">
          <div className="text-sm text-gray-500 mb-1">Order ID</div>
          <div className="font-medium">#ORD-{Math.floor(10000 + Math.random() * 90000)}</div>
          
          <div className="text-sm text-gray-500 mt-4 mb-1">Estimated Preparation Time</div>
          <div className="font-medium">20-25 minutes</div>
        </div>
        
        <p className="text-gray-600 italic mb-6">
          Remember to arrive at the restaurant at your selected time. Your food will be ready for pickup!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/restaurants" 
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition"
          >
            Order More Food
          </Link>
          
          <Link 
            href="/orders" 
            className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition"
          >
            View Your Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;