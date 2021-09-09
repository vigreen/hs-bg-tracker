const express = require('express');
const router = express.Router();
const routes = ['winrate', 'status'];

routes.forEach(
  (moduleName) => router.use('/' + moduleName, require("./" + moduleName))
);

module.exports = router;