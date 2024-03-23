import { Question } from './question.model';
import { Answer } from './question.model';


export interface GameInstance { 
	gameId: string;
	quizId: string;
    text : string;
	gameQuestionsAnswers: GameQuestionAnswer[];
	startTime: Date;
	endTime: Date;
} 

export interface GameQuestionAnswer {
	startDate: Date;
	submissionDate: Date;
	question: Question; 
	//answer: Answer[]; 
}