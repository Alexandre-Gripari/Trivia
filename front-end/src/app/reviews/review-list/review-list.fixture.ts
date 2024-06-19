import { E2EComponentFixture } from "e2e/e2e-component.fixture";
import { Locator } from "@playwright/test";

export class ReviewPageFixture extends E2EComponentFixture {

    getReviewComponent(): Locator {
        return this.page.locator('app-review');
    }
}
