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
    clue: [
        {
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Paris_-_Eiffelturm_und_Marsfeld2.jpg/800px-Paris_-_Eiffelturm_und_Marsfeld2.jpg'
        }
    ],
    nbOfErrorsToUseClue: 2
        
    
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
    clue: [
        {
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Flag_map_of_Algeria.svg/800px-Flag_map_of_Algeria.svg.png'
        },
        {
            text: "C'est un pays situé au nord de L'Afrique"
        },
        {
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/ChadMap.svg/825px-ChadMap.svg.png?20130501204653'
        }
    ],
    nbOfErrorsToUseClue: 1
        
    
};

export const QUESTION_CORSE: Question = {
    question: 'Quelle île est située au Sud de la France ?',
    answers: [
        {
            value: 'Malte',
            isCorrect: false,
            show: true,
       },
       {
            value: 'La Réunion',
            isCorrect: false,
            show: true,
        },
        {
            value: 'La Corse',
            isCorrect: true,
            show: true,
        },
        {
            value: 'l\'île de Ré',
            isCorrect: false,
            show: true,
        }
    ],
    clue: [
        {
            text: "On l\'appelle l'île de Beauté",
        },
        {
            image: 'https://e7.pngegg.com/pngimages/70/395/png-clipart-flag-and-coat-of-arms-of-corsica-corsican-symbol-flag-miscellaneous-white.png'
        }
    ],
    nbOfErrorsToUseClue: 0
        
    
};

export const QUESTION_LIST: Question[] = [
    QUESTION_CORSE,
    QUESTION_PARIS,
    QUESTION_CONTINANT,
    
];
