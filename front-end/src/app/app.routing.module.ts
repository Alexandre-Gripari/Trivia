import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamePageComponent } from './games/game-page/game-page.component';
import { UserPageComponent } from './users/user-page/user-page.component';
import { QuizPageComponent } from './quizzes/quiz-page/quiz-page.component';
import { StatisticPageComponent } from './statistics/statistic-page/statistic-page.component';
import { ReviewPageComponent } from './reviews/review-page/review-page.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { UserCreatorPageComponent } from './user-creator/user-creator-page/user-creator-page.component';
import { UserEditPageComponent } from './user-edit/user-edit-page/user-edit-page.component';
import { AllQuizzesComponent } from './all-quizzes/all-quizzes.component';
import { QuizUpdatePageComponent } from './quiz-edition/quiz-update-page/quiz-update-page.component';
import { QuizUpdateListComponent } from './quiz-edition/quiz-update-list/quiz-update-list.component';
import { QuestionUpdatorComponent } from './question-updator/question-updator.component';


const routes: Routes = [
    { path: 'game-page', component: GamePageComponent},
    { path: 'user-page', component: UserPageComponent},
    { path: '', redirectTo: '/home-page', pathMatch: 'full' },
    { path: 'quiz/:id', component: QuizPageComponent },
    { path: 'stats/:id', component: StatisticPageComponent},
    { path: 'reviews', component: ReviewPageComponent},
    { path: 'home-page', component: HomePageComponent},
    { path: 'user-creator-page', component: UserCreatorPageComponent },
    { path: 'users/edit/:id', component: UserEditPageComponent },
    { path: 'all-quizzes', component: AllQuizzesComponent },
    { path: 'quiz-update-page', component: QuizUpdatePageComponent },
    { path: 'quiz-update-list', component: QuizUpdateListComponent},
    { path: 'question-updator', component: QuestionUpdatorComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
