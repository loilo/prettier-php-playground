<template>
  <GitHubButton
    @click="copy"
    class="clipboard-button"
    :class="{
      'clipboard-button--success': state === 'success',
      'clipboard-button--error': state === 'error'
    }"
  >
    <Tooltip :visible="state !== null">{{ recentMessage }}</Tooltip>
    <slot />
  </GitHubButton>
</template>

<script>
import GitHubButton from './GitHubButton.vue'
import Tooltip from '../Util/Tooltip.vue'

export default {
  components: { GitHubButton, Tooltip },
  data: () => ({
    state: null,
    recentMessage: null
  }),
  props: {
    data: [String, Function],
    feedbackTimer: {
      type: Number,
      default: 2500
    },
    successMessage: {
      type: String,
      default: 'Copied!'
    },
    errorMessage: {
      type: String,
      default: 'Error!'
    }
  },
  watch: {
    state(state) {
      switch (state) {
        case 'success':
          this.recentMessage = this.successMessage
          break
        case 'error':
          this.recentMessage = this.errorMessage
          break
      }
    }
  },
  methods: {
    async copy() {
      const data = typeof this.data === 'function' ? this.data() : this.data

      try {
        await navigator.clipboard.writeText(data)
        this.success()
      } catch (err) {
        console.error('Copying error: %o', err)
        this.error()
      }
    },
    success() {
      this.state = 'success'
      this.initializeStateReset()
    },
    error() {
      this.state = 'error'
      this.initializeStateReset()
    },
    initializeStateReset() {
      clearTimeout(this.timeoutId)
      this.timeoutId = setTimeout(() => {
        this.state = null
      }, this.feedbackTimer)
    }
  }
}
</script>

<style lang="scss" scoped>
.clipboard-button {
  position: relative;
}
</style>
