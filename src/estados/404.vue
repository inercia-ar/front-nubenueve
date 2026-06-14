<script setup>
import { useRouter } from 'vue-router'
import Notification from '../componentes/notification.vue'

const router = useRouter()

</script>

<template>

  <Notification word1="SEÑAL" word2="PERDIDA" header="ERROR" code="404" message="Llegaste al final de la cinta">
    
    <template #action>
      <button @click="router.push({ name: 'home' })" class="text-btn">REBOBINAR</button>
    </template>

  </Notification>

</template>