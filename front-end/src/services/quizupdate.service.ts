import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { HttpClient } from '@angular/common/http';
import { Question } from 'src/models/question.model';
import { Clue } from 'src/models/question.model';
import { Answer } from 'src/models/question.model';
import { getNumberOfCurrencyDigits } from '@angular/common';
import { serverUrl} from 'src/configs/server.config';
import { QuizService } from './quiz.service';


@Injectable({
  providedIn: 'root'
})
export class QuizUpdateService {

  private tempIdCounter = -1;

  private apiUrl = serverUrl;

  questionsToDel: Question[] = [];

  private currentQuiz: Quiz = {
    id: 0,
    name: '',
    theme: '',
    questions: [],
    userId: 0
  }

  currentQuestion: Question = {
    id: 0,
    question: '',
    clues: [],
    answers: [],
    quizId: 0,
    nbOfErrorsToUseClue: 0
  }

  constructor(private http: HttpClient, private quizService: QuizService) {
  }

  getCurrentQuiz() {
    return this.currentQuiz;
  }

  setCurrentQuiz(quiz: Quiz) {
    this.currentQuiz = quiz;
  }

  updateCurrentQuiz(name: string, theme?: string) {
    this.currentQuiz.name = name;
    this.currentQuiz.theme = theme;
  }

  updateQuizInDB(name: string, theme: string, questions: Question[]) {
    console.log("current qui" + this.currentQuiz.id);
    console.log(name + " " + theme + " " + questions);
    if (this.currentQuiz.id === 0) {
        if (!theme) theme = '';
        this.quizService.createQuiz(name, theme, questions);
    } else {
    this.http.put<Quiz>(`${this.apiUrl}quizzes/${this.currentQuiz.id}`, {
        name: name,
        theme: theme,
        }).subscribe((quiz) => {
            console.log(quiz);
        });
    }
    this.updateQuestionsInDB(questions, this.currentQuiz.id);
  }

  updateQuestionsInDB(questions: Question[], quizId: number) {
    questions.forEach(question => {
        if (question.id < 0) {
            this.quizService.createQuestion(question, quizId);
        } else {
        this.http.put<Question>(`${this.apiUrl}quizzes/${quizId}/questions/${question.id}`, {
            question: question.question,
            clues: question.clues,
            answers: question.answers,
            nbOfErrorsToUseClue: question.nbOfErrorsToUseClue
        
        }).subscribe((question) => {
            this.updateAnswerInDB(question.answers, question.id, quizId);
            this.updateCluesInDB(question.clues, question.id, quizId);
        });
      }
    });
    
  }

  updateAnswerInDB(answer: Answer[], questionId: number, quizId: number) {
  
    answer.forEach(ans => {
        if (ans.id === 0) {
            this.quizService.createAnswer(ans, questionId, quizId);
        } else {
          this.http.put<Answer>(`${this.apiUrl}quizzes/${quizId}/questions/${questionId}/answers/${ans.id}`, {
            type: ans.type,
            value: ans.value,
            isCorrect: ans.isCorrect,
          }).subscribe(
            response => {
              console.log('Answer updated to quiz successfully', response);
            },
            error => {
              console.error('There was an error during the request', error);
            }
          );
        }
    });
  }

  updateCluesInDB(clue: Clue[], questionId: number, quizId: number) {
    clue.forEach(clu => {
        if (clu.id === 0) {
            this.quizService.createClue(clu, questionId, quizId);
        } else {
            this.http.put<Clue>(`${this.apiUrl}quizzes/${quizId}/questions/${questionId}/clues/${clu.id}`, {
                text: clu.text,
                image: clu.image,
                audio: clu.audio,
            }).subscribe((clu) => {
                console.log(clu);
            });
        }
    });
  }


  updateQuestionToDelete(question: Question) {
    this.questionsToDel.push(question);
  }

  deleteQuestionsInDB() {
    this.questionsToDel.forEach(question => {
        this.http.delete<Question>(`${this.apiUrl}quizzes/${this.currentQuiz.id}/questions/${question.id}`).subscribe(() => {
            console.log('Question deleted');
        });
    });
  }

  setCurrentQuestion(question: Question) {
    this.currentQuestion = question;
  }

  getCurrentQuestion() {
    return this.currentQuestion;
  }

  registerQuestionUpdated(question: string, answers: Answer[], clues: Clue[]) {
  
    this.currentQuiz.questions.forEach(q => {
        if (q.id === this.currentQuestion.id) {
            q.question = question;
            q.answers = answers;
            q.clues = clues;
        }
        });
  }

  registerQuestionAdded(question: string, answers: Answer[], clues: Clue[]) {
    this.currentQuiz.questions.push({
        id: this.tempIdCounter--,
        question: question,
        answers: answers,
        clues: clues,
        quizId: 0,
        nbOfErrorsToUseClue: 1
    });
  }

  clearData() {
    this.currentQuiz = {
        id: 0,
        name: '',
        theme: '',
        questions: [],
        userId: 0
    }
  }

  clearCurrentQuestion() {
    this.currentQuestion = {
        id: 0,
        question: '',
        clues: [],
        answers: [],
        quizId: 0,
        nbOfErrorsToUseClue: 0
    }
  }

  updateQuestionsOfCurrentQuiz(questions: Question[]) {
    this.currentQuiz.questions = questions;
  }

  



    
}