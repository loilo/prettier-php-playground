import * as Comlink from 'comlink'
import { printPrettier } from 'prettier-plugin-pegjs/build/standalone'
import { Options } from '../store/types'

const exposed = {
  parse: (s: string, options?: Options) => {
    try {
      const ret = printPrettier(s, options)
      return ret
    } catch (e: any) {
      if (e.format) {
        throw Object.assign(
          { desc: String(e), terminalDesc: e.format([{ text: s }]) },
          e
        )
      }
      throw e
    }
  },
}

export type Exposed = typeof exposed

// We are exporting `void`, but we have to export _something_ to get the module to work correctly
export default Comlink.expose(exposed)
