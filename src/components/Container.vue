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
  padding: 30px 10px;
  border: 1px solid black;
  border-radius: 10px;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: black;
    top: 10px;
    left: 10px;
    z-index: -1;
    border-radius: 10px;
  }

  &__question {
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