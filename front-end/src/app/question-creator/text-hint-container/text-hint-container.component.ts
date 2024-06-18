import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { BasicClue } from '../../../models/question.model';

@Component({
  selector: 'app-text-hint-container',
  templateUrl: './text-hint-container.component.html',
  styleUrls: ['./text-hint-container.component.scss']
})
export class TextHintContainerComponent implements OnInit {

  nbHints: number = 0;

  @Output() 
  hintsChangeTxt: EventEmitter<BasicClue[]> = new EventEmitter();

  @ViewChild('textInput') textInput!: ElementRef;
  textHints: string[] = [];

  clues: BasicClue[] =[
    {
      order: 0,
      indices : this.textHints[0]
    },
    {
      order: 1,
      indices : this.textHints[1]
    },
    {
      order: 2,
      indices : this.textHints[2]
    },
    {
      order: 3,
      indices : this.textHints[3]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onShowTextClick(): void {
    if (this.textInput && this.textInput.nativeElement) {
      this.textInput.nativeElement.value = '';
      this.clues[this.nbHints].indices = this.textHints[this.nbHints];
      this.nbHints++;
      this.updateHints();
    }
  }

  onTextChange(event: any): void {
    const text = event.target.value;
    this.textHints.push(text);
  }

  onDeleteButtonClick(index: number): void {
    this.textHints.splice(index, 1);
    this.nbHints--;
  }

  updateHints() {
    console.log(this.clues);
    this.hintsChangeTxt.emit(this.clues);
  }

  onNumberChange(): void {
    this.updateHints();
  }

}
