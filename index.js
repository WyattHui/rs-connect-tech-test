require('dotenv').config();

const
  express = require('express'),
  app = express(),
  fs = require('fs'),
  index = fs.readFileSync('./index.html', 'utf8'),
  {viewImage} = require('./controller/image');

app.use(require('cors')());

app.get('/', (req, res) => {
  res.send(index);
});
app.use('/v1', require('./routes'));
app.get('/:imageUrl', viewImage);

const
  server = require('http').Server(app),
  port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
