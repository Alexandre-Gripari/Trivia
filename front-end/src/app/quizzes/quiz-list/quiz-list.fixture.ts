import { E2EComponentFixture } from 'e2e/e2e-component.fixture';

export class QuizListFixture extends E2EComponentFixture {

  getQuizElements() {
    return this.page.locator('.quiz');
  }

  async getQuizCount(): Promise<number> {
    return await this.getQuizElements().count();
  }

  async getQuizText(index: number): Promise<string> {
    const quizLocator = this.getQuizElements().nth(index).locator('app-quiz');
    const textContent = await quizLocator.innerText();
    return textContent.trim();
  }

  async clickQuiz(index: number) {
    await this.getQuizElements().nth(index).click();
  }

  async isQuizTextEqual(index: number, expectedText: string): Promise<boolean> {
    const text = await this.getQuizText(index);
    return text === expectedText;
  }
}
