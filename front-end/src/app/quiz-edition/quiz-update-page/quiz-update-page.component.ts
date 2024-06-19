import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router} from '@angular/router';
import { Question } from 'src/models/question.model';
import { QuizUpdateService } from 'src/services/quizupdate.service';


@Component({
  selector: 'app-quiz-update-page',
  templateUrl: './quiz-update-page.component.html',
  styleUrls: ['./quiz-update-page.component.scss']
})
export class QuizUpdatePageComponent implements OnInit {

  quizTitle: string = '';
  quizTheme?: string = '';
  questions: Question[] = [];

  currentQuiz : any;

  constructor(private router : Router, private quizUpdateService: QuizUpdateService){
  }

  ngOnInit(): void {
    // Correctly access the state from the router
    this.quizTitle = this.quizUpdateService.getCurrentQuiz().name;
    this.quizTheme = this.quizUpdateService.getCurrentQuiz().theme;
    this.questions = this.quizUpdateService.getCurrentQuiz().questions;
    console.log(this.questions);
  }

  addQuiz() {
    if (!this.quizTheme) this.quizTheme = '';
    this.quizUpdateService.updateQuizInDB(this.quizTitle, this.quizTheme, this.questions);
    this.quizUpdateService.deleteQuestionsInDB();
    this.quizUpdateService.clearData();
    this.router.navigate(['home-page'])
  }

  handleQuestionsUpdated(questions: Question[]) {
    this.questions = questions;
  }

  handleQuizChange(event: any) {
    this.quizUpdateService.updateCurrentQuiz(this.quizTitle, this.quizTheme);
  }




}
