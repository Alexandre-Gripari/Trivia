import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Answer, Question, Clue } from '../models/question.model';
import { QUESTION_LIST } from '../mocks/game-questions.mock';
import { QuestionAndClue } from '../models/game.model';

import { HttpClient } from '@angular/common/http';
import { AnswerStats, QuestionStats, QuizStats } from 'src/models/statistic.model';



@Injectable({
  providedIn: 'root'
})
export class GameService {

  private apiUrl = 'http://localhost:9428/api/'

  private index: number = 0;

  private questions: Question[] = [];

  private question: Question = QUESTION_LIST[0];

  private clueNumber: number = -1;

  private numberOfErrors: number = 0;

  private clueActive: Boolean = false;

  private observable: QuestionAndClue = {question: this.question, clueNumber: this.clueNumber, clueActive: this.clueActive};

  public observable$: BehaviorSubject<QuestionAndClue> = new BehaviorSubject(this.observable);

  //Backend
  private quizName: string = "";
  private quizTheme: string = "";

  private userId: number = 0;

  private answersStats: AnswerStats[] = [];
  private indexForAnswersStats: number = 0;
  private questionsStats: QuestionStats[] = [];
  private indexForQuestionsStats: number = 0;

  private numberOfCluesPerQuestionUsed: number = 0;
  private numberOfBadAnswersPerQuestion: number = 0;

  private startTime: number = 0;
  private minutesTaken: number = 0;
  private secondsTaken: number = 0;


  private numberOfCluesPerQuizUsed: number = 0;
  //

  constructor(private http: HttpClient) {
  }
  
  public checkAnswer(answer: Answer) {
    if (answer.isCorrect) {
      
      // Gestion du backend
      this.stopTimer(); // Arrêter le timer ici
      this.addQuestionStats(this.observable.question.question, this.minutesTaken, this.secondsTaken, this.numberOfCluesPerQuestionUsed, this.numberOfBadAnswersPerQuestion); 
      this.resetQuestionStats();
      this.addAnswerStats(answer, true, true);
      for (let i = 0; i < this.observable.question.answers.length; i++) {
        if (this.observable.question.answers[i].show === true && this.observable.question.answers[i].isCorrect === false) {
          this.addAnswerStats(this.observable.question.answers[i], false, false); 
        }
      }
      //

      this.index++;
      this.observable.question = this.questions[this.index];
      this.observable.clueNumber = -1;
      this.numberOfErrors = 0;
      this.observable.clueActive = false;
      this.autoClueOnStart();
      if (this.index < this.questions.length) this.startTimer(); // Démarrer le timer pour la nouvelle question
      if (this.index >= this.questions.length) this.finishGame();
    } else {
        this.numberOfBadAnswersPerQuestion+=1 //Backend
        for (let i = 0; i < this.observable.question.answers.length; i++) {
            if (this.observable.question.answers[i] === answer) {
                this.addAnswerStats(this.observable.question.answers[i], false, true); // Gestion du backend
                this.observable.question.answers[i].show = false;
            }
        }
        this.numberOfErrors++;
        if (this.numberOfErrors >= this.observable.question.nbOfErrorsToUseClue && this.observable.clueNumber < this.observable.question.clues.length - 1) this.useClue(this.observable.question.clues[this.observable.clueNumber]);
    }
    this.observable$.next(this.observable);
}



  public autoClueOnStart() {
    if (this.observable.question && this.observable.question.nbOfErrorsToUseClue == 0) this.useClue(this.observable.question.clues[this.observable.clueNumber]);
  }

  public useClue(clue: Clue) {
    if (!this.observable.clueActive) this.observable.clueActive = true;
    this.numberOfCluesPerQuestionUsed+=1 //Backend
    this.observable.clueNumber+=1;
    this.observable$.next(this.observable);
  }

  public useClueWithButton(){
    if (!this.observable.clueActive) this.observable.clueActive = true;
    this.numberOfCluesPerQuestionUsed+=1 //Backend
    this.observable.clueNumber+=1
    this.observable$.next(this.observable);
  }

  public finishGame() {
    console.log("Game finished");
    this.postElements();

  }

  public setUserIdFromUser(userId: number) {
    this.userId = userId!;
  }
  
  public setQuestions(question: Question[], name: string, theme?: string) {
    this.resetGame();
    this.quizName = name;
    this.quizTheme = theme!;
    this.questions = question;
    this.question = this.questions[this.index];
    this.startTimer(); // Démarrer le timer ici
    console.log(this.question);
    for (let question of this.questions) {
      for (let answer of question.answers) {
        answer.show = true;
      }
    }
    this.observable.question = this.question;
    this.observable$.next(this.observable);
  }

  //Partie Backend

  private startTimer() {
    this.startTime = Date.now();
  }

  private stopTimer() {
    const timeTakenMs = Date.now() - this.startTime;
    this.minutesTaken = Math.floor(timeTakenMs / 60000); // 1 minute = 60000 ms
    this.secondsTaken = Math.floor((timeTakenMs % 60000) / 1000); // Reste en secondes
  }


  private resetQuestionStats() {
    this.numberOfCluesPerQuestionUsed = 0;
    this.numberOfBadAnswersPerQuestion = 0;
  }


  private addAnswerStats(answer: Answer, correct: boolean, choose: boolean) {
    const answerStats: AnswerStats = {
      id: -1,
      value: answer.value,
      isCorrect: correct,
      choose: choose,
    }
    this.answersStats[this.indexForAnswersStats] = answerStats;
    this.indexForAnswersStats+=1;
    console.log("Taille tableau answers;", this.answersStats.length);
  }


  private addQuestionStats(question: string, timeMinutes: number, timeSeconds: number, numberOfCluesUsed: number, numberOfBadAnswers: number) {
    const questionStats: QuestionStats = {
      id: -1,
      question: question,
      answerStats: [],
      timeMinutes: timeMinutes,
	    timeSeconds: timeSeconds-2,
	    numberOfCluesUsed: numberOfCluesUsed,
	    numberOfBadAnswers: numberOfBadAnswers,
    }
    this.questionsStats[this.indexForQuestionsStats] = questionStats;
    this.indexForQuestionsStats+=1;
    console.log("Taille tableau questions;", this.questionsStats.length);
  }


	private postElements() {
    let totalTimeM = 0;
    let totalTimeS = 0;
    let totalCluesUsed = 0;
    let successRate = 0;
    for (let i = 0; i < this.questionsStats.length; i++) {
      totalTimeM += this.questionsStats[i].timeMinutes;
      totalTimeS += this.questionsStats[i].timeSeconds;
      totalCluesUsed += this.questionsStats[i].numberOfCluesUsed;
      successRate += 100 - (this.questionsStats[i].numberOfBadAnswers * 33)
    }
    successRate /= this.questionsStats.length;
    successRate = Math.floor(successRate);
    const quizStats = {
      userId: this.userId,
	    name: this.quizName,
      theme: this.quizTheme,
	    date: new Date(),  
	    totalTimeMinutes: totalTimeM,
	    totalTimeSeconds: totalTimeS,
	    totalNumberOfCluesUsed: totalCluesUsed,
	    successRate: successRate
    }

    this.postQuizStats(quizStats);
  }

  private postQuizStats(quizStats: any) {
    this.http.post<QuizStats>(`${this.apiUrl}statistics/quizstats`, quizStats).subscribe(
      response => {
        console.log("Id du quizStats envoyé :", response.id);
        this.postQuestionsStats(response.id);
      },
      error => {
        console.error('There was an error during the request', error);
      }
    );
  }

  private postQuestionsStats(quizStatsId: number) {
    let indexForAnswers = 0 // pour chaque QuestionStats on lui racolle ses 4 AnswerStats
    for (let i = 0; i < this.questionsStats.length; i++) {
      const qs =  this.questionsStats[i]
      const questionStats = {
        quizStatsId: quizStatsId,
        question: qs.question,
        timeMinutes: qs.timeMinutes,
        timeSeconds: qs.timeSeconds,
        numberOfCluesUsed: qs.numberOfCluesUsed,
        numberOfBadAnswers: qs.numberOfBadAnswers,
      }
      this.http.post<QuestionStats>(`${this.apiUrl}statistics/quizstats/questionstats`, questionStats).subscribe(
        response => {
          console.log("Id du questionStats envoyé :", response.id);
          for (let j = 0; j < 4; j++) {
            this.postAnswerStats(response.id, indexForAnswers);
            indexForAnswers+=1;
          }
        },
        error => {
          console.error('There was an error during the request', error);
        }
      )
    }
  }

  private postAnswerStats(questionStatsId: number, index: number) {
    const as = this.answersStats[index];
    const answerStats = {
      questionStatsId: questionStatsId,
      value: as.value,
      isCorrect: as.isCorrect,
      choose: as.choose
    }
    this.http.post<AnswerStats>(`${this.apiUrl}statistics/quizstats/questionstats/answerstats`, answerStats).subscribe(
      response => {
        console.log("Id du answerStats envoyé :", response.id);
      },
      error => {
        console.error('There was an error during the request', error);
      }
    )
  }
	
	//
	

  private resetGame() {
    this.index = 0;
    this.numberOfErrors = 0;
    this.observable.clueNumber = -1;
    this.observable.clueActive = false;
    this.answersStats = [];
    this.indexForAnswersStats = 0;
    this.questionsStats = [];
    this.indexForQuestionsStats = 0;
    this.numberOfCluesPerQuestionUsed = 0;
    this.numberOfBadAnswersPerQuestion = 0;
    this.startTime = 0;
    this.minutesTaken = 0;
    this.secondsTaken = 0;
  }


}
