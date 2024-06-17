import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { QuestionStats } from '../../../models/statistic.model';
import { ReviewService } from '../../../services/review.service';


@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements OnInit {

  private user_id: number = 0;

  public questionsStatsList: QuestionStats[] = [];

  constructor(public reviewService: ReviewService, private location: Location) {
    this.reviewService.questionsStats$.subscribe((questionsStatsList) => {
      this.questionsStatsList = questionsStatsList;
    });
  }

  ngOnInit(): void {
  }

  returnToStats() {
    this.location.back();
  }

}
