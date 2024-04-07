import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { QuizStats, StatisticData } from '../models/statistic.model';
import { ALLSTATISTICS } from '../mocks/all-statistics.mock';
import { ALL_STATS_QUIZ } from '../mocks/all-stats-quizzes.mock';


@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

   /**
    * The list of quiz.
    * The list is retrieved from the mock. 
    */
  
    private user_id: number = 0;

    private allStatistics: Map<Number, StatisticData> = ALLSTATISTICS;
    private stats: StatisticData = {
      numberOfCompletedQuizzes: 0, 
      numberOfCluesUsed: 0, 
      numberOfCluesUsedLatest: 0, 
      timeSpentMinutes: 0,
      timeSpentSeconds: 0,
      timeSpentMinutesLatest: 0,
      timeSpentSecondsLatest: 0
    };

    private allStatsQuizzes: Map<Number, QuizStats[]> = ALL_STATS_QUIZ;
    private statsQuizzes: QuizStats[] = [];
      
    public stats$: BehaviorSubject<StatisticData> = new BehaviorSubject(this.stats); 

    public statsQuizzesOb$: BehaviorSubject<QuizStats[]> = new BehaviorSubject(this.statsQuizzes);

    

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */

  

  constructor() {
  }

  setUserId(id: number) {
    this.user_id = id;
    if (!this.allStatistics.has(this.user_id)) {
      console.log("No statistics for this user");
    }
    else {
      this.stats = this.allStatistics.get(this.user_id)!;
      this.statsQuizzes = this.allStatsQuizzes.get(this.user_id)!;
      this.stats$.next(this.stats);
      this.statsQuizzesOb$.next(this.statsQuizzes);
    }
  }

};
