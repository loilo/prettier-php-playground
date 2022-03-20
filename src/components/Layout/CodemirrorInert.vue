<template>
  <div class="codemirror-inert" :style="{ 'grid-area': area }"/>
</template>

<script>
export default {
  props: {
    area: String
  }
}
</script>

<style scoped>
.codemirror-inert {
  z-index: 2;
  position: relative;
}
</style>
