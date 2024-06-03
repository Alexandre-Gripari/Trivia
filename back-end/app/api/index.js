const { Router } = require('express')

const StatsRouter = require('./statistics')

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/statistics', StatsRouter)

module.exports = router
