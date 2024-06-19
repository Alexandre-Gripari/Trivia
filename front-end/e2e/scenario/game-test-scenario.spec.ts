import { test, expect } from '@playwright/test';
import { homeUrl, testGameUrl} from 'e2e/e2e.config';
import { GameAnswerFixture } from 'src/app/games/game-answer/game-answer.fixture';
import { HomeFixture } from 'src/app/home//home-container/home-container.fixture';
import { UserCardFixture } from 'src/app/users/user/usercomponent.fixture';
import { QuizCardFixture } from 'src/app/quizzes/quiz/quiz.component.fixture';
import { GameQuestionFixture } from 'src/app/games/game-question/game-question.fixture';


// This file is here to test the playwright integration.
test.describe('Play a quiz test', () => {
    test('Verify buttons are visible and clickable', async ({ page }) => {
        await page.goto(`${homeUrl}`);

        const QuestionFixtureComponent = new GameQuestionFixture(page);

        const HomeFixtureComponent = new HomeFixture(page);

        const UserlisteButton = HomeFixtureComponent.getUserListeButton();
        await expect(UserlisteButton).toBeVisible();

        await HomeFixtureComponent.clickUserListeButton();

        const userList = await page.locator('.user');
        const user = userList.nth(0);
        await user.hover();

        const UserCardFixtureComponent = new UserCardFixture(page);

        const playButton = UserCardFixtureComponent.getQuizButton();
        await expect(playButton).toBeVisible();
        await UserCardFixtureComponent.clickQuizButton();

        const quiz = await page.locator('.quiz');
        const quiz1 = quiz.nth(0);
        await quiz1.hover();

        await expect(quiz1).toBeVisible();  

        await quiz1.hover();

        const QuizCardFixtureComponent = new QuizCardFixture(page);

        const selectButton = QuizCardFixtureComponent.getSelectButton();

        await expect(selectButton).toBeVisible();

        await QuizCardFixtureComponent.clickSelectButton();

        const GameAnswerComponentFixture = new GameAnswerFixture(page);

        const IndiceButton = QuestionFixtureComponent.getIndiceButton();

        await expect(IndiceButton).toBeVisible();

        const answerButton1 = GameAnswerComponentFixture.getSpecifiqueAnswerButton('Paris');
        await expect(answerButton1).toBeVisible();

        const answerButton2 = GameAnswerComponentFixture.getSpecifiqueAnswerButton('Lyon');
        await expect(answerButton2).toBeVisible();

        const answerButton3 = GameAnswerComponentFixture.getSpecifiqueAnswerButton('Marseille');
        await expect(answerButton3).toBeVisible();

        const answerButton4 = GameAnswerComponentFixture.getSpecifiqueAnswerButton('Lille');
        await expect(answerButton4).toBeVisible();


        await answerButton2.click();
        await expect(answerButton2).not.toBeVisible();
        

        await answerButton3.click();
        await expect(answerButton3).not.toBeVisible();
        await expect(IndiceButton).not.toBeVisible();

        await answerButton4.click();
        await expect(answerButton4).not.toBeVisible();

        await answerButton1.click();
        await expect(answerButton1).not.toBeVisible();

        const answerButton5 = GameAnswerComponentFixture.getSpecifiqueAnswerButton('Victor Hugo');
        await expect(answerButton5).toBeVisible();
        const answerButton6 = GameAnswerComponentFixture.getSpecifiqueAnswerButton('Antoine de Saint-Exupéry');
        await expect(answerButton6).toBeVisible();
        const answerButton7 = GameAnswerComponentFixture.getSpecifiqueAnswerButton('J.K. Rowling');
        await expect(answerButton7).toBeVisible();
        const answerButton8 = GameAnswerComponentFixture.getSpecifiqueAnswerButton('George Orwell');

        await expect(IndiceButton).toBeVisible();

        await QuestionFixtureComponent.clickIndiceButton();
        await expect(IndiceButton).toBeVisible();

        await answerButton5.click();
        await expect(answerButton5).not.toBeVisible();
        await expect(IndiceButton).toBeVisible();

        await answerButton7.click();
        await expect(answerButton7).not.toBeVisible();
        await expect(IndiceButton).not.toBeVisible();
        

        await answerButton8.click();
        await expect(answerButton8).not.toBeVisible();

        await answerButton6.click();
        await expect(answerButton6).not.toBeVisible();

        const answerButton9 = GameAnswerComponentFixture.getSpecifiqueAnswerButton('CO2');
        await expect(answerButton9).toBeVisible();
        const answerButton10 = GameAnswerComponentFixture.getSpecifiqueAnswerButton('H2O');
        await expect(answerButton10).toBeVisible();
        const answerButton11 = GameAnswerComponentFixture.getSpecifiqueAnswerButton('NA');
        await expect(answerButton11).toBeVisible();
        const answerButton12 = GameAnswerComponentFixture.getSpecifiqueAnswerButton('N2');
        await expect(answerButton12).toBeVisible();

        await expect(IndiceButton).toBeVisible();

        await answerButton9.click();
        await expect(answerButton9).not.toBeVisible();
        await expect(IndiceButton).not.toBeVisible();

        await answerButton11.click();
        await expect(answerButton11).not.toBeVisible();

        await answerButton12.click();
        await expect(answerButton12).not.toBeVisible();

        await answerButton10.click();
        await expect(answerButton10).not.toBeVisible();

        
        

      });
});