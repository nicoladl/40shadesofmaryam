<template>
  <div :class="`container container__${props.type}`">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({ type: String })

</script>

<style lang="scss" scoped>
.container {
  padding: 10px;
  border: 3px solid black;
  border-radius: 10px;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    width: calc(100% + 7px);
    height: calc(100% + 7px);
    background-color: black;
    top: 1px;
    right: 1px;
    z-index: -1;
    border-radius: 10px;
  }

  &__question,
  &__button {
    background-color: white;
  }

  &__0 {
    background-color: #ec61b4;
  }

  &__1 {
    background-color: #25b7bd;
  }

  &__2 {
    background-color: #fded03;
  }

  &__3 {
    background-color: #714bf0;
  }
}
</style>