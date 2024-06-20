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

module.exports = {
    getStats
};
