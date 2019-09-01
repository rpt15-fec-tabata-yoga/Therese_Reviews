const Review = require('./index.js');
const faker = require('faker');

const seed = (numOfData) => {
  let json = [];
  for (let i = 0; i < 45; ++i) {
    let newReview = {};
    newReview.game = 'Stardew Valley';
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
    newReview.userPhoto = faker.image.avatar();
    json.push(newReview);
  }

  numOfData -= 45;

  for (let i = 0; i < numOfData; ++i) {
    let newReview = {};
    newReview.game = faker.company.companyName();
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
    newReview.userPhoto = faker.image.avatar();
    json.push(newReview);
  }

  if (json.length >= numOfData) {
    Review.Review.collection.insertMany(json, (err) => {
      if (err) {
        throw(err);
      } else {
        console.log('Successfully seeded data!');
      }
    });
  }
};

seed(100);
