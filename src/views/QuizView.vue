<script setup lang="ts">
import {ref, watch} from "vue";
import type {Question} from "@/models/IQuestion";
import {quiz} from "@/assets/quiz";
import {useRoute} from "vue-router";
import router from "@/router";
import {quizState} from "@/state/quizState";
import Button from "@/components/Button.vue";
import Fixed from "@/components/Fixed.vue";
import ProgressBar from "@/components/ProgressBar.vue";
import OptionsList from "@/components/OptionsList.vue";

const route = useRoute()
const questionId = ref<number>(Number(route.query.questionId))
const question = ref<Question>(quizState.questions.value[questionId.value].question)

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
    },
);
</script>

<template>
  <ProgressBar/>
  <main v-if="questionId < quiz.length && questionId >= 0">
    <h2 class="centered question-title">{{ question }}</h2>
    <p class="centered progress-number">{{ questionId }} / {{ quiz.length - 1 }}</p>
    <OptionsList />
  </main>
  <div v-else>Question not found</div>

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
</template>

<style scoped lang="scss">
.centered {
  text-align: center;
}

.question-title {
  font-size: 2rem;
}

.progress-number {
  font-size: 1.75rem;
}
</style>