const mongoose = require('mongoose');

const auctionItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters long']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    minlength: [10, 'Description must be at least 10 characters long']
  },
  startingBid: {
    type: Number,
    required: [true, 'Starting bid is required'],
    min: [0, 'Starting bid cannot be negative']
  },
  currentBid: {
    type: Number,
    default: function() {
      return this.startingBid;
    }
  },
  currentBidder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Electronics', 'Fashion', 'Home', 'Sports', 'Other']
  },
  images: [{
    type: String,
    validate: {
      validator: function(v) {
        // Basic URL validation
        return /^https?:\/\/.+\..+/.test(v);
      },
      message: props => `${props.value} is not a valid URL`
    }
  }],
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required'],
    validate: {
      validator: function(v) {
        return v > this.startDate;
      },
      message: 'End date must be after start date'
    }
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'ended', 'cancelled'],
    default: 'active'
  },
  minimumBidIncrement: {
    type: Number,
    default: 1,
    min: [0.01, 'Minimum bid increment must be at least 0.01']
  },
  viewers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
auctionItemSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Method to check if auction is active
auctionItemSchema.methods.isActive = function() {
  return this.status === 'active' && this.endDate > new Date();
};

// Method to get auction details
auctionItemSchema.methods.toPublicJSON = function() {
  return {
    id: this._id,
    title: this.title,
    description: this.description,
    currentBid: this.currentBid,
    startingBid: this.startingBid,
    seller: this.seller,
    category: this.category,
    images: this.images,
    startDate: this.startDate,
    endDate: this.endDate,
    status: this.status,
    minimumBidIncrement: this.minimumBidIncrement,
    createdAt: this.createdAt
  };
};

module.exports = mongoose.model('AuctionItem', auctionItemSchema);