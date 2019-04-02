<template>
  <span class="tooltip" :class="{ 'tooltip--visible': visible }">
    <slot/>
    <svg
      class="tooltip__triangle"
      width="14px"
      height="7px"
      viewBox="0 0 14 7"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <polygon fill="currentColor" points="0 0 7 7 14 0"></polygon>
    </svg>
  </span>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.tooltip {
  position: absolute;
  left: 50%;
  bottom: 100%;
  transform: translate(-50%, -0.35em);

  pointer-events: none;

  padding: 0.3em 0.6em;
  background: #1a2b33;
  color: #fff;
  border-radius: 3px;
  white-space: nowrap;

  opacity: 0;
  filter: blur(4px);

  transition: opacity 0.3s, filter 0.3s;

  &--visible {
    opacity: 1;
    filter: none;
    transition: opacity 0.1s, filter 0.175s;
  }

  &__triangle {
    color: #1a2b33;
    position: absolute;
    top: calc(100% - 1px);
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
