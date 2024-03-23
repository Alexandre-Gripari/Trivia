import { Quiz } from '../models/quiz.model';
import { Question } from '../models/question.model';


export const QUESTION_PARIS: Question = {
    question: 'Quelle est la capitale de la France ?',
    answers: [
        {
            value: 'Madrid',
            isCorrect: false,
            show: true,
       },
       {
            value: 'Paris',
            isCorrect: true,
            show: true,
        },
        {
            value: 'Londres',
            isCorrect: false,
            show: true,
        },
        {
            value: 'Rome',
            isCorrect: false,
            show: true,
        }
    ],
    indice: [
        {
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Paris_-_Eiffelturm_und_Marsfeld2.jpg/800px-Paris_-_Eiffelturm_und_Marsfeld2.jpg'
        }
    ]
        
    
};

export const QUESTION_CONTINANT: Question = {
    question: "Quel est le plus grand pays d'Afrique en termes de superficie ?",
    answers: [
        {
            value: 'République Démocratique du Congo',
            isCorrect: false,
            show: true,
       },
       {
            value: 'Nigeria',
            isCorrect: false,
            show: true,
        },
        {
            value: 'Soudan',
            isCorrect: false,
            show: true,
        },
        {
            value: 'Algérie',
            isCorrect: true,
            show: true,
        }
    ],
    indice: [
        {
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Flag_map_of_Algeria.svg/800px-Flag_map_of_Algeria.svg.png'
        }
    ]
        
    
};

export const QUESTION_LIST: Question[] = [
    QUESTION_PARIS,
    QUESTION_CONTINANT
];
