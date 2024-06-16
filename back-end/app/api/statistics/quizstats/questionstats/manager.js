const { Questionstats } = require('../../../../models')
const { retrieveAnswers } = require('./answerstats/manager')


const filterQuestionsStatsFromQuizz = (quizStatsId) => {
    const questionsStats = Questionstats.get();
    const parsedId = parseInt(quizStatsId, 10);
    filteredQuestionsStats = questionsStats.filter((questionStats) => questionStats.quizStatsId === parsedId);
    const mappedQuestionsStats = filteredQuestionsStats.map((questionStat) => {
      return {
          id: questionStat.id,
          question: questionStat.question,
          answerStats: retrieveAnswers(questionStat.id),
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