const
  express = require('express'),
  app = express(),
  fs = require('fs'),
  index = fs.readFileSync('./index.html', 'utf8');

app.use(require('cors')());

app.get('/', (req, res) => {
  res.send(index);
});

app.get('/v1/ping', (req, res) => {
  res.send();
});

const
  server = require('http').Server(app),
  port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
