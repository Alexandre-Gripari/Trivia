const { Clue } = require('../../../../models')
const NotFoundError = require('../../../../utils/errors/not-found-error.js')
const { getQuestionFromQuiz } = require('../manager')

/**
 * filterCluesFromQuestion.
 * This function filters among the questions to return only the question linked with the given quizId.
 * @param questionId
 */
const filterCluesFromQuestion = (questionId) => Clue.get().filter((clue) => (clue.questionId === questionId))

/**
 * getClueFromQuestion.
 * This function retrieves a clue from a question. It will throw a not found exception if the questionId in the clue is different from the one provided in parameter.
 * @param quizId
 * @param questionId
 * @param clueId
 */
const getClueFromQuestion = (quizId, questionId, clueId) => {
  const question = getQuestionFromQuiz(quizId, questionId)
  const clue = Clue.getById(clueId)
  if (clue.questionId !== question.id) throw new NotFoundError(`${clue.name} id=${clueId} was not found for ${question.name} id=${question.id} : not found`)
  return clue
}

module.exports = {
  getClueFromQuestion,
  filterCluesFromQuestion,
}