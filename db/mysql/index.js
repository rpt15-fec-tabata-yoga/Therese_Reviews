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
  let vals = '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  for (let i = 1; i < newReviews.length; i++) {
    vals = vals + ', (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  };
  let sqlString =  `INSERT INTO review (game, author, numOfGames, numOfReviews, posted, recordHours, body, recommended, helpful, unhelpful, funny, comments, userPhoto) VALUES ${vals}`
  connection.queryAsync(sqlString, newReviews).catch(err => {throw err;});
}

const seed = async (numOfRecords, connection) => {
  let loopCnt = numOfRecords/25;
  for (loopCnt; loopCnt > 0; loopCnt--) {
    //if the number of records to seed is not divisible by 10000;
    if (loopCnt < 1) {
      let numReviews = loopCnt * 25;
      generate(numReviews).then((newReviews) => {
        runQuery(newReviews, connection)
      }).then(() => {
        console.log(`${numReviews} reviews seeded.`);
      });
    } else {
      generate(25).then((newReviews) => {
        runQuery(newReviews, connection)
      }).then(() => {
        // console.log('10000 reviews seeded.');
        console.log('Database seeded.');
        console.log('End time', new Date().toLocaleTimeString());
      }).catch(err => {throw err;});
    };
  };
};

pool.getConnection((err, connection) => {
  if (err) {throw err};
  console.log('Start time', new Date().toLocaleTimeString());
  connection = Promise.promisifyAll(connection)
  seed(100000, connection);
})

