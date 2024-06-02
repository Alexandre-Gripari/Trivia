const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('User', {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  birthDate: Joi.string().required(),
  alzheimerStage: Joi.number().required(),
  profilepicture: Joi.string(),
})
