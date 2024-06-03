import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-audio-hint-container',
  templateUrl: './audio-hint-container.component.html',
  styleUrls: ['./audio-hint-container.component.scss']
})
export class AudioHintContainerComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef;
  fileNames: string[] = [];
  fileDataUrls: SafeUrl[] = [];
  displayedAudios: (SafeUrl | undefined)[] = [];

  constructor(private sanitizer : DomSanitizer) { }

  ngOnInit(): void {
  }

  onShowAudioClick(): void {
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
      const safeUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(e.target?.result as string);
      this.fileDataUrls.push(safeUrl);
      this.displayedAudios.push(safeUrl);
    };
    reader.readAsDataURL(file);
  }

  onDeleteButtonClick(index: number): void {
    this.fileNames.splice(index, 1);
    this.fileDataUrls.splice(index, 1);
    this.displayedAudios.splice(index, 1);
  }

}
