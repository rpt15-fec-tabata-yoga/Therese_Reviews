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

// const runBatch = (batchOfReviews, queries) => {

// }

const seed = async (numOfReviews) => {
  console.log('Started at', new Date().toLocaleTimeString());
  let queries = [];
  const queryString = 'INSERT INTO reviews (game_id, game, author, numOfGames, numOfReviews, posted, recordHours, body, recommended, helpful, unhelpful, funny, comments, userPhoto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  for (let i = 0; i < numOfReviews; i++) {
    //create a single review and push to query array
    let obj = {};
    let newReview = await generate(1);
    newReview.unshift(i+1);
    obj.query = queryString;
    obj.params = newReview;
    queries.push(obj);
    //create batches of reviews to be inserted
    if (i%10000) {
      await client.batch(queries, {prepare: true})
        .then((results) => {
          console.log(`GameId = ${queries.params[0]}`)
          const mem = process.memoryUsage().heapUsed;
          console.log(`Heap used: ${Math.round(mem / 1024 / 1024 * 100) / 100} MB`);
          queries = null;
          queries = [];
          if (i===numOfReviews-1){
            //console.log('Database seeded.');
            console.log('Finished at', new Date().toLocaleTimeString());
            process.exit();
          }
        }).catch((err) => { if (err) throw err;})
    }
  }
}

seed(1000000)