<script setup lang="ts">
import {onMounted, onUnmounted, ref, watch} from "vue";
import {quiz} from "@/assets/quiz";
import {useRoute} from "vue-router";
import router from "@/router";
import {quizState} from "@/state/quizState";
import Button from "@/components/Button.vue";
import Question from "@/components/Question.vue";
import Fixed from "@/components/Fixed.vue";
import prev from "@/assets/prev.svg"
import next from "@/assets/next.svg"
import Container from "@/components/Container.vue";

onMounted(() => {
  document.body.classList.add('quiz-page');
})

onUnmounted(() => {
  document.body.classList.remove('quiz-page');
})

const route = useRoute()
const questionId = ref<number>(Number(route.query.questionId))
const question = ref<string>(quizState.questions.value[questionId.value - 1].question)

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
      question.value = quizState.questions.value[questionId.value - 1].question;
    },
);
</script>

<template>
  <Question/>

  <Fixed>
    <Button
        :disabled="questionId > quiz.length || questionId <= 1"
        :label="'Prev question'"
        @click="onPrevQuestion"
    >
      <img :src="prev" alt="Prev question" width="75">
    </Button>
    <Button
        v-if="questionId == quiz.length"
        :label="'Reveal result'"
        @click="onRevealResult"
    >
      <Container :type="'button'">
        <button>Reveal result</button>
      </Container>
    </Button>
    <Button
        v-if="questionId != quiz.length"
        :disabled="questionId >= quiz.length"
        :label="'Next question'"
        @click="onNextQuestion"
    >
      <img :src="next" alt="Next question" width="75">
    </Button>
  </Fixed>
  <p class="centered progress-number">{{ questionId }}/{{ quiz.length }}</p>
</template>

<style scoped lang="scss">
.centered {
  text-align: center;
}

.progress-number {
  font-size: 1.75rem;
  margin: 10px 0;
}
</style>