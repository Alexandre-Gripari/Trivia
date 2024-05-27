const getStats = (userId) => {
    const stats = StatisticData.get()
    const parsedId = parseInt(userId, 10)
    return stats.filter((stats) => stats.userId == parsedId)
}