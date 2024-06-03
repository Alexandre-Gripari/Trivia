import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

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
    this.displayedImages[index] = this.isImageDisplayed[index] ? this.fileDataUrls[index] : undefined;
  }

  onDeleteButtonClick(index: number): void {
    this.fileNames.splice(index, 1);
    this.fileDataUrls.splice(index, 1);
    this.displayedImages.splice(index, 1);
    this.isImageDisplayed.splice(index, 1);
  }

}
