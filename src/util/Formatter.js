import * as Comlink from 'comlink'
import Worker from './Prettifier?worker'
import { toRaw } from 'vue'

let Prettifier = Comlink.wrap(new Worker())
let prettifier

export default {
  async useCustomPlugin(code) {
    if (!prettifier) prettifier = await new Prettifier()

    return prettifier.useCustomPlugin(code)
  },

  async format(code, prettierOptions = {}, editorOptions = {}) {
    if (!prettifier) prettifier = await new Prettifier()

    return prettifier.format(code, toRaw(prettierOptions), toRaw(editorOptions))
  }
}
