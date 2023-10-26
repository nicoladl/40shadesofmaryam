<template>
  <div class="options">
    <div v-for="(option, index) in question.options" class="options__item" @click="selectCheckbox(index)">
      <Option :option="option" @select="selectCheckbox(index)" :index="index" :checked-answers="checkedAnswers"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import Option from "@/components/Option.vue";
import {quizState} from "@/state/quizState";
import {useRoute} from "vue-router";
import {ref, watch} from "vue";
import {type Question} from "@/models/IQuestion";

const route = useRoute()

const questionId = ref<number>(0)
const question = ref<Question>({
  question: '',
  options: [],
  correctAnswers: []
})
const answers = ref<Array<number>>([])
const checkedAnswers = ref<Array<number>>([]);

const onCheckboxChange = () => {
  quizState.setAnswer(questionId.value, checkedAnswers.value)
  const calculateResult = (givenAnswers: Array[number], correctAnswers: Array[number]): number => (
      givenAnswers.reduce((count: number, value: number) => {
        if (correctAnswers.includes(value)) {
          return count + 1;
        }
        return count;
      }, 0)
  )
  quizState.setResult(questionId.value, calculateResult(checkedAnswers.value, question.value.correctAnswers))
}

const selectCheckbox = (index: number) => {
  const checkboxes = [...document.querySelectorAll('input')];
  checkboxes[index].checked = !checkboxes[index].checked

  checkedAnswers.value = checkboxes.reduce((result: Array<number>, check: HTMLInputElement, checkIndex: number) => {
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
      questionId.value = Number(id);
      question.value = quizState.questions.value[Number(id)];
      answers.value = quizState.answers.value[Number(id)]
      checkedAnswers.value = answers.value ? answers.value : []
    }, {immediate: true}
);
</script>

<style lang="scss" scoped>
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
</style>