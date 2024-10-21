import React from 'react';
import { Heart } from 'lucide-react';

const AuctionCard = ({ auction }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="relative">
        <img className="h-48 w-full object-cover" src={auction.image} alt={auction.title} />
        <button className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-sm">
          <Heart className="h-5 w-5 text-gray-400" />
        </button>
      </div>
      <div className="p-4">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Live Auction
        </span>
        <h3 className="mt-2 text-lg font-medium text-gray-900">{auction.title}</h3>
        <div className="mt-2 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Minimum Bid</p>
            <p className="text-lg font-medium text-gray-900">${auction.minBid}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Current Bid</p>
            <p className="text-lg font-medium text-gray-900">${auction.currentBid}</p>
          </div>
        </div>
        <div className="mt-4">
          <button className="w-full bg-gradient-to-r from-red-500 to-blue-500 text-white px-4 py-2 rounded-md">
            Bid Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;
