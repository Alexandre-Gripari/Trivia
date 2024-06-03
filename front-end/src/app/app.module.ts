import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { QuizComponent } from './quizzes/quiz/quiz.component';
import { HeaderComponent } from './header/header.component';
import { QuizFormComponent } from './quizzes/quiz-form/quiz-form.component';
import { GamePageComponent } from './games/game-page/game-page.component';
import { QuestionContainerComponent } from './games/question-container/question-container.component';
import { GameQuestionComponent } from './games/game-question/game-question.component';
import { GameAnswerComponent } from './games/game-answer/game-answer.component';
import { GameClueComponent } from './games/game-clue/game-clue.component';
import { UserComponent } from './users/user/user.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserPageComponent } from './users/user-page/user-page.component';
import { QuizPageComponent } from './quizzes/quiz-page/quiz-page.component';
import { UserNavigateComponent } from './users/user-navigate/user-navigate.component';
import { StatisticPageComponent } from './statistics/statistic-page/statistic-page.component';
import { StatisticDataComponent } from './statistics/statistic-data/statistic-data.component';
import { StatisticQuizStatsComponent } from './statistics/statistic-quiz-stats/statistic-quiz-stats.component';
import { StatisticCompletedQuizzesComponent } from './statistics/statistic-completed-quizzes/statistic-completed-quizzes.component';
import { StatisticNavigateComponent } from './statistics/statistic-navigate/statistic-navigate.component';
import { ReviewPageComponent } from './reviews/review-page/review-page.component';
import { ReviewListComponent } from './reviews/review-list/review-list.component';
import { ReviewComponent } from './reviews/review/review.component';
import { QuizEditionComponent } from './quiz-edition/quiz-edition-page/quiz-edition.component';
import { QuestionsListComponent } from './quiz-edition/questions-list/questions-list.component';
import { QuestionCreatorComponent } from './question-creator/question-creator.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { HomeContainerComponent} from './home/home-container/home-container.component';
import { GameConfettiComponent } from './games/game-confetti/game-confetti.component';
import { GameEndPageComponent} from "./games/game-end-page/game-end-page.component";
import { UserCreatorContainerComponent } from './user-creator/user-creator-container/user-creator-container.component';
import { UserCreatorPageComponent } from './user-creator/user-creator-page/user-creator-page.component';
import { UserEditContainerComponent } from './user-edit/user-edit-container/user-edit-container.component';
import { UserEditPageComponent } from './user-edit/user-edit-page/user-edit-page.component';
import { ImageHintContainerComponent } from './question-creator/image-hint-container/image-hint-container.component';
import { TextHintContainerComponent } from './question-creator/text-hint-container/text-hint-container.component';
import { AudioHintContainerComponent } from './question-creator/audio-hint-container/audio-hint-container.component';
import { AnswersContainerComponent } from './question-creator/answers-container/answers-container.component';
import { QuizminiComponent } from './quizzes/quizmini/quizmini.component';
import { NavBarComponent } from './quizzes/nav-bar/nav-bar.component';
import {AllQuizzesComponent} from './all-quizzes/all-quizzes.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizListComponent,
    QuizComponent,
    HeaderComponent,
    QuizFormComponent,
    GamePageComponent,
    QuestionContainerComponent,
    GameQuestionComponent,
    GameAnswerComponent,
    GameClueComponent,
    UserComponent,
    UserListComponent,
    UserPageComponent,
    QuizPageComponent,
    UserNavigateComponent,
    StatisticPageComponent,
    StatisticDataComponent,
    StatisticQuizStatsComponent,
    StatisticCompletedQuizzesComponent,
    StatisticNavigateComponent,
    ReviewPageComponent,
    ReviewListComponent,
    ReviewComponent,
    QuizEditionComponent,
    QuestionsListComponent,
    QuestionCreatorComponent,
    HomePageComponent,
    HomeContainerComponent,
    GameConfettiComponent,
    GameEndPageComponent,
    UserCreatorContainerComponent,
    UserCreatorPageComponent,
    UserEditContainerComponent,
    UserEditPageComponent,
    ImageHintContainerComponent,
    TextHintContainerComponent,
    AudioHintContainerComponent,
    AnswersContainerComponent,
    QuizminiComponent,
    NavBarComponent,  
    AllQuizzesComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
