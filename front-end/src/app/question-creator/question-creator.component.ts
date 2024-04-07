import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-creator',
  templateUrl: './question-creator.component.html',
  styleUrls: ['./question-creator.component.scss']
})
export class QuestionCreatorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const fileInput = document.getElementById('hints') as HTMLInputElement;
    const preview = document.getElementById('preview') as HTMLImageElement;

    fileInput.addEventListener('change', function() {
      if (this.files && this.files[0]) {
        const file = this.files[0];
        const reader = new FileReader();
        preview.style.display = 'block';

        reader.addEventListener('load', function() {
          if (this.result) {
            preview.setAttribute('src', this.result.toString());
          }
        });

        reader.readAsDataURL(file);
      } else {
        preview.style.display = 'none';
      }
    });
  }

  onAudioChange(event: any): void {
    const audioInput = document.getElementById('hint-audio') as HTMLInputElement;
    const audioPreview = document.getElementById('audio-preview') as HTMLAudioElement;

    if (audioInput.files && audioInput.files[0]) {
      const file = audioInput.files[0];
      audioPreview.src = URL.createObjectURL(file);
      audioPreview.style.display = 'block';
    } else {
      audioPreview.style.display = 'none';
    }
  }
}
