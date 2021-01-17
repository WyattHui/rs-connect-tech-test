const
  getImage = require('./getImage');

module.exports = (client, id) => {
  id = parseInt(id);

  if (isNaN(id)) {
    throw {message: 'ID is not a number.'};
  }

  return getImage(client, {id});
};
