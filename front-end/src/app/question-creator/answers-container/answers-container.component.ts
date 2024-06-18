import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Answer } from '../../../models/question.model';

interface BasicAnswer {
  value: string;
  isCorrect: boolean;
}

@Component({
  selector: 'app-answers-container',
  templateUrl: './answers-container.component.html',
  styleUrls: ['./answers-container.component.scss']
})



export class AnswersContainerComponent implements OnInit {

  answers: BasicAnswer[] = [
    {
      value: '',
      isCorrect: false
    },
    {
      value: '',
      isCorrect: false
    },
    {
      value: '',
      isCorrect: false
    },
    {
      value: '',
      isCorrect: false
    }
  ];

  @Output() 
  answersUpdated: EventEmitter<BasicAnswer[]> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  updateAnswers() {
    console.log(this.answers);
    this.answersUpdated.emit(this.answers);
  }
}
