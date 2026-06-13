import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchCatalog, fetchCart, updateCart } from './api'

export const useStore = defineStore('store', () => {

  const mock = ref([])
  fetchCatalog().then(data => { mock.value = data.sort((a, b) => a.fecha.localeCompare(b.fecha)) })

  const cart = ref([])
  fetchCart().then(data => { cart.value = data })

  const artistFilter = ref('')
  const sortDir = ref('asc')

  const artists = computed(() => [...new Set(mock.value.map(p => p.artista))].sort())

  const filteredList = computed(() => {
    let list = mock.value
    if (artistFilter.value) list = list.filter(p => p.artista === artistFilter.value)
    return [...list].sort((a, b) => {
      return sortDir.value === 'asc' ? a.fecha.localeCompare(b.fecha) : b.fecha.localeCompare(a.fecha)
    })
  })

  const cartCount = computed(() => cart.value.reduce((s, c) => s + c.quantity, 0))
  const cartTotal = computed(() => cart.value.reduce((s, c) => s + c.quantity * c.price, 0))

  function getItem(id) { return mock.value.find(m => m.id === Number(id)) }

  function addToCart(itemId) {
    const item = getItem(itemId)
    if (!item) return
    const existing = cart.value.find(c => c.id === itemId)
    if (existing) { existing.quantity++ }
    else { cart.value.push({ id: itemId, quantity: 1, name: item.disco, price: item.precio, image: item.imagenes[0] }) }
    updateCart(cart.value)
  }

  function removeFromCart(itemId) {
    cart.value = cart.value.filter(c => c.id !== itemId)
    updateCart(cart.value)
  }

  return { mock, cart, cartCount, cartTotal, getItem, addToCart, removeFromCart, artistFilter, sortDir, artists, filteredList }

})
