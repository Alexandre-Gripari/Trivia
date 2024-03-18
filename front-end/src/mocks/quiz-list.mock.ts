import { Quiz } from '../models/quiz.model';
import { Question } from '../models/question.model';

export const QUESTION_ACTOR: Question = {
     label: 'Jean Gabin a joué dans...',
     answers: [
         {
             value: 'Les tuches II',
             isCorrect: false,
        },
        {
             value: 'La grande illusion',
             isCorrect: true,
         }
     ]
};

export const QUESTION_PARIS: Question = {
    label: 'Quelle est la capitale de la France ?',
    answers: [
        {
            value: 'Madrid',
            isCorrect: false,
       },
       {
            value: 'Paris',
            isCorrect: true,
        },
        {
            value: 'Londres',
            isCorrect: false,
        },
        {
            value: 'Rome',
            isCorrect: false,
        }
    ]
};

export const QUIZ_LIST: Quiz[] = [
    {
        name: 'Les Acteurs', // What's happening if I change this value..?
        theme: 'Actor',
        questions: [QUESTION_ACTOR],
    },
    {
        name: 'Les Capitales',
        theme: 'Geography',
        questions: [],
    }
];
