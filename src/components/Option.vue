<template>
  <input
      class="checkbox"
      type="checkbox"
      :id="props.option"
      :name="props.option"
      :value="index"
      ref="checkbox"
      v-model="props.checkedAnswers"
  >
  <label :for="option">{{ option }}</label>
</template>

<script lang="ts" setup>
const props = defineProps({ option: String, index: Number, checkedAnswers: Array<number> })
</script>