import { Component, OnInit } from '@angular/core';
import { Clue } from 'src/models/question.model';
import { Question } from 'src/models/question.model';
import { Answer } from 'src/models/question.model';
import { BasicClue } from 'src/models/question.model';
import { Router } from '@angular/router';
import { QuizUpdateService } from 'src/services/quizupdate.service';
import { max } from 'rxjs';


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

  private myBoolean: boolean = false;

  constructor(private quizUpdateService: QuizUpdateService, private router: Router ) {
    const navigation = this.router.getCurrentNavigation();
    const myBoolean = navigation?.extras.state?.['myBoolean'] as boolean;
    if (myBoolean) this.myBoolean = myBoolean;
  }

  ngOnInit(): void {
    this.questionGettingUpdated = this.quizUpdateService.getCurrentQuestion();
    this.question = this.questionGettingUpdated.question;
    this.answers = this.questionGettingUpdated.answers;
    this.textClues = this.questionGettingUpdated.clues.map((clue) => clue.text || '');
    this.imageClues = this.questionGettingUpdated.clues.map((clue) => clue.image || '');
    this.audioClues = this.questionGettingUpdated.clues.map((clue) => clue.audio || '');
    console.log(this.textClues, this.imageClues, this.audioClues);
    for (let i = 0; i < this.textClues.length; i++) {
      if (this.textClues[i] && i>0) {
        // remove everything before the last \n in the string
        this.textClues[i] = this.textClues[i].substring(this.textClues[i].lastIndexOf('\n') + 1);
      }
    }
    
    // reomve subsequetn same image clues
    let i = 1; // Start from the second element
    while (i < this.imageClues.length) {
      if (this.imageClues[i] === this.imageClues[i - 1]) {
        this.imageClues.splice(i, 1); // Remove the current element
      } 
      else i++; // Only move to the next element if no removal was made
    }

    // reomve subsequetn same audio clues
    i = 1; // Start from the second element
    while (i < this.audioClues.length) {
      if (this.audioClues[i] === this.audioClues[i - 1]) {
        this.audioClues.splice(i, 1); // Remove the current element
      } 
      else i++; // Only move to the next element if no removal was made
    }

    // remove subsequetn same text clues
    i = 1; // Start from the second element
    while (i < this.textClues.length) {
      if (this.textClues[i] === this.textClues[i - 1]) {
        this.textClues.splice(i, 1); // Remove the current element
      } 
      else i++; // Only move to the next element if no removal was made
    }
    
    this.imageClues = this.imageClues.filter(clue => clue !== '');
    this.audioClues = this.audioClues.filter(clue => clue !== '');
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
    if (this.myBoolean) this.quizUpdateService.registerQuestionAdded(this.question, this.answers, indice);
    else this.quizUpdateService.registerQuestionUpdated(this.question, this.answers, indice);
    this.quizUpdateService.clearCurrentQuestion();
    this.router.navigate(['quiz-update-page']);
  }

  cancel() {
    this.router.navigate(['quiz-update-page']);
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
