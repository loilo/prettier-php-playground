<template>
  <component :is="elementType" v-bind="$attrs" class="button">
    <slot />
  </component>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: 'button'
    }
  },
  computed: {
    elementType() {
      return this.type === 'link' ? 'a' : this.type
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  box-sizing: content-box;
  display: inline-block;
  width: auto;
  height: auto;
  margin: 0;
  padding: 0;
  border: none;
  font-family: inherit;
  font-size: inherit;
  font-style: inherit;
  font-weight: inherit;
  color: inherit;
  background: none;
}
</style>
