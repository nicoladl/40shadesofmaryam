import {computed, reactive} from 'vue';
import type {Question} from "@/models/IQuestion";
import {quiz} from "@/assets/quiz";

export const questionsInitialState: Array<Question> = quiz;
const answersInitialState: Array<number[]> = Array(40).fill([]);

const questions = computed(() => state.questions);
const answers = computed(() => state.answers);

const state = reactive({
    questions: questionsInitialState,
    answers: answersInitialState,
});
const setAnswer = (questionId: number, checkedAnswers: Array<number>) => {
    state.answers.splice(questionId, 1, checkedAnswers);
};

const flushAnswers = () => {
    state.answers = answersInitialState;
};

export const quizState = {
    questions,
    answers,
    setAnswer,
    flushAnswers,
};
