import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { QUIZ_LIST } from '../mocks/quiz-list.mock';
import { ALLQUIZ } from '../mocks/all-quiz.mock';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
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
 
  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);

  constructor() {
  }

  addQuiz(quiz: Quiz) {
    // You need here to update the list of quiz and then update our observable (Subject) with the new list
    // More info: https://angular.io/tutorial/toh-pt6#the-searchterms-rxjs-subject

    // A new quiz has 0 questions by default
    quiz.questions = [];

    // We add the new quiz to the list
    this.quizzes.push(quiz);

    // We update the observable 
    this.quizzes$.next(this.quizzes);

  }

  setUserId(id: number) {
    this.user_id = id;
    if (!this.allQuizzes.has(this.user_id)) {
      console.log("No quizzes for this user");
    }
    else this.quizzes = this.allQuizzes.get(this.user_id)!;
    this.quizzes$.next(this.quizzes);
  }

  deleteQuiz(quiz: Quiz) {
    // We remove the quiz from the list
    this.quizzes = this.quizzes.filter(q => q !== quiz);

    // We update the observable 
    this.quizzes$.next(this.quizzes);
  }
  
}
