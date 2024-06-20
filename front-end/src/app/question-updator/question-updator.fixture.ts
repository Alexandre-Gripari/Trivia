import { E2EComponentFixture } from 'e2e/e2e-component.fixture';

export class QuestionUpdatorFixture extends E2EComponentFixture {

  getQuestionTitleInput() {
    return this.page.locator('#questionTitle');
  }

  getAnswersContainer() {
    return this.page.locator('app-answers-container');
  }

  getTextHintContainer() {
    return this.page.locator('app-text-hint-container');
  }

  getImageHintContainer() {
    return this.page.locator('app-image-hint-container');
  }

  getAudioHintContainer() {
    return this.page.locator('app-audio-hint-container');
  }

  getSubmitButton() {
    return this.page.locator('.btn.btn-success');
  }

  getResetButton() {
    return this.page.locator('.btn.btn-danger');
  }

  async setQuestionTitle(value: string) {
    const input = this.getQuestionTitleInput();
    await input.fill(value);
  }

  async clickSubmitButton() {
    await this.getSubmitButton().click();
  }

  async clickResetButton() {
    await this.getResetButton().click();
  }
}
