import React from 'react';
import AuctionCard from './AuctionCard';

const AuctionList = () => {
  const auctions = [
    {
      id: 1,
      title: 'Sony Black Headphones',
      minBid: 100,
      currentBid: 157,
      endsIn: '1 day 12 hrs',
      image: '/api/placeholder/300/200'
    },
    {
        id: 2,
        title: 'JBL EarBuds',
        minBid: 75,
        currentBid: 97,
        endsIn: '2 day 5 hrs',
        image: '/api/placeholder/300/200'
      },
      {
        id: 3,
        title: 'Apple Airpods',
        minBid: 180,
        currentBid: 239,
        endsIn: '1 day 10 hrs',
        image: '/api/placeholder/300/200'
      },
    // Add more auction items
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {auctions.map(auction => (
        <AuctionCard key={auction.id} auction={auction} />
      ))}
    </div>
  );
};

export default AuctionList;
