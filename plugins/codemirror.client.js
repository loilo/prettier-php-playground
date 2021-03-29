import Vue from 'vue'

if (process.browser) {
  const VueCodemirror = require('vue-codemirror')
  Vue.use(VueCodemirror)

  require('codemirror/mode/php/php.js')
  require('codemirror/addon/display/rulers')
}
