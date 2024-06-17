const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Answerstats', {
    questionStatsId: Joi.number().required(),
    value: Joi.string().required(),
    isCorrect: Joi.boolean().required(),
    choose: Joi.boolean().required()
})

