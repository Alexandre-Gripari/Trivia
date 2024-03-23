import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Question } from '../models/question.model';
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


}
