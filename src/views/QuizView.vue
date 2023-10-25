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

const selectCheckbox = (index: number) => {
  const checkboxes = [...document.querySelectorAll('input')];
  checkboxes[index].checked = !checkboxes[index].checked

  checkedAnswers.value = checkboxes.reduce((result, check, checkIndex) => {
    if (check.checked) {
      result.push(checkIndex);
    }
    return result;
  }, []);

  onCheckboxChange()
};

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
    <h2 class="centered question-title">{{ question.question }}</h2>
    <p class="centered progress-number">{{ questionId }} / {{ quiz.length - 1 }}</p>
    <div class="options">
      <div v-for="(option, index) in question.options" class="options__item" @click="selectCheckbox(index)">
        <input
            class="checkbox"
            type="checkbox"
            :id="option"
            :name="option"
            :value="index"
            ref="checkbox"
            v-model="checkedAnswers"
        >
        <label :for="option">{{ option }}</label>
      </div>
    </div>
  </main>
  <div v-else>Question not found</div>

  <div class="actions">
    <button class="actions__item" :disabled="questionId > quiz.length - 1 || questionId <= 0" @click="onPrevQuestion">
      Prev question
    </button>
    <button class="actions__item" :disabled="questionId >= quiz.length - 1" @click="onNextQuestion">Next question
    </button>
    <button class="actions__item actions__item--centered" v-if="questionId == quiz.length - 1" @click="onRevealResult">
      Reveal result
    </button>
  </div>
</template>

<style scoped lang="scss">
.progress {
  height: 100vh;
  background-color: rgb(100 186 130 / 20%);
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

.question-card {
  margin: 0 auto;
  max-width: 1140px;
  width: 100%;
  box-sizing: border-box;
  text-align: left;
  padding: 3.5vw;
  border-radius: 5px;
  box-shadow: rgba(57, 73, 76, .35) 0 1px 6px 0;
  //background: rgb(255 255 255/84%);
  background-color: grey;
}

.centered {
  text-align: center;
}

.question-title {
  font-size: 2rem;
}

.progress-number {
  font-size: 1.75rem;
}

.options {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &__item {
    width: calc(100% - 20px);
    padding: 20px 10px;
    margin-bottom: 10px;
    background-color: #f9f9f9;
    border-radius: 5px;
    display: flex;
    align-items: center;
  }

  input {
    width: 1.3em;
    height: 1.3em;
    background-color: white;
    border-radius: 50%;
    vertical-align: middle;
    border: 1px solid #848484;
    appearance: none;
    outline: none;
    cursor: pointer;

    &:checked {
      background-color: gray;
    }
  }

  label {
    padding-left: 10px;
  }
}

.actions {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 20px;

  &__item {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 5px;
    color: black;
    text-transform: uppercase;

    &--centered {
      position: absolute;
      bottom: 50px;
    }
  }
}
</style>