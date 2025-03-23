'use client';

import React, { useState, useEffect } from 'react';
import SearchBar from '@/components/restaurant/SearchBar';
import FilterBar from '@/components/restaurant/FilterBar';
import RestaurantList from '@/components/restaurant/RestaurantList';
import { Restaurant } from '@/types/restaurant';

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
  {
    id: '2',
    name: 'Pizza Haven',
    description: 'Authentic Italian pizzas',
    coverImage: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    logo: 'https://via.placeholder.com/150',
    address: '456 Oak Ave, Nairobi',
    distance: '0.8 km',
    rating: 4.5,
    reviewCount: 180,
    priceLevel: 2,
    cuisine: ['Pizza', 'Italian'],
    prepTime: '20-25 min',
    isOpen: true
  },
  {
    id: '3',
    name: 'Sushi World',
    description: 'Fresh sushi and Japanese cuisine',
    coverImage: 'https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    logo: 'https://via.placeholder.com/150',
    address: '789 Elm Blvd, Nairobi',
    distance: '2.2 km',
    rating: 4.8,
    reviewCount: 320,
    priceLevel: 3,
    cuisine: ['Japanese', 'Sushi'],
    prepTime: '25-30 min',
    isOpen: true
  },
  {
    id: '4',
    name: 'Taco Fiesta',
    description: 'Authentic Mexican tacos',
    coverImage: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    logo: 'https://via.placeholder.com/150',
    address: '101 Pine St, Nairobi',
    distance: '1.0 km',
    rating: 4.3,
    reviewCount: 150,
    priceLevel: 1,
    cuisine: ['Mexican', 'Tacos'],
    prepTime: '10-15 min',
    isOpen: true
  },
  {
    id: '5',
    name: 'Cafe Delight',
    description: 'Specialty coffees and pastries',
    coverImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    logo: 'https://via.placeholder.com/150',
    address: '202 Cedar Rd, Nairobi',
    distance: '0.5 km',
    rating: 4.6,
    reviewCount: 210,
    priceLevel: 2,
    cuisine: ['Cafe', 'Desserts'],
    prepTime: '5-10 min',
    isOpen: true
  },
  {
    id: '6',
    name: 'Noodle House',
    description: 'Asian noodles and stir-fries',
    coverImage: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    logo: 'https://via.placeholder.com/150',
    address: '303 Birch Ln, Nairobi',
    distance: '1.8 km',
    rating: 4.4,
    reviewCount: 180,
    priceLevel: 2,
    cuisine: ['Asian', 'Noodles'],
    prepTime: '15-20 min',
    isOpen: true
  }
];

const filterOptions = [
  { id: 'all', label: 'All' },
  { id: 'burgers', label: 'Burgers' },
  { id: 'pizza', label: 'Pizza' },
  { id: 'sushi', label: 'Sushi' },
  { id: 'tacos', label: 'Tacos' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'noodles', label: 'Noodles' },
  { id: 'healthy', label: 'Healthy' },
  { id: 'vegetarian', label: 'Vegetarian' }
];

const RestaurantsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(mockRestaurants);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Filter restaurants based on search term and selected filter
    let results = mockRestaurants;

    if (searchTerm) {
      results = results.filter(
        restaurant =>
          restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          restaurant.cuisine.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedFilter !== 'all') {
      results = results.filter(restaurant =>
        restaurant.cuisine.some(c => c.toLowerCase().includes(selectedFilter.toLowerCase()))
      );
    }

    setFilteredRestaurants(results);
  }, [searchTerm, selectedFilter]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Restaurants</h1>
      
      <div className="mb-6">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search for restaurants or cuisines"
        />
      </div>
      
      <div className="mb-6">
        <FilterBar
          options={filterOptions}
          selectedOption={selectedFilter}
          onChange={setSelectedFilter}
        />
      </div>
      
      <RestaurantList restaurants={filteredRestaurants} isLoading={isLoading} />
    </div>
  );
};

export default RestaurantsPage;