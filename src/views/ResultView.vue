<script setup lang="ts">
import {quizState} from "@/state/quizState";
import {ref} from "vue";

const results = ref<Array<number[]>>(quizState.results.value)
const totalPoints = results.value.reduce((points, result) => {
  return points + result
}, 0)
</script>

<template>
  <div class="result">
    <h1>points: {{ totalPoints }}</h1>
  </div>
</template>