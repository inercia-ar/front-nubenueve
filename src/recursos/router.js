import { createRouter, createWebHistory } from 'vue-router'
import home from '../visores/home.vue'
import error from '../visores/error.vue'
import tienda from '../visores/tienda.vue'
import item from '../visores/item.vue'
import carro from '../visores/carro.vue'

const routes = [

  { path: '/',              name: 'home',   component: home    },
  { path: '/tienda',        name: 'tienda', component: tienda  },
  { path: '/item/:id',      name: 'item',   component: item    },
  { path: '/carro',         name: 'carro',  component: carro   },
  { path: '/:catchAll(.*)', name: 'error',  component: error   },

]

const router = createRouter({ history: createWebHistory(import.meta.env.BASE_URL), routes })

export default router