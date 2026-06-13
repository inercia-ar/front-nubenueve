<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '../sistema/store.js'

const route = useRoute()
const router = useRouter()
const store = useStore()

const item = store.getItem(route.params.id)
const currentIdx = ref(0)

function prev() {
  if (!item) return
  currentIdx.value = (currentIdx.value - 1 + item.imagenes.length) % item.imagenes.length
}

function next() {
  if (!item) return
  currentIdx.value = (currentIdx.value + 1) % item.imagenes.length
}

function add() {
  if (!item) return
  store.addToCart(item.id)
  router.push({ name: 'carro' })
}
</script>

<template>
  <section class="detalle">
    <header class="topbar">
      <span class="text-small-centered">NUBE NUEVE VOL 1</span>
      <span class="audio-format min-hide">REF: 00{{ item?.id }}</span>
      <router-link :to="{ name: 'carro' }" class="audio-format">CARRO ({{ store.cartCount }})</router-link>
    </header>

    <div v-if="item" class="main">
      <div class="media">
        <div class="gallery">
          <img class="shot" :src="item.imagenes[currentIdx]" :alt="item.disco" :key="currentIdx">
          <button class="arrow arrow--prev" @click="prev">‹</button>
          <button class="arrow arrow--next" @click="next">›</button>
          <div v-if="item.imagenes.length > 1" class="dots">
            <span
              v-for="(_, i) in item.imagenes"
              :key="i"
              class="dot"
              :class="{ 'dot--on': i === currentIdx }"
              @click="currentIdx = i"
            ></span>
          </div>
        </div>
      </div>

      <div class="info">
        <h1 class="titulo">{{ item.disco }}</h1>
        <div class="meta">{{ item.artista }} · {{ item.formato.toUpperCase() }} · {{ item.fecha }}</div>
        <p class="desc serif-i">{{ item.descripcion }}</p>
        <div class="precio">${{ item.precio.toLocaleString() }}</div>
        <div class="stock">STOCK: {{ item.stock }} UNIDADES</div>

        <div class="btn-row">
          <button class="text-btn" @click="add">AÑADIR AL CARRO</button>
          <router-link :to="{ name: 'tienda' }" class="text-btn">VOLVER</router-link>
        </div>
      </div>
    </div>

    <div v-else class="main">
      <p class="serif-i">Artículo no encontrado</p>
    </div>
  </section>
</template>
