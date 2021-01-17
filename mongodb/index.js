const
  env = process.env,
  MongoClient = require('mongodb').MongoClient,
  uri = `mongodb+srv://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}/${env.DB_NAME}?retryWrites=true&w=majority`;

module.exports = async (callback) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  try {
    await client.connect();
    let result = await callback(client);
    client.close();
    return result;
  } catch (e) {
    client.close();
    throw e;
  }
};
