import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamePageComponent } from './games/game-page/game-page.component';
import { UserPageComponent } from './users/user-page/user-page.component';
import { QuizPageComponent } from './quizzes/quiz-page/quiz-page.component';
//import { EditQuizComponent } from './quizzes/edit-quiz/edit-quiz.component';
//import { UserListComponent } from './users/user-list/user-list.component';

const routes: Routes = [
    {path: 'game-page', component: GamePageComponent},
    {path: 'user-page', component: UserPageComponent},
    {path: '', redirectTo: '/user-page', pathMatch: 'full' },
    { path: 'quiz/:id', component: QuizPageComponent },
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

    

}
