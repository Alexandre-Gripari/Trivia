import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent implements OnInit {

  searchValue: string = '';
  asc : boolean =  true;

  constructor(public quizService: QuizService) { }

  ngOnInit(): void {
  }

  filterList(filter: any) {
    const selectedValue = filter.target.value;
    switch (selectedValue) {
      case 'Nom':
        this.quizService.sortAllQuizByName();
        break;
      case 'Theme':
        this.quizService.sortAllQuizByTheme();
        break;
      case 'Date':
        this.quizService.sortAllQuizByDate();
        break;
      case 'Nombre':
        this.quizService.sortAllQuizByQuestion();
        break;  
    }
  }

  changeFilter(filter: any) {
    const selectedValue = filter.target.value;
    switch (selectedValue) {
      case 'Croissante':
        if (!this.asc) {
          this.quizService.reverseAllQuiz();
          this.asc = true;
        }
        break;
      case 'Décroissante':
        if (this.asc) { 
          this.quizService.reverseAllQuiz();
          this.asc = false
        }
        break;
    }
  }

  onSearchChange(value: string) {
    this.searchValue = value;
    this.quizService.searchQuiz(value);
  }



}
