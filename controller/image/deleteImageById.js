const
  {deleteImageById} = require('../../mongodb/image'),
  {
    common400
  } = require('../index'),
  {
    commonImage404
  } = require('./common');

module.exports = async (req, res) => {
  try {
    let result = await deleteImageById(req.params.id);
    if (!result.value) {
      return commonImage404(res);
    }
    return res.send({message: 'Image object deleted'});
  } catch (e) {
    return common400(res, e);
  }
};
