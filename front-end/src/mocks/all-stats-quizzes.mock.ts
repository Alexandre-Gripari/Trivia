import { QuestionStats } from "../models/statistic.model"
import { QuizStats } from "../models/statistic.model";
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
            image: 'https://cdn-imgix.headout.com/media/images/c90f7eb7a5825e6f5e57a5a62d05399c-25058-BestofParis-EiffelTower-Cruise-Louvre-002.jpg'
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
          text: "C'est un pays situé au nord de L'Afrique"
        },
        {
          text: "C'est un pays situé au nord de L'Afrique",
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Algeria_%28centered_orthographic_projection%29.svg/langfr-330px-Algeria_%28centered_orthographic_projection%29.svg.png'
        },
        {
          text: "C'est un pays situé au nord de L'Afrique",
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Flag_of_Algeria.svg/langfr-225px-Flag_of_Algeria.svg.png'
            
        }
    ],

    nbOfErrorsToUseClue: 1
};

export const QUESTION_TEXTE: Question = {
  question: 'Quel est le nom de Harry Potter ?',

  answers: [
    {
      value: 'Madrid',
      isCorrect: false,
      show: true,
    },
    {
      value: 'Harry Potter',
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
      text: 'La réponse est dans la question hein'
    }
  ],

  nbOfErrorsToUseClue: 1

};
export const QUESTION_AUDIO: Question = {
  question: 'Quel bruit fait le chat ?',
  answers: [
    {
      value: 'Madrid',
      isCorrect: false,
      show: true,
    },
    {
      value: 'Miaou',
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
      image:'https://www.la-spa.fr/app/app/uploads/2023/07/prendre-soin_duree-vie-chat.jpg',
      text: 'C\'est ça un chat',
    },
    {
      image:'https://www.la-spa.fr/app/app/uploads/2023/07/prendre-soin_duree-vie-chat.jpg',
      text: 'C\'est ça un chat',
      audio: 'https://lasonotheque.org/UPLOAD/wav/1890.wav'
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
          text: "On l\'appelle l'île de Beauté",
          image: 'https://e7.pngegg.com/pngimages/70/395/png-clipart-flag-and-coat-of-arms-of-corsica-corsican-symbol-flag-miscellaneous-white.png'
        }
    ],
    nbOfErrorsToUseClue: 0
        
   
};

export const QUESTION_MIXTE: Question = {
    question: "Qui est le meilleur progammeur de l'equipe?",
  answers: [
    {
      value: 'Madrid',
      isCorrect: false,
      show: true,
    },
    {
      value: 'Greg',
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
      text: "C'est Greg",
      image: 'https://media.tenor.com/9Q6kwQ_D-bMAAAAM/bassem-dance.gif',
      audio: 'https://us-tuna-sounds-files.voicemod.net/c3485a0f-37dd-412d-a887-6d5e4bf9147b-1676855510992.mp3',
    }
  ],

    nbOfErrorsToUseClue: 1
};

export const QUESTION_LIST: Question[] = [
  QUESTION_CORSE,
  QUESTION_PARIS,
  QUESTION_CONTINANT,
  QUESTION_TEXTE,
  QUESTION_AUDIO,
  QUESTION_MIXTE
  
];

export const QUESTION_LIST2: Question[] = [
  QUESTION_MIXTE,
];

export const QUIZ1: Quiz = {
  name: 'Demo Quiz1',
  theme: 'EverythingGoes',
  questions: QUESTION_LIST,
};

export const QUIZ2: Quiz = {
  name: 'Demo Quiz2',
  theme: 'EverythingGoes2',
  questions: QUESTION_LIST2,
};

export const QUESTION_STAT1: QuestionStats = {
  id: 1,
  question: QUESTION_CORSE,
  timeMinutes: 4,
  timeSeconds: 25,
  numberOfCluesUsed: 2,
  numberOfBadAnswers: 1,
};

export const QUESTION_STAT2: QuestionStats = {
  id: 2,
  question: QUESTION_PARIS,
  timeMinutes: 2,
  timeSeconds: 4,
  numberOfCluesUsed: 0,
  numberOfBadAnswers: 1
};

export const QUESTION_STAT3: QuestionStats = {
  id: 3,
  question: QUESTION_CONTINANT,
  timeMinutes: 3,
  timeSeconds: 20,
  numberOfCluesUsed: 1,
  numberOfBadAnswers: 1
};


export const QUIZ_STATS1: QuizStats = {
  Quiz: QUIZ1,
  date: new Date(2024, 0, 1),
  questionsStats: [QUESTION_STAT1, QUESTION_STAT2],
  totalTimeMinutes: 4,
  totalTimeSeconds: 24,
  totalNumberOfCluesUsed: 5,
  successRate: 20,
  id: 1
};

export const QUIZ_STATS2: QuizStats = {
    Quiz: QUIZ2,
    date: new Date(2024,2,27),
    questionsStats: [QUESTION_STAT2, QUESTION_STAT3],
    totalTimeMinutes: 4,
    totalTimeSeconds: 24,
    totalNumberOfCluesUsed: 5,
    successRate: 50, 
    id: 2
};

export const QUIZ_STATS3: QuizStats = {
    Quiz: QUIZ1,
    date: new Date(2024,2,25),
    questionsStats: [QUESTION_STAT1, QUESTION_STAT2, QUESTION_STAT3],
    totalTimeMinutes: 5,
    totalTimeSeconds: 3,
    totalNumberOfCluesUsed: 10,
    successRate: 70,
    id: 3
};

export const ALL_STATS_QUIZ: Map<number, QuizStats[]> = new Map([
    [1, [QUIZ_STATS1, QUIZ_STATS2, QUIZ_STATS3, QUIZ_STATS1, QUIZ_STATS2, QUIZ_STATS3]],
    [2, [QUIZ_STATS1, QUIZ_STATS3]]
  ]);




