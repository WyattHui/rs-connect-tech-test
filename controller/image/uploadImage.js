const
  {uploadImage} = require('../../mongodb/image'),
  {
    common400
  } = require('../index'),
  {
    postHandleImage
  } = require('./common');

module.exports = async (req, res) => {
  let body = req.body || {};
  try {
    let result = await uploadImage(body.fileName, req.file);
    res.status(201);
    return res.send(postHandleImage(result.ops[0]));
  } catch (e) {
    return common400(res, e);
  }
};
