<template>
  <div class="option">
    <label :for="option">{{ option }}</label>
    <input
        class="checkbox"
        type="checkbox"
        :id="props.option"
        :name="props.option"
        :value="index"
        ref="checkbox"
        v-model="props.checkedAnswers"
    >
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({ option: String, index: Number, checkedAnswers: Array<number> })
</script>

<style lang="scss" scoped>
.option {
  display: flex;
  align-items: center;
  justify-content: space-between;

  input {
    width: 25px;
    height: 25px;
    background-color: white;
    border-radius: 50%;
    vertical-align: middle;
    border: 3px solid black;
    appearance: none;
    outline: none;
    cursor: pointer;
    margin-right: 10px;

    &:checked {
      background-color: red;
    }
  }

  label {
    width: 85%;
  }
}
</style>