<template>
  <main
    class="layout"
    :class="{
      'layout--with-sidebar': showSidebar === true,
      'layout--without-sidebar': showSidebar === false,
      'layout--with-ast': editorOptions.ast
    }"
  >
    <UnsupportedIE/>

    <Header v-bind="{ version }" class="layout__header"/>
    <Sidebar class="layout__sidebar"/>

    <!-- Input -->
    <CodemirrorEditor
      :value="input"
      @input="value => $store.commit('setInput', value)"
      :options="cmInputOptions"
      class="layout__input"
    />
    <CodemirrorInert v-if="cmIsInert" area="input"/>

    <!-- AST -->
    <CodemirrorEditor
      v-if="editorOptions.ast"
      :value="ast"
      :options="cmAstOptions"
      class="layout__ast"
    />
    <CodemirrorInert v-if="cmIsInert && editorOptions.ast" area="ast"/>

    <!-- Output -->
    <CodemirrorEditor
      :value="output"
      :options="cmOutputOptions"
      :class="{ 'editor--with-error': outputContainsError }"
      class="layout__output"
    />
    <CodemirrorInert v-if="cmIsInert" area="output"/>

    <Footer/>
  </main>
</template>

<script>
import throttle from 'lodash/throttle'
import { mapState, mapGetters, mapMutations } from 'vuex'

import Header from './Layout/Header'
import Footer from './Layout/Footer'
import Sidebar from './Layout/Sidebar'
import CodemirrorEditor from './Layout/CodemirrorEditor'
import CodemirrorInert from './Layout/CodemirrorInert'
import UnsupportedIE from './Layout/UnsupportedIE'

import Tooltip from './Util/Tooltip'
import ClipboardButton from './Button/ClipboardButton'
import RepositoryButton from './Button/RepositoryButton'
import GitHubButton from './Button/GitHubButton'
import IconButton from './Button/IconButton'
import Prettifier from 'workerize-loader!../util/Prettifier'
import { write as writeState, read as readState } from '../util/UrlState'

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
    prettier: process.browser ? new Prettifier() : null,
    inertReasons: []
  }),
  computed: {
    ...mapState([
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
    }
  },
  asyncComputed: {
    result: {
      async get() {
        try {
          return this.prettier
            ? await this.prettier.format(
                this.input,
                this.prettierOptions,
                this.editorOptions
              )
            : null
        } catch (err) {
          return err
        }
      },
      default: null
    },
    ast: {
      get() {
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
      default: ''
    },
    outputContainsError() {
      return (
        this.result &&
        (this.result instanceof Error || this.result.type !== 'formatted')
      )
    }
  },
  bus: {
    ['cm-inert'](toggle, ref) {
      if (toggle) {
        if (!this.inertReasons.includes(ref)) {
          this.inertReasons.push(ref)
        }
      } else {
        if (this.inertReasons.includes(ref)) {
          this.inertReasons.splice(this.inertReasons.indexOf(ref), 1)
        }
      }
    }
  },
  watch: {
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
  },
  mounted() {
    this.$store.commit('setUrl', window.location.href)
    const state = readState()

    if (state !== null) {
      this.$store.commit('setJsonState', state)
    }

    self.prettier = this.prettier

    this.$nextTick(() => {
      this.$store.commit('initializeApp')
    })
  }
}
</script>

<style lang="scss">
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
