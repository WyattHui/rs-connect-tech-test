const
  mongodb = require('..'),
  {
    dbName,
    collectionName
  } = require('./common');

module.exports = async (query, opts) => {
  opts = opts || {};
  const
    parentClient = opts.client,
    client = parentClient || mongodb();

  try {
    if (!parentClient) {
      await client.connect();
    }

    let doc = await client.db(dbName)
      .collection(collectionName)
      .findOne(query);

    if (!parentClient) {
      client.close();
    }

    return doc;
  } catch (e) {
    if (!parentClient) {
      client.close();
    }
    throw e;
  }
};
