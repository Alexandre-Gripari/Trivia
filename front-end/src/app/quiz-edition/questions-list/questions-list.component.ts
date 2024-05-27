import { Component, OnInit } from '@angular/core';
import { Question } from '../../../models/question.model';
import { QUESTION_LIST } from '../../../mocks/all-quiz.mock';
import { Router } from '@angular/router';
import { Quiz } from '../../../models/quiz.model';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent implements OnInit {

  questions: Question[] = QUESTION_LIST;
  quiz: Quiz = { name: "Quiz 1", questions: this.questions, id: 1};

  constructor(private router: Router) {
    // a terme remplacer par un appel a un service
    const navigation = window.history.state;
    if (navigation.quiz) {
      this.quiz = navigation.quiz;
    }
    this.questions = this.quiz.questions;
  }



  ngOnInit(): void {
  }
  editQuestion(question: Question) {
    console.log("edit question");
    this.router.navigate(['/question-creator']);
  }
  deleteQuestion(question: Question) {
    console.log("delete question");
    // a terme remplacer par un appel a un service
    this.questions = this.questions.filter(q => q !== question);
  }
  addQuestion() {
    console.log("add question");
    this.router.navigate(['/question-creator']);
  }
}
