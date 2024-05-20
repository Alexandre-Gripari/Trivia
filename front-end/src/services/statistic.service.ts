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
      id: "id",
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
    private statsQuizzesFiltred: QuizStats[] = [];
        
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
      this.statsQuizzesFiltred = this.statsQuizzes.slice();
      this.stats$.next(this.stats);
      this.statsQuizzesOb$.next(this.statsQuizzes);
    }
  }

  sortByDate() {
    this.statsQuizzesFiltred.sort((a, b) => {
      return a.date.getTime() - b.date.getTime();
    });

    this.statsQuizzesFiltred.sort((a, b) => {
      return a.date.getTime() - b.date.getTime();
    });
    
    this.statsQuizzesOb$.next(this.statsQuizzesFiltred);
  }

  sortByName() {
    this.statsQuizzes.sort((a, b) => {
      return a.Quiz.name.localeCompare(b.Quiz.name);
    });

    this.statsQuizzesFiltred.sort((a, b) => {
      return a.Quiz.name.localeCompare(b.Quiz.name);
    });

    this.statsQuizzesOb$.next(this.statsQuizzesFiltred);
  }

  sortByTheme() {
    this.statsQuizzes.sort((a, b) => {
      // Vérifier si la propriété theme est définie pour a et b
      if (a.Quiz.theme === undefined && b.Quiz.theme === undefined) {
        return 0; // Les deux thèmes sont undefined, considérez-les comme égaux
      }
      if (a.Quiz.theme === undefined) {
        return 1; // Le thème de a est undefined, placez b avant a
      }
      if (b.Quiz.theme === undefined) {
        return -1; // Le thème de b est undefined, placez a avant b
      }
      // Comparaison des thèmes des quiz en utilisant localeCompare
      return a.Quiz.theme.localeCompare(b.Quiz.theme);
    });

    this.statsQuizzesFiltred.sort((a, b) => {
      // Vérifier si la propriété theme est définie pour a et b
      if (a.Quiz.theme === undefined && b.Quiz.theme === undefined) {
        return 0; // Les deux thèmes sont undefined, considérez-les comme égaux
      }
      if (a.Quiz.theme === undefined) {
        return 1; // Le thème de a est undefined, placez b avant a
      }
      if (b.Quiz.theme === undefined) {
        return -1; // Le thème de b est undefined, placez a avant b
      }
      // Comparaison des thèmes des quiz en utilisant localeCompare
      return a.Quiz.theme.localeCompare(b.Quiz.theme);
    });

    this.statsQuizzesOb$.next(this.statsQuizzesFiltred);
  }

  sortBySuccessRate() {
    this.statsQuizzes.sort((a, b) => {
      return a.successRate - b.successRate;
    });

    this.statsQuizzesFiltred.sort((a, b) => {
      return a.successRate - b.successRate;
    });

    this.statsQuizzesOb$.next(this.statsQuizzesFiltred);
  }

  sortReverse() {
    this.statsQuizzes.reverse();
    this.statsQuizzesFiltred.reverse();
    this.statsQuizzesOb$.next(this.statsQuizzesFiltred);
  }

  searchBarFilter(input: String) {
      this.statsQuizzesFiltred = this.statsQuizzes.filter(item =>
        item.Quiz.name.toLowerCase().includes(input.toLowerCase())
      );
      this.statsQuizzesOb$.next(this.statsQuizzesFiltred);
  }
  
}


