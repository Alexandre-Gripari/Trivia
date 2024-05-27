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

    nbOfErrorsToUseClue: 2,

  quizId: 1584387277368
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

    nbOfErrorsToUseClue: 1,

  quizId: 1584387277368
};

export const QUESTION_TEXTE: Question = {
  question: 'Quel est le nom de Harry Potter ?',

  answers: [
    {
      value: 'Voldemort',
      isCorrect: false,
      show: true,
    },
    {
      value: 'Harry Potter',
      isCorrect: true,
      show: true,
    },
    {
      value: 'Severus Rogue',
      isCorrect: false,
      show: true,
    },
    {
      value: 'Ron',
      isCorrect: false,
      show: true,
    }
  ],

  clue: [
    {
      text: 'La réponse est dans la question hein'
    }
  ],

  nbOfErrorsToUseClue: 1,

  quizId: 1584387277368

};
export const QUESTION_AUDIO: Question = {
  question: 'Quel bruit fait le chat ?',
  answers: [
    {
      value: 'Woof',
      isCorrect: false,
      show: true,
    },
    {
      value: 'Miaou',
      isCorrect: true,
      show: true,
    },
    {
      value: 'Piou',
      isCorrect: false,
      show: true,
    },
    {
      value: 'Grrrrrr',
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
    nbOfErrorsToUseClue: 1,

  quizId: 1584387277368
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
    nbOfErrorsToUseClue: 0,

  quizId: 1584387277368
};

export const QUESTION_MIXTE: Question = {
    question: "Qui est le meilleur progammeur de l'equipe?",
  answers: [
    {
      value: 'Malik',
      isCorrect: false,
      show: true,
    },
    {
      value: 'Greg',
      isCorrect: true,
      show: true,
    },
    {
      value: 'Harry Potter',
      isCorrect: false,
      show: true,
    },
    {
      value: 'Obi wan',
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

    nbOfErrorsToUseClue: 1,

  quizId: 1584387277368
};


export const QUESTION_EMPIREROMAIN: Question = {
question: 'Quand a eu lieu la chute de l\'empire romain ?',

answers: [
  {
    value: '600 avant JC',
    isCorrect: false,
    show: true,
  },
  {
    value: '476 après JC',
    isCorrect: true,
    show: true,
  },
  {
    value: '1492 après JC',
    isCorrect: false,
    show: true,
  },
  {
    value: '27 avant JC',
    isCorrect: false,
    show: true,
  }
],

clue: [
  {
    text: 'Ceci est un indice'
  }
],

nbOfErrorsToUseClue: 1,

  quizId: 1584387277368

};
export const QUESTION_2MONDIALE: Question = {
question: 'Quand a eu lieu la 2nde guerre mondiale ?',
answers: [
  {
    value: '1939-1945',
    isCorrect: true,
    show: true,
  },
  {
    value: '1945-1950',
    isCorrect: false,
    show: true,
  },
  {
    value: '1914-1918',
    isCorrect: false,
    show: true,
  },
  {
    value: '1937-1945',
    isCorrect: false,
    show: true,
  }
],
clue: [
],
  nbOfErrorsToUseClue: 1,

  quizId: 1584387277368
};

export const QUESTION_NAPOLEON: Question = {
  question: 'Sur quelle île Napoléon a-t-il été exilé ?',
  answers: [
      {
          value: 'La Réunion',
          isCorrect: false,
          show: true,
     },
     {
          value: 'Haïti',
          isCorrect: false,
          show: true,
      },
      {
          value: 'Hawaï',
          isCorrect: false,
          show: true,
      },
      {
          value: 'Sainte-Hélène',
          isCorrect: true,
          show: true,
      }
  ],
  clue: [
      {
        text: "Elle se situe dans l'Atlantique Sud",
      },
      {
        text: "Elle se situe dans l'Atlantique Sud",
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/G%C3%A9olocalisation_Saint-H%C3%A9l%C3%A8ne.jpg/220px-G%C3%A9olocalisation_Saint-H%C3%A9l%C3%A8ne.jpg'
      }
  ],
  nbOfErrorsToUseClue: 1,

  quizId: 1584387277368
};

export const QUESTION_Amérique: Question = {
  question: "Qui a decouvert l'Amérique ?",
answers: [
  {
    value: 'Cristophe Colomb',
    isCorrect: true,
    show: true,
  },
  {
    value: 'Greg',
    isCorrect: false,
    show: true,
  },
  {
    value: 'Marco Polo',
    isCorrect: false,
    show: true,
  },
  {
    value: 'Magellan',
    isCorrect: false,
    show: true,
  }
],
clue: [
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Ridolfo_Ghirlandaio_Columbus.jpg/220px-Ridolfo_Ghirlandaio_Columbus.jpg',
  }
],

  nbOfErrorsToUseClue: 1,

  quizId: 1584387277368
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

export const QUESTION_LIST3: Question[] = [
  QUESTION_EMPIREROMAIN,
  QUESTION_2MONDIALE,
  QUESTION_NAPOLEON,
  QUESTION_Amérique,
];

export const QUIZ1: Quiz = {
  id : 1,
  name: 'Demo Quiz',
  theme: 'EverythingGoes',
  questions: QUESTION_LIST,
};

export const QUIZ2: Quiz = {
  id : 2,
  name: 'Demo Quiz2',
  theme: 'EverythingGoes2',
  questions: QUESTION_LIST2,
};

export const QUIZ3: Quiz = {
  id : 3,
  name: 'Demo Quiz3',
  theme: 'Histoire',
  questions: QUESTION_LIST3,
};

export const ALLQUIZ: Map<number, Quiz[]> = new Map([
    [1, [QUIZ1]],
    [2, [QUIZ2]],
    [3, [QUIZ3]]
  ]);
