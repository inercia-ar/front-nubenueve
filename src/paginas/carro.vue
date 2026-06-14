<script setup>
import { useRouter } from 'vue-router'
import { useStore } from '../sistema/store.js'
import Topbar from '../componentes/topbar.vue'
import Filtros from '../componentes/filtros.vue'
import Card from '../componentes/card.vue'
import Footer from '../componentes/footer.vue'

const router = useRouter()
const store = useStore()

function goItem(id) { router.push({ name: 'item', params: { id } }) }

</script>

<template>

  <section class="carro">

    <Topbar>
      <template #center> <span class="audio-format min-hide">{{ store.cart.length }} ARTÍCULOS    </span> </template>
      <template #right>  <span class="audio-format">TOTAL: ${{ store.cartTotal.toLocaleString() }}</span> </template>
    </Topbar>

    <Filtros volverTo="tienda" :filters="['sort']" sortContext="cart" />

    <div v-if="store.cart.length" class="cart-grid">

      <Card v-for="(c, index) in store.sortedCart"
        :key="c.id"
        :id="c.id" :index="index"
        :thumb="c.image" :alt="c.name" :title="c.name"
        :price="'$' + c.price.toLocaleString()"
        @click="goItem(c.id)"
      >

        <template #specs>
          <span>x{{ c.quantity }} UND</span>
          <span class="divider">|</span>
          <span>${{ (c.price * c.quantity).toLocaleString() }}</span>
        </template>

        <template #action>
          <button class="icon-btn" @click.stop="store.removeFromCart(c.id)" title="Eliminar">✕</button>
        </template>

      </Card>

    </div>

    <Footer />

  </section>
  
</template>