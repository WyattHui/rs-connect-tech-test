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
    let results = await client.db(dbName)
      .collection(collectionName)
      .find()
      .toArray();
    client.close();
    return results;
  } catch (e) {
    client.close();
    throw e;
  }
};
