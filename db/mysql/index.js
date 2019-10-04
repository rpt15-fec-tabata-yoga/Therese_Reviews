const mysql = require('mysql');
const Promise = require('bluebird')
const generate = Promise.promisify(require('../generate.js'));

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'reviews_db'
});

const seed = (numOfRecords, connection, query) => {
  let loopCnt = numOfRecords/20;
  for (loopCnt; loopCnt > 0; loopCnt--) {
    //if the number of records to seed is not divisible by 10000;
    if (loopCnt < 1) {
      let numReviews = loopCnt * 10000;
      generate(numReviews).then((newReviews) => {
        for (let i = 0; i < newReviews.length; i++) {
          query(`INSERT INTO
            review (game, author, numOfGames, numOfReviews, posted, recordHours, body, recommended, helpful, unhelpful, funny, comments, userPhoto)
          VALUES (${newReviews.game}, ${newReviews.author}, ${newReviews.numOfGames}, ${newReviews.numOfReviews}, ${newReviews.posted}, ${newReviews.recordHours}, ${newReviews.body}, ${newReviews.recommended}, ${newReviews.helpful}, ${newReviews.unhelpful}, ${newReviews.funny}, ${newReviews.comments}, ${newReviews.userPhoto})`.then((error, results, fields) => {
            connection.release();
            if (error) throw error;
            // continue;
          }));
        };
      }).then(() => {
        console.log(`${numReviews} reviews seeded.`);
      });

    } else {
      generate(20).then((newReviews) => {
        for (let i = 0; i < newReviews.length; i++) {
          query(`INSERT INTO
            review (game, author, numOfGames, numOfReviews, posted, recordHours, body, recommended, helpful, unhelpful, funny, comments, userPhoto)
          VALUES (${newReviews.game}, ${newReviews.author}, ${newReviews.numOfGames}, ${newReviews.numOfReviews}, ${newReviews.posted}, ${newReviews.recordHours}, ${newReviews.body}, ${newReviews.recommended}, ${newReviews.helpful}, ${newReviews.unhelpful}, ${newReviews.funny}, ${newReviews.comments}, ${newReviews.userPhoto})`.then((error, results, fields) => {
            console.log(results)
            connection.release();
            if (error) throw error;
            // continue;
          }));
        };
      }).then(() => {
        console.log(`10000 reviews seeded. ${loopCnt} loops left.`)
      });
    };
  }
}

pool.getConnection((err, connection) => {
  if (err) {throw err};
  const query = Promise.promisify(connection.query)
  seed(100, connection, query);
})

