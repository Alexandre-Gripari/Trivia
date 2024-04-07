import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatisticService } from '../../../services/statistic.service';
import { QuizStats } from '../../../models/statistic.model';
import { ReviewService } from '../../../services/review.service';


@Component({
  selector: 'app-statistic-completed-quizzes',
  templateUrl: './statistic-completed-quizzes.component.html',
  styleUrls: ['./statistic-completed-quizzes.component.scss']
})
export class StatisticCompletedQuizzesComponent implements OnInit {

  public quizStatsList: QuizStats[] = [];

  constructor(public statsService: StatisticService, public reviewsService: ReviewService , private router: Router) {
    this.statsService.statsQuizzesOb$.subscribe((quizStatsList) => {
      this.quizStatsList = quizStatsList;
    });
  }

  ngOnInit(): void {
  }

  quizStatsSelected(quizStats: QuizStats) {
      this.reviewsService.setQuestionsStats(quizStats);
      this.router.navigate(['/reviews']);
  }
}
