const
  {
    dbName,
    collectionName
  } = require('./common');

module.exports = async client => {
  return client.db(dbName)
    .collection(collectionName)
    .find()
    .toArray();
};
