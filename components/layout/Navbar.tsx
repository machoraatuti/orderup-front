import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-primary font-bold text-xl">
              OrderUp
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/auth/login" className="text-gray-700 hover:text-primary">
              Login
            </Link>
            <Link href="/auth/signup" className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/90">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;