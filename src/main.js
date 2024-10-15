import 'sanhaua/dist/style.css'
import toastsPlugin from './plugins/toasts'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).use(toastsPlugin).mount('#app')
