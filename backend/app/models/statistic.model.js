import number from 'joi/lib/types/number/index.js'

const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('StatisticData', {
    userId: Joi.number.required(),
    numberOfCompletedQuizzes: Joi.number().required(),
    numberOfCluesUsed: Joi.number().required(),
    numberOfCluesUsedLatest: Joi.number().required(),
    timeSpentMinutes: Joi.number().required(),
    timeSpentSeconds: Joi.number().required(),
    timeSpentMinutesLatest: Joi.number().required(),
    timeSpentSecondsLatest: Joi.number().required(),
})

module.exports = new BaseModel('QuizStats', {
    userId: Joi.number.required(),
    QuizId: Joi.number().required(), // On a besion d'un Quiz, donc de son id
	date: Joi.date().required(), // Date à laquelle est effectué le quiz 
	// questionsStats: QuestionStats[], Les questionsStats possèdent un id correspondant à un QuizStats **
	totalTimeMinutes: Joi.number().required(), // Temps passé sur le quiz
	totalTimeSeconds: Joi.number().required(),
	totalNumberOfCluesUsed: Joi.number().required(),
	successRate: Joi.number().required(),
})

module.exports = new BaseModel('QuestionStats', {
    quizStatsId: Joi.number().required(), // **
    questionId: Joi.number().required(), 
    timeMinutes: Joi.number().required(),
    timeSeconds: Joi.number().required(),
    numberOfCluesUsed: Joi.number().required(),
    numberOfBadAnswers: Joi.number().required(),
})


