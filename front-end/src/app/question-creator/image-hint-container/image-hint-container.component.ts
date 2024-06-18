import {Component, ElementRef, OnInit, ViewChild, EventEmitter, Output} from '@angular/core';
import {BasicClue} from '../../../models/question.model';

@Component({
  selector: 'app-image-hint-container',
  templateUrl: './image-hint-container.component.html',
  styleUrls: ['./image-hint-container.component.scss']
})
export class ImageHintContainerComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef;
  fileNames: string[] = [];
  fileDataUrls: string[] = [];
  displayedImages: (string | undefined)[] = [];
  isImageDisplayed: boolean[] = [];
  imageUrls: string = '';
  nbHints: number = 0;
  
  clues: BasicClue[] =[
    {
      order: 0,
      indices : this.fileDataUrls[0]
    },
    {
      order: 1,
      indices : this.fileDataUrls[1]
    },
    {
      order: 2,
      indices : this.fileDataUrls[2]
    },
    {
      order: 3,
      indices : this.fileDataUrls[3]
    }
  ];

  @Output()
  hintsChangeImg: EventEmitter<BasicClue[]> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onShowImageClick(): void {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    } else {
      setTimeout(() => this.fileInput.nativeElement.click(), 0);
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.fileNames.push(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      this.fileDataUrls.push(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    this.isImageDisplayed.push(false);
  }

  onDisplayButtonClick(index: number): void {
    this.isImageDisplayed[index] = !this.isImageDisplayed[index];
    // Always use displayedImages to control what is shown
    if (!this.isImageDisplayed[index]) {
      this.displayedImages[index] = undefined; // Hide the image
    } else {
      // Decide what to display based on what's available
      this.displayedImages[index] = this.fileDataUrls[index];
    }
  }

  onDeleteButtonClick(index: number): void {
    this.fileNames.splice(index, 1);
    this.fileDataUrls.splice(index, 1);
    this.displayedImages.splice(index, 1);
    this.isImageDisplayed.splice(index, 1);
    this.nbHints--;
  }

  onImageUrlPaste(event: ClipboardEvent): void {
    const pastedText = event.clipboardData?.getData('text');
    if (pastedText) {
      const img = new Image();
      img.onload = () => {
        // Image loaded successfully, URL is valid
        this.fileNames.push("Image");
        this.fileDataUrls.push(pastedText);
        this.isImageDisplayed.push(false);
        this.displayedImages.push(pastedText);
  
        this.updateHints();
        this.clues[this.nbHints].indices = this.fileDataUrls[this.nbHints];
        this.nbHints++;
  
        this.clearInputField();
      };
      img.onerror = () => {
        // Image failed to load, URL is invalid
        this.clearInputField();
        alert('Invalid URL');
      };
      img.src = pastedText; // This should be the last step to ensure onload and onerror are set up
    } else {
      this.clearInputField();
    }
  }

  clearInputField(): void {
    this.imageUrls = '';
  }

  onNumberChange(): void {
    this.updateHints();
  }

  updateHints() {
    this.hintsChangeImg.emit(this.clues);
  }

}
