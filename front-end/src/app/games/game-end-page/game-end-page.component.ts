import {Component, EventEmitter, ViewChild, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {GameConfettiComponent} from "../game-confetti/game-confetti.component";
import {UserService} from "../../../services/user.service";
import {QuizService} from "../../../services/quiz.service";
import { GameService } from '../../../services/game.service';

@Component({
  selector: 'app-game-end-page',
  templateUrl: './game-end-page.component.html',
  styleUrls: ['./game-end-page.component.scss']
})

export class GameEndPageComponent implements OnInit {

  @ViewChild('confetti') confettiComponent!: GameConfettiComponent;

  user : any;
  quiz: any;

  private confettiCanvas: HTMLCanvasElement;

  @Output()
  quizSelected: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router, private userService: UserService, private quizService: QuizService, private gameService: GameService) {
    this.confettiCanvas = document.getElementById('confetti-canvas') as HTMLCanvasElement;
  }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.quiz = this.quizService.getCurrentQuiz();

  }

  ngAfterViewInit(): void {
    // Now you can access the confetti component and its methods

    this.startConfettiAnimation();
  }

  navigateToSameQuiz() {
    this.gameService.setQuestions(this.quiz.questions);
    console.log("OK");
    this.router.navigate(['/game-page']);
  }

  navigateToQuizList() {
    console.log("user de getUser : " + this.user);
    this.router.navigate(['/quiz', this.user?.user_id]);
  }

  startConfettiAnimation() {
    console.log("start confetti");
    this.confettiComponent.startConfetti();
  }



}
