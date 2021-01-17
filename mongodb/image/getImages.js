const
  {
    dbName,
    collectionName
  } = require('./common');

module.exports = async (client, page, limit) => {
  page = page || 0;
  limit = limit || 10;

  if (
    isNaN(page) ||
    isNaN(limit)
  ) {
    throw {message: 'Some parameters are missing or invalid'};
  }

  return client.db(dbName)
    .collection(collectionName)
    .find()
    .skip(limit * page)
    .limit(limit)
    .toArray();
};
