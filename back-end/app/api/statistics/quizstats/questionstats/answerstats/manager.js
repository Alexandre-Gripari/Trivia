const { Answerstats } = require('../../../../../models');

const retrieveAnswers = (questionStatsId) => {
    const answerStats = Answerstats.get();
    const parsedId = parseInt(questionStatsId, 10);
    filteredAnswersStats = answerStats.filter((answer) => answer.questionStatsId === parsedId);
    const mappedAnswersStats = filteredAnswersStats.map((answerStat) => {
        return {
            questionStatsId: answerStat.questionStatsId,
            value: answerStat.value,
            isCorrect: answerStat.isCorrect,
            choose: answerStat.choose
        };
    });
  
    return mappedAnswersStats;
} 

const deleteAllAnswersStatsFromQuestion = (questionStatsId) => {
    const answersStats = Answerstats.get();
    const parsedId = parseInt(questionStatsId, 10);
    filteredAnswersStats = answersStats.filter((answerStats) => answerStats.questionStatsId === parsedId);
    filteredAnswersStats.forEach((answerStat) => {
      Answerstats.delete(answerStat.id);
    });
  }

module.exports = {
    retrieveAnswers,
    deleteAllAnswersStatsFromQuestion
};
