import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import { Router } from '@angular/router';
import { GameService } from '../../../services/game.service';


@Component({
  selector: 'app-quizmini',
  templateUrl: './quizmini.component.html',
  styleUrls: ['./quizmini.component.scss']
})
export class QuizminiComponent implements OnInit {

  @Input()
  selected: boolean = false;

   /**
   * Input here could be undefined, if the parent component doesn't give any quiz.
   * If you remove `undefined`, you will have an error saying:
   * "Property 'quiz' has no initializer and is not definitely assigned in the constructor."
   * We can also defined the initial value of the quiz in the constructor.
   */

   @Input()
   quiz: Quiz | undefined;
   constructor(private router: Router, private gameService: GameService, private quizService : QuizService ) {}

    ngOnInit() {
      
    }


}
