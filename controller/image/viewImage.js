const
  {getImage} = require('../../mongodb/image'),
  {
    common400
  } = require('../index'),
  {
    commonImage404
  } = require('./common');

module.exports = async (req, res) => {
  let
    imageUrl = req.params.imageUrl,
    matches = imageUrl.match(/(.+)-(\d+)x(\d+).(\w+)/);

  if (!matches) {
    return common400(res, {message: 'Image Url is not correct'});
  }

  matches.shift();
  let [name, width, height, fileExtension] = matches;

  width = parseInt(width);
  height = parseInt(height);

  if (
    isNaN(width) ||
    isNaN(height)
  ) {
    return common400(res, {message: 'Some parameters are missing or invalid'});
  }

  try {
    let doc = await getImage({name, width, height, fileExtension});
    if (!doc) {
      return commonImage404(res);
    }
    let file = doc.file || {};
    res.contentType(file.mimetype);
    res.end(file.buffer.value(), 'binary');
  } catch (e) {
    return common400(res, e);
  }
};
