const Review = require('./index.js');
const faker = require('faker');

const seed = (numOfData) => {
  var json = [];
  for (var i = 0; i < numOfData; ++i) {
    var newReview = {};
    newReview.author = faker.internet.userName();
    newReview.numOfGames = faker.random.number();
    newReview.numOfReviews = faker.random.number();
    newReview.posted = faker.date.past();
    newReview.recordHours = faker.random.number;
    newReview.body = faker.lorem.paragraph();
    newReview.recommended = faker.random.boolean();
    newReview.helpful = faker.random.number();
    newReview.unhelpful = faker.random.number();
    newReview.funny = faker.random.number();
    newReview.comments = faker.random.number();
    json.push(newReview);
  }

  if (json.length >= numOfData) {
    Review.collection.insertMany(json, (err) => {
      if (err) {
        throw(err);
      } else {
        console.log('Successfully seeded data!');
      }
    });
  }
}

seed(100);
