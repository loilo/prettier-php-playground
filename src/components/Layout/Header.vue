<template>
  <header class="header">
    <span class="header__logo-wrapper">
      <img class="header__logo" src="/icon.png" alt="The Prettier logo" />
      <h1 class="header__headline">
        Prettier PHP
        <span class="header__version" v-if="version">
          <span class="header__version--local" v-if="version === 'custom'">
            from local file
          </span>
          <a
            v-else
            :href="
              version
                ? `https://github.com/prettier/plugin-php/tree/v${version}`
                : 'https://github.com/prettier/plugin-php/tree/master'
            "
            target="_blank"
            rel="noopener"
            class="header__version-link"
          >
            v{{ version }}
          </a>
          <form hidden ref="customPluginForm">
            <input
              type="file"
              ref="customPluginFile"
              accept="application/javascript"
              @change="pluginFileChange"
            />
          </form>
          &nbsp;
          <Button
            v-if="version === 'custom'"
            class="custom-plugin-button"
            @click="pluginFileReset"
          >
            <Tooltip
              style="transform: translate(-50%, 0.75em)"
              position="below"
              visible
              background="#8d9599"
            >
              Disable custom plugin
            </Tooltip>
            <svg
              class="custom-plugin-button__icon"
              aria-hidden="true"
              focusable="false"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm141.421 106.579c73.176 73.175 77.05 187.301 15.964 264.865L132.556 98.615c77.588-61.105 191.709-57.193 264.865 15.964zM114.579 397.421c-73.176-73.175-77.05-187.301-15.964-264.865l280.829 280.829c-77.588 61.105-191.709 57.193-264.865-15.964z"
              ></path>
            </svg>
            <span class="visually-hidden">Disable custom plugin</span>
          </Button>
          <Button
            class="custom-plugin-button"
            ref="customPluginButton"
            @click="$refs.customPluginFile.click()"
          >
            <Tooltip
              style="transform: translate(-50%, 0.75em)"
              position="below"
              visible
              background="#8d9599"
            >
              <template v-if="version === 'custom'">Pick</template>
              <template v-else>Use</template>
              local plugin file
            </Tooltip>

            <svg
              class="custom-plugin-button__icon"
              aria-hidden="true"
              focusable="false"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
              <path
                fill="currentColor"
                d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4zM393.4 288H328v112c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V288h-65.4c-14.3 0-21.4-17.2-11.3-27.3l105.4-105.4c6.2-6.2 16.4-6.2 22.6 0l105.4 105.4c10.1 10.1 2.9 27.3-11.3 27.3z"
              ></path>
            </svg>
            <span class="visually-hidden">Use local plugin file</span>
          </Button>
        </span>
      </h1>
    </span>

    <aside class="header__repo-buttons">
      <GitHubButton
        type="link"
        href="https://github.com/Loilo/prettier-php-playground"
        target="_blank"
        class="header__own-repo-button"
      >
        <svg
          version="1.1"
          width="14"
          height="14"
          viewBox="0 0 16 16"
          class="octicon octicon-mark-github"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
          ></path>
        </svg>
        Playground
      </GitHubButton>
      <RepositoryButton repo="prettier/plugin-php" show-stars>
        Prettier PHP Plugin
      </RepositoryButton>
    </aside>
  </header>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

import Button from '../Button/Button.vue'
import Tooltip from '../Util/Tooltip.vue'
import GitHubButton from '../Button/GitHubButton.vue'
import RepositoryButton from '../Button/RepositoryButton.vue'

export default {
  components: {
    GitHubButton,
    RepositoryButton,
    Button,
    Tooltip
  },
  props: {
    version: String
  },
  methods: {
    ...mapActions(['pickCustomPluginFile', 'disableCustomPlugin']),
    pluginFileReset() {
      this.$refs.customPluginForm.reset()
      this.disableCustomPlugin()
    },
    pluginFileChange() {
      this.$refs.customPluginButton.$el.blur()

      if (this.$refs.customPluginFile.files.length > 0) {
        this.pickCustomPluginFile(this.$refs.customPluginFile.files[0])
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;

  background-color: #1a2b34;
  color: #e0e0e0;
  padding: 11px 11px 11px 15px;

  @media (min-width: 768px) {
    padding: 11px 27px;
  }

  &__headline {
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    font-family: inherit;
    font-weight: 400;
    line-height: 18px;
    position: relative;
    z-index: 9999;
    margin: 0;

    @media (min-width: 768px) {
      font-size: 20px;
      display: block;
    }
  }

  a {
    color: #fff;
    text-decoration: none;
  }

  &__logo-wrapper {
    display: flex;
    align-items: center;
    color: #fff;
    width: 100%;

    @media (min-width: 768px) {
      width: auto;
    }
  }

  &__logo {
    height: 24px;
    margin-right: 10px;

    @media (min-width: 768px) {
      height: 34px;
    }
  }

  &__version {
    display: inline-flex;
    align-items: center;
    font-size: 0.75em;
    line-height: 1;
    color: #8d9599;

    @at-root a#{&}-link {
      color: inherit;
    }

    @media (min-width: 768px) {
      font-size: 0.5em;
    }

    &--local {
      color: #ffde60;
    }
  }

  &__repo-buttons {
    display: none;

    @media (min-width: 768px) {
      display: inline-flex;
    }
  }
}

// We need to move this around and add specificity because of nuxt/nuxt.js#4219
.button--github.header__own-repo-button {
  display: inline-flex;
  align-items: center;
  margin-right: 0.5em;

  svg {
    margin-right: 0.25em;
  }
}

.header .custom-plugin-button {
  position: relative;
  transition: color 0.2s;
  padding: 0 0.35em;
  margin-bottom: -0.25em;

  &:focus {
    outline: none;
    color: white;
  }

  &:deep(.tooltip) {
    opacity: 0;
    filter: blur(4px);
    pointer-events: none;
    transition: opacity 0.3s, filter 0.3s;
  }

  &:hover {
    color: white;

    &:deep(.tooltip) {
      filter: blur(0px);
      opacity: 1;
    }
  }

  &__icon {
    width: 1.6em;
    height: 1.6em;
    /* padding: 1em 1em 0.75em 0.5em; */
  }
}
</style>
