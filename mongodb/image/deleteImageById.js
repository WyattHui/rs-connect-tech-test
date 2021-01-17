const
  {
    dbName,
    collectionName
  } = require('./common');

module.exports = async (client, id) => {
  id = parseInt(id);

  if (isNaN(id)) {
    throw {message: 'ID is not a number.'};
  }

  return client.db(dbName)
    .collection(collectionName)
    .findOneAndDelete({id});
};
