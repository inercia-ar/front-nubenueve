<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const showTop = ref(false)

function onScroll() {
  showTop.value = window.scrollY > 400 || document.documentElement.scrollTop > 400
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function check() {
  showTop.value = document.documentElement.scrollHeight > document.documentElement.clientHeight + 2
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  check()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div class="noise">
    <router-view></router-view>
    <button class="icon-btn top-btn" v-show="showTop" @click="scrollToTop" title="Volver arriba">↑</button>
  </div>
</template>
