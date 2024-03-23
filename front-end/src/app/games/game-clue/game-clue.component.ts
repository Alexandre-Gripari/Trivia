import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Clue } from '../../../models/question.model';

@Component({
  selector: 'app-game-clue',
  templateUrl: './game-clue.component.html',
  styleUrls: ['./game-clue.component.scss']
})
export class GameClueComponent implements OnInit {

  /**
   * Input here could be undefined, if the parent component doesn't give any quiz.
   * If you remove `undefined`, you will have an error saying:
   * "Property 'quiz' has no initializer and is not definitely assigned in the constructor."
   * We can also defined the initial value of the quiz in the constructor.
   */
  @Input()
  clue: Clue | undefined;

  @Output() clueUsed = new EventEmitter<Clue>();

  constructor() {
  }

  ngOnInit() {
  }

  onClueClick() {
    this.clueUsed.emit(this.clue);
    console.log(this.clue);
  }


  
}
