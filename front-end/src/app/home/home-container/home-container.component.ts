import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss']
})
export class HomeContainerComponent {
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToCreateQuiz() {
    //this.router.navigate(['/quiz-edition-page']);
    this.router.navigate(['/quiz-update-page']);
  }

  navigateToUserList() {
    this.router.navigate(['/user-page']);
  }

  navigateToAddUser() {
    this.router.navigate(['/user-creator-page']);
  }

  navigateToQuizList() {
    this.router.navigate(['/all-quizzes']);
  }
}