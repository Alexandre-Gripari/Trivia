import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { AnswerStats } from '../../../models/statistic.model';

@Component({
  selector: 'app-statistic-answer-stats',
  templateUrl: './statistic-answer-stats.component.html',
  styleUrls: ['./statistic-answer-stats.component.scss']
})
export class StatisticAnswerStatsComponent implements OnInit {

  /**
   * Input here could be undefined, if the parent component doesn't give any quiz.
   * If you remove `undefined`, you will have an error saying:
   * "Property 'quiz' has no initializer and is not definitely assigned in the constructor."
   * We can also defined the initial value of the quiz in the constructor.
   */
  @Input()
  answerStats: AnswerStats | undefined;

    
  constructor() {
  }

  ngOnInit() {
  }
  
}
