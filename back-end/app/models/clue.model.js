const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Clue', {
    questionId: Joi.number(),
    image: Joi.string(),
    text: Joi.string(),
    audio: Joi.string(),
})