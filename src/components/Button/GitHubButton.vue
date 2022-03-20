<template>
  <Button v-bind="$attrs" class="button--github">
    <slot />
  </Button>
</template>

<script>
import Button from './Button.vue'

export default {
  inheritAttrs: false,
  components: { Button }
}
</script>

<style lang="scss" scoped>
// We need to violate BEM's specificity rules here because of nuxt/nuxt.js#4219
.button.button--github {
  height: 18px;
  padding: 0 5px;
  border: 1px solid #d1d2d3;
  border-radius: 0.25em;
  background-image: linear-gradient(to bottom, #fafbfc, #e4ebf0);
  font-size: 11px;
  line-height: 18px;
  font-weight: 600;
  color: #24292e;
  text-decoration: none;
  cursor: pointer;
  outline: none;
  position: relative;
  white-space: nowrap;

  &:hover {
    background-color: #e6ebf1;
    background-image: linear-gradient(to bottom, #f0f3f6, #dce3ec);
    border-color: #afb1b2;
  }

  &:active {
    background-color: #e9ecef;
    background-image: none;
    border-color: #afb1b2;
    box-shadow: inset 0 0.15em 0.3em rgba(27, 31, 35, 0.15);
  }

  &:focus {
    border-color: #c8e1ff;
  }
}
</style>
