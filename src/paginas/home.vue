<script setup>
import { computed } from 'vue'
import { useStore } from '../sistema/store.js'

const store = useStore()

const covers = computed(() => {
  const seen = new Set()
  const items = store.mock.filter(item => {
    if (seen.has(item.disco)) return false
    seen.add(item.disco)
    return true
  })
  return items.map((item, i) => ({
    src: item.imagenes[1],
    rotation: Math.floor(Math.random() * 14) - 7,
    scale: +(1.0 + Math.random() * 0.25).toFixed(2),
    delay: `-${6 * i}s`
  }))
})

</script>

<template>

  <section class="home">

    <header class="topbar">
      <router-link :to="{ name: 'home' }">NUBE NUEVE VOL 1</router-link>
      <span class="text-small-centered min-hide">ALTA FIDELIDAD · STEREO</span>
      <router-link :to="{ name: 'carro' }">CARRO ({{ store.cartCount }})</router-link>
    </header>

    <div class="hero">
      <img src="/assets/emblem.png" class="emblem-icon" alt="" draggable="false">
      <h1 class="headline">
        <span class="line accent">nubenueve</span>
        <span class="line">musica tangible</span>
      </h1>
    </div>

    <div class="swatch"></div>

    <div class="botbar">
      <div class="text-small-centered">VINILOS 33 1/3 · CINTAS DE CASETTE · CDs · ALTA PRECISIÓN</div>
      <router-link :to="{ name: 'tienda' }" class="text-btn">EXPLORAR ARCHIVO</router-link>
    </div>

    <div class="covers" aria-hidden="true">
      <img v-for="(cover, i) in covers" :key="i" :src="cover.src" :style="{ transform: `translate(-50%, -50%) rotate(${cover.rotation}deg) scale(${cover.scale})`, animationDelay: cover.delay }" alt="">
    </div>

  </section>
</template>