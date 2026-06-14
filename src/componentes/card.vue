<script setup>
import LazyImg from './lazy-img.vue'

defineProps({
  id: [Number, String],
  index: Number,
  thumb: String,
  alt: String,
  title: String,
  price: String,
})

defineEmits(['click'])

</script>

<template>

  <article class="card" :class="`card--${index % 4}`" @click="$emit('click')">

    <LazyImg class="thumb" :src="thumb" :alt="alt" />

    <div class="content">

      <div class="card-body">

        <div class="label"> <span class="tag">IDX-00{{ id }}</span> </div>

        <div class="core">
          <h3>{{ title }}</h3>
          <div class="tag"> <slot name="specs" /> </div>
        </div>

        <div v-if="price" class="price">{{ price }}</div>
        <div class="actions"> <slot name="action" /> </div>

      </div>

    </div>

  </article>

</template>