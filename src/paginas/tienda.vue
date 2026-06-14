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
  <section class="shop">
    <header class="topbar">
      <router-link :to="{ name: 'home' }">NUBE NUEVE VOL 1</router-link>
      <span class="audio-format min-hide">LOTE: {{ store.mock.length }} UNIDADES</span>
      <router-link :to="{ name: 'carro' }" class="audio-format">CARRO ({{ store.cartCount }})</router-link>
    </header>

    <div class="filtros">
      <select v-model="store.artistFilter" class="text-btn">
        <option value="">TODOS LOS ARTISTAS</option>
        <option v-for="a in store.artists" :key="a" :value="a">{{ a }}</option>
      </select>

      <button class="text-btn" @click="store.sortDir = store.sortDir === 'asc' ? 'desc' : 'asc'">
        {{ store.sortDir === 'asc' ? '▲ ASC' : '▼ DES' }}
      </button>

      <router-link :to="{ name: 'home' }" class="text-btn" style="margin-left: auto">VOLVER</router-link>
    </div>

    <div class="shop-grid">
      <article 
        v-for="(item, index) in store.filteredList" 
        :key="item.id" 
        class="card" 
        :class="[`card--${index % 4}`, { 'card--long': item.formato === 'box' || item.formato === 'cinta' }]"
        @click="goItem(item.id)"
      >
        <img class="thumb" :src="item.imagenes[0]" :alt="item.disco" loading="lazy">

        <div class="content">
          <div class="label">
            <span class="tag">IDX-00{{ item.id }}</span>
          </div>

          <div class="core">
            <h3>{{ item.disco }}</h3>
            <div class="tag">
              <span>{{ item.formato.toUpperCase() }}</span>
              <span class="divider">|</span>
              <span>STOCK {{ item.stock }}</span>
            </div>
          </div>

          <div class="actions">
            <div class="price">${{ item.precio }}</div>
            <button class="icon-btn" title="Añadir al carrito" @click.stop="store.addToCart(item.id)">+</button>
          </div>
        </div>

      </article>

    </div>

    <div class="footer">
      <span class="text-small-centered">REALIZADO POR <a href="https://octantes.github.io" target="_blank" rel="noopener noreferrer">INERCIA.AR</a></span>
    </div>
    
  </section>
</template>
