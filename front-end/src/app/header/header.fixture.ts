import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class HeaderFixture extends E2EComponentFixture {

    getLogoImage() {
        return this.page.getByAltText('logo');
    }
}