import { Component, OnInit } from '@angular/core';
import { StatisticService } from '../../../services/statistic.service';
import { StatisticData } from '../../../models/statistic.model';
import * as Highcharts from 'highcharts'; 
import HighchartsMore from 'highcharts/highcharts-more';

HighchartsMore(Highcharts);

@Component({
  selector: 'app-statistic-data',
  templateUrl: './statistic-data.component.html',
  styleUrls: ['./statistic-data.component.scss']
})
export class StatisticDataComponent implements OnInit {
  
  public Highcharts: typeof Highcharts = Highcharts;
  public stats: StatisticData[] = [];
  public chartOptions: any;

  public months = [
    { name: 'Janvier', value: 0 },
    { name: 'Février', value: 1 },
    { name: 'Mars', value: 2 },
    { name: 'Avril', value: 3 },
    { name: 'Mai', value: 4 },
    { name: 'Juin', value: 5 },
    { name: 'Juillet', value: 6 },
    { name: 'Août', value: 7 },
    { name: 'Septembre', value: 8 },
    { name: 'Octobre', value: 9 },
    { name: 'Novembre', value: 10 },
    { name: 'Décembre', value: 11 }
  ];

  public startMonth: number = 0;
  public startYear: number = new Date().getFullYear();
  public endMonth: number = 11;
  public endYear: number = new Date().getFullYear();

  constructor(public statisticService: StatisticService) {
    this.statisticService.stats$.subscribe((stats) => {
      this.stats = stats;
      this.updateChart();
    });
  }

  ngOnInit() {
    this.initChart();
  }

  initChart() {
    this.chartOptions = {
      chart: {
        type: 'column' 
      },
      title: {
        text: 'Statistiques des indices utilisés par date'
      },
      xAxis: {
        categories: this.stats.map(stat => this.formatDate(new Date(stat.date))), 
        title: {
          text: 'Date'
        }
      },
      yAxis: {
        title: {
          text: 'Nombre d\'indices utilisés'
        }
      },
      series: [{
        name: 'Nombre d\'indices utilisés',
        data: this.stats.map(stat => stat.numberOfCluesUsed) 
      }]
    };
  }

  updateChart() {
    if (this.chartOptions) {
      this.chartOptions.xAxis.categories = this.stats.map(stat => this.formatDate(new Date(stat.date)));
      this.chartOptions.series[0].data = this.stats.map(stat => stat.numberOfCluesUsed);
    }
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  }

  filterData() {
    const startDate = new Date(this.startYear, this.startMonth);
    const endDate = new Date(this.endYear, this.endMonth);
    this.statisticService.filterCharts(startDate, endDate);
    this.initChart();
    this.updateChart();
  }

  userSelected(selected: boolean) {
    console.log('event received from child:', selected);
  }
}
