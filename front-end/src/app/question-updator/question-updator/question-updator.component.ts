import { Component, OnInit } from '@angular/core';
import { Clue } from 'src/models/question.model';
import { Question } from 'src/models/question.model';
import { Answer } from 'src/models/question.model';
import { BasicClue } from 'src/models/question.model';
import { Router } from '@angular/router';
import { QuizUpdateService } from 'src/services/quizupdate.service';


@Component({
  selector: 'app-question-updator',
  templateUrl: './question-updator.component.html',
  styleUrls: ['./question-updator.component.scss']
})
export class QuestionUpdatorComponent implements OnInit {

  textClues: string[] = [];
  imageClues: string[] = [];
  audioClues: string[] = [];
  answers: Answer[] = [];
  question: string = '';

  questionGettingUpdated: Question = {
    id: 0,
    question: '',
    clues: [],
    answers: [],
    quizId: 0,
    nbOfErrorsToUseClue: 0
  }

  constructor(private quizUpdateService: QuizUpdateService, private router: Router ) { }

  ngOnInit(): void {
    this.questionGettingUpdated = this.quizUpdateService.getCurrentQuestion();
    this.question = this.questionGettingUpdated.question;
    this.answers = this.questionGettingUpdated.answers;
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
    this.quizUpdateService.registerQuestionUpdated(this.question, this.answers, indice);
    this.router.navigate(['quiz-edition-page']);
  }

  createIndiceArray(textClues: string[], imageClues: string[], audioClues: string[]) {
    const modifiedTextClues = textClues.map((clue, index) => {
      // Create a prefix from all text clues before the current one
      const prefix = textClues.slice(0, index).join('');
      if (index === 0) {
        return clue;
      }
      return prefix + '\n'+ clue;
    });
  
    const indicesArray: Clue[] = [];
    const size = Math.max(modifiedTextClues.length, imageClues.length, audioClues.length);
  
    for (let i = 0; i < size; i++) {
      const indice: Clue = {
        questionId: 0
      };
      if (modifiedTextClues[i]) {
        indice.text = modifiedTextClues[i];
      }
      if (imageClues[i]) {
        indice.image = imageClues[i];
      }
      if (audioClues[i]) {
        indice.audio = audioClues[i];
      }
      indicesArray.push(indice);
    }
  
    return indicesArray;
  }

}
