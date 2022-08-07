import { createApp } from 'vue'
import '@/assets/scss/index.scss'
import { configure } from '@/index'

configure({
  theme: 'dark',
  locale: 'ptBR'
})

import Dev from './server.vue'

createApp(Dev).mount('#app')
