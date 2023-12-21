import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// import SvgIcon from '@jamescoyle/vue-icon'


const app = createApp(App)
// app.component("v-icon", SvgIcon)
app.use(router)
app.mount("#app")
