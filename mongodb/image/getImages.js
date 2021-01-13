const
  mongodb = require('..'),
  {
    dbName,
    collectionName
  } = require('./common');

module.exports = async () => {
  const client = mongodb();

  try {
    await client.connect();
    return client.db(dbName)
      .collection(collectionName)
      .find()
      .toArray();
  } catch (e) {
    client.close();
    throw e;
  }
};
