import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Quiz } from '../../models/quiz.model';
import { QuizService } from '../../services/quiz.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-all-quizzes',
  templateUrl: './all-quizzes.component.html',
  styleUrls: ['./all-quizzes.component.scss']
})
export class AllQuizzesComponent implements OnInit {

  public allQuizzes: Quiz[] = [];
  public quizForm: FormGroup;

  constructor(public quizService : QuizService,public formBuilder: FormBuilder) { 
    this.quizService.allQuiz$.subscribe((quizList) => {
      this.allQuizzes = quizList;
    });
    this.quizForm = this.formBuilder.group({
      name: [''],
      theme: ['']
    });

  }

  ngOnInit(): void {
    this.quizService.getAllQuiz();
  }

  
    menuOpen = false;

  public allQuiz: Quiz[] = [];
  public selectedQuizzes: Quiz[] = [];


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
}
