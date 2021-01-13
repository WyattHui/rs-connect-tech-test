const
  env = process.env,
  MongoClient = require('mongodb').MongoClient,
  uri = `mongodb+srv://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}/${env.DB_NAME}?retryWrites=true&w=majority`;

module.exports = () => {
  return new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};
