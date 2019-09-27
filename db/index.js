const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://database:27017/reviews', { useNewUrlParser: true });

let dbConnection = mongoose.connection;
dbConnection.on('error', console.error.bind(console, 'mongodb connection error'));
dbConnection.once('open', () => {
  console.log('connected to mongoDb');
});

const schema = new mongoose.Schema({
  game: String,
  gameId: Number,
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
  comments: Number,
  userPhoto: String
})

const Review = mongoose.model('Reviews', schema);

const fetch = (gameId) => {
  return Review.find({gameId: gameId});
};

module.exports = {
  db,
  Review,
  fetch
};
