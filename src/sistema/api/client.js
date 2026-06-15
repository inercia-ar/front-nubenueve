const baseURL  = '' /* CAMBIAR: '/api'                          */
const cartURL  = '' /* CAMBIAR: '/api/cart'                      */
const orderURL = '' /* CAMBIAR: '/api/pedidos'                   */

/* AUTENTICACION: llamar setAuthHeaders() en main.js para inyectar tokens */

let authFn = () => ({})

export function setAuthHeaders(fn) { authFn = fn }

/* FETCH WRAPPER lo usan todos los modulos para llamadas a la api con timeout, headers json, auth y error handling */

export async function apiFetch(url, options = {}) {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), 10000)
  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...authFn(),
        ...options.headers,
      },
    })
    if (!res.ok) {
      let body
      try { body = await res.json() } catch {}
      const err = new Error(body?.message || body?.error || `HTTP ${res.status}`)
      err.status = res.status
      err.body = body
      throw err
    }
    const text = await res.text()
    return text ? JSON.parse(text) : null
  } finally {
    clearTimeout(id)
  }
}

/* NORMALIZACION */

function resolveImage(path) {

  if (!path) return ''
  if (path.startsWith('http')) return path
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

}

function unpack(data) {
  if (Array.isArray(data)) return data
  return data.data ?? data.productos ?? data.items ?? []
}

export { baseURL, cartURL, orderURL, resolveImage, unpack }