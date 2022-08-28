import { createApp } from 'vue'
import '@/assets/scss/index.scss'
import { configure } from '@/index'

configure({
  locale: 'ptBR'
})

// import Dev from './server.vue'
import select from './select.vue'

createApp(select).mount('#app')
