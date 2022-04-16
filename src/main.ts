import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import {createPinia} from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

const pinia = createPinia()
pinia.use(piniaPersist)
loadFonts()

const app=createApp(App)

app.use(router)
app.use(vuetify)
app.use(pinia)

app.mount('#app')
