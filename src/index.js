const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

const messages = [
  {message: 'Hello hello hello'}
];

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

// endpoint to return all messages
app.get('/messages', (req, res) => {
  res.send(messages);
});

app.post('/messages', (req, res) => {
  const newMessage = req.body;
  messages.push(newMessage);
  res.send('message has been added');
});

app.listen(3001, () => {
  console.log('listening on port 3001');
});