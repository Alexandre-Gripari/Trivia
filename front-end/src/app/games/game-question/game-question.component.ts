import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../../../services/game.service';
import { Clue, Question, Answer } from '../../../models/question.model';

@Component({
  selector: 'app-game-question',
  templateUrl: './game-question.component.html',
  styleUrls: ['./game-question.component.scss']
})


export class GameQuestionComponent implements OnInit {

  public clue: Clue | undefined;

  public question: Question | undefined;

  public answers: Answer[] | undefined;

  constructor(public gameService: GameService) {
    this.gameService.observable$.subscribe((observable) => {
      this.question = observable.question;
      if (observable.clueActive) {
        this.clue = observable.question.clue[this.getCurrentClueNumber()];
      }
      else {
        this.clue = undefined;
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

  handleClueUsed(clue: Clue) {
    this.gameService.useClue(clue);
  }
}
