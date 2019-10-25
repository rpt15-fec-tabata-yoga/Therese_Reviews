const Promise = require('bluebird');
const pool = Promise.promisifyAll(require('./index.js'));
const generate = Promise.promisify(require('../generate.js'));
const faker = require('faker');

const runQuery = (newReviews, loopCnt)  => {
  let sqlString =  `INSERT INTO review (author, numOfGames, numOfReviews, posted, recordHours, body, recommended, helpful, unhelpful, funny, comments, userPhoto, game_id) VALUES ?`
  return pool.queryAsync(sqlString, [newReviews])
    .then((results) => {
      // console.log(`${results.affectedRows} records inserted`);
      // const mem = process.memoryUsage().heapUsed;
      // console.log(`Heap used: ${Math.round(mem / 1024 / 1024 * 100) / 100} MB`);

      if (loopCnt === 1) {
        console.log('Database seeded.');
        // console.log(process.memoryUsage());
        console.log('Finished at', new Date().toLocaleTimeString());
        process.exit();
      }
    })
    .catch(err => {throw err;});

}

const seed = async (numOfRecords) => {
  console.log('Started seeding reviews at', new Date().toLocaleTimeString());
  //use promise.map to control concurrency.
  let reviewsGenerated = [];
  // issue lies with the constantly growing reviewsGenerated array.
  // should address this by working in batches.
  let loopCnt = numOfRecords/1000;
  //generate an array of promises
  for (loopCnt; loopCnt > 0; loopCnt--) {
    //if the number of records to seed is not divisible by 1000;
    if (loopCnt < 1) {
      let numReviews = loopCnt * 1000;
      generate(numReviews).then((newReviews) => {
        reviewsGenerated.push(newReviews)
      })
    } else {
      //generate 100 reviews per game
      let newReviews = await generate(1000, gameId);
      reviewsGenerated.push(newReviews);
    };
    //increasing the number of record that are generated to be inserted allocated memory more efficiently
    if (loopCnt%1000) {
      //adding concurrency doesn't seem to be working as I would expect..
      await Promise.map(reviewsGenerated, (reviews) => {
        runQuery(reviews, loopCnt);
      }, {concurrency: 100}).then(() => {
        reviewsGenerated = null;
        reviewsGenerated= [];
      }).catch(err => {throw err;});
    }
  };
};

const seedGames = async (numOfReviews) => {
  console.log('Seeding games at', new Date().toLocaleTimeString());
  const numOfGames = numOfReviews/100;
  let gamesAry = [];
  let sqlString = `INSERT INTO game (name) VALUES ?`
  for (let i = 0; i < numOfGames; i++) {
    gamesAry.push(faker.company.companyName());
    if (i%1000) {
      await pool.queryAsync(sqlString, [gamesAry]).then(() => {
        gamesAry = null;
        gamesAry= [];
        if (i === numOfGames-1) {
          console.log('Finished seeding games at', new Date().toLocaleTimeString());
        }
      }).catch(err => {throw err;});
    }
  }
}

seedGames(10000000);
seed(10000000);