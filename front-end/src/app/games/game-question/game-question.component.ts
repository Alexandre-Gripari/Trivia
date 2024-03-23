import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../../../services/game.service';
import { Question } from '../../../models/question.model';
import { Answer } from '../../../models/question.model';

@Component({
  selector: 'app-game-question',
  templateUrl: './game-question.component.html',
  styleUrls: ['./game-question.component.scss']
})


export class GameQuestionComponent implements OnInit {

  public question: Question;

  public answers : Answer[];

  constructor(public gameService: GameService) {
    this.gameService.question$.subscribe((question) => {
      this.question = question;
      this.answers = question.answers;
    });
  }

  ngOnInit() {
  }

}
