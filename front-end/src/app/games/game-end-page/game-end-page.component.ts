import {Component, EventEmitter, ViewChild, OnInit, Output, Input} from '@angular/core';
import {Router} from "@angular/router";
import {GameConfettiComponent} from "../game-confetti/game-confetti.component";
import {UserService} from "../../../services/user.service";
import {QuizService} from "../../../services/quiz.service";
import { GameService } from '../../../services/game.service';
import {Quiz} from "../../../models/quiz.model";

@Component({
  selector: 'app-game-end-page',
  templateUrl: './game-end-page.component.html',
  styleUrls: ['./game-end-page.component.scss']
})

export class GameEndPageComponent implements OnInit {

  @ViewChild('confetti') confettiComponent!: GameConfettiComponent;

  quiz: any;
  userId: any;

  private confettiCanvas: HTMLCanvasElement;

  @Output()
  quizSelected: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  notify: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router, private userService: UserService, private quizService: QuizService, private gameService: GameService) {
    this.confettiCanvas = document.getElementById('confetti-canvas') as HTMLCanvasElement;
  }

  ngOnInit() {
    this.userId = this.quizService.getUserId();
    this.quiz = this.quizService.getCurrentQuiz();
  }

  ngAfterViewInit(): void {
    // Now you can access the confetti component and its methods

    this.startConfettiAnimation();
    // delete the confetti after 10 seconds
    setTimeout(() => {
      this.confettiComponent.stopConfetti();
    }, 10000);

  }

  navigateToSameQuiz() {
    this.notify.emit(true);
    this.gameService.setQuestions(this.quiz.questions, this.quiz.name, this.quiz.theme);
    console.log("OK");
    this.stopConfettiAnimation();
    this.router.navigate(['/game-page']);
  }

  navigateToQuizList() {
    console.log("user de getUser : " + this.userId);
    this.router.navigate(['/quiz', this.userId]);
  }

  startConfettiAnimation() {
    console.log("start confetti");
    this.confettiComponent.startConfetti();
  }

  stopConfettiAnimation() {
    console.log("stop confetti");
    this.confettiComponent.stopConfetti();
  }


}
