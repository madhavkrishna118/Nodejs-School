const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <form action="/submit" method="post">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name"><br><br>
      <label for="age">Age:</label>
      <input type="text" id="age" name="age"><br><br>
      <input type="submit" value="Submit">
    </form>
  `);
});

app.post('/submit', (req, res) => {
  const { name, age } = req.body;
  res.send(`Received the submission: Name - ${name}, Age - ${age}`);
});

app.listen(port, () => {
  console.log(`School form app listening at http://localhost:${port}`);
});
