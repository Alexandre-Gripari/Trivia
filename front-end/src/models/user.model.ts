import { Quiz } from "./quiz.model";

export interface User {
    first_name: string;
    last_name: string;
    birth_date_day: string;
    birth_date_month: string;
    birth_date_year: string;
    personal_quizzes: Quiz[];
}