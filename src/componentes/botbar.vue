<script setup>
defineProps({ visualizador: Boolean })
defineEmits(['toggle-visualizador'])
</script>

<template>

  <div class="botbar">
    <div class="text-small-centered"><span class="min-hide">VINILOS 33 1/3 · CINTAS DE CASETTE · CDs · </span>ALTA PRECISIÓN</div>
    <div class="botbar-actions">
      <button class="toggle-btn" :class="{ 'toggle-btn--on': visualizador }" @click="$emit('toggle-visualizador')">PORTADAS</button>
      <router-link :to="{ name: 'tienda' }" class="text-btn">TIENDA</router-link>
    </div>
  </div>
  
</template>