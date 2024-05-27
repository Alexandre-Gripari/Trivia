import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { QUIZ_LIST } from '../mocks/quiz-list.mock';
import { ALLQUIZ } from '../mocks/all-quiz.mock';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private apiUrl = 'http://localhost:9428/api/'

  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

   /**
    * The list of quiz.
    * The list is retrieved from the mock.
    */
  private user_id: number = 0;
  private allQuizzes: Map<number, Quiz[]> = ALLQUIZ;
  private quizzes: Quiz[] = [];
  private currentQuiz: any;

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);

  constructor(private http: HttpClient) {
  }

  addQuiz(quiz: Quiz) {
    // You need here to update the list of quiz and then update our observable (Subject) with the new list
    // More info: https://angular.io/tutorial/toh-pt6#the-searchterms-rxjs-subject

    return this.http.post<Quiz>(`${this.apiUrl}/quizzes`, quiz);

  }

  setUserId(id: number) {
    this.user_id = id;
    if (!this.allQuizzes.has(this.user_id)) {
      console.log("No quizzes for this user");
    } else {
      this.http.get<Quiz[]>(`/users/${this.apiUrl}/${this.user_id}/quizzes`).subscribe((quizzes) => {
        this.quizzes = quizzes;
        this.quizzes$.next(this.quizzes);
      });
    }
  }

  deleteQuiz(quiz: Quiz) {
    // We remove the quiz from the list
    return this.http.delete<Quiz>(`${this.apiUrl}/quizzes/${quiz.id}`);
  }

  setCurrentQuiz(quiz: any) {
    this.currentQuiz = quiz;
  }

  getCurrentQuiz() {
    return this.http.get<Quiz>(`${this.apiUrl}/quizzes/${this.currentQuiz.id}`);
  }
}
