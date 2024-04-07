import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { QuestionStats } from '../../../models/statistic.model';


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  /**
   * Input here could be undefined, if the parent component doesn't give any quiz.
   * If you remove `undefined`, you will have an error saying:
   * "Property 'quiz' has no initializer and is not definitely assigned in the constructor."
   * We can also defined the initial value of the quiz in the constructor.
   */
  @Input()
  questionStats: QuestionStats | undefined;

  constructor() {}

  ngOnInit() {
  }

}
