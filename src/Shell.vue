<template>
  <ResponsiveContainer
    class="responsive-container"
    default-breakpoint="mobile"
    :breakpoints="{ tablet: 768 }"
    v-slot="window"
  >
    <App :window="window" />
  </ResponsiveContainer>
</template>

<script>
import App from './components/App.vue'
import ResponsiveContainer from './components/ResponsiveContainer.js'

export default {
  components: { App, ResponsiveContainer }
}
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;

  @media (max-width: 767px) {
    overflow: hidden;
  }
}

html,
body,
.layout,
#app,
.responsive-container {
  height: 100%;
}

/* For browsers not supporting <details> */
details {
  display: block;
}

html {
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
    Arial, sans-serif;
  background: #fafafa;
  color: #6a6a6a;
  font-family:
    -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', Arial,
    sans-serif;
  font-size: 12px;
  line-height: 1.25;
  box-sizing: border-box;
}

a {
  color: #56b3b4;
}
</style>
