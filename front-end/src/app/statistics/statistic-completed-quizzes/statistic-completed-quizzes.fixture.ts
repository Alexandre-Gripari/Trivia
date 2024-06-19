import { E2EComponentFixture } from "e2e/e2e-component.fixture";
import { Locator } from '@playwright/test';

export class StatisticCompletedQuizzesFixture extends E2EComponentFixture {

    async getNumberOfStatisticQuizStatsComponents(): Promise<number> {
        const quizStatsComponents: Locator = this.page.locator('app-statistic-quiz-stats');
        return await quizStatsComponents.count();
    }
}
