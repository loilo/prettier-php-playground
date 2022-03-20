<template>
  <main
    class="layout"
    :class="{
      'layout--with-sidebar': showSidebar === true,
      'layout--without-sidebar': showSidebar === false,
      'layout--with-ast': editorOptions.ast
    }"
  >
    <UnsupportedIE />

    <div class="layout__preview">
      <!-- prettier-ignore -->
      <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M248.747 204.705l6.588 112c.373 6.343 5.626 11.295 11.979 11.295h41.37a12 12 0 0 0 11.979-11.295l6.588-112c.405-6.893-5.075-12.705-11.979-12.705h-54.547c-6.903 0-12.383 5.812-11.978 12.705zM330 384c0 23.196-18.804 42-42 42s-42-18.804-42-42 18.804-42 42-42 42 18.804 42 42zm-.423-360.015c-18.433-31.951-64.687-32.009-83.154 0L6.477 440.013C-11.945 471.946 11.118 512 48.054 512H527.94c36.865 0 60.035-39.993 41.577-71.987L329.577 23.985zM53.191 455.002L282.803 57.008c2.309-4.002 8.085-4.002 10.394 0l229.612 397.993c2.308 4-.579 8.998-5.197 8.998H58.388c-4.617.001-7.504-4.997-5.197-8.997z"></path></svg>

      <!-- prettier-ignore -->
      <span>
        This is a playground preview for testing upcoming versions of the
        Prettier PHP Plugin. You can find the current stable playground
        <a href="https://loilo.github.io/prettier-php-playground/">here</a>.
      </span>
    </div>
    <Header v-bind="{ version }" class="layout__header" />
    <Sidebar class="layout__sidebar" />

    <!-- Input -->
    <CodemirrorEditor
      :value="input"
      @input="value => $store.commit('setInput', value)"
      :options="cmInputOptions"
      class="layout__input"
    />
    <CodemirrorInert v-if="cmIsInert" area="input" />

    <!-- AST -->
    <CodemirrorEditor
      v-if="editorOptions.ast"
      :value="ast"
      :options="cmAstOptions"
      class="layout__ast"
    />
    <CodemirrorInert v-if="cmIsInert && editorOptions.ast" area="ast" />

    <!-- Output -->
    <CodemirrorEditor
      :value="output"
      :options="cmOutputOptions"
      :class="{ 'editor--with-error': outputContainsError }"
      class="layout__output"
    />
    <CodemirrorInert v-if="cmIsInert" area="output" />

    <Footer />
  </main>
</template>

<script>
import { throttle } from 'lodash-es'
import { mapState, mapGetters, mapMutations } from 'vuex'

import Header from './Layout/Header.vue'
import Footer from './Layout/Footer.vue'
import Sidebar from './Layout/Sidebar.vue'
import CodemirrorEditor from './Layout/CodemirrorEditor.vue'
import CodemirrorInert from './Layout/CodemirrorInert.vue'
import UnsupportedIE from './Layout/UnsupportedIE.vue'

import Tooltip from './Util/Tooltip.vue'
import ClipboardButton from './Button/ClipboardButton.vue'
import RepositoryButton from './Button/RepositoryButton.vue'
import GitHubButton from './Button/GitHubButton.vue'
import IconButton from './Button/IconButton.vue'
import prettier from '../util/Formatter.js'
import { write as writeState, read as readState } from '../util/UrlState.js'

// if (process.browser) {
self.prettier = prettier
// }

export default {
  components: {
    Header,
    Footer,
    Sidebar,

    GitHubButton,
    IconButton,
    ClipboardButton,
    RepositoryButton,
    Tooltip,
    CodemirrorEditor,
    CodemirrorInert,

    UnsupportedIE
  },
  props: {
    window: Object
  },
  data: () => ({
    prettier,
    inertReasons: [],
    result: null
  }),
  computed: {
    ...mapState([
      'versionCounter',
      'initialized',
      'showSidebar',
      'version',
      'input',
      'url',
      'prettierOptions',
      'editorOptions'
    ]),
    ...mapGetters([
      'hasResult',
      'output',
      'issueMarkdown',
      'issueLink',
      'jsonState'
    ]),

    cmIsInert() {
      return this.inertReasons.length > 0
    },
    cmBaseOptions() {
      return {
        tabSize: this.prettierOptions.tabWidth,
        lineNumbers: true
      }
    },
    cmInputOptions() {
      return {
        ...this.cmBaseOptions,
        mode: 'application/x-httpd-php',
        rulers: [{ column: this.prettierOptions.printWidth, color: '#eee' }]
      }
    },
    cmAstOptions() {
      return {
        ...this.cmBaseOptions,
        mode: 'application/json'
      }
    },
    cmOutputOptions() {
      return {
        ...this.cmBaseOptions,
        readOnly: true,
        lineWrapping: this.outputContainsError,
        rulers: this.outputContainsError
          ? []
          : [{ column: this.prettierOptions.printWidth, color: '#444' }],
        mode: this.outputContainsError
          ? 'text/plain'
          : 'application/x-httpd-php'
      }
    },
    ast() {
      if (
        this.editorOptions &&
        this.editorOptions.ast &&
        this.hasResult &&
        this.result.type === 'formatted'
      ) {
        return this.result.ast === null
          ? ''
          : JSON.stringify(this.result.ast, null, 2)
      } else {
        return ''
      }
    },
    outputContainsError() {
      return (
        this.result &&
        (this.result instanceof Error || this.result.type !== 'formatted')
      )
    },
    resultKey: vm =>
      [
        vm.versionCounter,
        vm.input,
        JSON.stringify(vm.prettierOptions),
        JSON.stringify(vm.editorOptions)
      ].join('::')
  },
  watch: {
    async resultKey() {
      this.result = await this.updateResult()
    },
    result(result) {
      this.$store.commit('setResult', result)
    },
    jsonState: 'onStateChange',
    ['window.is.atLeast.tablet'](notMobile) {
      this.$store.commit('setMobile', !notMobile)
    }
  },
  methods: {
    ...mapMutations(['resetOptions']),
    async updateResult() {
      try {
        return prettier
          ? await prettier.format(
              this.input,
              this.prettierOptions,
              this.editorOptions
            )
          : null
      } catch (err) {
        return err
      }
    },
    onStateChange(jsonState) {
      if (this.initialized) {
        writeState(jsonState)
        if (typeof window === 'object') {
          this.$store.commit('setUrl', window.location.href)
        }
      }
    }
  },
  created() {
    this.resetOptions()
    this.onStateChange = throttle(this.onStateChange, 250)

    this.$store.commit('setMobile', !this.window.is.atLeast.tablet)

    window.addEventListener('cm-inert', event => {
      let toggle = event.detail.state
      let ref = event.detail.component

      if (toggle) {
        if (!this.inertReasons.includes(ref)) {
          this.inertReasons.push(ref)
        }
      } else {
        if (this.inertReasons.includes(ref)) {
          this.inertReasons.splice(this.inertReasons.indexOf(ref), 1)
        }
      }
    })
  },
  async mounted() {
    const customPluginCode = localStorage.getItem('custom-plugin-code')

    this.$store.commit('setUrl', window.location.href)
    const state = readState()

    if (state !== null) {
      this.$store.commit('setJsonState', state)
    }

    if (customPluginCode) {
      await this.$store.dispatch('useCustomPluginCode', customPluginCode)
    } else {
      await this.$store.dispatch('disableCustomPlugin')
    }

    this.$nextTick(() => {
      this.$store.commit('initializeApp')
    })
  }
}
</script>

<style lang="scss">
.visually-hidden {
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
  clip: rect(1px, 1px, 1px, 1px);
  white-space: nowrap; /* added line */
}

.layout {
  margin: 0 auto;
  display: grid;

  grid-template-rows: 36px 1fr 1fr 42px;
  grid-template-columns: auto;
  grid-template-areas:
    'header'
    'input'
    'output'
    'footer';

  &--with-ast {
    grid-template-rows: 36px 1fr 1fr 1fr 42px;
    grid-template-columns: auto;
    grid-template-areas:
      'header'
      'input'
      'ast'
      'output'
      'footer';
  }

  &__sidebar {
    display: none;
  }

  &--with-sidebar &__sidebar {
    display: block;
  }

  &__auto-options-hide {
    display: none;

    @media (min-width: 768px) {
      display: initial;
    }
  }

  &__auto-options-show {
    @media (min-width: 768px) {
      display: none;
    }
  }

  @media (min-width: 768px) {
    grid-template-rows: 52px 1fr 36px;
    grid-template-columns: 240px 1fr 1fr;
    grid-template-areas:
      'header header header'
      'sidebar input output'
      'footer footer footer';

    &--with-ast {
      grid-template-columns: 240px 1fr 1fr 1fr;
      grid-template-areas:
        'header header header header'
        'sidebar input ast output'
        'footer footer footer footer';
    }

    &__sidebar {
      display: block;
    }

    &--without-sidebar &__sidebar {
      display: none;
    }

    &--without-sidebar {
      grid-template-columns: 1fr 1fr;
      grid-template-areas:
        'header header'
        'input output'
        'footer footer';
    }

    &--without-sidebar#{&}--with-ast {
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-areas:
        'header header header'
        'input ast output'
        'footer footer footer';
    }
  }

  &__preview {
    display: none;
    background: #ffcc55;
    color: #1a2a34;
    padding: 0.5em 10px;
    align-items: center;
    grid-area: preview;

    svg {
      width: auto;
      height: 1.1em;
      margin-right: 0.5em;
      flex-shrink: 0;
    }

    a {
      color: inherit;
    }
  }

  &__header {
    grid-area: header;
  }

  &__footer {
    grid-area: footer;
    border-top: 1px solid #ddd;
    z-index: 10001; // above sidebar
  }

  &__sidebar {
    grid-area: sidebar;
    overflow-y: auto;
    border-right: 1px solid #ddd;
  }

  &__input,
  &__ast,
  &__output {
    min-width: 0;
    min-height: 0;
  }

  &__ast,
  &__output {
    border-top: 1px solid #ddd;

    @media (min-width: 768px) {
      border-top: none;
      border-left: 1px solid #ddd;
    }
  }

  &__input {
    grid-area: input;
  }

  &__ast {
    grid-area: ast;
  }

  &__output {
    grid-area: output;
  }
}

.CodeMirror {
  font-size: 12px;
}

.editor--with-error .CodeMirror {
  color: #ea004b;
}

.vue-codemirror,
.CodeMirror {
  height: 100%;
}

.cm-tab {
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NDggNTEyIj48cGF0aCBkPSJNMjE2LjQ2NCAzNi40NjVsLTcuMDcxIDcuMDdjLTQuNjg2IDQuNjg2LTQuNjg2IDEyLjI4NCAwIDE2Ljk3MUwzODcuODg3IDIzOUgxMmMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnYxMGMwIDYuNjI3IDUuMzczIDEyIDEyIDEyaDM3NS44ODdMMjA5LjM5MyA0NTEuNDk0Yy00LjY4NiA0LjY4Ni00LjY4NiAxMi4yODQgMCAxNi45NzFsNy4wNzEgNy4wN2M0LjY4NiA0LjY4NiAxMi4yODQgNC42ODYgMTYuOTcgMGwyMTEuMDUxLTIxMS4wNWM0LjY4Ni00LjY4NiA0LjY4Ni0xMi4yODQgMC0xNi45NzFMMjMzLjQzNCAzNi40NjVjLTQuNjg2LTQuNjg3LTEyLjI4NC00LjY4Ny0xNi45NyAweiIvPjwvc3ZnPg==');
  background-repeat: no-repeat;
  background-size: 9px 9px;
  background-position: center;
  opacity: 0.25;
}
</style>
