import { Quiz } from './quiz.model';
import { Question } from './question.model';




export interface StatisticData { 
	numberOfCompletedQuizzes: number;

    numberOfCluesUsed: number;
	numberOfCluesUsedLatest: number;

	timeSpentMinutes: number;
	timeSpentSeconds: number;

	timeSpentMinutesLatest: number;
	timeSpentSecondsLatest: number;

} 

export interface QuizStats {
	Quiz: Quiz; // Donne le thème et le nom
	date: String; // Date à laquelle est effectué le quiz 
	questionsStats: QuestionStats[]; // Contient toutes les questions répondues avec leurs stats
	totalTimeMinutes: number; // Temps passé sur le quiz
	totalTimeSeconds: number;
	totalNumberOfCluesUsed: number;
	successRate: number;
}

export interface QuestionStats {
	question: Question; // Donne la question, les réponses et les indices
	timeMinutes: number; // Temps avant d'obtenir la bonne réponse
	timeSeconds: number;
	numberOfCluesUsed: number;
	numberOfBadAnswers: number;
}

