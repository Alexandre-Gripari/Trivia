const { Router } = require('express')

const router = new Router();

/* router.get('/', (req, res) => {
    try {
      // Check if quizId exists, if not it will throw a NotFoundError
      Quiz.getById(req.params.quizId)
      res.status(200).json(filterQuestionsFromQuizz(req.params.quizId))
    } catch (err) {
      manageAllErrors(res, err)
    }
}) */

module.exports = router;