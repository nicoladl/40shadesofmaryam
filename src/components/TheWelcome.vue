<script setup lang="ts">
import router from "@/router";

const onStartQuiz = () => {
  router.push('/quiz?questionId=1')
}
</script>

<template>
  <h1>40 Shades of Maryam</h1>
  <button @click="onStartQuiz">start the quiz</button>
</template>
