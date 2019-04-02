<template>
  <header class="header">
    <span class="header__logo-wrapper">
      <img class="header__logo" :src="ROOT + '/icon.png'" alt="The Prettier logo">
      <h1 class="header__headline">
        Prettier PHP
        <span class="header__version">
          <a
            :href="version ? `https://github.com/prettier/plugin-php/tree/v${version}` : 'https://github.com/prettier/plugin-php/tree/master'"
            target="_blank"
            rel="noopener"
          >
            <template v-if="version">v{{version}}&nbsp;</template>(experimental)
          </a>
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
        </svg> Playground
      </GitHubButton>
      <RepositoryButton repo="prettier/plugin-php" show-stars>Prettier PHP Plugin</RepositoryButton>
    </aside>
  </header>
</template>

<script>
import GitHubButton from '../Button/GitHubButton'
import RepositoryButton from '../Button/RepositoryButton'

export default {
  components: {
    GitHubButton,
    RepositoryButton
  },
  props: {
    version: String
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
    font-size: 0.75em;
    line-height: 0;
    opacity: 0.5;

    @media (min-width: 768px) {
      font-size: 0.5em;
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
</style>
