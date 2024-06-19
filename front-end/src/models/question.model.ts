export interface Answer {
    type?: string;
    value: string;
    isCorrect: boolean;
    show: boolean;
    questionId: number;
    id: number;
}

export interface Question {
    question: string;
    quizId: number;
    clues: Clue[];
    answers: Answer[];
    nbOfErrorsToUseClue: number;
    id: number;

    
}

export interface Clue {
    image?: string;
    text?: string;
    audio?: string;
    questionId: number;
    id: number;
}

export interface BasicClue {
    order: number;
    indices : string;
  }

  