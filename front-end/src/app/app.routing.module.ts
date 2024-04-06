import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { GamePageComponent } from './games/game-page/game-page.component';
//import { EditQuizComponent } from './quizzes/edit-quiz/edit-quiz.component';
//import { UserListComponent } from './users/user-list/user-list.component';

const routes: Routes = [
    {path: '', redirectTo: '/quiz-list', pathMatch: 'full' },
    {path: 'quiz-list', component: QuizListComponent},
    {path: 'game-page', component: GamePageComponent},
    //{path: 'user-list', component: UserListComponent},
    //{path: 'edit-quiz/:id', component: EditQuizComponent},
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

    

}
