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
  
  clues: string[] = [];

  @Output()
  hintsChangeImg: EventEmitter<string[]> = new EventEmitter();

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
      this.clues.push(e.target?.result as string);
      this.updateHints();
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
    this.clues.splice(index, 1);

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
        this.clues.push(pastedText);
  
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

  updateHints() {
    this.hintsChangeImg.emit(this.clues);
  }

  moveUp(index: number): void {
    if (index > 0) {
      [this.fileDataUrls[index], this.fileDataUrls[index - 1]] = [this.fileDataUrls[index - 1], this.fileDataUrls[index]];
      [this.fileNames[index], this.fileNames[index - 1]] = [this.fileNames[index - 1], this.fileNames[index]];
      [this.displayedImages[index], this.displayedImages[index - 1]] = [this.displayedImages[index - 1], this.displayedImages[index]];
      [this.isImageDisplayed[index], this.isImageDisplayed[index - 1]] = [this.isImageDisplayed[index - 1], this.isImageDisplayed[index]];
      this.clues = this.fileDataUrls;
      this.updateHints();
    }
  }

  moveDown(index: number): void {
    if (index < this.fileDataUrls.length - 1) {
      [this.fileDataUrls[index], this.fileDataUrls[index + 1]] = [this.fileDataUrls[index + 1], this.fileDataUrls[index]];
      [this.fileNames[index], this.fileNames[index + 1]] = [this.fileNames[index + 1], this.fileNames[index]];
      [this.displayedImages[index], this.displayedImages[index + 1]] = [this.displayedImages[index + 1], this.displayedImages[index]];
      [this.isImageDisplayed[index], this.isImageDisplayed[index + 1]] = [this.isImageDisplayed[index + 1], this.isImageDisplayed[index]];
      this.clues = this.fileDataUrls;
      this.updateHints();
    }
  }

}
