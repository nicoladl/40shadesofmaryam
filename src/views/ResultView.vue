<script setup lang="ts">
import {quizState} from "@/state/quizState";
import {ref} from "vue";
import Button from "@/components/Button.vue";
import html2canvas from "html2canvas";
import {quiz} from "@/assets/quiz";
import type {Question} from "@/models/IQuestion";
import router from "@/router";
import Container from "@/components/Container.vue";
import ConfettiExplosion from "vue-confetti-explosion";

const sumCorrectAnswers = (quizData: Array<Question>): number => {
  return quizData.reduce((total: number, question: Question) => {
    return total + question.correctAnswers.length;
  }, 0);
}

const results = ref<Array<number>>(quizState.results.value)
const score = ref<number>(0)
const isScoreCalculated = ref<boolean | null>(null)
const isScoreCalculating = ref<boolean>(false)
const totalScore = ref<number>(sumCorrectAnswers(quiz))

const canShare: boolean = navigator.canShare
const files = ref<Array<File>>([])

document.body.classList.add('result-page');

const calculateScoreAndGenerateScreenshot = () => {
  isScoreCalculating.value = true
  // fake timer
  setTimeout(() => {
    // isScoreCalculating.value = false
  }, 5000)

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
  router.push('/quiz?questionId=0')
}
</script>

<template>
  <div class="result">
    <div v-if="!isScoreCalculated">
      <Container type="question">
        <h1>Quiz Completed!</h1>
      </Container>
      <h2>Thank you for taking the quiz!</h2>
      <p>It's time to find out how well you know Maryam. But before we reveal your score,
        we want to say a few words.

        You are a very good friend of Maryam's, and she is lucky to have you!</p>

      <p>Now, it's time to see just how well you did.</p>
      <Button
          :label="'Calculate my score'"
          :wide="true"
          @click="calculateScoreAndGenerateScreenshot"
      >
        <Container :type="'button'">
          <button>Calculate my score</button>
        </Container>
      </Button>
    </div>

    <transition name="scale">
      <div class="loader" v-if="isScoreCalculating && !isScoreCalculated">
        <p v-if="isScoreCalculating">NASA is calculating the score... Hold Tight!</p>
      </div>
    </transition>

    <div v-if="isScoreCalculated">
      <ConfettiExplosion :particleCount="500" :duration="10000" :force="0.9" />
      <div v-if="score >= 0 && score <= 9">
        <Container type="result">
          <h1>Inquisitive Explorer</h1>
        </Container>
        <div class="score-container">
          <h2 v-if="files.length > 0" class="score">{{ score }}</h2><span class="bound">/{{ totalScore }}</span>
        </div>
        <p>You're just getting to know Maryam. Keep exploring your friendship! You've taken the first steps on this
          delightful journey of friendship. There's so much more to learn about Maryam, and you're on the path to
          uncovering all the wonderful things that make her unique.</p>
      </div>

      <div v-if="score >= 10 && score <= 19">
        <Container type="result">
          <h1>Budding Confidante</h1>
        </Container>
        <div class="score-container">
          <h2 v-if="files.length > 0" class="score">{{ score }}</h2><span class="bound">/{{ totalScore }}</span>
        </div>
        <p>You know Maryam quite well. Your friendship is blossoming! You've collected a treasure trove of insights into
          her preferences and personality. You're becoming a trusted friend, and your bond with Maryam is growing
          stronger
          with every moment you share.</p>
      </div>

      <div v-if="score >= 20 && score <= 29">
        <Container type="result">
          <h1>Ultimate Companion</h1>
        </Container>
        <div class="score-container">
          <h2 v-if="files.length > 0" class="score">{{ score }}</h2><span class="bound">/{{ totalScore }}</span>
        </div>
        <p>You're a true friend of Maryam! Your bond is unbreakable. Your profound understanding of Maryam's world is
          truly special. Your friendship is built on trust, shared experiences, and genuine care, making it a remarkable
          and enduring connection.</p>
      </div>

      <div v-if="score >= 30 && score <= 39">
        <Container type="result">
          <h1>Kindred Spirit</h1>
        </Container>
        <div class="score-container">
          <h2 v-if="files.length > 0" class="score">{{ score }}</h2><span class="bound">/{{ totalScore }}</span>
        </div>
        <p>You and Maryam share a remarkable friendship. Your bond is like no other, filled with trust, laughter, and
          wonderful memories. You've embraced Maryam's uniqueness, and it has only deepened your connection.</p>
      </div>

      <div v-if="score >= 40 && score <= 45">
        <Container type="result">
          <h1>Maryam's Bestie</h1>
        </Container>
        <div class="score-container">
          <h2 v-if="files.length > 0" class="score">{{ score }}</h2><span class="bound">/{{ totalScore }}</span>
        </div>
        <p>Congratulations! You're not just a friend; you're Maryam's bestie. Your friendship is a treasure,
          characterized
          by an unbreakable bond, deep understanding, and endless fun. Maryam is lucky to have you, and you're lucky to
          have her as a cherished friend.</p>
      </div>
      <p class="hashtag">#40shadesofmaryam</p>

      <Button
          :label="'Restart quiz'"
          @click="onRestart"
      />
    </div>

    <div v-if="canShare && isScoreCalculated">
      <Button
          v-if="files.length > 0"
          :label="'Share'"
          :wide="true"
          @click="onShare"
      >
        <Container :type="'button'">
          <button>Share!</button>
        </Container>
      </Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.result {
  margin: 0 20px;
  text-align: center;
}

.score-container {
  display: flex;
  align-items: baseline;
  justify-content: center;

  .score {
    font-family: 'Press Start 2P', Arial, sans-serif;
    font-size: 5em;
    background-image: linear-gradient(
            -225deg,
            #231557 0%,
            #44107a 29%,
            #ff1361 67%,
            #fff800 100%
    );
    background-size: 100% auto;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
    line-height: 1em;
    margin: 40px 0 20px;
  }

  .bound {
    font-family: 'IBM Plex Mono', Arial, sans-serif;
    font-size: 1em;
  }
}

.hashtag {
  color: white;
  text-transform: uppercase;
}

.loader {
  border: 1px solid black;
  border-radius: 3px;
  height: 5px;
  width: 100%;
  margin: 20px 0;
  position: relative;

  &::after {
    content: '';
    background-color: black;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}

.scale-enter-active {
  &.loader {
    transition: transform 5s;
    transform-origin: left;

    &::after {
      transition: transform 5s;
      transform-origin: left;
    }
  }
}

.scale-enter-from,
.scale-leave-to {
  &.loader {
    &::after {
      transform: scaleX(0);
    }
  }
}
</style>