import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class UserListFixture extends E2EComponentFixture {

  getAddButton() {
    return this.page.getByRole('button', {name: '+'});
  }

  clickAddButton() {
    return this.getAddButton().click();
  }
}
