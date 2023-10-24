<script setup lang="ts">
import {ref, watch} from "vue";
import type {Question} from "@/models/IQuestion";
import {quiz} from "@/assets/quiz";
import {useRoute} from "vue-router";
import router from "@/router";

const route = useRoute()
const questionId = ref<number>(route.query.questionId)
console.log(questionId.value)
const question = ref<Question>(quiz[questionId.value])

const onNextQuestion = () => {
  const nextQuestionId: number = Number(questionId.value) + 1
  questionId.value = nextQuestionId
  router.push('/quiz?questionId=' + nextQuestionId)
}

const onPrevQuestion = () => {
  const nextQuestionId: number = Number(questionId.value) - 1
  questionId.value = nextQuestionId
  router.push('/quiz?questionId=' + nextQuestionId)
}

const onRevealResult = () => {
  router.push('/result')
}

watch(
    () => route.query.questionId,
    (id) => {
      questionId.value = id;
      question.value = quiz[id];
    },
);
</script>

<template>
  <main v-if="questionId < quiz.length && questionId >= 0">
    <h2>{{ question.question }}</h2>
    <div class="options">
      <div v-for="option in question.options">
        <input type="checkbox" :id="option" :name="option" :value="option">
        <label :for="option">{{ option }}</label>
      </div>
    </div>

    <button v-if="questionId < quiz.length - 1 && questionId > 0" @click="onPrevQuestion">Prev question</button>

    <button v-if="questionId < quiz.length - 1" @click="onNextQuestion">Next question</button>
    <button v-if="questionId === quiz.length - 1" @click="onRevealResult">Reveal result</button>
  </main>
  <div v-else>Question not found</div>
</template>

<style scoped lang="css">
.options {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>