import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Search, ChevronDown } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img className="h-8 w-auto" src="/logo.svg" alt="Genix Auctions" />
            </Link>
            <nav className="hidden md:ml-6 md:flex space-x-8">
              <Link to="/auctions" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900">
                Auctions <ChevronDown className="ml-1 h-4 w-4" />
              </Link>
              <Link to="/about" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
                About
              </Link>
            </nav>
          </div>
          <div className="flex items-center">
            <Link to="/login" className="text-sm font-medium text-gray-500 hover:text-gray-900 mr-4">
              Login
            </Link>
            <Link to="/signup" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;