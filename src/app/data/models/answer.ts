import { Question } from "./question";

export interface Answer {
    id?: number;
    question: Question;
    value: string;
    correct?: boolean;
    correctValue?: string;
}
