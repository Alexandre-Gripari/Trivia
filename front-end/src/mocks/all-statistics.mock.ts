import { StatisticData } from "../models/statistic.model";



export const STATS1: StatisticData = {
  numberOfCompletedQuizzes: 20,
  numberOfCluesUsed: 5,
  numberOfCluesUsedLatest: 3,
  timeSpentMinutes: 5,
  timeSpentSeconds: 30,
  timeSpentMinutesLatest: 5,
  timeSpentSecondsLatest: 1,
  id: 1
};

export const STATS2: StatisticData = {
  numberOfCompletedQuizzes: 50, 
  numberOfCluesUsed: 6,
  numberOfCluesUsedLatest: 2,
  timeSpentMinutes: 7,
  timeSpentSeconds: 42,
  timeSpentMinutesLatest: 4,
  timeSpentSecondsLatest: 20,
  id: 2
};

export const ALLSTATISTICS: Map<number, StatisticData> = new Map([
    [1, STATS1],
    [2, STATS2]
  ]);