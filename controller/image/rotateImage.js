const
  patchJimpRotate = require('../../libs/patch-jimp-rotate'),
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
  let
    id = req.params.id,
    query = req.query || {},
    degrees = parseInt(query.degrees);

  if (
    isNaN(degrees) ||
    ![90, 180, 270].includes(degrees)
  ) {
    return common400(res, {message: 'Some parameters are missing or invalid'});
  }

  try {
    return await mongodb(async client => {
      let doc = await getImageById(client, id);

      if (!doc) {
        return commonImage404(res);
      }

      doc = await changeImageByJimp(doc, jimp => {
        // @INFO: Cannot use jimp.rotate currently, see the issue (https://github.com/oliver-moran/jimp/issues/721)
        // return jimp.rotate(degrees);
        return patchJimpRotate(degrees, jimp);
      });

      let result = await updateImage(client, id, doc);
      return res.send(postHandleImage(result.value));
    });
  } catch (e) {
    return common400(res, e);
  }
};
