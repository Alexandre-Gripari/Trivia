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

    const quizWithUserId = { ...quiz, userId: this.user_id };
    this.http.post<Quiz>(`${this.apiUrl}quizzes`, quizWithUserId).subscribe(
    response => {
      console.log('Quiz added successfully', response);
      this.updateQuizList();
    },
    error => {
      console.error('There was an error during the request', error);
    }
  );

  }

  setUserId(id: number) {
    this.user_id = id;
    if (!this.allQuizzes.has(this.user_id)) {
      console.log("No quizzes for this user");
    } else {
      this.updateQuizList();
    }
  }

  deleteQuiz(quiz: Quiz) {
    this.http.delete<Quiz>(`${this.apiUrl}quizzes/${quiz.id}`).subscribe(
      response => {
        console.log('Quiz deleted successfully', response);
        this.updateQuizList();
      },
      error => {
        console.error('There was an error during the request', error);
      }
    );
  }

  setCurrentQuiz(quiz: any) {
    this.currentQuiz = quiz;
  }

  getCurrentQuiz() {
    this.http.get<Quiz>(`${this.apiUrl}quizzes/${this.currentQuiz.id}/`);
  }

  updateQuizList() {
    this.http.get<Quiz[]>(`${this.apiUrl}users/${this.user_id}/quizzes`).subscribe((quizzes) => {
      this.quizzes = quizzes;
      this.quizzes$.next(this.quizzes);
    });
  }
}
