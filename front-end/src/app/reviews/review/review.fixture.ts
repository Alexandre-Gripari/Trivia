import { E2EComponentFixture } from "e2e/e2e-component.fixture";
import { Locator } from "playwright/test";

export class ReviewFixture extends E2EComponentFixture {

    getAnswerStatsButtons(reviewComponent: Locator, index: number): Locator {
        const answerStatsComponents = reviewComponent.locator(`app-statistic-answer-stats:nth-child(n+${index + 1}):nth-child(-n+${index + 4})`);
        return answerStatsComponents.locator('button');
    }

    getAnswerStatsText(reviewComponent: Locator, index: number): Locator {
        const answerStatsComponents = reviewComponent.locator(`app-statistic-answer-stats:nth-child(n+${index + 1}):nth-child(-n+${index + 4})`);
        return answerStatsComponents.locator('button p');
    }
}
