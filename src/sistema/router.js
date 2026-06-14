import { createRouter, createWebHistory } from 'vue-router'

import home       from '../paginas/home.vue'
import error      from '../estados/404.vue'
import tienda     from '../paginas/tienda.vue'
import item       from '../paginas/item.vue'
import carro      from '../paginas/carro.vue'
import confirmado from '../estados/200.vue'
import fallo      from '../estados/500.vue'

const routes = [

  { path: '/',              name: 'home',       component: home       },
  { path: '/tienda',        name: 'tienda',     component: tienda     },
  { path: '/item/:id',      name: 'item',       component: item       },
  { path: '/carro',         name: 'carro',      component: carro      },
  { path: '/confirmado',    name: 'confirmado', component: confirmado },
  { path: '/fallo',         name: 'fallo',      component: fallo      },
  { path: '/:catchAll(.*)', name: 'error',      component: error      },

]

const router = createRouter({ history: createWebHistory(import.meta.env.BASE_URL), routes })

const titles = {
  home:       'Nube Nueve',
  tienda:     'Tienda — Nube Nueve',
  item:       'Producto — Nube Nueve',
  carro:      'Carro — Nube Nueve',
  confirmado: 'Pedido confirmado — Nube Nueve',
  fallo:      'Error — Nube Nueve',
  error:      'Página no encontrada — Nube Nueve',
}

router.afterEach(to => {
  document.title = titles[to.name] || 'Nube Nueve'
})

export default router
