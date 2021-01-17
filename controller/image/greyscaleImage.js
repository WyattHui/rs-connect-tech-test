const
  mongodb = require('../../mongodb'),
  {
    getImageById,
    updateImage
  } = require('../../mongodb/image'),
  {
    common400
  } = require('../index'),
  {
    commonImage404,
    changeImageByJimp,
    postHandleImage
  } = require('./common');

module.exports = async (req, res) => {
  let id = req.params.id;

  try {
    return await mongodb(async client => {
      let doc = await getImageById(client, id);

      if (!doc) {
        return commonImage404(res);
      }

      doc = await changeImageByJimp(doc, jimp => {
        return jimp.greyscale();
      });

      let result = await updateImage(client, id, doc);
      return res.send(postHandleImage(result.value));
    });
  } catch (e) {
    return common400(res, e);
  }
};
