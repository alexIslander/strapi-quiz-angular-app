import { Answer } from "./answer";
import { Quiz } from "./quiz";

export interface Score {
    id: number;
    answers: Answer[];
    createdAt: Date;
    quiz?: Quiz;
}