<script setup>
import { useRouter } from 'vue-router'
import Notification from '../componentes/notification.vue'

const router = useRouter()
</script>

<template>

  <Notification
    word1="PEDIDO"
    word2="CONFIRMADO"
    header="EXITO"
    code="200"
    message="Tu pedido fue registrado correctamente"
  >
    <template #action>
      <button @click="router.push({ name: 'tienda' })" class="text-btn">VOLVER A TIENDA</button>
    </template>
  </Notification>

</template>
