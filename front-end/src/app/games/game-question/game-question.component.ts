import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../../../services/game.service';
import { Clue, Question, Answer } from '../../../models/question.model';
import {User} from "../../../models/user.model";

@Component({
  selector: 'app-game-question',
  templateUrl: './game-question.component.html',
  styleUrls: ['./game-question.component.scss']
})


export class GameQuestionComponent implements OnInit {

  public clue: Clue | undefined;

  public question: Question | undefined;

  public answers: Answer[] | undefined;

  isFinished: Boolean = false;

  constructor(public gameService: GameService) {
    this.gameService.observable$.subscribe((observable) => {
      if (observable.question === undefined) this.isFinished = true;
      else {
        this.question = observable.question;
        this.clue = observable.question.clues[this.getCurrentClueNumber()];
      }
    });
  }

  ngOnInit() {
    console.log("Début du quiz");
      if (this.question?.nbOfErrorsToUseClue == 0) this.gameService.autoClueOnStart();
  }

  handleAnswerSelected(answer: Answer) {
    console.log("received answer");
    this.gameService.checkAnswer(answer);
  }

  getCurrentClueNumber() {
    return this.gameService.observable$.getValue().clueNumber;
  }

  handleClueUsed() {
    console.log("Clue used by button");
    this.gameService.useClueWithButton();
  }


}
