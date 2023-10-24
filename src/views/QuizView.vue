<script setup lang="ts">
import {ref, watch} from "vue";
import type {Question} from "@/models/IQuestion";
import {quiz} from "@/assets/quiz";
import {useRoute} from "vue-router";
import router from "@/router";

const route = useRoute()
const questionId = ref<number>(Number(route.query.questionId))
const question = ref<Question>(quiz[questionId.value])

const goToQuestion = (goToQuestionId: number) => {
  questionId.value = goToQuestionId
  router.push('/quiz?questionId=' + goToQuestionId)
}

const onRevealResult = () => {
  router.push('/result')
}

watch(
    () => route.query.questionId,
    (id) => {
      questionId.value = Number(id);
      question.value = quiz[Number(id)];
    },
);
</script>

<template>
  <main v-if="questionId < quiz.length && questionId >= 0">
    <h2>{{ questionId }} - {{ question.question }}</h2>
    <div class="options">
      <div v-for="option in question.options">
        <input type="checkbox" :id="option" :name="option" :value="option">
        <label :for="option">{{ option }}</label>
      </div>
    </div>

    <button v-if="questionId <= quiz.length - 1 && questionId > 0" @click="goToQuestion(questionId-1)">Prev question</button>
    <button v-if="questionId < quiz.length - 1" @click="goToQuestion(questionId+1)">Next question</button>
    <br>
    <button v-if="questionId == quiz.length - 1" @click="onRevealResult">Reveal result</button>
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