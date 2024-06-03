const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('User', {
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  birth_date: Joi.string().required(),
  alzheimerStage: Joi.number().required(),
  profilepicture: Joi.string(),
  personal_quizzes: Joi.any(),
})
