const faker = require('faker');

module.exports = (numOfData, callback) => {
  let json = [];
  for (let i = 0; i < numOfData; i++) {
    let newReview = {};
    newReview.game = faker.company.companyName();
    newReview.author = faker.internet.userName();
    newReview.numOfGames = faker.random.number();
    newReview.numOfReviews = faker.random.number();
    newReview.posted = faker.date.past();
    newReview.recordHours = faker.random.number();
    newReview.body = faker.lorem.paragraph();
    newReview.recommended = faker.random.boolean();
    newReview.helpful = faker.random.number();
    newReview.unhelpful = faker.random.number();
    newReview.funny = faker.random.number();
    newReview.comments = faker.random.number();
    newReview.userPhoto = faker.image.avatar();
    json.push(newReview);
  }
  callback(null, json);
};
