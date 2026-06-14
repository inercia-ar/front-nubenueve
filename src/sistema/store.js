import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  fetchCatalog, fetchCart, hasCartApi,
  addCartItem, removeCartItem, patchCartItem, clearCartApi,
  saveCart, submitOrder as submitOrderApi,
} from './api'

export const useStore = defineStore('store', () => {

  /* ── catálogo ─────────────────────────────────────────────── */

  const mock = ref([])
  const catalogLoaded = ref(false)
  const catalogError = ref(null)

  fetchCatalog()
    .then(data => { mock.value = data.sort((a, b) => a.fecha.localeCompare(b.fecha)); catalogLoaded.value = true })
    .catch(e => { catalogError.value = e; console.log(e) })

  /* ── carrito ──────────────────────────────────────────────── */

  const cart = ref([])
  const cartLoaded = ref(false)
  const cartError = ref(null)

  fetchCart()
    .then(data => { cart.value = data; cartLoaded.value = true })
    .catch(e => { cartError.value = e; console.log(e) })

  /* ── filtros / sort ───────────────────────────────────────── */

  const artistFilter = ref('')
  const sortBy = ref('fecha')
  const sortDir = ref('asc')

  const artists = computed(() => [...new Set(mock.value.map(p => p.artista))].sort())

  const filteredList = computed(() => {
    let list = mock.value
    if (artistFilter.value) list = list.filter(p => p.artista === artistFilter.value)
    return [...list].sort((a, b) => {
      let cmp
      if (sortBy.value === 'precio') cmp = a.precio - b.precio
      else cmp = a.fecha.localeCompare(b.fecha)
      return sortDir.value === 'asc' ? cmp : -cmp
    })
  })

  const cartSortBy = ref('price')
  const cartSortDir = ref('asc')

  const sortedCart = computed(() => {
    const list = [...cart.value]
    list.sort((a, b) => {
      let cmp
      if (cartSortBy.value === 'price') cmp = a.price - b.price
      else cmp = a.id - b.id
      return cartSortDir.value === 'asc' ? cmp : -cmp
    })
    return list
  })

  const cartCount = computed(() => cart.value.reduce((s, c) => s + c.quantity, 0))
  const cartTotal = computed(() => cart.value.reduce((s, c) => s + c.quantity * c.price, 0))

  /* ── helpers ──────────────────────────────────────────────── */

  function getItem(id) { return mock.value.find(m => m.id === Number(id)) }

  function persist() {
    if (!hasCartApi) saveCart(cart.value)
  }

  /* ── acciones mutación con optimismo + rollback ───────────── */

  async function addToCart(itemId) {
    const item = getItem(itemId)
    if (!item) return
    const idx = cart.value.findIndex(c => c.id === itemId)
    const prev = JSON.parse(JSON.stringify(cart.value))
    if (idx >= 0) { cart.value[idx].quantity++ }
    else { cart.value.push({ id: itemId, quantity: 1, name: item.disco, price: item.precio, image: item.imagenes[0] }) }
    try {
      if (hasCartApi) await addCartItem(idx >= 0 ? cart.value[idx] : cart.value[cart.value.length - 1])
      else persist()
    } catch (e) {
      cart.value = prev
      console.error('addToCart failed:', e)
    }
  }

  async function removeFromCart(itemId) {
    const prev = JSON.parse(JSON.stringify(cart.value))
    cart.value = cart.value.filter(c => c.id !== itemId)
    try {
      if (hasCartApi) await removeCartItem(itemId)
      else persist()
    } catch (e) {
      cart.value = prev
      console.error('removeFromCart failed:', e)
    }
  }

  async function incrementQuantity(itemId) {
    const item = cart.value.find(c => c.id === itemId)
    if (!item) return
    const prev = JSON.parse(JSON.stringify(cart.value))
    item.quantity++
    try {
      if (hasCartApi) await patchCartItem(itemId, { quantity: item.quantity })
      else persist()
    } catch (e) {
      cart.value = prev
      console.error('incrementQuantity failed:', e)
    }
  }

  async function decrementQuantity(itemId) {
    const item = cart.value.find(c => c.id === itemId)
    if (!item) return
    if (item.quantity <= 1) { removeFromCart(itemId); return }
    const prev = JSON.parse(JSON.stringify(cart.value))
    item.quantity--
    try {
      if (hasCartApi) await patchCartItem(itemId, { quantity: item.quantity })
      else persist()
    } catch (e) {
      cart.value = prev
      console.error('decrementQuantity failed:', e)
    }
  }

  async function clearCart() {
    const prev = JSON.parse(JSON.stringify(cart.value))
    cart.value = []
    try {
      if (hasCartApi) await clearCartApi()
      else persist()
    } catch (e) {
      cart.value = prev
      console.error('clearCart failed:', e)
    }
  }

  /* ── pedido ───────────────────────────────────────────────── */

  async function submitOrder(order) {
    const res = await submitOrderApi(order)
    await clearCart()
    return res
  }

  /* ── return ───────────────────────────────────────────────── */

  return {
    mock, catalogLoaded, catalogError, cart, cartLoaded, cartError,
    cartCount, cartTotal, getItem,
    addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart, submitOrder,
    artistFilter, sortBy, sortDir, artists, filteredList,
    cartSortBy, cartSortDir, sortedCart,
  }

})
