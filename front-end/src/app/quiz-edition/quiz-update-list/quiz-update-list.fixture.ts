import { E2EComponentFixture } from 'e2e/e2e-component.fixture';

export class QuestionUpdateListFixture extends E2EComponentFixture {

  getAddQuestionButton() {
    return this.page.locator('.add-button');
  }

  getEditButtons() {
    return this.page.locator('.edit-button');
  }

  getDeleteButtons() {
    return this.page.locator('.delete-button');
  }

  getQuestionText(index: number) {
    return this.page.locator('.question-block').nth(index).locator('h3');
  }

  getQuestions() {
    return this.page.locator('.question-block').locator('h3');
  }

  async clickAddQuestionButton() {
    await this.getAddQuestionButton().click();
  }

  async clickEditButton(index: number) {
    await this.getEditButtons().nth(index).click();
  }

  async clickDeleteButton(index: number) {
    await this.getDeleteButtons().nth(index).click();
  }

  async getTextInQuestion(index: number): Promise<string> {
    const questionLocator = this.getQuestionText(index);
    const textContent = await questionLocator.innerText();
    return textContent.trim();
  }

  async isTextEqualInQuestion(index: number, expectedText: string): Promise<boolean> {
    const text = await this.getTextInQuestion(index);
    return text === expectedText;
  }
}
