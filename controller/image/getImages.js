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
  try {
    return await mongodb(async client => {
      let docs = await getImages(client);
      return res.send(docs.map(postHandleImage));
    });
  } catch (e) {
    return common400(res, e);
  }
};
