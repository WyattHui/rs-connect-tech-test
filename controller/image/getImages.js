const
  mongodb = require('../../mongodb'),
  {getImages} = require('../../mongodb/image'),
  {
    common400
  } = require('../index'),
  {
    postHandleImage
  } = require('./common');

module.exports = async (req, res) => {
  let
    query = req.query || {},
    page = query.page,
    limit = query.limit;

  try {
    return await mongodb(async client => {
      let docs = await getImages(
        client,
        page ? parseInt(page) : null,
        limit ? parseInt(limit) : null
      );
      return res.send(docs.map(postHandleImage));
    });
  } catch (e) {
    return common400(res, e);
  }
};
