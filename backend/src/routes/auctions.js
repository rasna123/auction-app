// src/routes/auctions.js
const express = require('express');
const router = express.Router();
const AuctionItem = require('../models/AuctionItem.js');
const auth = require('../middleware/auth.js');

// Create auction item
router.post('/',auth.auth, async (req, res) => {
  try {
    const auctionItem = new AuctionItem({
      ...req.body,
      seller: req.user.userId,
      currentBid: req.body.startingBid
    });
    await auctionItem.save();
    res.status(201).json(auctionItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all auction items
router.get('/', async (req, res) => {
  try {
    const auctions = await AuctionItem.find({ status: 'active' })
      .populate('seller', 'username')
      .sort({ createdAt: -1 });
    res.json(auctions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update auction item
router.patch('/:id', async (req, res) => {
  try {
    const auction = await AuctionItem.findOne({
      _id: req.params.id,
      seller: req.user.userId
    });
    if (!auction) {
      return res.status(404).json({ error: 'Auction not found' });
    }
    Object.assign(auction, req.body);
    await auction.save();
    res.json(auction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete auction item
router.delete('/:id', async (req, res) => {
  try {
    const auction = await AuctionItem.findOneAndDelete({
      _id: req.params.id,
      seller: req.user.userId
    });
    if (!auction) {
      return res.status(404).json({ error: 'Auction not found' });
    }
    res.json({ message: 'Auction deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;