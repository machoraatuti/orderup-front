import React from 'react';
import Link from 'next/link';
import Button from '../ui/Button';

const Hero = () => {
  return (
    <div className="relative bg-background">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" aria-hidden="true"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 sm:pt-24 sm:pb-32">
        <div className="text-center md:text-left md:flex md:items-center md:space-x-8">
          <div className="md:flex-1">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Skip the Wait, <br className="hidden sm:block" />
              <span className="text-primary">Not the Experience</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto md:mx-0">
              Pre-order your meals from your favorite restaurants. Your food is ready when you arrive, saving you time without sacrificing quality.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
              <Link href="/auth/signup">
                <Button size="large">Get Started</Button>
              </Link>
              <Link href="/restaurants">
                <Button variant="outline" size="large">Browse Restaurants</Button>
              </Link>
            </div>
          </div>
          
          <div className="mt-10 md:mt-0 md:flex-1">
            <div className="relative mx-auto w-full max-w-md md:max-w-none">
              {/* Placeholder for hero image - would be replaced with an actual image */}
              <div className="aspect-[4/3] bg-gray-200 rounded-xl shadow-lg overflow-hidden">
                <div className="h-full w-full flex items-center justify-center text-gray-400">
                  Hero Image Placeholder
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;