<script setup>
import { useStore } from '../recursos/store.js'

const store = useStore()

const covers = (() => {
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
})()

</script>

<template>

  <section class="home">

    <header class="topbar">
      <span class="small-text">NUBE NUEVE VOL 1</span>
      <span class="small-text min-hide">ALTA FIDELIDAD · STEREO</span>
      <router-link :to="{ name: 'carro' }">CARRO ({{ store.cartCount }})</router-link>
    </header>

    <div class="title">
      <div class="emblem-icon">
        <div class="emblem-dot" v-for="n in 12" :key="n" :style="{ transform: `rotate(${n * 30}deg) translateY(-14px)` }"></div>
      </div>

      <h1 class="headline">
        <span class="line accent">nubenueve</span>
        <span class="line">musica tangible</span>
      </h1>
    </div>

    <div class="swatch"></div>

    <div class="botbar">
      <div class="small-text">VINILOS 33 1/3 · CINTAS DE CASETTE · CDs · ALTA PRECISIÓN</div>
      <router-link :to="{ name: 'tienda' }" class="btn">EXPLORAR ARCHIVO</router-link>
    </div>

    <div class="covers" aria-hidden="true">
      <img v-for="(cover, i) in covers" :key="i" :src="cover.src" :style="{ transform: `translate(-50%, -50%) rotate(${cover.rotation}deg) scale(${cover.scale})`, animationDelay: cover.delay }" alt="">
    </div>

  </section>
</template>