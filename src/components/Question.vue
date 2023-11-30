<template>
  <div v-if="questionId <= quiz.length && questionId >= 1">
    <Container type="question">
      <h2 class="centered question-title">{{ question }}</h2>
    </Container>
   <div class="question-options">
     <OptionsList />
   </div>
  </div>
  <div v-else>Question not found</div>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {useRoute} from "vue-router";
import Container from "@/components/Container.vue";
import OptionsList from "@/components/OptionsList.vue";
import {quiz} from "@/assets/quiz";
import {quizState} from "@/state/quizState";

const route = useRoute()
const questionId = ref<number>(Number(route.query.questionId))
const question = ref<string>(quizState.questions.value[questionId.value - 1].question)

watch(
    () => route.query.questionId,
    (id) => {
      questionId.value = Number(id);
      question.value = quizState.questions.value[questionId.value - 1].question;
    },
);
</script>

<style lang="scss" scoped>
.question-title {
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 1em;
  text-transform: uppercase;
  text-align: center;
}

.question-options {
  margin: 30px 0;
}
</style>