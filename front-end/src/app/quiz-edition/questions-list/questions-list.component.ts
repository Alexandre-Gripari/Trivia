import { Component, OnInit } from '@angular/core';
import { Question } from '../../../models/question.model';
import { QUESTION_LIST } from '../../../mocks/all-quiz.mock';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent implements OnInit {

  questions: Question[] = QUESTION_LIST;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  editQuestion(question: Question) {
    console.log("edit question");
    this.router.navigate(['/question-creator']);
  }
  deleteQuestion(question: Question) {
    console.log("delete question");
  }

  addQuestion() {
    console.log("add question");
    this.router.navigate(['/question-creator']);
  }
}
