const
  RESIZE_IMAGE_CACHE_TTL = process.env.RESIZE_IMAGE_CACHE_TTL,
  resizeImg = require('resize-img'),
  {getImageById} = require('../../mongodb/image'),
  {imageCache} = require('../../node-cache'),
  {
    common400
  } = require('../index'),
  {
    commonImage404,
    createImageKey,
    postHandleImage
  } = require('./common');

module.exports = async (req, res) => {
  let
    query = req.query || {},
    width = parseInt(query.width),
    height = parseInt(query.height);

  if (
    isNaN(width) ||
    isNaN(height)
  ) {
    return common400(res, {message: 'Some parameters are missing or invalid'});
  }

  try {
    let doc = await getImageById(req.params.id);

    if (!doc) {
      return commonImage404(res);
    }

    let resizedImage = await resizeImg(
      Buffer.from(doc.file.buffer.value(), 'binary'),
      {width, height}
    );

    doc.width = width;
    doc.height = height;
    doc.file.buffer = resizedImage;

    let isCacheSuccess = imageCache.set(
      createImageKey(doc),
      doc,
      RESIZE_IMAGE_CACHE_TTL
    );

    if (!isCacheSuccess) {
      return common400(res, {message: 'Cache fail'});
    }

    return res.send(postHandleImage(doc));
  } catch (e) {
    return common400(res, e);
  }
};
