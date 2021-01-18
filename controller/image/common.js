const
  Jimp = require('jimp'),
  HOST = process.env.HOST,
  createImageKey = doc => {
    return `${doc.name}-${doc.width}x${doc.height}.${doc.fileExtension}`;
  };

module.exports = {
  createImageKey,
  changeImageByJimp: async (doc, callback) => {
    let
      file = doc.file,
      jimp = await Jimp.read(Buffer.from(file.buffer.value(), 'binary'));

    jimp = callback(jimp);

    let jimpBitmap = jimp.bitmap;
    doc.width = jimpBitmap.width;
    doc.height = jimpBitmap.height;
    doc.file.buffer = await jimp.getBufferAsync(file.mimetype);
    return doc;
  },
  postHandleImage: doc => {
    let {id, name, width, height} = doc;

    return {
      id, name, width, height,
      url: `http://${HOST}/${createImageKey(doc)}`
    };
  },
  commonImage404: res => {
    res.status(404);
    return res.send({message: 'Image object not found'});
  }
};
