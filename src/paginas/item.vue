<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '../sistema/store.js'
import Topbar from '../componentes/topbar.vue'

const route = useRoute()
const router = useRouter()
const store = useStore()

const item = computed(() => store.getItem(route.params.id))

watch(() => store.mock.length, (len) => {
  if (len && !item.value) router.replace('/404')
}, { immediate: true })
const currentIdx = ref(0)

function prev() {
  if (!item.value) return
  currentIdx.value = (currentIdx.value - 1 + item.value.imagenes.length) % item.value.imagenes.length
}

function next() {
  if (!item.value) return
  currentIdx.value = (currentIdx.value + 1) % item.value.imagenes.length
}

function add() {
  if (!item.value) return
  store.addToCart(item.value.id)
  router.push({ name: 'carro' })
}
</script>

<template>
  <section class="detalle">
    <Topbar>
      <template #center><span class="audio-format min-hide">REF: 00{{ item?.id }}</span></template>
      <template #right><router-link :to="{ name: 'carro' }" class="audio-format">CARRO ({{ store.cartCount }})</router-link></template>
    </Topbar>

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
          <button @click="router.back()" class="text-btn">VOLVER</button>
        </div>
      </div>
    </div>

    <div v-if="!store.mock.length" class="main"></div>
  </section>
</template>
