import Vue from 'vue'

if (process.browser) {
  const VueCodemirror = require('vue-codemirror')
  Vue.use(VueCodemirror)

  require('codemirror/mode/pegjs/pegjs')
  require('codemirror/addon/display/rulers')
}
