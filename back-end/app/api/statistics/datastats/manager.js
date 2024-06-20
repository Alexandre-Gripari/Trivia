const date = require('joi/lib/types/date');
const { Stats } = require('../../../models');

const getStats = (userId) => {
    const statistics = Stats.get();
    const parsedId = parseInt(userId, 10);
    const filteredUserStats = statistics.filter((stat) => stat.userId === parsedId);
    if (!filteredUserStats) {
        throw new Error('NotFoundError: User stats not found for userId ' + userId);
    }
    const mappedUserStats = filteredUserStats.map((userStat) => {
        return {
            numberOfCluesUsed: userStat.numberOfCluesUsed,
            date: userStat.date,
        };
    });
    return mappedUserStats;
};

const deleteStatisticDataFromQuiz = (quizStatsId) => {
    const statistics = Stats.get();
    console.log("allStats: ", statistics);
    const parsedId = parseInt(quizStatsId, 10);
    const filteredStat = statistics.find((stat) => stat.quizStatId === parsedId);
    console.log("stat: ", filteredStat);
    Stats.delete(filteredStat.id);
}

module.exports = {
    getStats,
    deleteStatisticDataFromQuiz
};
