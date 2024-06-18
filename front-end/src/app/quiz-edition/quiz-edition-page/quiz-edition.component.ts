import { Component, OnInit } from '@angular/core';
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

  constructor(private quizService: QuizService){
  }
  ngOnInit(): void {
    const quizData = this.quizService.getQuizData();
    this.quizTitle = quizData.title;
    this.quizTheme = quizData.theme;
  }

  addQuiz() {
    this.quizService.createQuiz(this.quizTitle, this.quizTheme, this.questions);
  }

  handleQuestionsUpdated(questions: Question[]) {
    this.questions = questions;
  }

  handleQuizChange(event: any) {
    this.quizService.setQuizData(this.quizTitle, this.quizTheme);
  }
}
