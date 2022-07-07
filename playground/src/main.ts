import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import 'virtual:windi.css'
import '@dus/styles/override-native.css'

createApp(App).use(router).mount('#app')
