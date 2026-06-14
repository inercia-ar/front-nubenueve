<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../sistema/store.js'
import Topbar from '../componentes/topbar.vue'
import Filtros from '../componentes/filtros.vue'
import Card from '../componentes/card.vue'
import Footer from '../componentes/footer.vue'
import Checkout from '../componentes/checkout.vue'

const router = useRouter()
const store = useStore()

const showCheckout = ref(false)

function goItem(id) { router.push({ name: 'item', params: { id } }) }

</script>

<template>

  <section class="carro">

    <Topbar>
      <template #center> <span class="audio-format min-hide">{{ store.cart.length }} ARTÍCULOS    </span> </template>
      <template #right>  <span class="audio-format">TOTAL: ${{ store.cartTotal.toLocaleString() }}</span> </template>
    </Topbar>

    <Filtros volverTo="tienda" :filters="['sort']" sortContext="cart">
      <template #right>
        <button v-if="store.cart.length" class="text-btn" @click="showCheckout = true" style="margin-left: 0.75rem">COMPRAR</button>
      </template>
    </Filtros>

    <Checkout :visible="showCheckout" @close="showCheckout = false" />

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
          <button class="icon-btn" @click.stop="store.incrementQuantity(c.id)" title="Agregar">↑</button>
          <button class="icon-btn" @click.stop="store.decrementQuantity(c.id)" title="Quitar">↓</button>
          <button class="icon-btn" @click.stop="store.removeFromCart(c.id)" title="Eliminar">✕</button>
        </template>

      </Card>

    </div>

    <Footer />

  </section>
  
</template>