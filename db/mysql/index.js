const mysql = require('mysql');
const Promise = require('bluebird')
const generate = Promise.promisify(require('../generate.js'));

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'reviews_db'
});

const runQuery = (newReviews, connection)  => {
  for (let i = 0; i < newReviews.length; i++) {
    let sqlString =  `INSERT INTO review (game, author, numOfGames, numOfReviews, posted, recordHours, body, recommended, helpful, unhelpful, funny, comments, userPhoto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    connection.queryAsync(sqlString, newReviews[i]).catch(err => {throw err;});
    // .then((results) => {
    //   console.log('hi')
    //   console.log(results)
    //   connection.release();
    // }).catch((err) => {
    //   throw err;
    // })
  };
}

const seed = (numOfRecords, connection) => {
  let loopCnt = numOfRecords/50;
  for (loopCnt; loopCnt > 0; loopCnt--) {
    //if the number of records to seed is not divisible by 10000;
    if (loopCnt < 1) {
      let numReviews = loopCnt * 10000;
      generate(numReviews).then((newReviews) => {
        runQuery(newReviews, connection)
      }).then(() => {
        console.log(`${numReviews} reviews seeded.`);
      });
    } else {
      generate(50).then((newReviews) => {
        runQuery(newReviews, connection)
      }).then(() => {
        console.log('1000 reviews seeded.')
      });
    };
  };
  process.exit()
};

pool.getConnection((err, connection) => {
  if (err) {throw err};
  connection = Promise.promisifyAll(connection)
  seed(1000000, connection);

})

