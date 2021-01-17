const
  {
    dbName,
    collectionName
  } = require('./common');

module.exports = async (client, query) => {
  return client.db(dbName)
    .collection(collectionName)
    .findOne(query);
};
