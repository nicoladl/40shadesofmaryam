<template>
  <div class="fixed-position">
    <slot></slot>
  </div>
</template>

<style lang="scss">
.fixed-position {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 20px;
}
</style>