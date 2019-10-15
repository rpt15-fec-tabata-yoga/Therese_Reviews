const Promise = require('bluebird');
const noSql = Promise.promisifyAll(require('./cassandra/index.js'));
const sql = Promise.promisifyAll(require('./mysql/index.js'));

let dbUsed = process.env.DB

const fetch = (gameId) => {
  if (dbUsed === 'mysql') {
    return sql.queryAsync(`SELECT * FROM review WHERE game_id = ${gameId}`).then((results) => {
      data = JSON.parse(JSON.stringify(results))
      return data;
    }).catch((err) => {if(err) {throw err}});
  } else if (dbUsed === 'cassandra') {
    return noSql.executeAsync(`SELECT * FROM reviews_db.reviews WHERE game_id = ${gameId}`).then((results) => {
      data = JSON.parse(JSON.stringify(results.rows))
      return data;
    }).catch((err) => {if(err) {throw err}});
  } else {
    console.log ('The database being used is not supported by this app.')
  };
};

const update = (gameId, obj) => {
  if (dbUsed === 'mysql') {
    sql.queryAsync(`UPDATE games SET ${obj.col} = ${obj.val} WHERE game_id = ${gameId}`).then((results) => {
      data = JSON.parse(JSON.stringify(results))
      return data;
    }).catch((err) => {if(err) {throw err}});
  } else if (dbUsed === 'cassandra') {
    noSql.executeAsync(`UPDATE games SET ${obj.col} = ${obj.val} WHERE game_id = ${gameId}`).then((results) => {
      data = JSON.parse(JSON.stringify(results.rows))
      return data;
    }).catch((err) => {if(err) {throw err}});
  } else {
    console.log ('The database being used is not supported by this app.')
  };
};

const remove = (gameId) => {
  if (dbUsed === 'mysql') {
    sql.queryAsync(`DELETE FROM review WHERE game_id = ${gameId}`).then((results) => {
      data = JSON.parse(JSON.stringify(results))
      return data;
    }).catch((err) => {if(err) {throw err}});
  } else if (dbUsed === 'cassandra') {
    noSql.executeAsync(`DELETE FROM review WHERE game_id = ${gameId}`).then((results) => {
      data = JSON.parse(JSON.stringify(results.rows))
      return data;
    }).catch((err) => {if(err) {throw err}});
  } else {
    console.log ('The database being used is not supported by this app.')
  };
};

const add = (review) => {
  if (dbUsed === 'mysql') {
    sql.queryAsync(`INSERT INTO review (game, author, numOfGames, numOfReviews, posted, recordHours, body, recommended, helpful, unhelpful, funny, comments, userPhoto) VALUES ?`, [review]).then((results) => {
      data = JSON.parse(JSON.stringify(results))
      return data;
    }).catch((err) => {if(err) {throw err}});
  } else if (dbUsed === 'cassandra') {
    //need to get a game_id and push it to the review array
    noSql.executeAsync(`INSERT INTO reviews_db.reviews (game_id, game, author, numOfGames, numOfReviews, posted, recordHours, body, recommended, helpful, unhelpful, funny, comments, userPhoto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [review]).then((results) => {
      data = JSON.parse(JSON.stringify(results.rows))
      return data;
    }).catch((err) => {if(err) {throw err}});
  } else {
    console.log ('The database being used is not supported by this app.')
  };
};

module.exports = {
  fetch,
  update,
  remove,
  add
};