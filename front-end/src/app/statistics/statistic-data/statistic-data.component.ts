import { Component, OnInit } from '@angular/core';
import { StatisticService } from '../../../services/statistic.service';
import { StatisticData } from '../../../models/statistic.model';



@Component({
  selector: 'app-statistic-data',
  templateUrl: './statistic-data.component.html',
  styleUrls: ['./statistic-data.component.scss']
})
export class StatisticDataComponent implements OnInit {

  public stats: StatisticData = {
    numberOfCompletedQuizzes:0, 
    numberOfCluesUsed:0,
    numberOfCluesUsedLatest:0,
    timeSpentMinutes:0,
    timeSpentSeconds:0,
    timeSpentMinutesLatest:0,
    timeSpentSecondsLatest:0
  };

  private user_id: number = 0;

  constructor(public statisticService: StatisticService) {
    this.statisticService.stats$.subscribe((stats) => {
      this.stats = stats;
    });
  }

  ngOnInit() {
  }

  userSelected(selected: boolean) {
    console.log('event received from child:', selected);
  }

 
}


