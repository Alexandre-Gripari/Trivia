const { Router } = require('express')

const { Answer, Quiz, Question, Clue } = require('../../../models')
const manageAllErrors = require('../../../utils/routes/error-management')
const AnswersRouter = require('./answers')
const CluesRouter = require('./clues')
const { filterQuestionsFromQuizz, getQuestionFromQuiz } = require('./manager')

const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
  try {
    // Check if quizId exists, if not it will throw a NotFoundError
    Quiz.getById(req.params.quizId)
    res.status(200).json(filterQuestionsFromQuizz(req.params.quizId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:questionId', (req, res) => {
  try {
    const question = getQuestionFromQuiz(req.params.quizId, req.params.questionId)
    res.status(200).json(question)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    // Check if quizId exists, if not it will throw a NotFoundError
    Quiz.getById(req.params.quizId)
    const quizId = parseInt(req.params.quizId, 10)
    let question = Question.create({ 
      ...req.body, quizId
    })
    console.log(question)
    /*// If answers have been provided in the request, we create the answer and update the response to send.
    if (req.body.answers && req.body.answers.length > 0) {
      const answers = req.body.answers.map((answer) => Answer.create({ ...answer, questionId: question.id }))
      question = { ...question, answers }
    }
    // If clues have been provided in the request, we create the clue and update the response to send.
    if (req.body.clues && req.body.clues.length > 0) {
      const clues = req.body.clues.map((clue) => Clue.create({ ...clue, questionId: question.id }))
      question = { ...question, clues }
    }*/
    res.status(201).json(question)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:questionId', (req, res) => {
  try {
    const question = getQuestionFromQuiz(req.params.quizId, req.params.questionId)
    const updatedQuestion = Question.update(req.params.questionId, req.body)
    console.log(updatedQuestion)
    res.status(200).json(updatedQuestion)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:questionId', (req, res) => {
  try {
    /*for (const answer of AnswersRouter.filterAnswersFromQuestion(req.params.questionId)) {
      AnswersRouter.deleteAnswer(req.params.questionId, answer.id)
    }
    for (const clue of CluesRouter.filterCluesFromQuestion(req.params.questionId)) {
      CluesRouter.deleteClue(req.params.questionId, clue.id)
    }*/
    // Check if the question id exists & if the question has the same quizId as the one provided in the url.
    getQuestionFromQuiz(req.params.quizId, req.params.questionId)
    Question.delete(req.params.questionId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.use('/:questionId/answers', AnswersRouter)
router.use('/:questionId/clues', CluesRouter)

module.exports = router
