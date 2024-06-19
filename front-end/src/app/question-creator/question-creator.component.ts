import { Component, OnInit } from '@angular/core';
import { Clue } from 'src/models/question.model';
import { Question } from 'src/models/question.model';
import { Answer } from 'src/models/question.model';
import { QuizService } from 'src/services/quiz.service';
import { BasicClue } from 'src/models/question.model';
import { Router } from '@angular/router';


interface Indice{
  text?: string;
  image?: string;
  audio?: string;
}


@Component({
  selector: 'app-question-creator',
  templateUrl: './question-creator.component.html',
  styleUrls: ['./question-creator.component.scss']
})
export class QuestionCreatorComponent implements OnInit {

  textClues: string[] = [];
  imageClues: string[] = [];
  audioClues: string[] = [];
  answers: Answer[] = [];
  question: string = '';

  constructor(private quizService : QuizService, private router: Router ) { }

  ngOnInit(): void {
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

  handleAnswersChange(answers: any) {
    this.answers = answers;
  }

  handleTextCluesChange(clues: any) {
    this.textClues = clues;
  }

  handleImgCluesChange(clues: any) {
    this.imageClues = clues;
  }

  handleAudioCluesChange(clues: any) {
    this.audioClues = clues;
  }

  createQuestion() {
    console.log (this.textClues, this.imageClues, this.audioClues);
    var indice = this.createIndiceArray(this.textClues, this.imageClues, this.audioClues);
    this.quizService.registerQuestion(this.question, this.answers, indice);
    this.router.navigate(['quiz-edition-page']);
  }

  cancel() {
    this.router.navigate(['quiz-edition-page']);
  }


  createIndiceArray(textClues: string[], imageClues: string[], audioClues: string[]) {
    const modifiedTextClues = textClues.map((clue, index) => {
      // Create a prefix from all text clues before the current one
      const prefix = textClues.slice(0, index).join('\n');
      // Check if prefix is not empty, then append \n before the current clue
      return prefix ? `${prefix}\n${clue}` : clue;
    });
  
    const indicesArray: Clue[] = [];
    const size = Math.max(modifiedTextClues.length, imageClues.length, audioClues.length);

    var imagetmp = "";
    var audioTmp = "";
    var textTmp = "";

    if (imageClues.length > 0) {
      imagetmp = imageClues[0];
    }
  
    for (let i = 0; i < size; i++) {
      const indice: Clue = {
        questionId: 0,
        id: 0

      };
      if (modifiedTextClues[i]) {
        indice.text = modifiedTextClues[i];
        textTmp = modifiedTextClues[i];
      }
      else indice.text = textTmp;
      if (imageClues[i]) {
        indice.image = imageClues[i];
        imagetmp = imageClues[i];
      }
      else indice.image = imagetmp;
      if (audioClues[i]) {
        indice.audio = audioClues[i];
        audioTmp = audioClues[i];
      }
      else indice.audio = audioTmp;
      indicesArray.push(indice);
    }
  
    return indicesArray;
  }
  
}
