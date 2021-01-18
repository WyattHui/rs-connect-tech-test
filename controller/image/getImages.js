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
    page = query.page ? parseInt(query.page) : 0,
    limit = query.limit ? parseInt(query.limit) : 10;

  try {
    return await mongodb(async client => {
      let result = await getImages(client, page, limit);
      result = result[0] || {};
      let
        items = result.items || [],
        counts = result.counts || [],
        countItem = counts[0] || {};

      return res.send({
        items: items.map(postHandleImage),
        page,
        limit,
        totalCount: countItem.count
      });
    });
  } catch (e) {
    return common400(res, e);
  }
};
