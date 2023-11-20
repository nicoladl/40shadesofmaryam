<template>
  <div class="fixed-position">
    <slot></slot>
  </div>
</template>

<style lang="scss">
.fixed-position {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 20px;

  border-top: 3px solid black;
  background-color: rgb(239 239 227);
}
</style>