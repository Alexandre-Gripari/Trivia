import { test, expect, Locator } from '@playwright/test';
import { homeUrl, testGameUrl} from 'e2e/e2e.config';
import { GameAnswerFixture } from 'src/app/games/game-answer/game-answer.fixture';
import { HomeFixture } from 'src/app/home//home-container/home-container.fixture';
import { UserCardFixture } from 'src/app/users/user/usercomponent.fixture';
import { QuizCardFixture } from 'src/app/quizzes/quiz/quiz.component.fixture';
import { GameQuestionFixture } from 'src/app/games/game-question/game-question.fixture';
import { HeaderFixture } from 'src/app/header/header.fixture';
import { StatisticCompletedQuizzesFixture } from 'src/app/statistics/statistic-completed-quizzes/statistic-completed-quizzes.fixture';
import { StatisticPageFixture } from 'src/app/statistics/statistic-page/statistic-page.fixture';
import { ReviewPageFixture } from 'src/app/reviews/review-list/review-list.fixture';
import { ReviewFixture } from 'src/app/reviews/review/review.fixture';


// This file is here to test the playwright integration.

test.describe('Play a quiz test', () => {
    test('Verify buttons are visible and clickable', async ({ page }) => {

        await page.goto(`${homeUrl}`);

        const QuestionFixtureComponent = new GameQuestionFixture(page);
        const HomeFixtureComponent = new HomeFixture(page);
        const HeaderFixtureComponent = new HeaderFixture(page);
        const UserCardFixtureComponent = new UserCardFixture(page);
        const StatisticCompletedQuizzesFixtureComponent = new StatisticCompletedQuizzesFixture(page);
        const StatisticPageFixtureComponent = new StatisticPageFixture(page); 
        const QuizCardFixtureComponent = new QuizCardFixture(page);
        const GameAnswerComponentFixture = new GameAnswerFixture(page);
        const ReviewPageFixtureComponent = new ReviewPageFixture(page);
        const ReviewFixtureComponent = new ReviewFixture(page);

        const UserlisteButton = HomeFixtureComponent.getUserListeButton();
        await expect(UserlisteButton).toBeVisible();

        await HomeFixtureComponent.clickUserListeButton();

        const userList = await page.locator('.user');
        const user = userList.nth(0);
        await user.hover();

        const playButton = UserCardFixtureComponent.getQuizButton();
        await expect(playButton).toBeVisible();
        await UserCardFixtureComponent.clickQuizButton();

        const quiz = await page.locator('.quiz');
        const quiz1 = quiz.nth(0);
        await quiz1.hover();

        await expect(quiz1).toBeVisible();  

        await quiz1.hover();

        const selectButton = QuizCardFixtureComponent.getSelectButton();

        await expect(selectButton).toBeVisible();

        await QuizCardFixtureComponent.clickSelectButton();

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
        ////

        const logoButton = HeaderFixtureComponent.getLogoImage();
        await expect(logoButton).toBeVisible();
        await logoButton.click();

        await expect(UserlisteButton).toBeVisible();
        await HomeFixtureComponent.clickUserListeButton();

        await user.hover();

        const statsButton = UserCardFixtureComponent.getStatistiqueButton();
        await expect(statsButton).toBeVisible();
        await UserCardFixtureComponent.clickStatistiqueButton();

        const numberOfComponents = await StatisticCompletedQuizzesFixtureComponent.getNumberOfStatisticQuizStatsComponents();
        expect(numberOfComponents).toBe(numberOfComponents);

        const quizListStatsButton = StatisticPageFixtureComponent.getQuizListeButtonInStats();
        await expect(quizListStatsButton).toBeVisible();
        await quizListStatsButton.hover();
        await quizListStatsButton.click();

        await expect(selectButton).toBeVisible();

        await QuizCardFixtureComponent.clickSelectButton();

        await expect(IndiceButton).toBeVisible();

       /*  const answerButton1 = GameAnswerComponentFixture.getSpecifiqueAnswerButton('Paris');
        await expect(answerButton1).toBeVisible();

        const answerButton2 = GameAnswerComponentFixture.getSpecifiqueAnswerButton('Lyon');
        await expect(answerButton2).toBeVisible();

        const answerButton3 = GameAnswerComponentFixture.getSpecifiqueAnswerButton('Marseille');
        await expect(answerButton3).toBeVisible();

        const answerButton4 = GameAnswerComponentFixture.getSpecifiqueAnswerButton('Lille');
        await expect(answerButton4).toBeVisible(); */


        await answerButton2.click();
        await expect(answerButton2).not.toBeVisible();
        await expect(IndiceButton).toBeVisible();

        await answerButton1.click();
        await expect(answerButton1).not.toBeVisible();

        /* const answerButton5 = GameAnswerComponentFixture.getSpecifiqueAnswerButton('Victor Hugo');
        await expect(answerButton5).toBeVisible();
        const answerButton6 = GameAnswerComponentFixture.getSpecifiqueAnswerButton('Antoine de Saint-Exupéry');
        await expect(answerButton6).toBeVisible();
        const answerButton7 = GameAnswerComponentFixture.getSpecifiqueAnswerButton('J.K. Rowling');
        await expect(answerButton7).toBeVisible();
        const answerButton8 = GameAnswerComponentFixture.getSpecifiqueAnswerButton('George Orwell'); */

        await expect(IndiceButton).toBeVisible();

        await QuestionFixtureComponent.clickIndiceButton();
        await expect(IndiceButton).toBeVisible();

        await answerButton5.click();
        await expect(answerButton5).not.toBeVisible();
        await expect(IndiceButton).toBeVisible();

        await answerButton6.click();
        await expect(answerButton6).not.toBeVisible();

        /* const answerButton9 = GameAnswerComponentFixture.getSpecifiqueAnswerButton('CO2');
        await expect(answerButton9).toBeVisible();
        const answerButton10 = GameAnswerComponentFixture.getSpecifiqueAnswerButton('H2O');
        await expect(answerButton10).toBeVisible();
        const answerButton11 = GameAnswerComponentFixture.getSpecifiqueAnswerButton('NA');
        await expect(answerButton11).toBeVisible();
        const answerButton12 = GameAnswerComponentFixture.getSpecifiqueAnswerButton('N2');
        await expect(answerButton12).toBeVisible(); */

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
        //

        await logoButton.click();
        await expect(UserlisteButton).toBeVisible();
        await HomeFixtureComponent.clickUserListeButton();

        await user.hover();
        await expect(statsButton).toBeVisible();
        await UserCardFixtureComponent.clickStatistiqueButton();

        const numberOfComponents2 = await StatisticCompletedQuizzesFixtureComponent.getNumberOfStatisticQuizStatsComponents();
        expect(numberOfComponents2).toBe(numberOfComponents+1);

        const firstQuizStatsComponent = await page.locator('app-statistic-quiz-stats').last();
        await firstQuizStatsComponent.hover();
        await firstQuizStatsComponent.click();
        await expect(logoButton).toBeVisible();

        //await page.pause();

        const reviewComponents = ReviewPageFixtureComponent.getReviewComponent();

        const reviewCount = await reviewComponents.count();
        expect(reviewCount).toBe(3);

        const reviewComponent1 = reviewComponents.nth(0);
        await expect(reviewComponent1).toBeVisible();

        const reviewComponent2 = reviewComponents.nth(1);
        await expect(reviewComponent2).toBeVisible();

        const reviewComponent3 = reviewComponents.nth(2);
        await expect(reviewComponent3).toBeVisible();

        const answerStatsTexts1 = ReviewFixtureComponent.getAnswerStatsText(reviewComponent1, 0);
        const nTexts1 = await answerStatsTexts1.count();
        expect(nTexts1).toBe(4);

        const answerStatsTexts2 = ReviewFixtureComponent.getAnswerStatsText(reviewComponent2, 0);
        const nTexts2 = await answerStatsTexts2.count();
        expect(nTexts2).toBe(4);

        const answerStatsTexts3 = ReviewFixtureComponent.getAnswerStatsText(reviewComponent3, 0);
        const nTexts3 = await answerStatsTexts3.count();
        expect(nTexts3).toBe(4);

    

        //const reviewComponents = ReviewPageFixtureComponent.getReviewComponent();

        

        

        /* const answerStatsComponents1 = ReviewFixtureComponent.getAnswerStatsButtons(reviewComponent1,0);
        const answerStatsComponents2 = ReviewFixtureComponent.getAnswerStatsButtons(reviewComponent2,0);
        const answerStatsComponents3 = ReviewFixtureComponent.getAnswerStatsButtons(reviewComponent3,0);

        const countA1 = await answerStatsComponents1.count();
        expect(countA1).toBe(4);
        const countA2 = await answerStatsComponents2.count();
        expect(countA2).toBe(4);
        const countA3 = await answerStatsComponents3.count();
        expect(countA3).toBe(4);
        
        const answerStats1 = answerStatsComponents1.nth(0);
        const answerStats2 = answerStatsComponents1.nth(1);
        const answerStats3 = answerStatsComponents1.nth(2);
        const answerStats4 = answerStatsComponents1.nth(3);

        const answerStats5 = answerStatsComponents2.nth(0);
        const answerStats6 = answerStatsComponents2.nth(1);
        const answerStats7 = answerStatsComponents2.nth(2);
        const answerStats8 = answerStatsComponents2.nth(3);

        const answerStats9 = answerStatsComponents3.nth(0);
        const answerStats10 = answerStatsComponents3.nth(1);
        const answerStats11 = answerStatsComponents3.nth(2);
        const answerStats12 = answerStatsComponents3.nth(3);

        const expectedColors = {
            correct: 'rgb(76, 175, 80)', // Vert
            incorrect: 'rgb(255, 0, 0)', // Rouge
            default: 'rgb(0, 123, 255)', // Blue
        };

        const answerStatsTexts1 = ReviewFixtureComponent.getAnswerStatsText(reviewComponent1, 0);
        const answerStatsTexts2 = ReviewFixtureComponent.getAnswerStatsText(reviewComponent2, 0);
        const answerStatsTexts3 = ReviewFixtureComponent.getAnswerStatsText(reviewComponent3, 0);

        const answerText1 = answerStatsTexts1.nth(0).textContent();
        const answerText2 = answerStatsTexts1.nth(1);
        const answerText3 = answerStatsTexts1.nth(2);
        const answerText4 = answerStatsTexts1.nth(3);

        const answerText5 = answerStatsTexts1.nth(0);
        const answerText6 = answerStatsTexts1.nth(1);
        const answerText7 = answerStatsTexts1.nth(2);
        const answerText8 = answerStatsTexts1.nth(3);

        const answerText9 = answerStatsTexts1.nth(0);
        const answerText10 = answerStatsTexts1.nth(1);
        const answerText11 = answerStatsTexts1.nth(2);
        const answerText12 = answerStatsTexts1.nth(3);

        expect(answerText1).toBe("Paris");
        

        const backgroundColor1 = await answerStats1.evaluate(node => getComputedStyle(node).backgroundColor);
        const backgroundColor2 = await answerStats2.evaluate(node => getComputedStyle(node).backgroundColor);
        const backgroundColor3 = await answerStats3.evaluate(node => getComputedStyle(node).backgroundColor);
        const backgroundColor4 = await answerStats4.evaluate(node => getComputedStyle(node).backgroundColor);
        const backgroundColor5 = await answerStats5.evaluate(node => getComputedStyle(node).backgroundColor);
        const backgroundColor6 = await answerStats6.evaluate(node => getComputedStyle(node).backgroundColor);
        const backgroundColor7 = await answerStats7.evaluate(node => getComputedStyle(node).backgroundColor);
        const backgroundColor8 = await answerStats8.evaluate(node => getComputedStyle(node).backgroundColor);
        const backgroundColor9 = await answerStats9.evaluate(node => getComputedStyle(node).backgroundColor);
        const backgroundColor10 = await answerStats10.evaluate(node => getComputedStyle(node).backgroundColor);
        const backgroundColor11 = await answerStats11.evaluate(node => getComputedStyle(node).backgroundColor);
        const backgroundColor12 = await answerStats12.evaluate(node => getComputedStyle(node).backgroundColor);
            
        expect(backgroundColor1).toBe(expectedColors.incorrect);
        expect(backgroundColor2).toBe(expectedColors.correct);
        expect(backgroundColor3).toBe(expectedColors.default);
        expect(backgroundColor4).toBe(expectedColors.default);

        expect(backgroundColor5).toBe(expectedColors.incorrect);
        expect(backgroundColor6).toBe(expectedColors.default);
        expect(backgroundColor7).toBe(expectedColors.correct);
        expect(backgroundColor8).toBe(expectedColors.default);

        expect(backgroundColor9).toBe(expectedColors.incorrect);
        expect(backgroundColor10).toBe(expectedColors.incorrect);
        expect(backgroundColor11).toBe(expectedColors.incorrect);
        expect(backgroundColor12).toBe(expectedColors.correct);  */

        
    });
});