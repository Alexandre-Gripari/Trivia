const { Router } = require('express');
const { Answerstats } = require("../../../../../models");

const router = new Router();

router.post('/', (req, res) => {
    try {
      const answer = Answerstats.create({ ...req.body })
      res.status(201).json(answer)
    } catch (err) {
      manageAllErrors(res, err)
    }
  })

  module.exports = router;