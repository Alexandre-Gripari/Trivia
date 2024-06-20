import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class QuizUpdateFixture extends E2EComponentFixture {

  getConfirmButton() {
    return this.page.locator('.confirm-button');
  }

  getQuizTitleInput() {
    return this.page.locator('#quizTitle');
  }

  getQuizThemeInput() {
    return this.page.locator('#quizTheme');
  }

  async clickConfirmButton() {
    await this.getConfirmButton().click();
  }

  async setQuizTitleInput(value: string) {
    const input = this.getQuizTitleInput();
    await input.fill(value);
  }

  async setQuizThemeInput(value: string) {
    const input = this.getQuizThemeInput();
    await input.fill(value);
  }

  async isTextEqual(selector: string, expectedText: string): Promise<boolean> {
    const text = await this.page.locator(selector).inputValue();
    return text === expectedText;
  }
}
