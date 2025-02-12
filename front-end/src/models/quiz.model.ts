import { Question } from './question.model';

export interface Quiz {
    name: string;
    theme?: string;
    questions: Question[];
    id: number;
    userId?: number;
}
