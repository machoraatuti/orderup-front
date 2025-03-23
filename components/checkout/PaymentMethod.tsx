// components/checkout/PaymentMethod.tsx
import React from 'react';

interface PaymentMethodProps {
  selected: string;
  onChange: (method: string) => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ selected, onChange }) => {
  const methods = [
    { id: 'mpesa', name: 'M-PESA', icon: '📱' },
    { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
    { id: 'cash', name: 'Cash on Arrival', icon: '💵' },
  ];
  
  return (
    <div className="space-y-3">
      {methods.map((method) => (
        <div 
          key={method.id}
          className={`border rounded-lg p-4 flex items-center cursor-pointer ${
            selected === method.id ? 'border-primary bg-primary/5' : 'border-gray-200'
          }`}
          onClick={() => onChange(method.id)}
        >
          <div className="flex h-5 items-center">
            <input
              type="radio"
              checked={selected === method.id}
              onChange={() => onChange(method.id)}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
            />
          </div>
          <div className="ml-3 text-lg mr-2">{method.icon}</div>
          <div className="ml-2 text-sm font-medium text-gray-900">{method.name}</div>
        </div>
      ))}
    </div>
  );
};

export default PaymentMethod;