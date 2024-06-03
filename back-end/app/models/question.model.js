const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Question', {
  question: Joi.string().required(),
  quizId: Joi.number(),
  answers: Joi.array(),
  clues : Joi.array(),
  nbOfErrorsToUseClue: Joi.number(),
})
