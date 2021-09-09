const express = require('express');
const router = express.Router();
const { getWinRate } = require('./controller');

router.get('/', async (req, res, next) => {
  await getWinRate(req, res);
});

module.exports = router;