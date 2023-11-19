<script setup lang="ts">
import {ref, watch} from "vue";
import {quiz} from "@/assets/quiz";
import {useRoute} from "vue-router";
import router from "@/router";
import {quizState} from "@/state/quizState";
import Button from "@/components/Button.vue";
import Question from "@/components/Question.vue";
import Fixed from "@/components/Fixed.vue";
import ProgressBar from "@/components/ProgressBar.vue";

const route = useRoute()
const questionId = ref<number>(Number(route.query.questionId))
const question = ref<string>(quizState.questions.value[questionId.value].question)

const onPrevQuestion = async () => {
  await router.push(`/quiz?questionId=${questionId.value - 1}`)
}

const onNextQuestion = async () => {
  await router.push(`/quiz?questionId=${questionId.value + 1}`)
}

const onRevealResult = async () => {
  await router.push('/result')
}

watch(
    () => route.query.questionId,
    (id) => {
      questionId.value = Number(id);
      question.value = quizState.questions.value[questionId.value].question;
    },
);
</script>

<template>
  <div class="container">
    <ProgressBar/>
    <Question />

    <Fixed>
      <Button
          :disabled="questionId > quiz.length - 1 || questionId <= 0"
          :label="'Prev question'"
          @click="onPrevQuestion"
      />
      <Button
          :disabled="questionId >= quiz.length - 1"
          :label="'Next question'"
          @click="onNextQuestion"
      />
      <Button
          v-if="questionId == quiz.length - 1"
          :label="'Reveal result'"
          @click="onRevealResult"
      />
    </Fixed>
    <p class="centered progress-number">{{ questionId }}/{{ quiz.length - 1 }}</p>
  </div>
</template>

<style scoped lang="scss">
.container {
  margin: 0 20px;
  margin-top: 40px;
}

.centered {
  text-align: center;
}

.progress-number {
  font-size: 1.75rem;
}
</style>