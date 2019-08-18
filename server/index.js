const express = require('express');
const bodyParser = require('body-parser');
const db = require('../db/index.js');
const app = express();
const port = 3001;

app.use(express.static(__dirname + '/../public/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/reviews', (req, res) => {
  db.fetch().then((data) => {
    res.status(200);
    res.send(JSON.stringify(data));
  }).catch((err) => {
    res.status(500).send({ error: 'Unable to fetch reviews from the database' });
  });
});

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
