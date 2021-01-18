const
  env = process.env;

module.exports = {
  basicAuth: (req, res, next) => {
    if (
      !req.headers.authorization ||
      req.headers.authorization.indexOf('Basic ') === -1
    ) {
      return res.status(401)
        .json({message: 'Authentication information is missing'});
    }

    const
      base64Credentials = req.headers.authorization.split(' ')[1],
      credentials = Buffer.from(base64Credentials, 'base64').toString('ascii'),
      [username, password] = credentials.split(':'),
      user = authenticate({username, password});

    if (!user) {
      return res.status(401)
        .json({message: 'Authentication information is invalid'});
    }

    req.user = user;

    next();
  }
};

const
  authenticate = opts => {
    opts = opts || {};
    let username = opts.username;

    if (
      username === env.ADMIN_NAME &&
      opts.password === env.ADMIN_PASSWORD
    ) {
      return {username};
    }
  };
