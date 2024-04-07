import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Answer, Question, Clue } from '../models/question.model';
import { QUESTION_LIST } from '../mocks/game-questions.mock';
import { QuestionAndClue } from '../models/game.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private index: number = 0;

  private questions: Question[] = [];

  private question: Question = QUESTION_LIST[0];

  private clueNumber: number = -1;

  private numberOfErrors: number = 0;

  private clueActive: Boolean = false;

  private observable: QuestionAndClue = {question: this.question, clueNumber: this.clueNumber, clueActive: this.clueActive};

  public observable$: BehaviorSubject<QuestionAndClue> = new BehaviorSubject(this.observable);
  
  public checkAnswer(answer: Answer) {
    if (answer.isCorrect) {
      this.index++;
      this.observable.question = this.questions[this.index];
      this.observable.clueNumber = -1;
      this.numberOfErrors = 0;
      this.observable.clueActive = false;
      this.autoClueOnStart();
      if (this.index >= this.questions.length) this.finishGame();
    }
    else {
      for (let i = 0; i < this.observable.question.answers.length; i++) {
        if (this.observable.question.answers[i] === answer) {
          this.observable.question.answers[i].show = false;
          }
      }
      this.numberOfErrors++;
      if (this.numberOfErrors >= this.observable.question.nbOfErrorsToUseClue && this.observable.clueNumber < this.observable.question.clue.length - 1) this.useClue(this.observable.question.clue[this.observable.clueNumber]);
    }
    this.observable$.next(this.observable);
  }


  public autoClueOnStart() {
    if (this.observable.question && this.observable.question.nbOfErrorsToUseClue == 0) this.useClue(this.observable.question.clue[this.observable.clueNumber]);
  }

  public useClue(clue: Clue) {
    console.log("Clue used");
    console.log(clue);
    if (!this.observable.clueActive) this.observable.clueActive = true;
    this.observable.clueNumber+=1
    this.observable$.next(this.observable);
  }

  public useClueWithButton(){
    if (!this.observable.clueActive) this.observable.clueActive = true;
    this.observable.clueNumber+=1
    this.observable$.next(this.observable);
  }

  public finishGame() {
    console.log("Game finished");
  }

  public setQuestions(question: Question[]) {
    this.questions = question;
    this.question = this.questions[this.index];
    this.observable.question = this.question;
    this.observable$.next(this.observable);
  }




}
