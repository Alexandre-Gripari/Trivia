import { E2EComponentFixture } from 'e2e/e2e-component.fixture';

export class TextHintsContainerFixture extends E2EComponentFixture {

  getTextInput() {
    return this.page.locator('app-text-hint-container').getByRole('textbox');
  }

  getAddTextButton() {
    return this.page.locator('#addText');
  }

  getTextHintContainer(index: number) {
    return this.page.locator(`#text-hints-container >> nth=${index}`);
  }

  getMoveUpButton(index: number) {
    return this.getTextHintContainer(index).locator('button:has-text("▲")');
  }

  getMoveDownButton(index: number) {
    return this.getTextHintContainer(index).locator('button:has-text("▼")');
  }

  getDeleteButton(index: number) {
    return this.getTextHintContainer(index).locator('#delete-button');
  }

  async setTextInput(value: string) {
    const input = this.getTextInput();
    await input.fill(value);
  }

  async clickAddTextButton() {
    await this.getAddTextButton().click();
  }

  async clickMoveUpButton(index: number) {
    await this.getMoveUpButton(index).click();
  }

  async clickMoveDownButton(index: number) {
    await this.getMoveDownButton(index).click();
  }

  async clickDeleteButton(index: number) {
    await this.getDeleteButton(index).click();
  }

  async getTextHint(index: number): Promise<string> {
    const container = this.getTextHintContainer(index);
    return await container.locator('.text-block span').innerText();
  }
}
