<script setup>
defineProps({ visualizador: Boolean })
defineEmits(['toggle-visualizador'])
</script>

<template>

  <div class="botbar">
    <div class="text-small-centered">VINILOS 33 1/3 · CINTAS DE CASETTE · CDs · ALTA PRECISIÓN</div>
    <div class="botbar-actions">
      <button class="toggle-btn" :class="{ 'toggle-btn--on': visualizador }" @click="$emit('toggle-visualizador')">VISUALIZADOR DE PORTADAS</button>
      <router-link :to="{ name: 'tienda' }" class="text-btn">EXPLORAR ARCHIVO</router-link>
    </div>
  </div>
  
</template>