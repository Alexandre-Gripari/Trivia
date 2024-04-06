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
    GameClueComponent
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
