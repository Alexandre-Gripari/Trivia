const { Stats } = require('../../../models');

const getStats = (userId) => {
    const statistics = Stats.get();
    const parsedId = parseInt(userId, 10);
    const userStats = statistics.find((stat) => stat.userId === parsedId);

    if (!userStats) {
        throw new Error('NotFoundError: User stats not found for userId ' + userId);
    }
    // Mapper les propriétés pour correspondre à l'interface StatisticData
    const { userId: id, numberOfCompletedQuizzes, numberOfCluesUsed, numberOfCluesUsedLatest, timeSpentMinutes, timeSpentSeconds, timeSpentMinutesLatest, timeSpentSecondsLatest } = userStats;
    // Retourner un nouvel objet conforme à l'interface StatisticData
    return {
        id: id, // Si nécessaire, ajustez ici si l'interface exige une propriété nommée "id"
        numberOfCompletedQuizzes,
        numberOfCluesUsed,
        numberOfCluesUsedLatest,
        timeSpentMinutes,
        timeSpentSeconds,
        timeSpentMinutesLatest,
        timeSpentSecondsLatest
    };
};

module.exports = {
    getStats
};
