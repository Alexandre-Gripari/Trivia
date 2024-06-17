import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class GameClueFixture extends E2EComponentFixture {
  
    getClueText() {
        return this.page.getByLabel('clue');
    }

    getImage() {
        return this.page.locator('img');
    }

    getAudio() {
        return this.page.locator('audio');
    }
}