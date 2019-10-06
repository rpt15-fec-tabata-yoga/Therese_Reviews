const faker = require('faker');

module.exports = (numOfData, callback) => {
  let json = [];
  for (let i = 0; i < numOfData; i++) {
    let newReview = [];
    newReview.push(faker.company.companyName());
    newReview.push(faker.internet.userName());
    newReview.push(faker.random.number());
    newReview.push(faker.random.number());
    newReview.push(faker.date.past());
    newReview.push(faker.random.number());
    newReview.push(faker.lorem.paragraph());
    newReview.push(faker.random.boolean());
    newReview.push(faker.random.number());
    newReview.push(faker.random.number());
    newReview.push(faker.random.number());
    newReview.push(faker.random.number());
    newReview.push(faker.image.avatar());
    json.push(newReview);
  }
  callback(null, json);
};
