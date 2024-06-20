import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from 'src/models/question.model';
import { QuizService } from 'src/services/quiz.service';


@Component({
  selector: 'app-quiz-edition',
  templateUrl: './quiz-edition.component.html',
  styleUrls: ['./quiz-edition.component.scss']
})
export class QuizEditionComponent implements OnInit {

  quizTitle: string = '';
  quizTheme: string = '';
  questions: Question[] = [];

  currentQuiz : any;

  constructor(private quizService: QuizService, private router : Router){
  }
  ngOnInit(): void {
    const quizData = this.quizService.getQuizData();
    this.quizTitle = quizData.title;
    this.quizTheme = quizData.theme;
  }

  addQuiz() {
    this.quizService.createQuiz(this.quizTitle, this.quizTheme, this.questions);
    this.quizService.clearCurrentQuiz();
    this.router.navigate(['home-page'])
  }

  handleQuestionsUpdated(questions: Question[]) {
    this.questions = questions;
    this.quizService.setQuestions(questions);
  }

  handleQuizChange(event: any) {
    this.quizService.setQuizData(this.quizTitle, this.quizTheme);
  }
}
