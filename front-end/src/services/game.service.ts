import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Answer, Question, Clue } from '../models/question.model';
import { QuestionAndClue } from '../models/game.model';
import { EventEmitter } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { AnswerStats, QuestionStats, QuizStats } from 'src/models/statistic.model';
import { serverUrl} from 'src/configs/server.config';



@Injectable({
  providedIn: 'root'
})
export class GameService {

  private inactivityTimer: any;

  private apiUrl = serverUrl;

  private index: number = 0;

  private questions: Question[] = [];

  private question: Question = this.questions[0];

  private clueNumber: number = -1;

  private numberOfErrors: number = 0;

  private clueActive: Boolean = false;

  private observable: QuestionAndClue = {question: this.question, clueNumber: this.clueNumber, clueActive: this.clueActive};

  public observable$: BehaviorSubject<QuestionAndClue> = new BehaviorSubject(this.observable);

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
  public gameFinished: EventEmitter<void> = new EventEmitter();

  constructor(private http: HttpClient) {
    this.resetInactivityTimer();
  }
  
  public checkAnswer(answer: Answer) {
    this.resetInactivityTimer();
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
      // Fin gestion du backend

      setTimeout(() => {
        this.index++;
        this.observable.question = this.questions[this.index];
        this.observable.clueNumber = -1;
        this.numberOfErrors = 0;
        this.observable.clueActive = false;
        this.autoClueOnStart();
        this.readQuestionAloud();
      }, 1000); 
      
      
    } 
    else {
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
    setTimeout(() => {
      if (this.index >= this.questions.length) this.finishGame();
      else this.startTimer();  
      this.observable$.next(this.observable);
    }, 1000);

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
    this.resetInactivityTimer();
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
    this.readQuestionAloud();
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
	    timeSeconds: timeSeconds-1,
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

  public readQuestionAloud() {
    console.log("Reading question aloud");
    const questionText = this.observable.question
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(questionText.question);
  
    // Ajustements 
    utterThis.rate = 0.75; // Réduit la vitesse de parole
    utterThis.volume = 1; // Volume par défaut, ajustez selon besoin
    utterThis.pitch = 1; // Pitch par défaut
  
    const voices = synth.getVoices();
    let voice = voices.find(voice => voice.lang.startsWith('fr-FR')); // Prefer European French if available
    if (!voice) {
      voice = voices.find(voice => voice.lang.startsWith('fr')); // Fallback to any French voice
    }
    if (voice) utterThis.voice = voice;
    synth.speak(utterThis);
  }

  public resetInactivityTimer() {
    clearTimeout(this.inactivityTimer);
    this.inactivityTimer = setTimeout(() => {
      this.onInactivity();
    }, 60000);
  }

  private onInactivity() {
    this.readQuestionAloud();
    
  }



}

