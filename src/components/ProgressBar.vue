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
      if (Number(id) === 1) {
        progressBarWidth.value = 0
        return
      }

      if (Number(id) === 40) {
        progressBarWidth.value = 100
        return
      }

      progressBarWidth.value = (100 / quizState.questions.value.length) * (Number(id))
    }, { immediate: true }
);
</script>

<style lang="scss" scoped>
.progress {
  background-color: rgb(169 83 82);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
}
</style>