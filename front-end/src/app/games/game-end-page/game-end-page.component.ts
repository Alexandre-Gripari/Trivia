import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../../../models/user.model";
import {UserService} from "../../../services/user.service";
import {QuizService} from "../../../services/quiz.service";
import { GameService } from '../../../services/game.service';

@Component({
  selector: 'app-game-end-page',
  templateUrl: './game-end-page.component.html',
  styleUrls: ['./game-end-page.component.scss']
})

export class GameEndPageComponent implements OnInit {
  user : any;
  quiz: any;

  @Output()
  quizSelected: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router, private userService: UserService, private quizService: QuizService, private gameService: GameService) {}

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.quiz = this.quizService.getCurrentQuiz()
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

}
