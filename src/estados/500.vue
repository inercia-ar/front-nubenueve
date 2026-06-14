<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import Notification from '../componentes/notification.vue'

const router = useRouter()

function readOrder() {
  return router.currentRoute.value?.state?.data || JSON.parse(sessionStorage.getItem('lastOrder') || 'null') || {}
}

const data = computed(readOrder)

const message = computed(() => data.value?.message || 'No se pudo procesar el pedido')

function goBack() {
  sessionStorage.removeItem('lastOrder')
  router.back()
}

</script>

<template>

  <Notification word1="PEDIDO" word2="FALLIDO" header="ERROR" code="500" :message="message">

    <template #action>
      <button @click="goBack" class="text-btn">REBOBINAR</button>
    </template>

  </Notification>

</template>
