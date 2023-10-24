<script setup lang="ts">
import {ref, watch} from "vue";
import type {Question} from "@/models/IQuestion";
import {quiz} from "@/assets/quiz";
import {useRoute} from "vue-router";
import router from "@/router";
import {quizState} from "@/state/quizState";

const route = useRoute()
const questionId = ref<number>(Number(route.query.questionId))
const question = ref<Question>(quizState.questions.value[questionId.value])
const answers = ref<Array<number>>(quizState.answers.value[questionId.value])
const checkedAnswers = ref<Array<number>>(answers.value ? answers.value : []);
const progressBarWidth = ref<number>((100 / quizState.questions.value.length) * (questionId.value + 1))

const onCheckboxChange = () => {
  quizState.setAnswer(questionId.value, checkedAnswers.value)
  const calculateResult = (givenAnswers: Array[number], correctAnswers: Array[number]): number => (
      givenAnswers.reduce((count, value) => {
        if (correctAnswers.includes(value)) {
          return count + 1;
        }
        return count;
      }, 0)
  )
  quizState.setResult(questionId.value, calculateResult(checkedAnswers.value, question.value.correctAnswers))
}

const onPrevQuestion = () => {
  router.push(`/quiz?questionId=${questionId.value - 1}`)
}

const onNextQuestion = () => {
  router.push(`/quiz?questionId=${questionId.value + 1}`)
}

const onRevealResult = () => {
  router.push('/result')
}

watch(
    () => route.query.questionId,
    (id) => {
      // todo: check why I need this shit
      questionId.value = Number(id);
      question.value = quizState.questions.value[Number(id)];
      answers.value = quizState.answers.value[id]
      checkedAnswers.value = answers.value ? answers.value : []
      progressBarWidth.value = (100 / quizState.questions.value.length) * (questionId.value + 1)
    },
);
</script>

<template>
  <div class="progress" :style="{ width: progressBarWidth + 'vw' }"/>
  <main v-if="questionId < quiz.length && questionId >= 0">
    <h2>{{ questionId }} - {{ question.question }}</h2>
    <div class="options">
      <div v-for="(option, index) in question.options">
        <input
            type="checkbox"
            :id="option"
            :name="option"
            :value="index"
            v-model="checkedAnswers"
            @change="onCheckboxChange"
        >
        <label :for="option">{{ option }}</label>
      </div>
    </div>

    <button :disabled="questionId > quiz.length - 1 || questionId <= 0" @click="onPrevQuestion">Prev question
    </button>
    <button :disabled="questionId >= quiz.length - 1" @click="onNextQuestion">Next question</button>
    <br>
    <button v-if="questionId == quiz.length - 1" @click="onRevealResult">Reveal result</button>
  </main>
  <div v-else>Question not found</div>
</template>

<style scoped lang="css">
.progress {
  height: 5px;
  background-color: black;
  position: absolute;
  top: 0;
  left: 0;
}

.options {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>