import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { GameQuestionAnswer } from '../../../models/game.model';
import { Answer } from '../../../models/question.model';

@Component({
  selector: 'app-game-answer',
  templateUrl: './game-answer.component.html',
  styleUrls: ['./game-answer.component.scss']
})
export class GameAnswerComponent implements OnInit {

  /**
   * Input here could be undefined, if the parent component doesn't give any quiz.
   * If you remove `undefined`, you will have an error saying:
   * "Property 'quiz' has no initializer and is not definitely assigned in the constructor."
   * We can also defined the initial value of the quiz in the constructor.
   */
  @Input()
  answer: Answer | undefined;

  @Output()
  quizSelected: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit() {
  }

  selectQuiz() {
    this.quizSelected.emit(true);
  }
}
