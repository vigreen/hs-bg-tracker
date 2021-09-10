
module.exports = (port = 5000) => new Promise((resolve, reject) => {
  const express = require('express');
  const path = require('path');
  const bodyParser = require('body-parser');
  const cors = require('cors');
  const app = express();
  const routers = require('./routes');
  const publicDir = path.join(__dirname, '..', 'build');

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(publicDir));
  app.use('/api', routers);

  app.get('/', (req, res) => {
    res.sendFile(path.join(publicDir, 'index.html'));
  })

  app.listen(port, () => resolve('App running on port ' + port + ' 🔥'));
})