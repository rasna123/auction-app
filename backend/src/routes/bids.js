
// src/routes/bids.js
const express = require('express');
const router = express.Router();
const Bid = require('../models/Bid.js');
const AuctionItem = require('../models/AuctionItem.js');
const auth = require('../middleware/auth.js');

// Place bid
router.post('/:auctionId', async (req, res) => {
  try {
    const auction = await AuctionItem.findById(req.params.auctionId);
    if (!auction) {
      return res.status(404).json({ error: 'Auction not found' });
    }
    if (auction.endDate < new Date()) {
      return res.status(400).json({ error: 'Auction has ended' });
    }
    if (req.body.amount <= auction.currentBid) {
      return res.status(400).json({ error: 'Bid must be higher than current bid' });
    }
    
    const bid = new Bid({
      auctionItem: auction._id,
      bidder: req.user.userId,
      amount: req.body.amount
    });
    await bid.save();
    
    auction.currentBid = req.body.amount;
    await auction.save();
    
    res.status(201).json(bid);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get bid history for an auction
router.get('/:auctionId', async (req, res) => {
  try {
    const bids = await Bid.find({ auctionItem: req.params.auctionId })
      .populate('bidder', 'username')
      .sort({ amount: -1 });
    res.json(bids);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;