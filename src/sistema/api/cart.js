import { cartURL, apiFetch, resolveImage, unpack } from './client'

export const hasCartApi = !!cartURL

function normalizeCartItem(raw) {

  return {

    id:       raw.id ?? 0,
    quantity: raw.quantity ?? raw.qty ?? 1,
    name:     raw.name     ?? raw.title ?? 'Untitled',
    price:    raw.price    ?? raw.precio ?? 0,
    image:    resolveImage(raw.image ?? raw.imagen ?? raw.images?.[0] ?? ''),

  }

}

/* FETCH -------------------------------------------------------- */

export async function fetchCart() {

  if (cartURL) {
    return unpack(await apiFetch(cartURL)).map(normalizeCartItem)
  }

  const stored = localStorage.getItem('cart')
  return stored ? JSON.parse(stored) : []

}

/* LOCALSTORAGE (solo cuando cartURL está vacío) ---------------- */

export function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart))
}

/* ENDPOINTS CONVENCIONALES (solo cuando cartURL está seteado) -- */

export async function addCartItem(item) {
  return apiFetch(`${cartURL}/items`, { method: 'POST', body: JSON.stringify(item) })
}

export async function removeCartItem(itemId) {
  return apiFetch(`${cartURL}/items/${itemId}`, { method: 'DELETE' })
}

export async function patchCartItem(itemId, changes) {
  return apiFetch(`${cartURL}/items/${itemId}`, { method: 'PATCH', body: JSON.stringify(changes) })
}

export async function clearCartApi() {
  await apiFetch(cartURL, { method: 'DELETE' })
}
