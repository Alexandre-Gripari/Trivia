import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { HttpClient } from '@angular/common/http';
import { Question } from 'src/models/question.model';
import { Clue } from 'src/models/question.model';
import { Answer } from 'src/models/question.model';

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
  private questions: any[] = [];
  private quizData = { title: '', theme: '' };



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
      
      quiz.questions.forEach(question => {
        this.createQuestion(question, response.id);
      }
      );

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

  getUserId() {
    return this.user_id;
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
    return this.currentQuiz;
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
      console.log('All quizzes:', this.allQuiz);
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

  // to move in a more appropriate service

  createQuiz(name: string, theme: string, questions: Question[]) {
    const quiz = { 
      theme: theme,
      name: name,
      userId: this.user_id,
    };
    this.http.post<Quiz>(`${this.apiUrl}quizzes`, quiz).subscribe(
      response => {
        // Assuming response includes the newly created quiz's ID
        const quizId = response.id;
        questions.forEach(question => {
          this.createQuestion(question, quizId); // Pass quizId to each question
        });
      },
      error => {
        console.error('There was an error during the request', error);
      }
    );
  }
  
  createQuestion(question: Question, quizId: number) {
    // Include quizId in the question object or API call as needed

    console.log('Creating question', question.answers);

    const realQuestion = {
      question: question.question,
      quizId: quizId,
      answers : question.answers,
      clues : question.clues,
      nbOfErrorsToUseClue : question.nbOfErrorsToUseClue
    }

    console.log('Creating question', realQuestion);

    this.http.post<Question>(`${this.apiUrl}quizzes/${quizId}/questions`, realQuestion).subscribe(
      response => {
        console.log('Question added successfully', response);
        // Assuming response includes the newly created question's ID
        const questionId = response.id;
        // If the question has answers, create them
        question.answers.forEach(answer => {
          this.createAnswer(answer, questionId, quizId); // Pass questionId to each answer
        });
        // If the question has clues, create them
        question.clues.forEach(clue => {
          this.createClue(clue, questionId, quizId); // Pass questionId to each clue
        });
      },
      error => {
        console.error('There was an error during the request', error);
      }
    );
  }
  
  createAnswer(answer: Answer, questionId: number, quizId: number) {
    
    const realAnswer = {
      type: "option",
      value: answer.value,
      isCorrect: answer.isCorrect,
      questionId: questionId
    }

    this.http.post<any>(`${this.apiUrl}quizzes/${quizId}/questions/${questionId}/answers`, realAnswer).subscribe(
      response => {
        console.log('Answer added successfully', response);
        // No need to update quiz list here
      },
      error => {
        console.error('There was an error during the request', error);
      }
    );
  }
  
  createClue(clue: Clue, questionId: number, quizId: number) {
    
    const realClue = {
      questionId: questionId,
      image : clue.image,
      text : clue.text,
      audio : clue.audio
    }
    console.log('Creating clue', realClue);

    this.http.post<any>(`${this.apiUrl}quizzes/${quizId}/questions/${questionId}/clues`, realClue).subscribe(
      response => {
        console.log('Clue added successfully', response);
        // No need to update quiz list here
      },
      error => {
        console.error('There was an error during the request', error);
      }
    );
  }

  registerQuestion(question : any, answers : any, indice : any) {
    const realQuestion : Question = {
      question: question,
      answers: answers,
      clues: indice,
      nbOfErrorsToUseClue: 1,
      quizId: 36, //temporal quiz id
      id: 35    // temporal question id
    }

    this.questions.push(realQuestion);
  }

  getQuestions() {
    return this.questions;
  }

  setQuizData(title: string, theme: string) {
    this.quizData.title = title;
    this.quizData.theme = theme;
  }
  
  getQuizData() {
    return this.quizData;
  }

  clearCurrentQuiz() {
    this.questions = [];
    this.quizData = { title: '', theme: '' };
  }



}
