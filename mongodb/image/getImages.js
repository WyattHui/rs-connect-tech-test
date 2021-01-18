const
  {
    dbName,
    collectionName
  } = require('./common');

module.exports = async (client, page, $limit) => {
  if (
    isNaN(page) ||
    isNaN($limit)
  ) {
    throw {message: 'Some parameters are missing or invalid'};
  }

  return client.db(dbName)
    .collection(collectionName)
    .aggregate([
      {$facet: {
        items: [
          {$match: {}},
          {$skip: page * $limit},
          {$limit}
        ],
        counts: [
          {$count: 'count'}
        ]
      }}
    ])
    .toArray();
};
