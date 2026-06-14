<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../sistema/store.js'
import { submitOrder } from '../sistema/api.js'

const props = defineProps({
  visible: Boolean,
})

const emit = defineEmits(['close'])

const router = useRouter()
const store = useStore()

const nombre = ref('')
const email = ref('')
const direccion = ref('')
const ciudad = ref('')
const cp = ref('')
const telefono = ref('')
const metodo = ref('mercadopago')

const errors = ref({})

function validate() {
  const e = {}
  if (!nombre.value.trim()) e.nombre = 'Requerido'
  if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) e.email = 'Email inválido'
  if (!direccion.value.trim()) e.direccion = 'Requerido'
  if (!ciudad.value.trim()) e.ciudad = 'Requerido'
  if (!cp.value.trim() || !/^\d{4,10}$/.test(cp.value)) e.cp = 'Código postal inválido'
  if (!telefono.value.trim() || !/^\+?\d{7,15}$/.test(telefono.value.replace(/\s/g, ''))) e.telefono = 'Teléfono inválido'
  errors.value = e
  return Object.keys(e).length === 0
}

function clearForm() {
  nombre.value = ''
  email.value = ''
  direccion.value = ''
  ciudad.value = ''
  cp.value = ''
  telefono.value = ''
  metodo.value = 'mercadopago'
  errors.value = {}
}

async function handleSubmit() {
  if (!validate()) return
  const order = {
    items: store.cart,
    cliente: {
      nombre: nombre.value.trim(),
      email: email.value.trim(),
      direccion: direccion.value.trim(),
      ciudad: ciudad.value.trim(),
      cp: cp.value.trim(),
      telefono: telefono.value.trim(),
    },
    metodo: metodo.value,
    total: store.cartTotal,
  }
  await submitOrder(order)
  store.clearCart()
  clearForm()
  emit('close')
  router.push({ name: 'confirmado' })
}

</script>

<template>

  <div v-if="visible" class="checkout-overlay" @click.self="$emit('close')">

    <div class="checkout-panel">

      <button class="icon-btn checkout-close" @click="$emit('close')">✕</button>

      <h2 class="checkout-title">FINALIZAR COMPRA</h2>

      <form class="checkout-form" @submit.prevent="handleSubmit">

        <label class="checkout-field">
          <span class="checkout-label">NOMBRE</span>
          <input v-model="nombre" class="checkout-input" :class="{ 'input--err': errors.nombre }" />
          <span v-if="errors.nombre" class="checkout-err">{{ errors.nombre }}</span>
        </label>

        <label class="checkout-field">
          <span class="checkout-label">EMAIL</span>
          <input v-model="email" type="email" class="checkout-input" :class="{ 'input--err': errors.email }" />
          <span v-if="errors.email" class="checkout-err">{{ errors.email }}</span>
        </label>

        <label class="checkout-field">
          <span class="checkout-label">DIRECCIÓN</span>
          <input v-model="direccion" class="checkout-input" :class="{ 'input--err': errors.direccion }" />
          <span v-if="errors.direccion" class="checkout-err">{{ errors.direccion }}</span>
        </label>

        <label class="checkout-field">
          <span class="checkout-label">CIUDAD</span>
          <input v-model="ciudad" class="checkout-input" :class="{ 'input--err': errors.ciudad }" />
          <span v-if="errors.ciudad" class="checkout-err">{{ errors.ciudad }}</span>
        </label>

        <label class="checkout-field">
          <span class="checkout-label">CÓDIGO POSTAL</span>
          <input v-model="cp" class="checkout-input" :class="{ 'input--err': errors.cp }" />
          <span v-if="errors.cp" class="checkout-err">{{ errors.cp }}</span>
        </label>

        <label class="checkout-field">
          <span class="checkout-label">TELÉFONO</span>
          <input v-model="telefono" type="tel" class="checkout-input" :class="{ 'input--err': errors.telefono }" />
          <span v-if="errors.telefono" class="checkout-err">{{ errors.telefono }}</span>
        </label>

        <label class="checkout-field">
          <span class="checkout-label">MÉTODO DE PAGO</span>
          <select v-model="metodo" class="checkout-input text-btn">
            <option value="mercadopago">MERCADO PAGO</option>
            <option value="transferencia">TRANSFERENCIA BANCARIA</option>
          </select>
        </label>

        <button type="submit" class="text-btn checkout-submit">CONFIRMAR PEDIDO</button>

      </form>

    </div>

  </div>

</template>
