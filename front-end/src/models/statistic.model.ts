import { Quiz } from './quiz.model';
import { Question } from './question.model';




export interface StatisticData {
    numberOfCluesUsed: number;
	date: Date;
} 

export interface QuizStats {
	id: number;
	name: string;
    theme?: string;
	date: Date; // Date à laquelle est effectué le quiz 
	questionsStats: QuestionStats[]; // Contient toutes les questions répondues avec leurs stats
	totalTimeMinutes: number; // Temps passé sur le quiz
	totalTimeSeconds: number;
	totalNumberOfCluesUsed: number;
	successRate: number;
}

export interface QuestionStats {
	id: number;
	question: string;
	answerStats: AnswerStats[]; 
	timeMinutes: number;
	timeSeconds: number;
	numberOfCluesUsed: number;
	numberOfBadAnswers: number;
}

export interface AnswerStats {
	id: number;
	value: string;
	isCorrect: boolean;
	choose: boolean;
}

