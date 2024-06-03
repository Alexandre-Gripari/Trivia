
//get all quizzes attached to a user
const { Quiz } = require('../../models');

const getQuiz = (userId) => {
  return Quiz.get().filter((quiz) => quiz.userId === Number(userId));
}

module.exports = getQuiz;
  
