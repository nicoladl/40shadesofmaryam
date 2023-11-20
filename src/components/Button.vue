<template>
  <button class="actions__item" :disabled="props.disabled" :label="props.label" @click="onClick">
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
const props = defineProps({ disabled: Boolean, label: String })
const emit = defineEmits(['click'])

const onClick = () => {
  emit('click')
}
</script>

<style lang="scss">
.actions {
  &__item {
    background-color: transparent;
    border: none;
  }
}
</style>