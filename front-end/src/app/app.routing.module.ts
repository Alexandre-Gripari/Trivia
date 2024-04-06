import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { GamePageComponent } from './games/game-page/game-page.component';
import { UserPageComponent } from './users/user-page/user-page.component';
//import { EditQuizComponent } from './quizzes/edit-quiz/edit-quiz.component';
//import { UserListComponent } from './users/user-list/user-list.component';

const routes: Routes = [
    {path: 'quiz-list', component: QuizListComponent},
    {path: 'game-page', component: GamePageComponent},
    {path: 'user-page', component: UserPageComponent},
    {path: '', redirectTo: '/quiz-list', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

    

}
