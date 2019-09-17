const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../db/index.js');
const app = express();
const port = 3001;

app.use('/:gameId', express.static(__dirname + '/../public'));
app.use('/', express.static(__dirname + '/../public'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/reviews/:gameId', (req, res) => {
  db.fetch(req.params.gameId).then((data) => {
    res.status(200);
    res.send(JSON.stringify(data));
  }).catch((err) => {
    res.status(500).send({ error: 'Unable to fetch reviews from the database' });
  });
});

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
