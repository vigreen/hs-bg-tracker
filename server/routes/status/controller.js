const { getStatus, insertStatus } = require('../../db');

module.exports.getStatus = (req, res) => {
  const data = getStatus().map(({ hero_id, status }) => ({ hero_id, victory: status > 0 }));
  res.json(data);
}

module.exports.setStatus = (req, res) => {
  const { hero_id, victory } = req.body;

  insertStatus(hero_id, victory ? 1 : 0);

  res.json({
    hero_id, victory: victory ? 1 : 0
  })
}