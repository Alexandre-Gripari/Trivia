const { Quizstats } = require('../../../models');
const { filterQuestionsStatsFromQuizz } = require('./questionstats/manager')


const buildStatsQuizz = (quizStatsId) => {
    //const quizStat = Quizstats.getById(quizStatsId)
    const questionsStats = filterQuestionsStatsFromQuizz(quizStatsId);
    return questionsStats;
    /* const questionWithAnswers = questionsStats.map((question) => {
      const answers = filterAnswersFromQuestion(question.id)
      return { ...question, answers }
    })
    return { ...quiz, questions: questionWithAnswers } */
  }

/* const getStatsQuizzes = (userId) => {
    console.log("userId in getStats: " + userId);
    const quizStats = Quizstats.get();
    const parsedId = parseInt(userId, 10);
    quizStats = quizStats.filter((quizstat) => quizstat.userId === parsedId);
    if (!quizStats) {
        throw new Error('NotFoundError: User stats not found for userId ' + userId);
    }
    return quizStats.map((quiz) => buildQuizz(quiz.id) )
}; */

const getStatsQuizzes = (userId) => {
    const quizStats = Quizstats.get();
    const parsedId = parseInt(userId, 10);
    const filteredQuizStats = quizStats.filter((quizstat) => quizstat.userId === parsedId);
    const mappedQuizStats = filteredQuizStats.map((quizStat) => {
        return {
            id: quizStat.id,
            name: quizStat.name,
            theme: quizStat.theme,
            date: quizStat.date,
            questionsStats: buildStatsQuizz(quizStat.id),
            totalTimeMinutes: quizStat.totalTimeMinutes,
            totalTimeSeconds: quizStat.totalTimeSeconds,
            totalNumberOfCluesUsed: quizStat.totalNumberOfCluesUsed,
            successRate: quizStat.successRate
        };
    });

    return mappedQuizStats;
};


module.exports = {
    getStatsQuizzes
}
