<script setup>
import { useRouter } from 'vue-router'
import { useStore } from '../recursos/store.js'
const router = useRouter()
const store = useStore()

function goItem(id) {
  router.push({ name: 'item', params: { id } })
}
</script>

<template>
  <section class="shop">
    <header class="topbar">
      <span class="small-text">NUBE NUEVE VOL 1</span>
      <span class="audio-format min-hide">LOTE: {{ store.mock.length }} UNIDADES</span>
      <router-link :to="{ name: 'carro' }" class="audio-format">CARRO ({{ store.cartCount }})</router-link>
    </header>

    <div class="grid">
      <article 
        v-for="(item, index) in store.mock" 
        :key="item.id" 
        class="card" 
        :class="[`card--${index % 4}`, { 'card--long': item.formato === 'box' || item.formato === 'cinta' }]"
        @click="goItem(item.id)"
      >
        <img class="image" :src="item.imagenes[0]" :alt="item.disco" loading="lazy">

        <div class="content">
          <div class="head">
            <span class="tag">IDX-00{{ item.id }}</span>
          </div>

          <div class="body">
            <h3>{{ item.disco }}</h3>
            <div class="tag">
              <span>{{ item.formato.toUpperCase() }}</span>
              <span class="divider">|</span>
              <span>STOCK {{ item.stock }}</span>
            </div>
          </div>

          <div class="foot">
            <div class="price">${{ item.precio }}</div>
            <button class="btn-icon" title="Añadir al carrito" @click.stop="store.addToCart(item.id)">+</button>
          </div>
        </div>
      </article>
      
      <article class="card is-empty">
        <div class="content">
          <div class="head">
            <span class="tag">VACÍO</span>
          </div>
          <div class="body">
            <h3>NO DATA</h3>
          </div>
          <div class="foot"></div>
        </div>
      </article>
    </div>

    <div class="foot">
      <router-link :to="{ name: 'home' }" class="btn">VOLVER</router-link>
    </div>
  </section>
</template>