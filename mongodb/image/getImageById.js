const
  getImage = require('./getImage');

module.exports = id => {
  id = parseInt(id);

  if (isNaN(id)) {
    throw {message: 'ID is not a number.'};
  }

  return getImage({id});
};
