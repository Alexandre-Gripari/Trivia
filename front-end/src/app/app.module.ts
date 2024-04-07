import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
import { ReviewPageComponent } from './reviews/review-page/review-page.component';
import { ReviewListComponent } from './reviews/review-list/review-list.component';
import { ReviewComponent } from './reviews/review/review.component';



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
    ReviewPageComponent,
    ReviewListComponent,
    ReviewComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
