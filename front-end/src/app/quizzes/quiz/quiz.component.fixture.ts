import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class QuizCardFixture extends E2EComponentFixture {
  
    
    getSelectButton() {
        return this.page.getByRole('button', { name: 'Jouer' });
    }

    getDeleteButton() {
        return this.page.getByRole('button', { name: 'Supprimer' });
    }

    getEditButton() {
        return this.page.getByRole('button', { name: 'Modifier' });
    }

    clickSelectButton() {
        return this.getSelectButton().click();
    }

    clickDeleteButton() {
        return this.getDeleteButton().click();
    }

    clickEditButton() {
        return this.getEditButton().click();
    }


    

}