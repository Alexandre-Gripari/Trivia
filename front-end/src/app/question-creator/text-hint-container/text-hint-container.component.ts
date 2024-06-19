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
  hintsChangeTxt: EventEmitter<String[]> = new EventEmitter();

  @ViewChild('textInput') textInput!: ElementRef;
  textHints: string[] = [];

  clues: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onShowTextClick(): void {
    if (this.textInput && this.textInput.nativeElement && this.textInput.nativeElement.value !== '') {
      this.clues.push(this.textInput.nativeElement.value);
      this.textInput.nativeElement.value = '';
      this.updateHints();
    }
  }

  onTextChange(event: any): void {
    const text = event.target.value;
    this.textHints.push(text);
    this.updateHints();
  }

  onDeleteButtonClick(index: number): void {
    this.textHints.splice(index, 1);

  }

  updateHints() {
    console.log(this.clues);
    this.hintsChangeTxt.emit(this.clues);
  }

  moveUp(index: number): void {
    if (index > 0) {
      [this.textHints[index], this.textHints[index - 1]] = [this.textHints[index - 1], this.textHints[index]];
      this.clues = this.textHints;
      this.updateHints();
    }
  }
  
  moveDown(index: number): void {
    if (index < this.textHints.length - 1) {
      [this.textHints[index], this.textHints[index + 1]] = [this.textHints[index + 1], this.textHints[index]];
      this.clues = this.textHints;
      this.updateHints();
    }

  }

  

}
