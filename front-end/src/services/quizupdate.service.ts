import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { HttpClient } from '@angular/common/http';
import { Question } from 'src/models/question.model';
import { Clue } from 'src/models/question.model';
import { Answer } from 'src/models/question.model';
import { getNumberOfCurrencyDigits } from '@angular/common';
import { QuizService } from './quiz.service';

@Injectable({
  providedIn: 'root'
})
export class QuizUpdateService {

  private apiUrl = 'http://localhost:9428/api/'

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

  updateQuizInDB(name: string, theme?: string, questions?: Question[]) {
    this.http.put<Quiz>(`${this.apiUrl}quizzes/${this.currentQuiz.id}`, {
        id: this.currentQuiz.id,
        name: name,
        theme: theme,
        }).subscribe((quiz) => {
            if (questions) {
                console.log(questions);
                this.updateQuestionsInDB(questions, quiz.id);
            }
        }
    )
  }

  updateQuestionsInDB(questions: Question[], quizId: number) {
    questions.forEach(question => {
        if (question.id === 0) {
            this.quizService.createQuestion(question, quizId);
        } else {
        this.http.put<Question>(`${this.apiUrl}quizzes/${quizId}/questions/${question.id}`, {
            question: question.question,
            clues: question.clues,
            answers: question.answers,
            quizId: quizId,
            nbOfErrorsToUseClue: question.nbOfErrorsToUseClue
        
        }).subscribe((question) => {
            console.log(question);
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
        id: 0,
        question: question,
        answers: answers,
        clues: clues,
        quizId: 0,
        nbOfErrorsToUseClue: 0
    });
  }

  



    
}