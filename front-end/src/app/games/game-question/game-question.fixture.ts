import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class GameQuestionFixture extends E2EComponentFixture {
  
    getIndiceButton() {
        return this.page.getByRole('button', { name: 'Indice' });
    }

    clickIndiceButton() {
        return this.getIndiceButton().click();
    }



}