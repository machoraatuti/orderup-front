import React from 'react';
import Image from 'next/image';
import { MenuItem } from '@/types/restaurant';

interface MenuSectionProps {
  title: string;
  items: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
}

const MenuSection: React.FC<MenuSectionProps> = ({ title, items, onAddToCart }) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4 px-4">{title}</h3>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="p-4 flex border-b border-gray-100">
            <div className="flex-1 pr-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium">
                    {item.name}
                    {item.isVegetarian && (
                      <span className="ml-2 px-1 py-0.5 text-xs bg-green-100 text-green-800 rounded">
                        Veg
                      </span>
                    )}
                    {item.isPopular && (
                      <span className="ml-2 px-1 py-0.5 text-xs bg-orange-100 text-orange-800 rounded">
                        Popular
                      </span>
                    )}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                </div>
                <div className="text-primary font-medium">KSh {item.price.toFixed(2)}</div>
              </div>
              <button
                onClick={() => onAddToCart(item)}
                className="mt-3 bg-primary text-white text-sm py-1 px-3 rounded-full hover:bg-primary/90 transition"
              >
                Add to Cart
              </button>
            </div>
            {item.image && (
              <div className="w-24 h-24 flex-shrink-0 relative rounded-md overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="96px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuSection;