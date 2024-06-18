const { Router } = require('express')
const { Clue } = require('../../../../models')

const { getQuestionFromQuiz } = require('../manager')
const { filterCluesFromQuestion, getClueFromQuestion } = require('./manager')

const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
  try {
    const question = getQuestionFromQuiz(req.params.quizId, req.params.questionId)
    const clues = filterCluesFromQuestion(question.id)
    res.status(200).json(clues)
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end()
    } else {
      res.status(500).json(err)
    }
  }
})

router.get('/:clueId', (req, res) => {
  try {
    const clue = getClueFromQuestion(req.params.quizId, req.params.questionId, req.params.clueId)
    res.status(200).json(clue)
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end()
    } else {
      res.status(500).json(err)
    }
  }
})

router.post('/', (req, res) => {
  try {
    const question = getQuestionFromQuiz(req.params.quizId, req.params.questionId)
    const clue = Clue.create({ ...req.body, questionId: question.id })
    console.log(clue)
    res.status(201).json(clue)
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end()
    } else if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.put('/:clueId', (req, res) => {
  try {
    const clue = getClueFromQuestion(req.params.quizId, req.params.questionId, req.params.clueId)
    const updatedClue = Clue.update(req.params.clueId, { ...req.body, questionId: clue.questionId })
    res.status(200).json(updatedClue)
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end()
    } else if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.delete('/:clueId', (req, res) => {
  try {
    getClueFromQuestion(req.params.quizId, req.params.questionId, req.params.clueId)
    Clue.delete(req.params.clueId)
    res.status(204).end()
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end()
    } else {
      res.status(500).json(err)
    }
  }
})

module.exports = router

