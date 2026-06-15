<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../sistema/store.js'
import Topbar from '../componentes/topbar.vue'
import Botbar from '../componentes/botbar.vue'
import LazyImg from '../componentes/lazy-img.vue'

const router = useRouter()
const store = useStore()
const visualizador = ref(false)
const shuffleQueue = ref([])
const queuePos = ref(0)

const covers = computed(() => {

  const seen = new Set()

  const items = store.mock.filter(item => {
    if (seen.has(item.disco)) return false
    seen.add(item.disco)
    return true
  })

  return items.map((item, i) => {
    const vinyl = store.mock.find(m => m.disco === item.disco && m.formato === 'vinilo')
    return {
      src: item.imagenes[1],
      vinylId: vinyl?.id ?? item.id,
      rotation: Math.floor(Math.random() * 14) - 7,
      scale: +(1.0 + Math.random() * 0.25).toFixed(2),
      delay: `-${6 * i}s`
    }
  })

})

function shuffleArray(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function resetQueue() {
  shuffleQueue.value = shuffleArray(covers.value.map((_, i) => i))
  queuePos.value = 0
}

function toggleVisualizador() {
  visualizador.value = !visualizador.value
  if (visualizador.value && covers.value.length) {
    resetQueue()
  }
}

function goToVinyl() {
  if (!shuffleQueue.value.length) return
  const idx = shuffleQueue.value[queuePos.value]
  router.push({ name: 'item', params: { id: covers.value[idx].vinylId } })
}

function prevCover() {
  if (queuePos.value > 0) queuePos.value--
}

function nextCover() {
  if (queuePos.value >= shuffleQueue.value.length - 1) resetQueue()
  else queuePos.value++
}

function onKeydown(e) {
  if (!visualizador.value) return
  if (e.key === 'Escape') { e.preventDefault(); toggleVisualizador(); return }
  if (e.key === 'ArrowLeft') { e.preventDefault(); prevCover() }
  if (e.key === 'ArrowRight') { e.preventDefault(); nextCover() }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))

</script>

<template>

  <section class="home" :class="{ 'home--visualizador': visualizador }">

    <Topbar>
      <template #center><span class="text-small-centered min-hide">ALTA FIDELIDAD · STEREO</span></template>
      <template #right><router-link :to="{ name: 'carro' }">CARRO ({{ store.cartCount }})</router-link></template>
    </Topbar>

    <div v-if="!visualizador" class="hero">
      <img src="/assets/emblem.webp" class="emblem-icon" alt="" draggable="false">
      <h1 class="headline">
        <span class="line accent">nubenueve</span>
        <span class="line">musica tangible</span>
      </h1>
    </div>

    <div v-else class="visualizador-view" @click="toggleVisualizador">
      <button class="arrow arrow--prev" @click.stop="prevCover">‹</button>
      <LazyImg :src="covers[shuffleQueue[queuePos]].src" class="visualizador-cover" alt="" @click.stop="goToVinyl" />
      <button class="arrow arrow--next" @click.stop="nextCover">›</button>
    </div>

    <div class="swatch"></div>

    <Botbar :visualizador="visualizador" @toggle-visualizador="toggleVisualizador" />

    <div class="covers" aria-hidden="true">
      <LazyImg v-for="(cover, i) in covers" :key="i" :src="cover.src" :style="{ transform: `translate(-50%, -50%) rotate(${cover.rotation}deg) scale(${cover.scale})`, animationDelay: cover.delay }" alt="" />
    </div>

  </section>
  
</template>