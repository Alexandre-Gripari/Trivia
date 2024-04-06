import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Quiz } from '../../../models/quiz.model';
import { Router } from '@angular/router';
import { GameService } from '../../../services/game.service';

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

  constructor(private router: Router, private gameService: GameService) {}

  ngOnInit() {
  }

  selectQuiz() {
    console.log("Quiz selected");
    this.quizSelected.emit(true);
    if (this.quiz) {
      this.gameService.setQuestions(this.quiz.questions);
      this.router.navigate(['/game-page']);
    }
  }
}
