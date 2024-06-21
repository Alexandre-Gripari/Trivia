import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Clue, Question, Answer } from '../../../models/question.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-game-clue',
  templateUrl: './game-clue.component.html',
  styleUrls: ['./game-clue.component.scss']
})
export class GameClueComponent implements OnInit {

  @Input() public clue: Clue | undefined;

  ngOnInit() {
  }

  constructor(private sanitizer: DomSanitizer) {}
  
  getSafeAudioUrl(audioBase64: string | undefined): SafeUrl {
    const audioUrl = audioBase64;
    if (!audioUrl) {
      return '';
    }
    return this.sanitizer.bypassSecurityTrustUrl(audioUrl);
  }

}
