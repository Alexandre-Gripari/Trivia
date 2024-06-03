const { Router } = require('express')

const DataStatsRouter = require('./datastats')
const QuizStats = require('./quizstats')

const router = new Router()

router.use('/datastats', DataStatsRouter);
router.use('/quizstats', QuizStats);

module.exports = router;
