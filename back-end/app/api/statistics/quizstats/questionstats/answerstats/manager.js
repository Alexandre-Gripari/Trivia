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

module.exports = {
    retrieveAnswers
};
