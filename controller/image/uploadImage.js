const
  mongodb = require('../../mongodb'),
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
    return await mongodb(async client => {
      let result = await uploadImage(client, body.fileName, req.file);
      res.status(201);
      return res.send(postHandleImage(result.ops[0]));
    });
  } catch (e) {
    return common400(res, e);
  }
};
