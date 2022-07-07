import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import 'virtual:windi.css'
import '@dz7/styles/override-native.css'

createApp(App).use(router).mount('#app')
