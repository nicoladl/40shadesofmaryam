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

<style lang="scss" scoped>
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
  margin-right: 10px;

  &:checked {
    background-color: gray;
  }
}
</style>