export interface Answer {
    type?: string;
    value: string;
    isCorrect: boolean;
    show: boolean;
}

export interface Question {
    question: string;
    answers: Answer[];
    clues: Clue[];
    nbOfErrorsToUseClue: number;
    quizId: number;
}

export interface Clue {
    image?: string;
    text?: string;
    audio?: string;
}
