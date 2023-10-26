<script setup lang="ts">
import {quizState} from "@/state/quizState";
import {ref} from "vue";
import Button from "@/components/Button.vue";
import html2canvas from "html2canvas";
import {quiz} from "@/assets/quiz";
import type {Question} from "@/models/IQuestion";
import router from "@/router";

const sumCorrectAnswers = (quizData): number => {
  return quizData.reduce((total: number, question: Question) => {
    return total + question.correctAnswers.length;
  }, 0);
}

const results = ref<Array<number>>(quizState.results.value)
const score = ref<number>(0)
const isScoreCalculated = ref<boolean | null>(null)
const totalScore = ref<number>(sumCorrectAnswers(quiz))

const canShare: boolean = navigator.canShare
const files = ref<Array<File>>([])

const calculateScoreAndGenerateScreenshot = () => {
  isScoreCalculated.value = false
  html2canvas(document.body, {useCORS: true})
      .then((canvas) => {
        canvas.toBlob((blob) => {
          return files.value = [new File([blob], '40shadesofmaryam.png', {type: blob.type})]
        })
      })

  score.value = results.value.reduce((points, result) => {
    return points + result
  }, 0)

  setTimeout(() => {
    isScoreCalculated.value = true
  }, 5000)
}

const onShare = async () => {
  const shareData = {
    files: files.value,
  };
  await navigator.share(shareData)
}

const onRestart = () => {
  router.push('/quiz?question=1')
}
</script>

<template>
  <div class="result">
    <h1>Quiz Completed!</h1>
    <h2>Thank you for taking the Maryam quiz!</h2>
    <p>You've completed the quiz, and it's time to find out how well you know Maryam. But before we reveal your score,
      we want to say a few words.

      You are a very good friend of Maryam's, and she is lucky to have you!</p>

    <p>Now, it's time to see just how well you did.</p>
    <Button
        :label="'Calculate my score'"
        @click="calculateScoreAndGenerateScreenshot"
    />

    <div v-if="isScoreCalculated">
      <h1 v-if="files.length > 0">points: {{ score }} / {{ totalScore }}</h1>

      <div v-if="score >= 0 && score <= 9">
        <h2>Inquisitive Explorer</h2>
        <p>You're just getting to know Maryam. Keep exploring your friendship! You've taken the first steps on this
          delightful journey of friendship. There's so much more to learn about Maryam, and you're on the path to
          uncovering all the wonderful things that make her unique.</p>
      </div>

      <div v-if="score >= 10 && score <= 19">
        <h2>Budding Confidante</h2>
        <p>You know Maryam quite well. Your friendship is blossoming! You've collected a treasure trove of insights into
          her preferences and personality. You're becoming a trusted friend, and your bond with Maryam is growing stronger
          with every moment you share.</p>
      </div>

      <div v-if="score >= 20 && score <= 29">
        <h2>Ultimate Companion</h2>
        <p>You're a true friend of Maryam! Your bond is unbreakable. Your profound understanding of Maryam's world is
          truly special. Your friendship is built on trust, shared experiences, and genuine care, making it a remarkable
          and enduring connection.</p>
      </div>

      <div v-if="score >= 30 && score <= 39">
        <h2>Kindred Spirit</h2>
        <p>You and Maryam share a remarkable friendship. Your bond is like no other, filled with trust, laughter, and
          wonderful memories. You've embraced Maryam's uniqueness, and it has only deepened your connection.</p>
      </div>

      <div v-if="score >= 40 && score <= 45">
        <h2>Maryam's Bestie</h2>
        <p>Congratulations! You're not just a friend; you're Maryam's bestie. Your friendship is a treasure, characterized
          by an unbreakable bond, deep understanding, and endless fun. Maryam is lucky to have you, and you're lucky to
          have her as a cherished friend.</p>
      </div>

      <Button
        :label="'Restart quiz'"
        @click="onRestart"
      />
    </div>
    <div v-if="isScoreCalculated === false">NASA is calculating the score... Hold Tight! 🚀🌠</div>

    <div v-if="canShare">
      <Button
          v-if="files.length > 0"
          :label="'Share'"
          @click="onShare"
      />
    </div>
  </div>
</template>