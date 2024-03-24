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
    clue: [
        {
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Flag_of_Algeria.svg/langfr-225px-Flag_of_Algeria.svg.png'
        },
        {
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/ChadMap.svg/825px-ChadMap.svg.png?20130501204653'
        }
    ]


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
  ]


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
      audio: 'https://lasonotheque.org/UPLOAD/wav/1890.wav'
    }
  ]
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
      image: 'https://image.noelshack.com/minis/2021/13/1/1617045996-bassem-lourd-bruit-berbere2souche.png',
      audio: 'https://us-tuna-sounds-files.voicemod.net/c3485a0f-37dd-412d-a887-6d5e4bf9147b-1676855510992.mp3',
    }
  ]
};


export const QUESTION_LIST: Question[] = [
    QUESTION_PARIS,
    QUESTION_CONTINANT,
    QUESTION_TEXTE,
  QUESTION_AUDIO,
  QUESTION_MIXTE
];
