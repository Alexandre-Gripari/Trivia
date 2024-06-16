import { Component, OnInit, ViewChild } from '@angular/core';
import { GameService } from '../../../services/game.service';
import { Clue, Question, Answer } from '../../../models/question.model';
import { GameConfettiComponent } from '../game-confetti/game-confetti.component';
@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit {

  @ViewChild('confetti') confettiComponent!: GameConfettiComponent;

  public clue: Clue | undefined;

  public question: Question | undefined;

  public answers: Answer[] | undefined;

  isFinished: Boolean = false;

  constructor(gameService: GameService) {
    gameService.observable$.subscribe((observable) => {
      if (observable.question === undefined) {
        this.startConfettiAnimation();
      }
    });
  }

  ngOnInit() {
  }

  startConfettiAnimation(): void {
    this.confettiComponent.startConfetti();
  }

}
