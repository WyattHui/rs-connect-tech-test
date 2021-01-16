const
  {
    dbName,
    collectionName
  } = require('./common');

module.exports = async (client, id, $set) => {
  id = parseInt(id);

  if (isNaN(id)) {
    throw {message: 'ID is not a number.'};
  }

  if (!$set) {
    throw {message: 'Some parameters are missing or invalid'};
  }

  return client.db(dbName)
    .collection(collectionName)
    .findOneAndUpdate(
      {id},
      {$set},
      {returnOriginal: false}
    );
};
