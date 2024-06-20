const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Stats', {
  userId: Joi.number().required(),
  numberOfCluesUsed: Joi.number().required(),
  date: Joi.date().required(),
});
