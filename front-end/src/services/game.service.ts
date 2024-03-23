import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Answer, Question, Clue } from '../models/question.model';
import { QUESTION_LIST } from '../mocks/game-questions.mock';
import { QuestionAndClue } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private index: number = 0;

  private questions: Question[] = QUESTION_LIST;

  private question: Question = this.questions[this.index];

  private clueNumber: number = 0;

  private clueActive: Boolean = false;

  private observable: QuestionAndClue = {question: this.question, clueNumber: this.clueNumber, clueActive: this.clueActive};

  public observable$: BehaviorSubject<QuestionAndClue> = new BehaviorSubject(this.observable);

  constructor() {
  }

  public checkAnswer(answer: Answer) {
    if (answer.isCorrect) {
      this.index++;
      this.observable.question = this.questions[this.index];
      this.observable.clueNumber = 0;
      this.observable.clueActive = false;
    }
    else {
      for (let i = 0; i < this.observable.question.answers.length; i++) {
        if (this.observable.question.answers[i] === answer) {
          this.observable.question.answers[i].show = false;
          }
      }
      this.observable.clueActive = true;
    }
    this.observable$.next(this.observable);
  }

  public useClue(clue: Clue) {
    this.observable.clueActive = false;
    this.observable.clueNumber+=1
    this.observable$.next(this.observable);
  }


}