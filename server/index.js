const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
