<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import Notification from '../componentes/notification.vue'

const router = useRouter()

function readOrder() {
  return router.currentRoute.value?.state?.data || JSON.parse(sessionStorage.getItem('lastOrder') || 'null') || {}
}

const data = computed(readOrder)

const message = computed(() => data.value?.message || 'Tu pedido fue registrado correctamente')

function goBack() {
  sessionStorage.removeItem('lastOrder')
  router.push({ name: 'tienda' })
}

</script>

<template>

  <Notification word1="PEDIDO" word2="CONFIRMADO" header="EXITO" code="200" :message="message">
    
    <template #action>
      <button @click="goBack" class="text-btn">REBOBINAR</button>
    </template>

  </Notification>

</template>
