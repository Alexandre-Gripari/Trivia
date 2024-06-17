const { Router } = require('express');
const { getStatsQuizzes } = require('./manager');
const { Quizstats } = require('../../../models');
const QuestionStatsRouter = require('./questionstats')

const router = new Router({ mergeParams: true })

router.use('/questionstats', QuestionStatsRouter)

router.get('/:userId', (req, res) => {
    try {
      const statsQuizzes = getStatsQuizzes(req.params.userId);
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

  router.post('/', (req, res) => {
    try {
      const quiz = Quizstats.create({ ...req.body })
      res.status(201).json(quiz)
    } catch (err) {
      manageAllErrors(res, err)
    }
  })
  
  module.exports = router;