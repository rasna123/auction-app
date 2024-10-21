const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
    auctionItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AuctionItem',
      required: true
    },
    bidder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    amount: {
      type: Number,
      required: [true, 'Bid amount is required'],
      min: [0, 'Bid amount cannot be negative']
    },
    status: {
      type: String,
      enum: ['active', 'withdrawn', 'won', 'lost'],
      default: 'active'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  // Ensure bid amount is higher than current bid
  bidSchema.pre('save', async function(next) {
    if (this.isNew) {
      const auction = await this.model('AuctionItem').findById(this.auctionItem);
      if (!auction) {
        throw new Error('Auction not found');
      }
      if (!auction.isActive()) {
        throw new Error('Auction is not active');
      }
      if (this.amount <= auction.currentBid) {
        throw new Error('Bid must be higher than current bid');
      }
      if (this.amount < auction.currentBid + auction.minimumBidIncrement) {
        throw new Error(`Minimum bid increment is ${auction.minimumBidIncrement}`);
      }
    }
    next();
  });

  module.exports = mongoose.model('Bid', bidSchema);