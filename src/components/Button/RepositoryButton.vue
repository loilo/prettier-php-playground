<template>
  <GitHubButton
    type="link"
    :href="link"
    :data-show-count="showStars"
    :aria-label="label"
  >
    <slot>{{ this.repo }}</slot>
  </GitHubButton>
</template>

<script>
import GitHubButton from './GitHubButton.vue'
import * as githubButtons from 'github-buttons'

export default {
  components: { GitHubButton },
  data: () => ({
    state: null,
    recentMessage: null
  }),
  props: {
    repo: String,
    showStars: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    link() {
      return `https://github.com/${this.repo}`
    },
    label() {
      return `${this.repo} on GitHub`
    }
  },
  mounted() {
    githubButtons.render(this.$el, el => {
      this.$el.parentNode.replaceChild(el, this.$el)
    })
  }
}
</script>

<style lang="scss" scoped>
.clipboard-button {
  position: relative;

  /* &--success {
    border-color: #49ad49;
    box-shadow: 0 1px 2px 0px rgba(37, 177, 37, 0.3);
  }

  &--error {
    border-color: #da6389;
    box-shadow: 0 1px 2px 0px rgba(199, 38, 90, 0.3);
  } */

  &__triangle {
    color: #1a2b33;
    position: absolute;
    top: calc(100% - 1px);
    left: 50%;
    transform: translateX(-50%);
  }

  &__tooltip {
    position: absolute;
    left: 50%;
    bottom: 100%;
    transform: translate(-50%, -0.35em);

    pointer-events: none;

    padding: 0.3em 0.6em;
    background: #1a2b33;
    color: #fff;
    border-radius: 3px;

    opacity: 0;
    filter: blur(4px);

    transition:
      opacity 0.3s,
      filter 0.3s;

    &--visible {
      opacity: 1;
      filter: none;
      transition:
        opacity 0.1s,
        filter 0.175s;
    }
  }
}
</style>
