import { version } from '@prettier/plugin-php/package.json'
import prettier from './util/Formatter'

const defaultPrettierOptions = {
  printWidth: 80,
  tabWidth: 4,
  useTabs: false,
  singleQuote: false,
  phpVersion: '8.4',
  trailingCommaPHP: true,
  braceStyle: 'per-cs',
  requirePragma: false,
  insertPragma: false
}

const defaultEditorOptions = {
  ast: false
}

const defaultInput =
  `<?php

array_map(function($arg1,$arg2) use ( $var1, $var2 ) {
    return $arg1+$arg2/($var+$var2);
}, array("complex"=>"code","with"=>
    function() {return "inconsistent";}
,"formatting"=>"is", "hard" => "to", "maintain"=>true));
` + '\n'

export const state = () => ({
  // UI & Editor
  initialized: false,
  isMobile: false,
  showSidebar: 'auto',
  version: localStorage.getItem('custom-plugin-code') ? 'custom' : version,
  versionCounter: 0,
  url: '#',
  editorOptions: { ...defaultEditorOptions },

  // IO data
  input: defaultInput,
  result: null,
  prettierOptions: { ...defaultPrettierOptions }
})

export const mutations = {
  // UI & Editor
  initializeApp(state) {
    state.initialized = true
  },
  setMobile(state, isMobile) {
    state.isMobile = isMobile
  },
  setSidebarVisibility(state, futureState) {
    state.showSidebar = futureState
  },
  setUrl(state, url) {
    state.url = url
  },
  setEditorOption(state, [option, value]) {
    state.editorOptions[option] = value
  },
  setVersion(state, version) {
    state.version = version
    state.versionCounter++
  },

  // IO data
  setInput(state, value) {
    state.input = value
  },
  resetInput(state) {
    state.input = ''
  },
  setResult(state, result) {
    state.result = result
  },
  setPrettierOption(state, [option, value]) {
    state.prettierOptions[option] = value
  },

  // Other & mixed
  setJsonState(state, jsonState) {
    state.prettierOptions = {
      ...state.prettierOptions,
      ...jsonState.prettierOptions
    }
    state.editorOptions = { ...state.editorOptions, ...jsonState.editorOptions }
    state.input = jsonState.input || ''
  },
  resetOptions(state) {
    state.editorOptions = { ...defaultEditorOptions }
    state.prettierOptions = { ...defaultPrettierOptions }
  }
}

export const actions = {
  toggleSidebar({ state, commit }) {
    if (typeof state.showSidebar === 'boolean') {
      commit('setSidebarVisibility', !state.showSidebar)
    } else {
      // `showSidebar` is "auto".
      // It should hide on large screens and show on small screens
      commit('setSidebarVisibility', state.isMobile)
    }
  },
  async useCustomPluginCode({ commit }, code) {
    await prettier.useCustomPlugin(code)
    commit('setVersion', 'custom')
  },
  async disableCustomPlugin({ commit }) {
    await prettier.useCustomPlugin(false)
    commit('setVersion', version)
    localStorage.removeItem('custom-plugin-code')
  },
  async pickCustomPluginFile({ dispatch }, file) {
    try {
      const customPluginCode = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
          resolve(reader.result)
        }
        reader.onerror = reject
        reader.readAsText(file)
      })

      await dispatch('useCustomPluginCode', customPluginCode)
      localStorage.setItem('custom-plugin-code', customPluginCode)
    } catch (error) {
      if (error.message === 'Invalid plugin file') {
        alert('Invalid plugin file')
      } else {
        console.error(error)
        alert('An error happened. See the dev tools console for details.')
      }
    }
  }
}

export const getters = {
  hasResult: state => state.result !== null,
  output: state => {
    if (!state.result) {
      return state.input
    }

    if (state.result instanceof Error) {
      return String(state.result)
    }

    switch (state.result.type) {
      case 'formatted':
        return state.result.code

      case 'syntax-error':
        return state.result.message + '\n\n' + state.result.frame

      case 'error':
        return state.result.message
    }
  },
  issueMarkdown: (state, getters) => `${
    state.version === 'custom'
      ? '**Plugin version: local plugin file**'
      : state.version
        ? `**@prettier/plugin-php v${state.version}**
[Playground link](${state.url})`
        : '**Plugin version: unknown**'
  }

**Input:**
\`\`\`php
${state.input}
\`\`\`

**Output:**
\`\`\`php
${getters.output}
\`\`\`
`,
  issueLink: (_, getters) =>
    `https://github.com/prettier/plugin-php/issues/new?body=${encodeURIComponent(
      getters.issueMarkdown
    )}`,

  // The state that is mapped to the URL
  jsonState: state =>
    JSON.stringify({
      prettierOptions: state.prettierOptions,
      editorOptions: state.editorOptions,
      input: state.input
    })
}
