const
  mongodb = require('../../mongodb'),
  {getImage} = require('../../mongodb/image'),
  {imageCache} = require('../../node-cache'),
  {
    common400
  } = require('../index'),
  {
    commonImage404
  } = require('./common');

module.exports = async (req, res) => {
  let
    imageUrl = req.params.imageUrl,
    matches = imageUrl.match(/(.+)-(\d+)x(\d+).(\w+)/);

  if (!matches) {
    return common400(res, {message: 'Image Url is not correct'});
  }

  let doc = imageCache.get(imageUrl);
  if (doc) {
    let file = doc.file || {};
    return sendImage(res, file.mimetype, file.buffer);
  }

  matches.shift();
  let [name, width, height, fileExtension] = matches;

  width = parseInt(width);
  height = parseInt(height);

  if (
    isNaN(width) ||
    isNaN(height)
  ) {
    return common400(res, {message: 'Some parameters are missing or invalid'});
  }

  try {
    return await mongodb(async client => {
      let doc = await getImage(client, {name, width, height, fileExtension});
      if (!doc) {
        return commonImage404(res);
      }
      let file = doc.file || {};
      return sendImage(res, file.mimetype, file.buffer.value());
    });
  } catch (e) {
    return common400(res, e);
  }
};

const
  sendImage = (res, contentType, value) => {
    res.contentType(contentType);
    return res.end(value, 'binary');
  };
