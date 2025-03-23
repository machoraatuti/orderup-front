// components/checkout/CheckoutForm.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import PaymentMethod from './PaymentMethod';

interface FormData {
  name: string;
  phone: string;
  email: string;
  arrivalTime: string;
  specialInstructions: string;
  paymentMethod: string;
}

const CheckoutForm: React.FC = () => {
  const router = useRouter();
  const { clearCart } = useCart();
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    arrivalTime: '30',
    specialInstructions: '',
    paymentMethod: 'mpesa',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const setPaymentMethod = (method: string) => {
    setFormData(prev => ({
      ...prev,
      paymentMethod: method
    }));
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // This would be an API call in a real app
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Clear cart and redirect to success page
      clearCart();
      router.push('/checkout/success');
    } catch (error) {
      console.error('Checkout error:', error);
      setErrors({
        form: 'An error occurred during checkout. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const arrivalTimeOptions = [
    { value: '15', label: 'In 15 minutes' },
    { value: '30', label: 'In 30 minutes' },
    { value: '45', label: 'In 45 minutes' },
    { value: '60', label: 'In 1 hour' },
    { value: '90', label: 'In 1.5 hours' },
    { value: '120', label: 'In 2 hours' },
  ];
  
  return (
    <form onSubmit={handleSubmit}>
      {errors.form && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
          {errors.form}
        </div>
      )}
      
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`block w-full rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`block w-full rounded-md border ${errors.phone ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50`}
              />
              {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`block w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-4">Order Details</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="arrivalTime" className="block text-sm font-medium text-gray-700 mb-1">
                When will you arrive?
              </label>
              <select
                id="arrivalTime"
                name="arrivalTime"
                value={formData.arrivalTime}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
              >
                {arrivalTimeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700 mb-1">
                Special Instructions (optional)
              </label>
              <textarea
                id="specialInstructions"
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleChange}
                rows={3}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                placeholder="Any special requests or dietary requirements?"
              ></textarea>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
          <PaymentMethod
            selected={formData.paymentMethod}
            onChange={setPaymentMethod}
          />
        </div>
        
        <div className="flex items-center">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            required
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
            I agree to the <a href="#" className="text-primary hover:underline">Terms and Conditions</a>
          </label>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition disabled:opacity-70"
        >
          {isLoading ? 'Processing...' : 'Complete Order'}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;