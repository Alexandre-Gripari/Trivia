import { E2EComponentFixture } from 'e2e/e2e-component.fixture';

export class AnswersContainerFixture extends E2EComponentFixture {

  getAnswerCheckbox(index: number) {
    return this.page.locator(`#isCorrect${index}`);
  }

  getAnswerInput(index: number) {
    return this.page.locator(`#answer${index}`);
  }

  async setAnswerCheckbox(index: number, checked: boolean) {
    const checkbox = this.getAnswerCheckbox(index);
    await checkbox.setChecked(checked);
  }

  async setAnswerInput(index: number, value: string) {
    const input = this.getAnswerInput(index);
    await input.fill(value);
  }

  async updateAnswer(index: number, value: string, isCorrect: boolean) {
    await this.setAnswerInput(index, value);
    await this.setAnswerCheckbox(index, isCorrect);
  }

  async getAnswerInputValue(index: number): Promise<string> {
    const input = this.getAnswerInput(index);
    return await input.inputValue();
  }

  async getAnswerCheckboxValue(index: number): Promise<boolean> {
    const checkbox = this.getAnswerCheckbox(index);
    return await checkbox.isChecked();
  }
}
