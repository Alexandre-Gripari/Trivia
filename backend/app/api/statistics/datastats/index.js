const { Router } = require('express');
const { getStats } = require('./manager');

const router = new Router({ mergeParams: true })

router.get('/:userId', (req, res) => {
  console.log("Entered the GET route for /datastats/:userId");
  console.log("Request params:", req.params);

  try {
    const stats = getStats(req.params.userId);
    console.log("Stats retrieved:", stats);
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

module.exports = router;
