import { createApp } from 'vue'
import { createStore } from 'vuex'
import * as storeConfig from './store.js'

import Shell from './Shell.vue'

import TouchDirective from './plugins/touch-directive'

let app = createApp(Shell)
app.use(TouchDirective)
app.use(createStore(storeConfig))

app.mount('#app')
