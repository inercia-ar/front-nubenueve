<script setup>
import { ref, onMounted } from 'vue'

defineOptions({ inheritAttrs: false })

const props = defineProps({
  src: String,
  alt: { type: String, default: '' },
})

const el = ref(null)
const loaded = ref(!!props.src && typeof window !== 'undefined' && 'IntersectionObserver' in window === false)

onMounted(() => {
  if (loaded.value || !el.value) return
  const obs = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { loaded.value = true; obs.disconnect() }
  }, { rootMargin: '200px' })
  obs.observe(el.value)
})
</script>

<template>
  <img ref="el" :src="loaded ? src : undefined" :alt="alt" v-bind="$attrs">
</template>
