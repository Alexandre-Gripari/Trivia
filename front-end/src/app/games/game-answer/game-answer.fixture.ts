import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class GameAnswerFixture extends E2EComponentFixture {
  
    getAnswerButton() {
        return this.page.locator('button');
    }

    clickAnswerButton() {
        return this.getAnswerButton().click();
    }

    getSpecifiqueAnswerButton(answer: string) {
        return this.page.getByRole('button', { name: answer });
    }

}