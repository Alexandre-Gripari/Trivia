import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class UserCardFixture extends E2EComponentFixture {

    getQuizButton() {
        return this.page.getByRole('button', { name: 'QUIZ' });
    }

    getStatistiqueButton() {
        return this.page.getByRole('button', { name: 'STATISTIQUES' });
    }

    getEditButton() {
        return this.page.getByRole('button', { name: 'MODIFIER' });
    }

    clickQuizButton() {
        return this.getQuizButton().click();
    }

    clickStatistiqueButton() {
        return this.getStatistiqueButton().click();
    }

    clickEditButton() {
        return this.getEditButton().click();
    }
}
