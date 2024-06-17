import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { GameQuestionAnswer } from '../../../models/game.model';
import { Answer } from '../../../models/question.model';

@Component({
  selector: 'app-game-answer',
  templateUrl: './game-answer.component.html',
  styleUrls: ['./game-answer.component.scss']
})
export class GameAnswerComponent implements OnInit {

  clickedCorrect = false;

  /**
   * Input here could be undefined, if the parent component doesn't give any quiz.
   * If you remove `undefined`, you will have an error saying:
   * "Property 'quiz' has no initializer and is not definitely assigned in the constructor."
   * We can also defined the initial value of the quiz in the constructor.
   */
  @Input()
  answer: Answer | undefined;

  @Output() answerSelected = new EventEmitter<Answer>();

  constructor() {
  }

  ngOnInit() {
  }

  onAnswerClick() {
    this.answerSelected.emit(this.answer);
    console.log(this.answer);
    
    if (this.answer && this.answer.isCorrect) {
      this.clickedCorrect = true;
    } else {
      this.clickedCorrect = false;
    }
    
  }


  
}
