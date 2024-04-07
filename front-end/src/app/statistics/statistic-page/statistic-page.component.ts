import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StatisticService } from '../../../services/statistic.service';


@Component({
  selector: 'app-statistic-page',
  templateUrl: './statistic-page.component.html',
  styleUrls: ['./statistic-page.component.scss']
})
export class StatisticPageComponent implements OnInit {
    
  user_id: number = 0;
  constructor(private route: ActivatedRoute, public statisticService: StatisticService) { }

  ngOnInit(): void {
    this.user_id = +this.route.snapshot.paramMap.get('id')!;
    this.statisticService.setUserId(this.user_id);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
