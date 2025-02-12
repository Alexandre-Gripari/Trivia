import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { QuizStats, StatisticData } from '../models/statistic.model';
import { serverUrl} from 'src/configs/server.config';


@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

    private userId: number = 0;
    
    private stats: StatisticData[] = []; 
    private statsFiltered: StatisticData[] = [];
  
    private statsQuizzes: QuizStats[] = [];
    private statsQuizzesFiltred: QuizStats[] = [];
        
    public stats$: BehaviorSubject<StatisticData[]> = new BehaviorSubject(this.stats); 

    public statsQuizzesOb$: BehaviorSubject<QuizStats[]> = new BehaviorSubject(this.statsQuizzes);

    private serverUrl = serverUrl;
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
    this.userId = userId;
    this.setUserStats(userId);
    this.setUserStatsQuizzes(userId);
  }

  setUserStats(userId: number): void {
    const urlWithId = this.statsUrl + '/' + this.dataStatsPath + '/' + this.userId;
    this.http.get<StatisticData[]>(urlWithId).subscribe((stats) => {
    this.stats = stats;
    this.stats$.next(stats);
    });
  }

  setUserStatsQuizzes(userId: number): void {
    const urlWithId = this.statsUrl + '/' + this.quizStatsPath + '/' + this.userId;
    this.http.get<QuizStats[]>(urlWithId).subscribe((statsQuizzes) => {
      this.statsQuizzesOb$.next(statsQuizzes);
      this.statsQuizzes = statsQuizzes;
      this.statsQuizzesFiltred = this.statsQuizzes.slice();
    }); 
  }

  deleteQuizStat(quizStats: QuizStats) {
    console.log("id du user :", this.userId);
    this.http.delete<QuizStats>(`${this.statsUrl}/quizstats/${quizStats.id}`).subscribe(
      response => {
        console.log('QuizStats deleted successfully', response);
        this.setUserStats(this.userId);
        this.setUserStatsQuizzes(this.userId);
      },
      error => {
        console.error('There was an error during the request', error);
      }
    );
  }

  filterCharts(startDate: Date, endDate: Date) {
    const startMonth = startDate.getMonth();
    const startYear = startDate.getFullYear();
    const endMonth = endDate.getMonth();
    const endYear = endDate.getFullYear();
    if (startYear > endYear) return this.stats$.next([]);
    this.statsFiltered = this.stats.filter(stat => {
      const statDate = new Date(stat.date);
      const statMonth = statDate.getMonth();
      const statYear = statDate.getFullYear();
      return (statYear > startYear && statYear < endYear) || (startYear != endYear && statYear === startYear && statMonth >= startMonth) || (startYear != endYear && statYear === endYear && statMonth <= endMonth) || (startYear === endYear && statYear === startYear && statMonth >= startMonth && statMonth <= endMonth);
    });
    this.stats$.next(this.statsFiltered);
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


