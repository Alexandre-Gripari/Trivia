import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Question } from '../../../models/question.model';
import { Router } from '@angular/router';
import { Quiz } from '../../../models/quiz.model';
import { QuizUpdateService } from 'src/services/quizupdate.service';

@Component({
  selector: 'app-quiz-update-list',
  templateUrl: './quiz-update-list.component.html',
  styleUrls: ['./quiz-update-list.component.scss']
})
export class QuizUpdateListComponent implements OnInit {

  questions: Question[] = [];

  @Output()
  questionsUpdated: EventEmitter<Question[]> = new EventEmitter();


  constructor(private router: Router, private quizUpdateService: QuizUpdateService) {
  }

  ngOnInit(): void {
    this.questions = this.quizUpdateService.getCurrentQuiz().questions;
  }

  addQuestion() {
    this.router.navigate(['question-updator'], { state: { myBoolean: true } });
  }

  updateQuestions() {
    this.questionsUpdated.emit(this.questions);
  }

  deleteQuestion(question: Question) {
    this.questions = this.questions.filter(q => q !== question);
    this.updateQuestions();
    this.quizUpdateService.updateQuestionToDelete(question);
  }

  editQuestion(question: Question) {
    this.quizUpdateService.setCurrentQuestion(question);
    this.router.navigate(['question-updator']);
  }




}
