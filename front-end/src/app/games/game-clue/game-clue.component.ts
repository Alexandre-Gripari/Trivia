import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Clue, Question, Answer } from '../../../models/question.model';
@Component({
  selector: 'app-game-clue',
  templateUrl: './game-clue.component.html',
  styleUrls: ['./game-clue.component.scss']
})
export class GameClueComponent implements OnInit {

  @Input() public clue: Clue | undefined;
  constructor() { }

  ngOnInit() {
  }
  
  onClueClick() {
    this.clueUsed.emit(this.clue);
  }

}
