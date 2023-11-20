<script setup lang="ts">
import router from "@/router";
import Button from "@/components/Button.vue";
import Container from "@/components/Container.vue";

const onStartQuiz = () => {
  router.push('/quiz?questionId=1')
}
</script>

<template>
  <main>
    <h1>40 shades of Maryam</h1>
    <p>Welcome to the ultimate Maryam quiz! Think you know everything about our friend Maryam? Let's find out. Answer these fun questions to see how well you really know her!</p>

    Instructions:

    <ul>
      <li>You'll have a series of questions to answer.</li>
      <li>Select the option that you think best represents Maryam's preferences and personality.</li>
      <li>Don't worry; there are no wrong answers – it's all in good fun!</li>
    </ul>

    <Button @click="onStartQuiz" :label="'start the quiz'">
      <Container :type="'button'">
        <button>Start the quiz</button>
      </Container>
    </Button>
  </main>
</template>
