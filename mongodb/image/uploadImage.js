const
  Jimp = require('jimp'),
  {imageMimeType} = require('../../constants'),
  {getNextSequenceValue} = require('../counters'),
  {
    dbName,
    collectionName
  } = require('./common'),
  getImage = require('./getImage'),
  imageSequenceId = 'imageId';

module.exports = async (client, name, file) => {
  file = file || {};
  if (
    !name ||
    !file.size ||
    !imageMimeType.includes(file.mimetype)
  ) {
    throw {message: 'Some parameters are missing or invalid'};
  }

  const db = client.db(dbName);

  let doc = await getImage(client, {name}, {client});
  if (doc) {
    throw {message: 'Name has been used'};
  }

  let
    sequence = await getNextSequenceValue(db, imageSequenceId),
    jimp = await Jimp.read(Buffer.from(file.buffer, 'binary')),
    jimpBitmap = jimp.bitmap;

  file.buffer = await jimp.getBufferAsync(file.mimetype);

  return db.collection(collectionName).insertOne({
    id: sequence.value.sequence_value,
    name,
    width: jimpBitmap.width,
    height: jimpBitmap.height,
    fileExtension: file.originalname.match(/.+\.(.+)/)[1],
    file
  });
};
