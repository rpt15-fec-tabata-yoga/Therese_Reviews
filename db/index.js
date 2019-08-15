const mongoose = require('mongoose');
mongoose.connect('mongod://localhost:3001/reviews');

const Review = mongoose.model('reviews', {
  author: String,
  numOfGames: Number,
  numOfReviews: Number,
  posted: String,
  recordHours: Number,
  body: String,
  recommended: Boolean,
  helpful: Number,
  unhelpful: Number,
  funny: Number,
  comments: Number
});

module.exports = Review;
