<script setup>
defineProps({
  id: [Number, String],
  index: Number,
  thumb: String,
  alt: String,
  title: String,
  price: String,
  long: Boolean,
})

defineEmits(['click'])
</script>

<template>
  <article class="card" :class="[`card--${index % 4}`, { 'card--long': long }]" @click="$emit('click')">
    <img class="thumb" :src="thumb" :alt="alt" loading="lazy">

    <div class="content">
      <div class="label">
        <span class="tag">IDX-00{{ id }}</span>
      </div>

      <div class="core">
        <h3>{{ title }}</h3>
        <div class="tag">
          <slot name="specs" />
        </div>
      </div>

      <div class="actions">
        <div class="price">{{ price }}</div>
        <slot name="action" />
      </div>
    </div>
  </article>
</template>
