import {computed, reactive} from 'vue';
import type {Question} from "@/models/IQuestion";
import {quiz} from "@/assets/quiz";

const answersFromLocalStorage = JSON.parse(localStorage.getItem('@@maryam')).answers || []
const resultsFromLocalStorage = JSON.parse(localStorage.getItem('@@maryam')).results || []
export const questionsInitialState: Array<Question> = quiz;
const answersInitialState: Array<number[]> = answersFromLocalStorage ? answersFromLocalStorage : Array(40).fill([]);
const resultsInitialState: Array<number> = resultsFromLocalStorage ? resultsFromLocalStorage : Array(40).fill(0);

const questions = computed(() => state.questions)
const answers = computed(() => state.answers);
const results = computed(() => state.results);

const state = reactive({
    questions: questionsInitialState,
    answers: answersInitialState,
    results: resultsInitialState,
});

const setResult = (questionId: number, result: number) => {
    state.results.splice(questionId, 1, result);
    localStorage.setItem('@@maryam', JSON.stringify({
        answers: state.answers,
        results: state.results,
    }))
};

const setAnswer = (questionId: number, checkedAnswers: Array<number>) => {
    state.answers.splice(questionId, 1, checkedAnswers);
    localStorage.setItem('@@maryam', JSON.stringify({
        answers: state.answers,
        results: state.results,
    }))
};

const flushAnswers = () => {
    state.answers = answersInitialState;
};

export const quizState = {
    questions,
    answers,
    results,
    setAnswer,
    setResult,
    flushAnswers,
};
