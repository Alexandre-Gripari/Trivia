import { User } from "../models/user.model";

export const PATIENT1: User = {
    last_name: 'Boule',
    first_name: 'Pierre',
    birth_date_day: '20',
    birth_date_month: 'Janvier',
    birth_date_year: '1966',
    personal_quizzes: []
};

export const USER_LIST: User[] = [
    PATIENT1
];