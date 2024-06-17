import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Answer, Question, Clue } from '../models/question.model';
import { QUESTION_LIST } from '../mocks/game-questions.mock';
import { QuestionAndClue } from '../models/game.model';
import { EventEmitter } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private inactivityTimer: any;

  private apiUrl = 'http://localhost:9428/api/'

  private index: number = 0;

  private questions: Question[] = [];

  private question: Question = QUESTION_LIST[0];

  private clueNumber: number = -1;

  private numberOfErrors: number = 0;

  private clueActive: Boolean = false;

  private observable: QuestionAndClue = {question: this.question, clueNumber: this.clueNumber, clueActive: this.clueActive};

  public observable$: BehaviorSubject<QuestionAndClue> = new BehaviorSubject(this.observable);

  public gameFinished: EventEmitter<void> = new EventEmitter();

  constructor(private http: HttpClient) {
    this.resetInactivityTimer();
  }
  
  public checkAnswer(answer: Answer) {
    this.resetInactivityTimer();
    if (answer.isCorrect) {
      setTimeout(() => {
        this.index++;
        this.observable.question = this.questions[this.index];
        this.observable.clueNumber = -1;
        this.numberOfErrors = 0;
        this.observable.clueActive = false;
        this.autoClueOnStart();
        this.readQuestionAloud();
        if (this.index >= this.questions.length) this.finishGame();
        this.observable$.next(this.observable);
      }, 1000); 
    }
    else {
      for (let i = 0; i < this.observable.question.answers.length; i++) {
        if (this.observable.question.answers[i] === answer) {
          this.observable.question.answers[i].show = false;
          }
      }
      this.numberOfErrors++;
      if (this.numberOfErrors >= this.observable.question.nbOfErrorsToUseClue && this.observable.clueNumber < this.observable.question.clues.length - 1) this.useClue(this.observable.question.clues[this.observable.clueNumber]);
    }
    setTimeout(() => {
      this.observable$.next(this.observable);
    }, 1000);

  }


  public autoClueOnStart() {
    if (this.observable.question && this.observable.question.nbOfErrorsToUseClue == 0) this.useClue(this.observable.question.clues[this.observable.clueNumber]);
  }

  public useClue(clue: Clue) {
    console.log("Clue used");
    console.log(clue);
    if (!this.observable.clueActive) this.observable.clueActive = true;
    this.observable.clueNumber+=1
    this.observable$.next(this.observable);
  }

  public useClueWithButton(){
    this.resetInactivityTimer();
    if (!this.observable.clueActive) this.observable.clueActive = true;
    this.observable.clueNumber+=1
    this.observable$.next(this.observable);
  }

  public finishGame() {
    console.log("Game finished");
  }

  public setQuestions(question: Question[]) {
    this.resetGame();
    this.questions = question;
    this.question = this.questions[this.index];
    
    for (let question of this.questions) {
      for (let answer of question.answers) {
        answer.show = true;
      }
    }
    this.observable.question = this.question;
    
    this.observable$.next(this.observable);
    this.readQuestionAloud();
  }

  private resetGame() {
    this.index = 0;
    this.numberOfErrors = 0;
    this.observable.clueNumber = -1;
    this.observable.clueActive = false;
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
