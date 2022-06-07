import { Quiz } from "./quiz";
import { Score } from "./score";

export interface ScoreResponse {
    questionCount: number;
    quiz: Quiz;
    score: Score;
    scoreTotal: number;
}