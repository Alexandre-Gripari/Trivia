const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Stats', {
  userId: Joi.number().required(),
  numberOfCompletedQuizzes: Joi.number().required(),
  numberOfCluesUsed: Joi.number().required(),
  numberOfCluesUsedLatest: Joi.number().required(),
  timeSpentMinutes: Joi.number().required(),
  timeSpentSeconds: Joi.number().required(),
  timeSpentMinutesLatest: Joi.number().required(),
  timeSpentSecondsLatest: Joi.number().required(),
});
