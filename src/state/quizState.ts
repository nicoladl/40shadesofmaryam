import {computed, reactive} from 'vue';
import type {Question} from "@/models/IQuestion";

export const questionsInitialState: Array<Question> = [];
export const answersInitialState: Array<number> = [];

const state = reactive({
    questions: questionsInitialState,
    answers: answersInitialState,
});

const question = computed((questionId: number) => state.questions[questionId]);
const answer = computed((answerId: number) => state.answers[answerId]);

const setAnswer = (questionId: string, answer: number) => {
    state.answers = {
        ...state.answers,
        [questionId]: answer,
    };
};

const flushAnswers = () => {
    state.answers = answersInitialState;
};

export const quizState = {
    question,
    answer,
    setAnswer,
    flushAnswers,
};
