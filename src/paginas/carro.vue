<script setup>
import { useRouter } from 'vue-router'
import { useStore } from '../sistema/store.js'

const router = useRouter()
const store = useStore()

function goItem(id) {
  router.push({ name: 'item', params: { id } })
}
</script>

<template>
  <section class="carro">
    <header class="topbar">
      <span class="text-small-centered">NUBE NUEVE VOL 1</span>
      <span class="audio-format min-hide">{{ store.cart.length }} ARTÍCULOS</span>
      <span class="audio-format">TOTAL: ${{ store.cartTotal.toLocaleString() }}</span>
    </header>

    <div v-if="store.cart.length" class="cart-grid">
      <article
        v-for="(c, index) in store.cart"
        :key="c.id"
        class="card"
        :class="`card--${index % 4}`"
        @click="goItem(c.id)"
      >
        <img class="thumb" :src="c.image" :alt="c.name" loading="lazy">

        <div class="content">
          <div class="label">
            <span class="tag ">IDX-00{{ c.id }}</span>
          </div>

          <div class="core">
            <h3>{{ c.name }}</h3>
            <div class="tag">
              <span>x{{ c.quantity }} UND</span>
              <span class="divider">|</span>
              <span>${{ (c.price * c.quantity).toLocaleString() }}</span>
            </div>
          </div>

          <div class="actions">
            <div class="price">${{ c.price.toLocaleString() }}</div>
            <button class="icon-btn" @click.stop="store.removeFromCart(c.id)" title="Eliminar">✕</button>
          </div>
        </div>
      </article>
    </div>

    <div class="nav">
      <router-link :to="{ name: 'tienda' }" class="text-btn">VOLVER</router-link>
    </div>
  </section>
</template>
