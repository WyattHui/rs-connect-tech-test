const
  mongodb = require('../../mongodb'),
  {getImageById} = require('../../mongodb/image'),
  {
    common400
  } = require('../index'),
  {
    postHandleImage,
    commonImage404
  } = require('./common');

module.exports = async (req, res) => {
  try {
    return await mongodb(async client => {
      let doc = await getImageById(client, req.params.id);
      if (!doc) {
        return commonImage404(res);
      }
      return res.send(postHandleImage(doc));
    });
  } catch (e) {
    return common400(res, e);
  }
};
