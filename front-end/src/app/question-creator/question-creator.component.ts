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

  textClues: any[] = [];
  imageClues: any[] = [];
  audioClues: any[] = [];
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
    console.log(this.imageClues);
  }

  handleAudioCluesChange(clues: any) {
    this.audioClues = clues;
  }

  createQuestion() {
    console.log (this.textClues, this.imageClues, this.audioClues);
    var indice = this.createIndiceArray(this.textClues, this.imageClues, this.audioClues);
    console.log(this.question, this.answers, indice);
    this.quizService.registerQuestion(this.question, this.answers, indice);
    this.router.navigate(['quiz-edition-page']);
  }

  createIndiceArray(textClues: any[], imageClues: any[], audioClues: any[]) {
    const indicesArray = [];

    textClues.sort((a, b) => a.order - b.order);
    imageClues.sort((a, b) => a.order - b.order);
    audioClues.sort((a, b) => a.order - b.order);

    // get the max order of the first element but it can be undefined
    const size = Math.max(
      textClues?.[0]?.order ?? 0,
      imageClues?.[0]?.order ?? 0,
      audioClues?.[0]?.order ?? 0
    );
  
    // Iterate over the longest array
    for (let i = 0; i <= size; i++) {
      // Create an object with text, image, and audio properties
      const indice = {
        text: textClues[i] ? textClues[i].indices : null,
        image: imageClues[i] ? imageClues[i].indices  : null,
        audio: audioClues[i] ? audioClues[i].indices  : null,
      };
  
      
      // Add the created object to the indices array
      indicesArray.push(indice);
    }

    // remove the last element if all properties are null
    if (
      indicesArray[indicesArray.length - 1].text === null &&
      indicesArray[indicesArray.length - 1].image === null &&
      indicesArray[indicesArray.length - 1].audio === null
    ) {
      indicesArray.pop();
    }

  
    return indicesArray;
  }

}
