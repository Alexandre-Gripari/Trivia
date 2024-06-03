import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-text-hint-container',
  templateUrl: './text-hint-container.component.html',
  styleUrls: ['./text-hint-container.component.scss']
})
export class TextHintContainerComponent implements OnInit {

  @ViewChild('textInput') textInput!: ElementRef;
  textHints: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onShowTextClick(): void {
    if (this.textInput && this.textInput.nativeElement) {
      this.textInput.nativeElement.value = '';
    }
  }

  onTextChange(event: any): void {
    const text = event.target.value;
    this.textHints.push(text);
  }

  onDeleteButtonClick(index: number): void {
    this.textHints.splice(index, 1);
  }

}
