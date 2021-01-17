const commonEditImage = require('./commonEditImage');

module.exports = commonEditImage(jimp => {
  return jimp.invert();
});
