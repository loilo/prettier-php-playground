<template>
  <section class="codemirror-editor" :class="classes">
    <Codemirror v-bind="attributes" />
  </section>
</template>

<script>
import { omit } from 'lodash-es'
import Codemirror from 'codemirror-editor-vue3'

import 'codemirror/mode/php/php.js'
import 'codemirror/addon/display/rulers.js'

export default {
  inheritAttrs: false,
  components: { Codemirror },
  computed: {
    classes: vm => vm.$attrs.class,
    attributes: vm => omit(vm.$attrs, 'class')
  }
}
</script>

<style scoped>
.codemirror-editor {
  min-width: 0;
}
</style>
