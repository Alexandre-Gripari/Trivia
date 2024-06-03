import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { HttpClient } from '@angular/common/http';
import { Question } from 'src/models/question.model';

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
  private quizzes: Quiz[] = [];
  private currentQuiz: any;
  private allQuiz: Quiz[] = [];

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);
  public allQuiz$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.allQuiz);


  constructor(private http: HttpClient) {
  }

  addQuiz(quiz: Quiz) {
    // You need here to update the list of quiz and then update our observable (Subject) with the new list
    // More info: https://angular.io/tutorial/toh-pt6#the-searchterms-rxjs-subject


    const quizWithUserId = {
      name: quiz.name,
      theme: quiz.theme,
      userId: this.user_id,
    }
    this.http.post<Quiz>(`${this.apiUrl}quizzes`, quizWithUserId).subscribe(
    response => {
      console.log('Quiz added successfully', response);
      this.updateQuizList(this.user_id);
      this.updateAllQuizList();
    },
    error => {
      console.error('There was an error during the request', error);
    }
  );

  }

  setUserId(id: number) {
    this.user_id = id;
    this.quizzes = [];
    this.quizzes$.next(this.quizzes);
    this.updateQuizList(this.user_id);
  }

  deleteQuiz(quiz: Quiz) {
    this.http.delete<Quiz>(`${this.apiUrl}quizzes/${quiz.id}`).subscribe(
      response => {
        console.log('Quiz deleted successfully', response);
        this.updateQuizList(this.user_id);
        this.updateAllQuizList();
      },
      error => {
        console.error('There was an error during the request', error);
      }
    );
  }

  getQuizzesFromUser(id : number){
    return this.http.get<Quiz[]>(`${this.apiUrl}users/${id}/quizzes`)
  }

  setCurrentQuiz(quiz: any) {
    this.currentQuiz = quiz;
  }

  getCurrentQuiz() {
    return this.http.get<Quiz>(`${this.apiUrl}quizzes/${this.currentQuiz.id}/`);
  }

  updateQuizList(id: number) {
    console.log('Updating quiz list for user', id);
    this.getQuizzesFromUser(id).subscribe((quizzes) => {
      this.quizzes = quizzes;
      console.log('Quizzes:', this.quizzes);
      for (let quiz of this.quizzes) {
        this.http.get<Question[]>(`${this.apiUrl}quizzes/${quiz.id}/questions`).subscribe((questions) => {
          console.log(`Questions for quiz ${quiz.id}:`, questions);
          quiz.questions = questions;
          this.quizzes$.next(this.quizzes);
        });
      }
    });
  }

  getAllQuiz() {
    this.http.get<Quiz[]>(`${this.apiUrl}quizzes`).subscribe((quizzes) => {
      this.allQuiz = quizzes;
      this.allQuiz$.next(this.allQuiz);
    });
  }

  updateAllQuizList() {
    this.getAllQuiz();

  }

  getAllOtherQuizzes() {
    // Get all quizzes expect the ones in this.quizzes
    this.http.get<Quiz[]>(`${this.apiUrl}quizzes`).subscribe((quizzes) => {
      const quizzesNotAssociatedWithUser = quizzes.filter(quiz => quiz.userId !== this.user_id);
      this.allQuiz = quizzesNotAssociatedWithUser;
      this.allQuiz$.next(this.allQuiz);
    }, error => {
      console.error('There was an error during the request', error);
    });
  }

  addUserToQuiz(quiz: Quiz) {
    const updatedQuiz = { 
      id: quiz.id, 
      userId: this.user_id,
    };
    console.log('Adding user to quiz', updatedQuiz);
    this.http.put<Quiz>(`${this.apiUrl}quizzes/${updatedQuiz.id}`, updatedQuiz).subscribe(
      response => {
        console.log('User added to quiz successfully', response);
        this.updateQuizList(this.user_id);
      },
      error => {
        console.error('There was an error during the request', error);
      }
    );
  }

  reverseAllQuiz() {
    this.allQuiz.reverse();
    this.allQuiz$.next(this.allQuiz);
  }

  sortAllQuizByName() {
    this.allQuiz.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    this.allQuiz$.next(this.allQuiz);
  }

  sortAllQuizByTheme() {
    this.allQuiz.sort((a, b) => {
      if (a.theme == undefined) { a.theme = ""; }
      if (b.theme == undefined) { b.theme = ""; }
      return a.theme.localeCompare(b.theme);
        
    });
    this.allQuiz$.next(this.allQuiz);
  }

  sortAllQuizByDate() {
    this.allQuiz.sort((a, b) => {
      return a.id - b.id;
    });
    this.allQuiz$.next(this.allQuiz);
  }

  sortAllQuizByQuestion() {
    this.allQuiz.sort((a, b) => {
      return a.questions.length - b.questions.length;
    });
    this.allQuiz$.next(this.allQuiz);
  }

  searchQuiz(value: string) {
    let tmp : Quiz[] = this.allQuiz.filter((quiz) => {
      return quiz.name.toLowerCase().includes(value.toLowerCase()) || quiz.theme && quiz.theme.toLowerCase().includes(value.toLowerCase());
    });
    this.allQuiz$.next(tmp);
  }


    
}