const fetch = require('node-fetch');

module.exports.getWinRate = async (req, res) => {
  try {
    const request = await fetch(
      "https://hsreplay.net/analytics/query/battlegrounds_list_heroes/?BattlegroundsMMRPercentile=TOP_50_PERCENT&BattlegroundsTimeRange=LAST_7_DAYS"
    )

    const data = await request.json();

    if (data.series && data.series.data) {
      const heroes = data.series.data;
      const heroData = heroes.reduce((acc, hero) => {
        acc[hero.hero_dbf_id] = hero;
        return acc;
      }, {})

      res.json(heroData)
    } else {
      res.status(404).send('Sorry cant find that!');
    }
  } catch (error) {
    res.status(404).send('Sorry we got an error: ' + error.message);
  }
}