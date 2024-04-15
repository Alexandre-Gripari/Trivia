import { Component, OnInit} from '@angular/core';
import { StatisticService } from '../../../services/statistic.service';


@Component({
  selector: 'app-statistic-navigate',
  templateUrl: './statistic-navigate.component.html',
  styleUrls: ['./statistic-navigate.component.scss']
})
export class StatisticNavigateComponent implements OnInit {

  private asc = true;
  searchTerm: string = "";

  constructor(public statisticService: StatisticService) { }

  ngOnInit(): void {
  }

  filterList(filter: any) {
    const selectedValue = filter.target.value;
    switch (selectedValue) {
      case 'Date':
        this.statisticService.sortByDate();
        break;
      case 'SuccessRate':
        this.statisticService.sortBySuccessRate();
        break;
      case 'Nom':
        this.statisticService.sortByName();
        break;
      case 'Theme':
        this.statisticService.sortByTheme();
        break;
    }
  }

  changeFilter(filter: any) {
    const selectedValue = filter.target.value;
    switch (selectedValue) {
      case 'Croissante':
        if (!this.asc) {
          this.statisticService.sortReverse();
          this.asc = true;
        }
        break;
      case 'Décroissante':
        if (this.asc) { 
          this.statisticService.sortReverse();
          this.asc = false
        }
        break;
    }
  }

  searchBar() {
    if (this.searchTerm === '') this.statisticService.searchBarFilter('');
    this.statisticService.searchBarFilter(this.searchTerm);
  }

}
