module.exports = {
  common400: (res, err) => {
    res.status(400);
    res.send(err);
  }
};
