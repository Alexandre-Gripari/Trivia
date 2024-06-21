import { test, expect } from '@playwright/test';
import {homeUrl} from 'e2e/e2e.config';
import {HomeFixture} from "../../src/app/home/home-container/home-container.fixture";
import { UserListFixture } from 'src/app/users/user-navigate/user-navigatecomponent.fixture';
import {UserCardFixture} from "../../src/app/users/user/usercomponent.fixture";
import {HeaderFixture} from "../../src/app/header/header.fixture";
import {GameQuestionFixture} from "../../src/app/games/game-question/game-question.fixture";
import { QuestionUpdatorFixture } from 'src/app/question-updator/question-updator.fixture';
import {AnswersContainerFixture} from "../../src/app/question-creator/answers-container/answers-container.fixture";
import {TextHintsContainerFixture} from "../../src/app/question-creator/text-hint-container/text-hint-container.fixture";
import {ajax} from "rxjs/internal/ajax/ajax";
import {QuizListFixture} from "../../src/app/quizzes/quiz-list/quiz-list.fixture";
import {QuizCardFixture} from "../../src/app/quizzes/quiz/quiz.component.fixture";
import { QuizUpdateFixture } from 'src/app/quiz-edition/quiz-update-page/quiz-update-page.fixture';
import { QuestionUpdateListFixture } from 'src/app/quiz-edition/quiz-update-list/quiz-update-list.fixture';
import {GameAnswerFixture} from "../../src/app/games/game-answer/game-answer.fixture";


// This file is here to test the playwright integration.
test.describe('Initial test display', () => {
  test('Verify buttons are visible and clickable', async ({ page }) => {
    await page.goto(`${homeUrl}`);

    const HomeFixtureComponent = new HomeFixture(page);

    const quizListButton = HomeFixtureComponent.getQuizListButton();
    await expect(quizListButton).toBeVisible();
    await HomeFixtureComponent.clickQuizListButton();

    const QuizListFixtureComponent = new QuizListFixture(page);

    const quizList = page.locator('.quiz');

    const quiz = quizList.nth(1);

    await quiz.hover();
    await expect(quiz).toBeVisible();

    const QuizCardFixtureComponent = new QuizCardFixture(page);
    await page.getByRole('button', { name: 'Modifier' }).nth(1).click();

    const QuizEditionFixtureComponent = new QuizUpdateFixture(page);

    await QuizEditionFixtureComponent.setQuizTitleInput('edit football');
    await QuizEditionFixtureComponent.setQuizThemeInput('edit sport');

    const QuestionUpdateListFixtureComponent = new QuestionUpdateListFixture(page);

    const numberOfQuestions = await QuestionUpdateListFixtureComponent.getQuestions().count();
    expect(numberOfQuestions).toBe(0);

    await QuestionUpdateListFixtureComponent.clickAddQuestionButton();

    const QuestionUpdatorFixtureComponent = new QuestionUpdatorFixture(page);

    await QuestionUpdatorFixtureComponent.setQuestionTitle('test question');

    const AnswersContainerFixtureComponent = new AnswersContainerFixture(page);

    await AnswersContainerFixtureComponent.setAnswerInput(0, 'answer 1');
    await AnswersContainerFixtureComponent.setAnswerCheckbox(0, true);

    await AnswersContainerFixtureComponent.setAnswerInput(1, 'answer 2');
    await AnswersContainerFixtureComponent.setAnswerCheckbox(1, false);

    await AnswersContainerFixtureComponent.setAnswerInput(2, 'answer 3');
    await AnswersContainerFixtureComponent.setAnswerCheckbox(2, false);

    await AnswersContainerFixtureComponent.setAnswerInput(3, 'answer 4');
    await AnswersContainerFixtureComponent.setAnswerCheckbox(3, false);

    const TextHintsContainerFixtureComponent = new TextHintsContainerFixture(page);

    await TextHintsContainerFixtureComponent.setTextInput('hint 1');
    await TextHintsContainerFixtureComponent.clickAddTextButton();

    await QuestionUpdatorFixtureComponent.clickSubmitButton();

    await QuizEditionFixtureComponent.clickConfirmButton();

    await HomeFixtureComponent.clickQuizListButton();

    await quiz.hover();
    await expect(quiz).toBeVisible();

    await page.getByRole('button', { name: 'Jouer' }).nth(1).click();

    const GameQuestionFixtureComponent = new GameQuestionFixture(page);

    const indiceButton = GameQuestionFixtureComponent.getIndiceButton();
    await expect(indiceButton).toBeVisible();

    await indiceButton.click();
    await expect(indiceButton).not.toBeVisible();

    const GameAnswerComponentFixture = new GameAnswerFixture(page);

    await GameAnswerComponentFixture.getSpecifiqueAnswerButton('answer 1').click();

  });
});
