const { Question } = require('../../../../models')
const { Questionstats } = require('../../../../models')


const retrieveQuestion = (questionId) => {
  const question = Question.getById(questionId);
  return question;
}

const filterQuestionsStatsFromQuizz = (quizStatsId) => {
    const questionsStats = Questionstats.get();
    const parsedId = parseInt(quizStatsId, 10);
    filteredQuestionsStats = questionsStats.filter((questionStats) => questionStats.quizStatsId === parsedId);
    const mappedQuestionsStats = filteredQuestionsStats.map((questionStat) => {
      return {
          id: questionStat.id,
          question: retrieveQuestion(questionStat.questionId),
          timeMinutes: questionStat.timeMinutes, 
	        timeSeconds: questionStat.timeSeconds,
	        numberOfCluesUsed: questionStat.numberOfCluesUsed,
	        numberOfBadAnswers: questionStat.numberOfBadAnswers,
      };
  });

  return mappedQuestionsStats;

  }

  module.exports = {
    filterQuestionsStatsFromQuizz
  }