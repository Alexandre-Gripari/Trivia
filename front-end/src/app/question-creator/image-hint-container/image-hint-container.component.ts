import {Component, ElementRef, OnInit, ViewChild, EventEmitter, Output, Input} from '@angular/core';
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

  @Input()
  imageHintInput: string[] = [];

  @Output()
  hintsChangeImg: EventEmitter<string[]> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    if (this.imageHintInput.length > 0) {
      this.fileDataUrls = this.imageHintInput;
      this.fileNames = this.imageHintInput.map(() => 'Image');
      this.displayedImages = this.imageHintInput;
      this.isImageDisplayed = this.imageHintInput.map(() => false);
      this.clues = this.imageHintInput;
    }
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
        this.imageUrls = pastedText;
        this.fileNames.push("Image");
        this.fileDataUrls.push(this.imageUrls);
        this.isImageDisplayed.push(false);
        this.displayedImages = this.fileDataUrls;
        this.clues = this.fileDataUrls;
        this.updateHints();
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
    console.log(this.clues);
  }

  clearInputField(): void {
    this.imageUrls = '';
  }

  updateHints() {
    this.hintsChangeImg.emit(this.clues);
  }

  moveUp(index: number): void {
    if (index > 0) { // Check if it's not the first item
      this.swapItems(index, index - 1);
    }
  }
  
  moveDown(index: number): void {
    if (index < this.fileDataUrls.length - 1) { // Check if it's not the last item
      this.swapItems(index, index + 1);
    }
  }
  
  // Utility method to swap elements in all arrays
  swapItems(indexA: number, indexB: number): void {
    [this.fileDataUrls[indexA], this.fileDataUrls[indexB]] = [this.fileDataUrls[indexB], this.fileDataUrls[indexA]];
    [this.fileNames[indexA], this.fileNames[indexB]] = [this.fileNames[indexB], this.fileNames[indexA]];
    [this.displayedImages[indexA], this.displayedImages[indexB]] = [this.displayedImages[indexB], this.displayedImages[indexA]];
    [this.isImageDisplayed[indexA], this.isImageDisplayed[indexB]] = [this.isImageDisplayed[indexB], this.isImageDisplayed[indexA]];
    [this.clues[indexA], this.clues[indexB]] = [this.clues[indexB], this.clues[indexA]];
  }
}
