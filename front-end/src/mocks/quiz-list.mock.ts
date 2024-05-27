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
    nbOfErrorsToUseClue: 1,

  quizId: 1584387277368
};

export const QUIZ_LIST: Quiz[] = [
    {
        name: 'Les Capitales',
        theme: 'Geography',
        questions: [QUESTION_PARIS],
    }
];
