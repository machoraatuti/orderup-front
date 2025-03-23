import React from 'react';
import { Restaurant } from '@/types/restaurant';

interface RestaurantInfoProps {
  restaurant: Restaurant;
}

const RestaurantInfo: React.FC<RestaurantInfoProps> = ({ restaurant }) => {
  // Function to render price level
  const renderPriceLevel = (level: number) => {
    return '₹'.repeat(level);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">{restaurant.name}</h2>
          <p className="text-gray-600 mt-1">{restaurant.description}</p>
          
          <div className="flex items-center mt-2">
            <span className="text-yellow-500">★</span>
            <span className="ml-1 font-medium">{restaurant.rating}</span>
            <span className="mx-1 text-gray-500">•</span>
            <span className="text-gray-500">{restaurant.reviewCount} reviews</span>
            <span className="mx-1 text-gray-500">•</span>
            <span className="text-gray-500">{renderPriceLevel(restaurant.priceLevel)}</span>
          </div>
          
          <div className="mt-2 flex flex-wrap gap-2">
            {restaurant.cuisine.map((cuisine, index) => (
              <span 
                key={index}
                className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
              >
                {cuisine}
              </span>
            ))}
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-gray-500">{restaurant.prepTime} prep time</div>
          <div className="text-sm text-gray-500">{restaurant.distance} away</div>
          <div className={`mt-2 text-sm ${restaurant.isOpen ? 'text-green-600' : 'text-red-600'} font-medium`}>
            {restaurant.isOpen ? 'Open Now' : 'Closed'}
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-start">
          <div className="text-gray-500 mr-2">📍</div>
          <div>
            <div className="font-medium">Address</div>
            <div className="text-gray-600">{restaurant.address}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantInfo;