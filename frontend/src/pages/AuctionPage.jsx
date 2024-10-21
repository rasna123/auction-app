import React, { useState, useEffect } from 'react';
import { Search, Filter, Clock, DollarSign } from 'lucide-react';

const AuctionListPage = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    status: 'all',
    minPrice: '',
    maxPrice: ''
  });
  const [sortBy, setSortBy] = useState('endTime');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchAuctions();
  }, [filters, sortBy, searchQuery]);

  const fetchAuctions = async () => {
    try {
      setLoading(true);
      // Convert filters to query string
      const queryParams = new URLSearchParams({
        category: filters.category,
        status: filters.status,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        sortBy,
        search: searchQuery
      }).toString();

      const response = await fetch(`http://localhost:5050/api/auctions?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch auctions');
      }

      const data = await response.json();
      setAuctions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeLeft = (endTime) => {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end - now;

    if (diff <= 0) return 'Ended';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filter Section */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <input
                type="text"
                placeholder="Search auctions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>
          
          <div className="flex gap-4 flex-wrap">
            <select
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="all">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="art">Art</option>
              <option value="collectibles">Collectibles</option>
              <option value="vehicles">Vehicles</option>
            </select>

            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="ending-soon">Ending Soon</option>
              <option value="ended">Ended</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="endTime">End Time</option>
              <option value="currentPrice">Current Price</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="flex gap-4 items-center">
          <div className="relative">
            <input
              type="number"
              placeholder="Min Price"
              value={filters.minPrice}
              onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
              className="pl-8 pr-4 py-2 border rounded-lg"
            />
            <DollarSign className="absolute left-2 top-2.5 text-gray-400" size={20} />
          </div>
          <span>-</span>
          <div className="relative">
            <input
              type="number"
              placeholder="Max Price"
              value={filters.maxPrice}
              onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
              className="pl-8 pr-4 py-2 border rounded-lg"
            />
            <DollarSign className="absolute left-2 top-2.5 text-gray-400" size={20} />
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-8">Loading auctions...</div>
      ) : (
        /* Auction Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {auctions.map((auction) => (
            <div
              key={auction.id}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={auction.imageUrl || "/api/placeholder/400/300"}
                alt={auction.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{auction.title}</h3>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm text-gray-600">
                    Current Bid:
                  </div>
                  <div className="font-semibold text-lg">
                    ${auction.currentPrice.toLocaleString()}
                  </div>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm text-gray-600">
                    Total Bids:
                  </div>
                  <div>{auction.totalBids}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock size={16} className="mr-1" />
                    {formatTimeLeft(auction.endTime)}
                  </div>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                    onClick={() => window.location.href = `/auction/${auction.id}`}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {!loading && auctions.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No auctions found matching your criteria
        </div>
      )}
    </div>
  );
};

export default AuctionListPage;

