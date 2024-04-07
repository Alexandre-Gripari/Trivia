import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { QuizStats } from '../../../models/statistic.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-statistic-quiz-stats',
  templateUrl: './statistic-quiz-stats.component.html',
  styleUrls: ['./statistic-quiz-stats.component.scss']
})
export class StatisticQuizStatsComponent implements OnInit {

  /**
   * Input here could be undefined, if the parent component doesn't give any quiz.
   * If you remove `undefined`, you will have an error saying:
   * "Property 'quiz' has no initializer and is not definitely assigned in the constructor."
   * We can also defined the initial value of the quiz in the constructor.
   */
  @Input()
  quizStats: QuizStats | undefined;

  @Output() quizStatsSelected = new EventEmitter<QuizStats>();

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  onQuizStatsClick() {
    this.quizStatsSelected.emit(this.quizStats);
  }


  
}
