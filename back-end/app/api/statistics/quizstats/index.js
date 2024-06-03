const { Router } = require('express');
const { getStatsQuizzes } = require('./manager');

const router = new Router({ mergeParams: true })


router.get('/:userId', (req, res) => {
    try {
      const statsQuizzes = getStatsQuizzes(req.params.userId);
      console.log("StatsQuizzes retrieved:", statsQuizzes);
      res.status(200).json(statsQuizzes);
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
  
  module.exports = router;