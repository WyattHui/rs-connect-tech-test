const
  sizeOf = require('image-size'),
  {imageMimeType} = require('../../constants'),
  mongodb = require('..'),
  {getNextSequenceValue} = require('../counters'),
  {
    dbName,
    collectionName
  } = require('./common'),
  getImage = require('./getImage'),
  imageSequenceId = 'imageId';

module.exports = async (name, file) => {
  file = file || {};
  if (
    !name ||
    !file.size ||
    !imageMimeType.includes(file.mimetype)
  ) {
    throw {message: 'Some parameters are missing or invalid'};
  }

  const client = mongodb();
  await client.connect();
  const db = client.db(dbName);

  try {
    let doc = await getImage({name}, {client});
    if (doc) {
      throw {message: 'Name has been used'};
    }

    let
      sequence = await getNextSequenceValue(db, imageSequenceId),
      {width, height} = sizeOf(file.buffer || ''),
      result = await db.collection(collectionName).insertOne({
        id: sequence.value.sequence_value,
        name,
        width,
        height,
        fileExtension: file.originalname.match(/.+\.(.+)/)[1],
        file
      });
    return result;
  } catch (e) {
    client.close();
    throw e;
  }
};
