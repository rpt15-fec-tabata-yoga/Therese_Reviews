const mysql = require('mysql');
const Promise = require('bluebird')
const generate = Promise.promisify(require('../generate.js'));

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'reviews_db'
});

const runQuery = (newReviews, connection, loopCnt)  => {
  let sqlString =  `INSERT INTO review (game, author, numOfGames, numOfReviews, posted, recordHours, body, recommended, helpful, unhelpful, funny, comments, userPhoto) VALUES ?`
  return connection.queryAsync(sqlString, [newReviews])
    .then((results) => {
      // console.log(`${results.affectedRows} records inserted`);
      if (loopCnt === 1) {
        console.log('Database seeded.');
        console.log(process.memoryUsage());
        console.log('Finished at', new Date().toLocaleTimeString());
        process.exit();
      }
    })
    .catch(err => {throw err;});

}

const seed = async (numOfRecords, connection) => {
  //use promise.map to control concurrency.
  let reviewsGenerated = []
  // issue lies with the constantly growing reviewsGenerated array.
  // should address this by working in batches.
  let loopCnt = numOfRecords/1000;
  //generate an array of promises
  for (loopCnt; loopCnt > 0; loopCnt--) {
    //if the number of records to seed is not divisible by 1000;
    if (loopCnt < 1) {
      let numReviews = loopCnt * 25;
      generate(numReviews).then((newReviews) => {
        runQuery(newReviews, connection)
      }).then(() => {
        console.log(`${numReviews} reviews seeded.`);
      });
    } else {
      let newReviews = await generate(1000);
      reviewsGenerated.push(newReviews)
    };
    if (loopCnt%10) {
      await Promise.map(reviewsGenerated, (reviews) => {
        runQuery(reviews, connection, loopCnt);
      }).then(() => {
        reviewsGenerated = [];
      }).catch(err => {throw err;});
    }
  };
};

pool.getConnection(async (err, connection) => {
  if (err) {throw err};
  console.log('Started at', new Date().toLocaleTimeString());
  connection = Promise.promisifyAll(connection)
  await seed(1000000, connection);
})

