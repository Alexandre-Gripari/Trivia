export interface Answer {
    type?: string;
    value: string;
    isCorrect: boolean;
    show: boolean;
}

export interface Question {
    question: string;
    answers: Answer[];
    indice : Indice[];
}

export interface Indice {
    image?: string;
    text?: string;
    audio?: string;
}
