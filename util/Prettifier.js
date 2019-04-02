import prettier from 'prettier/standalone'
import HtmlPlugin from 'prettier/parser-html'
import PhpPlugin from '@prettier/plugin-php/standalone'

export async function format(code, prettierOptions = {}, editorOptions = {}) {
  try {
    const parseOptions = {
      ...prettierOptions,
      plugins: [HtmlPlugin, PhpPlugin],
      parser: 'php'
    }

    return {
      type: 'formatted',
      code: prettier.format(code, parseOptions),
      ast: editorOptions.ast
        ? prettier.__debug.parse(code, parseOptions).ast
        : null
    }
  } catch (err) {
    if (err instanceof SyntaxError) {
      return {
        type: 'syntax-error',
        message: err.message.match(/^(.+)(\n|$)/)[1],
        line: err.loc.start.line,
        column: err.loc.start.column,
        frame: err.codeFrame
      }
    } else {
      return {
        type: 'error',
        message: err.message || String(err)
      }
    }
  }
}
