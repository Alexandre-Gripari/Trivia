const { Router } = require('express');
const { getStats } = require('./manager');
const { Stats } = require('../../../models');

const router = new Router({ mergeParams: true })

router.get('/:userId', (req, res) => {
  try {
    const stats = getStats(req.params.userId);
    res.status(200).json(stats);
  } catch (err) {
    if (err.message === 'NotFoundError') {
      console.log("User ID not found:", req.params.userId);
      res.status(404).end();
    } else {
      console.error("Error occurred:", err);
      res.status(500).json(err);
    }
  }
});

router.post('/', (req, res) => {
  try {
    const stat = Stats.create({ ...req.body })
    res.status(201).json(stat)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router;
