<script setup lang="ts">
  import {quizState} from "@/state/quizState";

  console.log(quizState.answers.value)
</script>

<template>
  <div class="result">
    <h1>This is the result page</h1>
    {{  }}
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .result {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
