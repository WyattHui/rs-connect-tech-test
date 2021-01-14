const
  mongodb = require('..'),
  {
    dbName,
    collectionName
  } = require('./common');

module.exports = async id => {
  id = parseInt(id);

  if (isNaN(id)) {
    throw {message: 'ID is not a number.'};
  }

  const client = mongodb();

  try {
    await client.connect();

    let doc = await client.db(dbName)
      .collection(collectionName)
      .findOneAndDelete({id});

    client.close();
    return doc;
  } catch (e) {
    client.close();
    throw e;
  }
};
