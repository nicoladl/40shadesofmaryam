<template>
  <button class="actions__item" :disabled="props.disabled" @click="onClick">
    {{ props.label }}
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
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 5px;
    color: black;
    text-transform: uppercase;
  }
}
</style>