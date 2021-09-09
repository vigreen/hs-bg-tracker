const express = require('express');
const router = express.Router();
const { getStatus, setStatus } = require('./controller');

router.post('/', async (req, res) => {
  setStatus(req, res);
})

router.get('/', async (req, res) => {
  getStatus(req, res);
});

module.exports = router;