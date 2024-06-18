import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Question } from '../../../models/question.model';
import { Router } from '@angular/router';
import { Quiz } from '../../../models/quiz.model';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent implements OnInit {

  questions: Question[] = [];

  @Output() 
  questionsUpdated: EventEmitter<Question[]> = new EventEmitter();

  constructor(private router: Router, private quizService: QuizService) {
    
  }



  ngOnInit(): void {
    this.updateQuestions();
  }


  editQuestion(question: Question) {
    console.log("edit question");
    this.router.navigate(['/question-creator']);

  }
  deleteQuestion(question: Question) {
    console.log("delete question");
    this.questions = this.questions.filter(q => q !== question);
    this.questionsUpdated.emit(this.questions);
    
  }
  addQuestion() {
    console.log("add question");
    this.router.navigate(['/question-creator']);
  }

  updateQuestions() {
    var question = this.quizService.getQuestions();
    this.questions = question;
    this.questionsUpdated.emit(this.questions);
  }

  setQuestionsCurrentQuiz() {
    this.quizService.getCurrentQuiz().questions;
  }


}
