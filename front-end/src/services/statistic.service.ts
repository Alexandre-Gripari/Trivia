import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { QuizStats, StatisticData } from '../models/statistic.model';



@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */
    
    private stats: StatisticData = {
      id: 0,
      numberOfCompletedQuizzes: 0, 
      numberOfCluesUsed: 0, 
      numberOfCluesUsedLatest: 0, 
      timeSpentMinutes: 0,
      timeSpentSeconds: 0,
      timeSpentMinutesLatest: 0,
      timeSpentSecondsLatest: 0
    };

    //private allStatsQuizzes: Map<Number, QuizStats[]> = ALL_STATS_QUIZ;
    private statsQuizzes: QuizStats[] = [];
    private statsQuizzesFiltred: QuizStats[] = [];
        
    public stats$: BehaviorSubject<StatisticData> = new BehaviorSubject(this.stats); 

    public statsQuizzesOb$: BehaviorSubject<QuizStats[]> = new BehaviorSubject(this.statsQuizzes);

    private serverUrl = "http://localhost:9428/api/"
    private statsUrl = this.serverUrl + 'statistics';
    private dataStatsPath = 'datastats';
    private quizStatsPath = 'quizstats';

    private descSort: boolean = false;

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */

  

  constructor(private http: HttpClient) {
  }

  setUserId(userId: number): void {
    this.setUserStats(userId.toString());
    this.setUserStatsQuizzes(userId);
  }

  setUserStats(userId: String): void {
    const urlWithId = this.statsUrl + '/' + this.dataStatsPath + '/' + userId;
    this.http.get<StatisticData>(urlWithId).subscribe((stats) => {
    this.stats$.next(stats);
    });
  }

  setUserStatsQuizzes(userId: number): void {
    const urlWithId = this.statsUrl + '/' + this.quizStatsPath + '/' + userId;
    this.http.get<QuizStats[]>(urlWithId).subscribe((statsQuizzes) => {
      this.statsQuizzesOb$.next(statsQuizzes);
      this.statsQuizzes = statsQuizzes;
      this.statsQuizzesFiltred = this.statsQuizzes.slice();
    }); 
  }


  sortByDate() {
    this.statsQuizzesFiltred.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
        console.error('Invalid date encountered', a.date, b.date);
        return 0;
      }
      return dateA.getTime() - dateB.getTime();
    });
  
    if (this.descSort === true) this.sortReverse("Décroissant");
    this.statsQuizzesOb$.next(this.statsQuizzesFiltred);
  }
  

  sortByName() {
    this.statsQuizzes.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

    this.statsQuizzesFiltred.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    if (this.descSort === true) this.sortReverse("Décroissant");
    this.statsQuizzesOb$.next(this.statsQuizzesFiltred);
  }

  sortByTheme() {
    this.statsQuizzes.sort((a, b) => {
      // Vérifier si la propriété theme est définie pour a et b
      if (a.theme === undefined && b.theme === undefined) {
        return 0; // Les deux thèmes sont undefined, considérez-les comme égaux
      }
      if (a.theme === undefined) {
        return 1; // Le thème de a est undefined, placez b avant a
      }
      if (b.theme === undefined) {
        return -1; // Le thème de b est undefined, placez a avant b
      }
      // Comparaison des thèmes des quiz en utilisant localeCompare
      return a.theme.localeCompare(b.theme);
    });

    this.statsQuizzesFiltred.sort((a, b) => {
      // Vérifier si la propriété theme est définie pour a et b
      if (a.theme === undefined && b.theme === undefined) {
        return 0; // Les deux thèmes sont undefined, considérez-les comme égaux
      }
      if (a.theme === undefined) {
        return 1; // Le thème de a est undefined, placez b avant a
      }
      if (b.theme === undefined) {
        return -1; // Le thème de b est undefined, placez a avant b
      }
      // Comparaison des thèmes des quiz en utilisant localeCompare
      return a.theme.localeCompare(b.theme);
    });
    if (this.descSort === true) this.sortReverse("Décroissant");
    this.statsQuizzesOb$.next(this.statsQuizzesFiltred);
  }

  sortBySuccessRate() {
    this.statsQuizzes.sort((a, b) => {
      return a.successRate - b.successRate;
    });

    this.statsQuizzesFiltred.sort((a, b) => {
      return a.successRate - b.successRate;
    });
    if (this.descSort === true) this.sortReverse("Décroissant");
    this.statsQuizzesOb$.next(this.statsQuizzesFiltred);
  }

  sortReverse(selectedValue: string) {
    this.statsQuizzes.reverse();
    this.statsQuizzesFiltred.reverse();
    this.statsQuizzesOb$.next(this.statsQuizzesFiltred);
    if (selectedValue === "Croissante") this.descSort = false;
    else this.descSort = true;
  }

  searchBarFilter(input: String) {
      this.statsQuizzesFiltred = this.statsQuizzes.filter(item =>
        item.name.toLowerCase().includes(input.toLowerCase())
      );
      this.statsQuizzesOb$.next(this.statsQuizzesFiltred);
  }
  
}


