import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Quiz } from '../../../models/quiz.model';
import { Router } from '@angular/router';
import { GameService } from '../../../services/game.service';
import { QuizService } from '../../../services/quiz.service';
import {User} from "../../../models/user.model";
import { QuizUpdateService } from 'src/services/quizupdate.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  /**
   * Input here could be undefined, if the parent component doesn't give any quiz.
   * If you remove `undefined`, you will have an error saying:
   * "Property 'quiz' has no initializer and is not definitely assigned in the constructor."
   * We can also defined the initial value of the quiz in the constructor.
   */
  @Input()
  quiz: Quiz | undefined;

  @Output()
  quizSelected: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router, private gameService: GameService, private quizService : QuizService, private quizUpdateServie : QuizUpdateService ) {}

  ngOnInit() {
    this.quizService.setCurrentQuiz(this.quiz);
  }

  selectQuiz() {
    console.log("Quiz selected");
    this.quizSelected.emit(true);
    if (this.quiz && this.quiz.questions.length > 0) {
      console.log(this.quiz.questions);
      this.gameService.setQuestions(this.quiz.questions, this.quiz.name, this.quiz.theme);
      this.router.navigate(['/game-page']);
    }
  }

  editQuiz() {
    console.log("Edit quiz");
    if (this.quiz) {
      this.quizUpdateServie.setCurrentQuiz(this.quiz);
      this.router.navigate(['/quiz-update-page']);
    }
      
  }

  deleteQuiz() {
    console.log("Delete quiz");
    if (this.quiz) {
      console.log("Delete quiz");
      this.quizService.deleteQuiz(this.quiz);
    }
  }
}
