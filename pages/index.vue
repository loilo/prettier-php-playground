<template>
  <ResponsiveContainer default-breakpoint="mobile" :breakpoints="{ tablet: 768 }" v-slot="window">
    <App :window="window"/>
  </ResponsiveContainer>
</template>

<script>
import App from '../components/App'
import ResponsiveContainer from '../components/ResponsiveContainer'

export default {
  components: { App, ResponsiveContainer }
}
</script>
