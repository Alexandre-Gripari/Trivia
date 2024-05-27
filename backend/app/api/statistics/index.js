const { Router } = require('express')

const DataStatsRouter = require('./datastats')
const QuizStats = require('./quizstats')

const router = new Router()

router.use('/datastats/:userId', DataStatsRouter);
router.use('/quizstats/:userId', QuizStats);




