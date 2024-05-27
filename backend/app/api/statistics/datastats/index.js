const { Router } = require('express')

const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
    try {
      const stats = getStats(req.params.userId)
      res.status(200).json(stats)
    } catch (err) {
      if (err.name === 'NotFoundError') {
        res.status(404).end()
      } else {
        res.status(500).json(err)
      }
    }
})