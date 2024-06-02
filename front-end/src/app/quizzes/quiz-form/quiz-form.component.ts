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
  public quizForm: FormGroup;
    menuOpen = false;

  public allQuiz: Quiz[] = [];
  public selectedQuizzes: Quiz[] = [];

  constructor(public formBuilder: FormBuilder, public quizService: QuizService) {
    this.quizService.allQuiz$.subscribe((quizzes) => {
      this.allQuiz = quizzes;
    });
    this.quizForm = this.formBuilder.group({
      name: [''],
      theme: ['']
    });
    // You can also add validators to your inputs such as required, maxlength or even create your own validator!
    // More information: https://angular.io/guide/reactive-forms#simple-form-validation
    // Advanced validation: https://angular.io/guide/form-validation#reactive-form-validation
  }

  ngOnInit() {
  }

  addQuiz() {
    // We retrieve here the quiz object from the quizForm and we cast the type "as Quiz".
    const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;

    // Do you need to log your object here in your class? Uncomment the code below
    // and open your console in your browser by pressing F12 and choose the tab "Console".
    // You will see your quiz object when you click on the create button.
    console.log('Add quiz: ', quizToCreate);

    // Now, add your quiz in the list!
    //Ajout du nouveau quiz dans la liste (doc array)
    this.quizService.addQuiz(quizToCreate);
    //Mise à jour de l’observable (Update observable with new value).
    this.quizService.quizzes$.next(this.quizService.quizzes$.getValue());

    
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
