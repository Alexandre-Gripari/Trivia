const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Questionstats', {
    quizStatsId: Joi.number().required(), // **
    question: Joi.string().required(), 
    timeMinutes: Joi.number().required(),
    timeSeconds: Joi.number().required(),
    numberOfCluesUsed: Joi.number().required(),
    numberOfBadAnswers: Joi.number().required(),
})