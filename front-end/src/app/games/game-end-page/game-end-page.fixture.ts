import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class GameEndPageFixture extends E2EComponentFixture {
  
    getEndMessageEnd() {
        return this.page.getByText('Fin du Quiz');
    }

    getEndMessageCongrats() {
        return this.page.getByText('Félicitations !');
    }

    getPlayAgainButton() {
        return this.page.getByRole('button', { name: 'Rejouer' });
    }

    getPlayAnotherQuizButton() {
        return this.page.getByRole('button', { name: 'Nouveau Quiz' });
    }

    clickPlayAgainButton() {
        return this.getPlayAgainButton().click();
    }

    clickPlayAnotherQuizButton() {
        return this.getPlayAnotherQuizButton().click();
    }
}