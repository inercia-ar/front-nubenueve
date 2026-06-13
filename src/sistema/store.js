import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import catalog from './productos.json'

export const useStore = defineStore('store', () => {

  const mock = ref(catalog)

  const cart = ref([])

  const cartCount = computed(() => cart.value.reduce((s, c) => s + c.quantity, 0))
  const cartTotal = computed(() => cart.value.reduce((s, c) => s + c.quantity * c.price, 0))

  function getItem(id) {
    return mock.value.find(m => m.id === Number(id))
  }

  function addToCart(itemId) {
    const item = getItem(itemId)
    if (!item) return
    const existing = cart.value.find(c => c.id === itemId)
    if (existing) {
      existing.quantity++
    } else {
      cart.value.push({ id: itemId, quantity: 1, name: item.disco, price: item.precio, image: item.imagenes[0] })
    }
  }

  function removeFromCart(itemId) {
    cart.value = cart.value.filter(c => c.id !== itemId)
  }

  return { mock, cart, cartCount, cartTotal, getItem, addToCart, removeFromCart }

})