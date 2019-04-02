<template>
  <button v-bind="attributes" v-on="$listeners" class="button">
    <slot/>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'button'
    }
  },
  computed: {
    elementType() {
      return this.type === 'link' ? { is: 'a' } : { type: this.type }
    },
    attributes() {
      return { ...this.elementType, ...this.$attrs }
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
