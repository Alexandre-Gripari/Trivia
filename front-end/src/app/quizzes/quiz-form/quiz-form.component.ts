import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss']
})
export class QuizFormComponent implements OnInit {

  // Note: We are using here ReactiveForms to create our form. Be careful when you look for some documentation to
  // avoid TemplateDrivenForm (another type of form)

  /**
   * QuizForm: Object which manages the form in our component.
   * More information about Reactive Forms: https://angular.io/guide/reactive-forms#step-1-creating-a-formgroup-instance
   */
 
  menuOpen = false;

  public allQuiz: Quiz[] = [];
  public selectedQuizzes: Quiz[] = [];
  public userCompleteName: String = "";

  constructor(public formBuilder: FormBuilder, public quizService: QuizService) {
    this.quizService.allQuiz$.subscribe((quizzes) => {
      this.allQuiz = quizzes;
    });
    this.quizService.fullName$.subscribe((fullName) => {
      this.userCompleteName = fullName;
    });
  }

  ngOnInit() {
  }


  openMenu() {
    this.menuOpen = !this.menuOpen;
    this.quizService.getAllOtherQuizzes();
    

  }

  closeMenu() {
    this.menuOpen = false;
  }

  addSelectedQuizzes() {
    console.log('Add selected quizzes');
    this.selectedQuizzes.forEach((quiz) => {
      console.log('Add quiz: ', quiz);
      this.quizService.addQuiz(quiz);
    });
    this.closeMenu();
    this.selectedQuizzes = [];

  }

  toggleSelectedQuiz(quiz: Quiz) {
    if (this.isSelected(quiz)) {
      this.selectedQuizzes = this.selectedQuizzes.filter((q) => q !== quiz);
    } else {
      this.selectedQuizzes.push(quiz);
    }
    console.log(this.selectedQuizzes);
  }

  isSelected(quiz: Quiz) {
    return this.selectedQuizzes.includes(quiz);
  }

}
