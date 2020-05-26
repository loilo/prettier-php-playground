<template>
  <footer class="layout__footer footer">
    <div class="footer__mobile">
      <IconButton
        color="#5ab3b3"
        tooltip="Toggle options"
        @click="toggleSidebar"
        :pressed="showSidebar === true"
      >
        <svg height="16" viewBox="0 0 14 16" version="1.1" width="14" aria-hidden="true">
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M14 8.77v-1.6l-1.94-.64-.45-1.09.88-1.84-1.13-1.13-1.81.91-1.09-.45-.69-1.92h-1.6l-.63 1.94-1.11.45-1.84-.88-1.13 1.13.91 1.81-.45 1.09L0 7.23v1.59l1.94.64.45 1.09-.88 1.84 1.13 1.13 1.81-.91 1.09.45.69 1.92h1.59l.63-1.94 1.11-.45 1.84.88 1.13-1.13-.92-1.81.47-1.09L14 8.75v.02zM7 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"
          ></path>
        </svg>
      </IconButton>
      <IconButton color="#e85f61" @click="resetInput" tooltip="Clear code">
        <svg height="16" viewBox="0 0 12 16" version="1.1" width="12" aria-hidden="true">
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M11 2H9c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1H2c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1v9c0 .55.45 1 1 1h7c.55 0 1-.45 1-1V5c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 12H3V5h1v8h1V5h1v8h1V5h1v8h1V5h1v9zm1-10H2V3h9v1z"
          ></path>
        </svg>
      </IconButton>
      <IconButton
        color="#f8bc45"
        type="link"
        :href="issueLink"
        tooltip="Report issue"
        target="_blank"
      >
        <svg height="16" viewBox="0 0 14 16" version="1.1" width="14" aria-hidden="true">
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"
          ></path>
        </svg>
      </IconButton>
      <IconButton color="#c596c7" @click="share" tooltip="Share your code">
        <Tooltip :visible="shareCopied">Copied URL!</Tooltip>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none"></path>
          <path
            fill="currentColor"
            d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"
          ></path>
        </svg>
      </IconButton>
    </div>
    <div class="footer__desktop">
      <section class="footer__buttons">
        <GitHubButton @click="toggleSidebar">
          <template v-if="typeof showSidebar === 'boolean'">{{showSidebar ? 'Hide ' : 'Show '}}</template>
          <template v-else-if="!isMobile">Hide{{' '}}</template>
          <template v-else>Show{{' '}}</template>options
        </GitHubButton>
        <GitHubButton @click="resetInput">Clear</GitHubButton>
        <ClipboardButton :data="getConfigJson">Copy config JSON</ClipboardButton>
      </section>
      <section class="footer__inspired">
        Inspired by and plagiarized from the
        <a
          href="https://prettier.io/playground"
          target="_blank"
        >Prettier playground</a>
      </section>
      <section class="footer__buttons">
        <ClipboardButton :data="url">Copy link</ClipboardButton>
        <ClipboardButton :data="issueMarkdown">Copy markdown</ClipboardButton>
        <GitHubButton type="link" :href="issueLink" target="_blank">Report issue</GitHubButton>
      </section>
    </div>
  </footer>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

import Tooltip from '../Util/Tooltip'
import IconButton from '../Button/IconButton'
import ClipboardButton from '../Button/ClipboardButton'
import GitHubButton from '../Button/GitHubButton'

export default {
  components: {
    Tooltip,
    IconButton,
    ClipboardButton,
    GitHubButton
  },
  data: () => ({
    shareCopied: false
  }),
  computed: {
    ...mapState(['showSidebar', 'isMobile', 'url', 'prettierOptions']),
    ...mapGetters(['issueLink', 'issueMarkdown'])
  },
  methods: {
    ...mapMutations(['resetInput']),
    ...mapActions(['toggleSidebar']),
    share() {
      if (navigator.share) {
        navigator
          .share({
            title: 'Prettier Pegjs Playground',
            text: 'Play with the Prettier Pegjs plugin',
            url: this.url
          })
          .catch(() => {
            alert('Sharing failed')
          })
      } else {
        this.$copyText(this.url)
          .then(() => {
            this.shareCopied = true
            clearTimeout(this.shareCopiedTimeout)
            this.shareCopiedTimeout = setTimeout(() => {
              this.shareCopied = false
            }, 2500)
          })
          .catch(() => {
            alert(
              'Your device or browser does not support the Web Share API. 🙁'
            )
          })
      }
    },
    getConfigJson() {
      return JSON.stringify(this.prettierOptions, null, 2)
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  background-color: #fafafa;

  &__mobile,
  &__desktop {
    height: 100%;
  }

  &__mobile {
    @media (min-width: 768px) {
      display: none;
    }

    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0 1em;
  }

  &__desktop {
    display: none;

    @media (min-width: 768px) {
      display: flex;
    }

    padding: 0 0.5em;
    justify-content: space-between;
    align-items: center;
  }

  &__inspired {
    font-size: 0.75em;
    display: none;

    @media (min-width: 768px) {
      display: initial;
    }

    @media (min-width: 1024px) {
      font-size: calc(1em / 12 * 10);
    }
  }
}
</style>
