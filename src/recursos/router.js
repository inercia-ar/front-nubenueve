import { createRouter, createWebHistory } from 'vue-router'
import home from '../visores/home.vue'
import error from '../visores/error.vue'
import tienda from '../visores/tienda.vue'

const routes = [

  { path: '/',              name: 'home',   component: home    },
  { path: '/tienda',        name: 'tienda', component: tienda  },
  { path: '/:catchAll(.*)', name: 'error',  component: error   },

]

const router = createRouter({ history: createWebHistory(import.meta.env.BASE_URL), routes })

export default router