<template>
  <div class="progress" :style="{ width: progressBarWidth + 'vw' }"/>
</template>

<script lang="ts" setup>
import {quizState} from "@/state/quizState";
import {ref, watch} from "vue";
import {useRoute} from "vue-router";

const route = useRoute()
const progressBarWidth = ref<number>(0)

watch(
    () => route.query.questionId,
    (id) => {
      progressBarWidth.value = (100 / quizState.questions.value.length) * (Number(id) + 1)
    }, { immediate: true }
);
</script>

<style lang="scss" scoped>
.progress {
  height: 100vh;
  background-color: rgb(100 186 130 / 20%);
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>