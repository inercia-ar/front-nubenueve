<script setup>
import { computed } from 'vue'
import { useStore } from '../sistema/store.js'

const props = defineProps({
  volverTo: String,
  filters: { type: Array, default: () => [] },
  sortContext: { type: String, default: 'shop' },
})

const store = useStore()

const sortBy = computed({
  get: () =>      props.sortContext === 'cart' ? store.cartSortBy :         store.sortBy,
  set: v => { if (props.sortContext === 'cart')  store.cartSortBy = v; else store.sortBy = v },
})

const sortDir = computed(() => props.sortContext === 'cart' ? store.cartSortDir : store.sortDir)

const sortOptions = computed(() => {
  if (props.sortContext === 'cart') {
    return [
      { value: 'id',    label: 'FECHA'  },
      { value: 'price', label: 'PRECIO' },
    ]
  }
  return [
    { value: 'fecha',  label: 'FECHA'  },
    { value: 'precio', label: 'PRECIO' },
  ]
})

function toggleDir() {
  const next = sortDir.value === 'asc' ? 'desc' : 'asc'
  if (props.sortContext === 'cart') store.cartSortDir = next
  else store.sortDir = next
}

</script>

<template>

  <div class="filtros">

    <template v-for="f in filters" :key="f">

      <select v-if="f === 'artist'" v-model="store.artistFilter" class="text-btn">
        <option value="">TODOS LOS ARTISTAS</option>
        <option v-for="a in store.artists" :key="a" :value="a">{{ a }}</option>
      </select>

      <template v-if="f === 'sort'">

        <select v-model="sortBy" class="text-btn">
          <option v-for="opt in sortOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
        </select>

        <button class="text-btn" @click="toggleDir"> {{ sortDir === 'asc' ? '▲ ASC' : '▼ DES' }} </button>

      </template>

    </template>

    <router-link v-if="volverTo" :to="{ name: volverTo }" class="text-btn" style="margin-left: auto">VOLVER</router-link>

  </div>

</template>