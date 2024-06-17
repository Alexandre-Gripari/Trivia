import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class HomeFixture extends E2EComponentFixture {
  
    getUserListeButton() {
        return this.page.getByRole('button', { name: 'Liste des utilisateurs' });
    }

    getCreateUserButton() {
        return this.page.getByRole('button', { name: 'Créer un utilisateur' });
    }

    getCreateQuizButton() {
        return this.page.getByRole('button', { name: 'Créer un Quiz' });
    }

    getCreateQuestionButton() {
        return this.page.getByRole('button', { name: 'Créer une Question' });
    }

    getQuizListButton() {
        return this.page.getByRole('button', { name: 'Liste des Quiz' });
    }

    clickUserListeButton() {
        return this.getUserListeButton().click();
    }

    clickCreateUserButton() {
        return this.getCreateUserButton().click();
    }

    clickCreateQuizButton() {
        return this.getCreateQuizButton().click();
    }

    clickCreateQuestionButton() {
        return this.getCreateQuestionButton().click();
    }

    clickQuizListButton() {
        return this.getQuizListButton().click();
    }

}