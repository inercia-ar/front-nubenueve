<script setup>
import { useRouter } from 'vue-router'
import { useStore } from '../sistema/store.js'
import Topbar from '../componentes/topbar.vue'
import Filtros from '../componentes/filtros.vue'
import Card from '../componentes/card.vue'
import Footer from '../componentes/footer.vue'
const router = useRouter()
const store = useStore()

function goItem(id) {
  router.push({ name: 'item', params: { id } })
}
</script>

<template>
  <section class="shop">
    <Topbar>
      <template #center><span class="audio-format min-hide">LOTE: {{ store.mock.length }} UNIDADES</span></template>
      <template #right><router-link :to="{ name: 'carro' }" class="audio-format">CARRO ({{ store.cartCount }})</router-link></template>
    </Topbar>

    <Filtros volverTo="home" :filters="['artist', 'sort']" />

    <div class="shop-grid">

      <Card v-for="(item, index) in store.filteredList"
        :key="item.id"
        :id="item.id" :index="index"
        :thumb="item.imagenes[0]" :alt="item.disco" :title="item.disco"
        :price="'$' + item.precio.toLocaleString('es-CL')"
        :long="item.formato === 'box' || item.formato === 'cinta'"
        @click="goItem(item.id)"
      >
        <template #specs>
          <span>{{ item.formato.toUpperCase() }}</span>
          <span class="divider">|</span>
          <span>STOCK {{ item.stock }}</span>
        </template>

        <template #action>
          <button class="icon-btn" title="Añadir al carrito" @click.stop="store.addToCart(item.id)">+</button>
        </template>
        
      </Card>

    </div>

    <Footer />
    
  </section>
</template>
