import React from 'react';
import { Link } from 'react-router-dom';
import AuctionList from '../components/auction/AuctionList';

const HomePage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          Your Gateway to Extraordinary Finds
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Unlock deals, bid smart, and seize the moment with our online bidding bonanza!
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <Link to="/auctions" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700">
            View Auctions
          </Link>
        </div>
      </div>
      <AuctionList />
    </div>
  );
};

export default HomePage;