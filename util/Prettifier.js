import prettier from 'prettier/standalone'
import BabelPlugin from 'prettier/parser-babel'
import TypescriptPlugin from 'prettier/parser-typescript'
import * as PegjsPlugin from 'prettier-plugin-pegjs'

let plugin = PegjsPlugin

export async function useCustomPlugin(code) {
  if (!code) {
    plugin = PegjsPlugin
    return
  }

  self.prettier = prettier
  const oldModule = module
  module = undefined
  try {
    eval(code)

    if (
      typeof self.prettierPlugins !== 'object' ||
      typeof self.prettierPlugins["pegjs-parser"] !== 'object'
    ) {
      throw new Error()
    }
  } catch {
    throw new Error('Invalid plugin file')
  } finally {
    module = oldModule
    delete self.prettier
  }

  plugin = self.prettierPlugins["pegjs-parser"]
  delete self.prettierPlugins
}

export async function format(code, prettierOptions = {}, editorOptions = {}) {
  try {
    const parseOptions = {
      ...prettierOptions,
      plugins: [BabelPlugin, TypescriptPlugin, plugin],
      parser: 'pegjs-parser',
    }
    console.log(prettier, parseOptions)

    return {
      type: 'formatted',
      code: prettier.format(code, parseOptions),
      ast: editorOptions.ast
        ? prettier.__debug.parse(code, parseOptions).ast
        : null,
    }
  } catch (err) {
    if (err instanceof SyntaxError) {
      return {
        type: 'syntax-error',
        message: err.message.match(/^(.+)(\n|$)/)[1],
        line: err.loc.start.line,
        column: err.loc.start.column,
        frame: err.codeFrame,
      }
    } else {
      return {
        type: 'error',
        message: err.message || String(err),
      }
    }
  }
}
