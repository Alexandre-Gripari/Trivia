import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { QuestionStats, QuizStats } from '../models/statistic.model';


@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private questionsStats: QuestionStats[] = []

  public questionsStats$: BehaviorSubject<QuestionStats[]> = new BehaviorSubject(this.questionsStats);

  public setQuestionsStats(quizStats: QuizStats) {
    this.questionsStats = quizStats.questionsStats;
    this.questionsStats$.next(this.questionsStats);
  }




}
