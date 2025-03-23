import React from 'react';
import Link from 'next/link';
import Button from '../ui/Button';

const CTASection = () => {
  return (
    <section className="py-16 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">
          Ready to Skip the Wait?
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Join thousands of users saving time while enjoying their favorite restaurants.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/auth/signup">
            <Button size="large" className="bg-white text-primary hover:bg-gray-100">
              Get Started
            </Button>
          </Link>
          <Link href="/restaurants">
            <Button
              variant="outline"
              size="large"
              className="border-white text-white hover:bg-white/10"
            >
              Browse Restaurants
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;