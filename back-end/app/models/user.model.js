const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('User', {
  fullName: Joi.string().required(),
  birthDate: Joi.string().required(),
})
