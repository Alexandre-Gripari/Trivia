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


// This file is here to test the playwright integration.
test.describe('Initial test display', () => {
  test('Verify buttons are visible and clickable', async ({ page }) => {
    await page.goto(`${homeUrl}`);

    const HomeFixtureComponent = new HomeFixture(page);

    const creationQuizButton = HomeFixtureComponent.getCreateQuizButton();
    await expect(creationQuizButton).toBeVisible();
    await HomeFixtureComponent.clickCreateQuizButton();

    const QuizEditionFixtureComponent = new QuizUpdateFixture(page);

    const confirmButton = QuizEditionFixtureComponent.getConfirmButton();
    await expect(confirmButton).toBeVisible();

    const quizTitleInput = QuizEditionFixtureComponent.getQuizTitleInput();
    await expect(quizTitleInput).toBeVisible();

    const quizThemeInput = QuizEditionFixtureComponent.getQuizThemeInput();
    await expect(quizThemeInput).toBeVisible();

    await QuizEditionFixtureComponent.setQuizTitleInput('Titre Test');
    await QuizEditionFixtureComponent.setQuizThemeInput('Theme Test');

    const HeaderFixtureComponent = new HeaderFixture(page);
    await HeaderFixtureComponent.getLogoImage().click();

    await HomeFixtureComponent.clickCreateQuizButton();

    const isTitleEqual = await QuizEditionFixtureComponent.isTextEqual('#quizTitle', 'Titre Test');
    expect(isTitleEqual).toBe(true);

    const isThemeEqual = await QuizEditionFixtureComponent.isTextEqual('#quizTheme', 'Theme Test');
    expect(isThemeEqual).toBe(true);

    const QuestionListFixtureComponent = new QuestionUpdateListFixture(page);

    await QuestionListFixtureComponent.clickAddQuestionButton();

    const QuestionCreatorFixtureComponent = new QuestionUpdatorFixture(page);

    const questionTitleInput = QuestionCreatorFixtureComponent.getQuestionTitleInput();
    await expect(questionTitleInput).toBeVisible();

    await QuestionCreatorFixtureComponent.setQuestionTitle('Question Test');

    const AnswersContainerFixtureComponent = new AnswersContainerFixture(page);

    await AnswersContainerFixtureComponent.setAnswerInput(0, 'Réponse 1');
    await AnswersContainerFixtureComponent.setAnswerCheckbox(0, false);

    await AnswersContainerFixtureComponent.setAnswerInput(1, 'Réponse 2');
    await AnswersContainerFixtureComponent.setAnswerCheckbox(1, false);

    await AnswersContainerFixtureComponent.setAnswerInput(2, 'Réponse 3');
    await AnswersContainerFixtureComponent.setAnswerCheckbox(2, true);

    await AnswersContainerFixtureComponent.setAnswerInput(3, 'Réponse 4');
    await AnswersContainerFixtureComponent.setAnswerCheckbox(3, false);

    const TextHintsContainerFixtureComponent = new TextHintsContainerFixture(page);

    await TextHintsContainerFixtureComponent.setTextInput('Indice 1');

    await TextHintsContainerFixtureComponent.clickAddTextButton();

    await QuestionCreatorFixtureComponent.clickSubmitButton();

    const numberQuestions = await QuestionListFixtureComponent.getQuestions().count();
    expect(numberQuestions).toBe(1);

    await QuestionListFixtureComponent.clickDeleteButton(0);

    const numberQuestionsAfterDelete = await QuestionListFixtureComponent.getQuestions().count();
    expect(numberQuestionsAfterDelete).toBe(0);

    await QuestionListFixtureComponent.clickAddQuestionButton();

    await QuestionCreatorFixtureComponent.setQuestionTitle('Question Test');

    await AnswersContainerFixtureComponent.setAnswerInput(0, 'Réponse 1');
    await AnswersContainerFixtureComponent.setAnswerCheckbox(0, false);

    await AnswersContainerFixtureComponent.setAnswerInput(1, 'Réponse 2');
    await AnswersContainerFixtureComponent.setAnswerCheckbox(1, false);

    await AnswersContainerFixtureComponent.setAnswerInput(2, 'Réponse 3');
    await AnswersContainerFixtureComponent.setAnswerCheckbox(2, true);

    await AnswersContainerFixtureComponent.setAnswerInput(3, 'Réponse 4');
    await AnswersContainerFixtureComponent.setAnswerCheckbox(3, false);

    await TextHintsContainerFixtureComponent.setTextInput('Indice 1');

    await TextHintsContainerFixtureComponent.clickAddTextButton();

    await QuestionCreatorFixtureComponent.clickSubmitButton();

    const numberQuestionsAfterAdd = await QuestionListFixtureComponent.getQuestions().count();
    expect(numberQuestionsAfterAdd).toBe(1);

    await QuizEditionFixtureComponent.clickConfirmButton();

    await HomeFixtureComponent.clickQuizListButton();

    const QuizListFixtureComponent = new QuizListFixture(page);
    expect(await QuizListFixtureComponent.getQuizCount()).toBe(5);

    const quizList = await page.locator('.quiz');
    const quiz = quizList.nth(4);
    await quiz.hover();

    await expect(quiz).toBeVisible();

    const QuizCardFixtureComponent = new QuizCardFixture(page);

    await page.getByRole('button', { name: 'Supprimer' }).nth(4).click();

    //expect(await QuizListFixtureComponent.getQuizCount()).toBe(4);

  });
});
