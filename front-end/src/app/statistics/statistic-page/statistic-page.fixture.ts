import { E2EComponentFixture } from "e2e/e2e-component.fixture";
import { Locator } from '@playwright/test';

export class StatisticPageFixture extends E2EComponentFixture {

    getQuizListeButtonInStats() {
        return this.page.getByRole('button', { name: 'Liste des quiz' });
    }
}
