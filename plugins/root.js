import Vue from 'vue'

// Make the global ROOT available inside component templates
Vue.mixin({
  computed: {
    ROOT: () => ROOT
  }
})
