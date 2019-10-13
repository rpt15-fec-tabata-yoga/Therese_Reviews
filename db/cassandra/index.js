const cassandra = require('cassandra-driver');
const Promise = require('bluebird');
const generate = Promise.promisify(require('../generate.js'));

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1:9042'],
  localDataCenter: 'datacenter1',
  keyspace: 'reviews_db'
});

client.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('Connected to Cassandra database.')
  };
})

const runBatch = (batchOfReviews, queries) => {

}

const seed = async (numOfReviews) => {
  let batchOfReviews = [];
  let queries = [];
  const queryString = 'INSERT INTO review (game_id, game, author, numOfGames, numOfReviews, posted, recordHours, body, recommended, helpful, unhelpful, funny, comments, userPhoto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  for (let i = 1; i < numOfReviews; i++) {

    //create batches of reviews to be inserted
    let newReview = await generate(1);
    newReview.unshift(i);

  }
}

seed(100)