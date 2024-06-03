const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')


module.exports = new BaseModel('Quizstats', {
    userId: Joi.number().required(),
	name: Joi.string().required(),
	theme: Joi.string(),
	date: Joi.date().required(), // Date à laquelle est effectué le quiz 
	// questionsStats: QuestionStats[], Les questionsStats possèdent un id correspondant à un QuizStats **
	totalTimeMinutes: Joi.number().required(), // Temps passé sur le quiz
	totalTimeSeconds: Joi.number().required(),
	totalNumberOfCluesUsed: Joi.number().required(),
	successRate: Joi.number().required(),
})