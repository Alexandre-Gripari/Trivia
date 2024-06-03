const { Quizstats } = require('../../../models');


/* const buildQuizz = (quizId) => {
    const quizStat = Quizstats.getById(quizId)
    const questionsStats = filterQuestionsFromQuizz(quiz.id)
    const questionWithAnswers = questions.map((question) => {
      const answers = filterAnswersFromQuestion(question.id)
      return { ...question, answers }
    })
    return { ...quiz, questions: questionWithAnswers }
  } */

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
    console.log("StatsQuizzes: " + quizStats);
    const parsedId = parseInt(userId, 10);
    const filteredQuizStats = quizStats.filter((quizstat) => quizstat.userId === parsedId);
    console.log("StatsQuizzes Filtré: " + filteredQuizStats);
    // Mapping des données dans le bon format
    const mappedQuizStats = filteredQuizStats.map((quizStat) => {
        return {
            id: quizStat.id,
            name: quizStat.name,
            theme: quizStat.theme,
            date: new Date(quizStat.date),
            questionsStats: quizStat.questionsStats.map((questionStat) => {
                return {
                    id: questionStat.id,
                    question: questionStat.question,
                    timeMinutes: questionStat.timeMinutes,
                    timeSeconds: questionStat.timeSeconds,
                    numberOfCluesUsed: questionStat.numberOfCluesUsed,
                    numberOfBadAnswers: questionStat.numberOfBadAnswers
                };
            }),
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
