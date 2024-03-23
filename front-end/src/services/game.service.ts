import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Answer, Question } from '../models/question.model';
import { QUESTION_LIST } from '../mocks/game-questions.mock';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private index : number = 0;

  private questions: Question[] = QUESTION_LIST;

  private question : Question = this.questions[this.index];

  public question$: BehaviorSubject<Question> = new BehaviorSubject(this.question);

  constructor() {
  }

  public checkAnswer(answer: Answer) {
    if (answer.isCorrect) {
      this.index++;
      this.question = this.questions[this.index];
    }
    else {
      for (let i = 0; i < this.question.answers.length; i++) {
        if (this.question.answers[i] === answer) {
          this.question.answers[i].show = false;
          
        }
      }
    }
    this.question$.next(this.question);
  }


}