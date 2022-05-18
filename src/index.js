const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { startDatabase } = require('./database/mongo');
const { insertMessage, getMessages, deleteMessage, updateMessage, getMessageById } = require('./database/messages');

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

// endpoint to return all messages
app.get('/messages', async (req, res) => {
  res.send(await getMessages());
});

app.get('/messages/:id', async (req, res) => {
  res.send(await getMessageById(req.params.id));
})

app.post('/messages', async (req, res) => {
  const newMessage = req.body;
  await insertMessage(newMessage);
  res.send('message inserted');
});

app.delete('/messages/:id', async (req, res) => {
  await deleteMessage(req.params.id);
  res.send('message deleted');
});

app.put('/messages/:id', async (req, res) => {
  const updatedMessage = req.body;
  await updateMessage(req.params.id, updatedMessage);
  res.send('message updated');
});

startDatabase().then(async () => {
  await insertMessage({title: 'Hello, now from the in-memory database!'});

  app.listen(3001, async () => {
    console.log('listening on port 3001');
  });
});