import {Component, ElementRef, OnInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';
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

  clues: string[] = [];

  @Input()
  audioHintInput: string[] = [];

  @Output()
  hintsChangeAudio: EventEmitter<string[]> = new EventEmitter();

  constructor(private sanitizer : DomSanitizer) { }

  ngOnInit(): void {
    if (this.audioHintInput.length > 0) {
      this.fileDataUrls = this.audioHintInput.map(audio => this.sanitizer.bypassSecurityTrustUrl(audio));
      this.fileNames = this.audioHintInput.map(() => 'Audio');
      this.displayedAudios = this.fileDataUrls;
      this.clues = this.audioHintInput;
    }
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
      this.clues.push(e.target?.result as string);
      this.updateHints();
    };
    reader.readAsDataURL(file);
  }

  onDeleteButtonClick(index: number): void {
    this.fileNames.splice(index, 1);
    this.fileDataUrls.splice(index, 1);
    this.displayedAudios.splice(index, 1);
    this.clues.splice(index, 1);
    this.updateHints();
  }

  

  updateHints() {
    this.hintsChangeAudio.emit(this.clues);
  }

}
