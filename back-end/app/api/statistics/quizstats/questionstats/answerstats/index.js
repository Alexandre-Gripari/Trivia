const { Router } = require('express');
const { Answerstats } = require("../../../../../models");

const router = new Router();

router.post('/', (req, res) => {
    try {
      const quiz = Answerstats.create({ ...req.body })
      res.status(201).json(quiz)
    } catch (err) {
      manageAllErrors(res, err)
    }
  })

  module.exports = router;