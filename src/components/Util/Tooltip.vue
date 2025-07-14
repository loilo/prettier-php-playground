<template>
  <span
    aria-hidden="true"
    class="tooltip"
    :class="[`tooltip--position-${position}`, { 'tooltip--visible': visible }]"
    :style="{ '--tooltip-color': color, '--tooltip-background': background }"
  >
    <slot />
    <svg
      class="tooltip__triangle"
      width="14px"
      height="7px"
      viewBox="0 0 14 7"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <polygon
        fill="currentColor"
        :points="position === 'above' ? '0 0 7 7 14 0' : '0 7 7 0 14 7'"
      ></polygon>
    </svg>
  </span>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: 'above'
    },
    color: {
      type: String,
      default: '#ffffff'
    },
    background: {
      type: String,
      default: '#1a2b33'
    }
  }
}
</script>

<style lang="scss" scoped>
.tooltip {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -0.35em);

  pointer-events: none;

  padding: 0.3em 0.6em;
  background: var(--tooltip-background);
  color: var(--tooltip-color);
  border-radius: 3px;
  white-space: nowrap;

  opacity: 0;
  filter: blur(4px);

  transition:
    opacity 0.3s,
    filter 0.3s;

  &--position-above {
    bottom: 100%;
  }

  &--position-above &__triangle {
    top: calc(100% - 1px);
  }

  &--position-below {
    top: 100%;
  }

  &--position-below &__triangle {
    bottom: calc(100% - 1px);
  }

  &--visible {
    opacity: 1;
    filter: none;
    transition:
      opacity 0.1s,
      filter 0.175s;
  }

  &__triangle {
    color: var(--tooltip-background);
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
