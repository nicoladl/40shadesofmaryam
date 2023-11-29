<template>
  <button
      :class="`actions__item ${props.wide ? 'actions__item--wide' : ''}`"
      :disabled="props.disabled"
      :label="props.label" @click="onClick">
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
const props = defineProps({disabled: Boolean, label: String, wide: Boolean})
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

    &--wide {
      width: 100%;
    }
  }
}
</style>