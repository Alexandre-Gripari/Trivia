import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Answer } from '../../../models/question.model';

interface BasicAnswer {
  type? : string
  value: string;
  isCorrect: boolean;
  id : number;
}

@Component({
  selector: 'app-answers-container',
  templateUrl: './answers-container.component.html',
  styleUrls: ['./answers-container.component.scss']
})



export class AnswersContainerComponent implements OnInit {

  @Input()
  answersInput: Answer[] = [];

  answers: BasicAnswer[] = [
    {
      type: "option",
      value: '',
      isCorrect: false,
      id : 0
    },
    {
      type: "option",
      value: '',
      isCorrect: false,
      id : 0
    },
    {
      type: "option",
      value: '',
      isCorrect: false,
      id : 0
    },
    {
      type: "option",
      value: '',
      isCorrect: false,
      id : 0
    }
  ];

  @Output() 
  answersUpdated: EventEmitter<BasicAnswer[]> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    if (this.answersInput.length > 0) {
      this.answers = this.answersInput.map(answer => {
        return {
          type: answer.type,
          value: answer.value,
          isCorrect: answer.isCorrect,
          id : answer.id
        }
      });
    }
  }

  updateAnswers() {
    console.log(this.answers);
    this.answersUpdated.emit(this.answers);
  }
}
