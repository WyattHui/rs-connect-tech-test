const
  IMAGE_CACHE_TTL = process.env.IMAGE_CACHE_TTL,
  mongodb = require('../../mongodb'),
  {getImageById} = require('../../mongodb/image'),
  {imageCache} = require('../../node-cache'),
  {
    common400
  } = require('../index'),
  {
    commonImage404,
    changeImageByJimp,
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
    return await mongodb(async client => {
      let doc = await getImageById(client, req.params.id);

      if (!doc) {
        return commonImage404(res);
      }

      doc = await changeImageByJimp(doc, jimp => {
        return jimp.resize(width, height);
      });

      let isCacheSuccess = imageCache.set(
        createImageKey(doc),
        doc,
        IMAGE_CACHE_TTL
      );

      if (!isCacheSuccess) {
        return common400(res, {message: 'Cache fail'});
      }

      return res.send(postHandleImage(doc));
    });
  } catch (e) {
    return common400(res, e);
  }
};
