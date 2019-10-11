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
  // let vals = '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  // for (let i = 1; i < newReviews.length; i++) {
  //   vals = vals + ', (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  // };
  let sqlString =  `INSERT INTO review (game, author, numOfGames, numOfReviews, posted, recordHours, body, recommended, helpful, unhelpful, funny, comments, userPhoto) VALUES ?`
  //console.log(newReviews)
  connection.queryAsync(sqlString, [newReviews]).then((results) => {console.log(`${results.affectedRows} records inserted`);}).catch(err => {throw err;});

}

const seed = async (numOfRecords, connection) => {
  //use promise.map to control concurrency.
  let reviewsGenerated = []
  let loopCnt = numOfRecords/1000;
  //generate an array of promises
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
      let newReviews = await generate(1000);
      reviewsGenerated.push(newReviews)
    };
  };

  await Promise.map(reviewsGenerated, (reviews) => {
    runQuery(reviews, connection);
  }, {concurrency: 100}).catch(err => {throw err;});


};

pool.getConnection(async (err, connection) => {
  if (err) {throw err};
  console.log('Start time', new Date().toLocaleTimeString());
  connection = Promise.promisifyAll(connection)
  await seed(1000000, connection);
  console.log('Database seeded.');
  console.log('End time', new Date().toLocaleTimeString());
})

