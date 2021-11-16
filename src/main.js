import { createApp } from 'vue'
import App from './App.vue'
import { computeMonth } from '../logic.js'

window.compute = computeMonth

createApp(App).mount('#app')
