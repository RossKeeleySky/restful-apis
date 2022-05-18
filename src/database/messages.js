const {getDatabase} = require('./mongo');
const {ObjectID} = require('mongodb');

const collectionName = 'messages';

async function insertMessage(message) {
  const database = await getDatabase();
  const {insertedId} = await database.collection(collectionName).insertOne(message);
  return insertedId;
}

async function getMessages() {
  const database = await getDatabase();
  return await database.collection(collectionName).find({}).toArray();
}

async function getMessageById(id) {
  const database = await getDatabase();
  return await database.collection(collectionName).find({ 
    _id: new ObjectID(id), 
  }).toArray();
}

async function deleteMessage(id) {
  const database = await getDatabase();
  await database.collection(collectionName).deleteOne({
    _id: new ObjectID(id),
  });
}

async function updateMessage(id, message) {
  const database = await getDatabase();
  delete message._id;
  await database.collection(collectionName).update(
    { _id: new ObjectID(id), },
    {
      $set: {
        ...message,
      },
    },
  );
}


module.exports = {
  insertMessage,
  getMessages,
  deleteMessage,
  updateMessage,
  getMessageById,
};