const { Router } = require('express');
const { Questionstats } = require('../../../../models');
const AnswerStatsRouter = require('./answerstats')

const router = new Router({ mergeParams: true })

router.use('/answerstats', AnswerStatsRouter)

router.post('/', (req, res) => {
  try {
    const question = Questionstats.create({ ...req.body })
    res.status(201).json(question)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router;