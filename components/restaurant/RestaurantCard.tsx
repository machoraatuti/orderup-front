import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Restaurant } from '@/types/restaurant';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  // Function to render price level
  const renderPriceLevel = (level: number) => {
    return '₹'.repeat(level);
  };

  return (
    <Link 
      href={`/restaurants/${restaurant.id}`}
      className="block bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1"
    >
      <div className="relative h-48">
        <Image
          src={restaurant.coverImage}
          alt={restaurant.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
          className="w-full h-full"
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white text-lg font-semibold">{restaurant.name}</h3>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <div className="flex items-center">
              <span className="text-yellow-500">★</span>
              <span className="ml-1 text-sm font-medium">{restaurant.rating}</span>
              <span className="ml-1 text-xs text-gray-500">({restaurant.reviewCount})</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {restaurant.cuisine.join(' • ')}
            </div>
          </div>
          <div className="text-xs text-gray-500">
            {renderPriceLevel(restaurant.priceLevel)}
          </div>
        </div>
        
        <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
          <div>{restaurant.distance}</div>
          <div>{restaurant.prepTime}</div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;