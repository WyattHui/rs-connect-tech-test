const
  {getImages} = require('../../mongodb/image'),
  {
    common400
  } = require('../index'),
  {
    postHandleImage
  } = require('./common');

module.exports = async (req, res) => {
  try {
    let docs = await getImages();
    return res.send(docs.map(postHandleImage));
  } catch (e) {
    return common400(res, e);
  }
};
