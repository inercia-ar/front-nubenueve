/* -------------------------------------------------------------------
   API CLIENT — configuración compartida y fetch wrapper
   ===================================================================

   ╔══════════════════════════════════════════════════════════════════╗
   ║  CÓMO CONECTAR AL BACKEND  (hacé estas 4 cosas y listo)        ║
   ╚══════════════════════════════════════════════════════════════════╝

   1. PONER LAS URLS (abajo)
      ───────────────────────
      Si tu backend corre en http://localhost:8000/api, cambiá:
        baseURL  → '/api'          (catálogo de productos)
        cartURL  → '/api/cart'     (carrito de compras)
        orderURL → '/api/pedidos'  (crear pedido)

      Si una URL queda vacía, esa funcionalidad usa datos mock
      (archivo local + localStorage) y no toca el backend.

      Podés setear solo algunas:
        baseURL = '/api'   → catálogo real, carrito y pedidos mock
        cartURL = '/api/cart' → carrito real (baseURL puede estar vacía)


   2. AUTENTICACIÓN (si hace falta)
      ──────────────────────────────
      En src/sistema/main.js agregá:

        import { setAuthHeaders } from './api'
        setAuthHeaders(() => {
          const token = localStorage.getItem('token')
          return token ? { Authorization: `Bearer ${token}` } : {}
        })

      Eso aplica el header a TODAS las llamadas al backend.


   3. IMÁGENES (si usan CDN)
      ───────────────────────
      Buscá la función resolveImage() más abajo en este archivo.
      Ahí podés transformar las rutas de imágenes, ej:
        return `https://cdn.example.com${path}`


   4. FORMA DEL PEDIDO (si no coincide con tu backend)
      ─────────────────────────────────────────────────
      En api/pedidos.js está la función normalizeOrder().
      Ahí podés mapear la forma que envía el frontend a la que
      espera tu API. Ya tiene un ejemplo comentado.

   ─── ESO ES TODO ───

   El frontend espera estos endpoints REST:

     GET    /api/productos         → lista de productos
     GET    /api/productos/:id     → un producto
     GET    /api/cart              → carrito del usuario
     POST   /api/cart/items        → agregar item al carrito
     PATCH  /api/cart/items/:id    → cambiar cantidad
     DELETE /api/cart/items/:id    → sacar item del carrito
     DELETE /api/cart              → vaciar carrito
     POST   /api/pedidos           → crear pedido

   Para más detalles sobre la forma de cada objeto, abrí:
     api/productos.js  → normalizeProduct()
     api/cart.js       → normalizeCartItem()
     api/pedidos.js    → normalizeOrder()

   ------------------------------------------------------------------- */

const baseURL  = '' /* CAMBIAR: '/api'                          */
const cartURL  = '' /* CAMBIAR: '/api/cart'                      */
const orderURL = '' /* CAMBIAR: '/api/pedidos'                   */

/* AUTENTICACIÓN -------------------------------------------------
   BACKEND: llamar setAuthHeaders() en main.js para inyectar tokens.
   ------------------------------------------------------------------- */

let authFn = () => ({})

export function setAuthHeaders(fn) { authFn = fn }

/* FETCH WRAPPER ------------------------------------------------
   Usado por todos los módulos para llamadas a la API real.
   - Timeout automático (10s)
   - Headers JSON por defecto + auth
   - Error con status y body estructurado
   ------------------------------------------------------------- */

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

/* NORMALIZACIÓN COMPARTIDA ------------------------------------ */

function resolveImage(path) {

  /* BACKEND: sobreescribir para transformar rutas de imágenes
     Ejemplo:
       if (!path) return ''
       if (path.startsWith('http')) return path
       return `https://cdn.example.com${path}`
  */

  return path

}

function unpack(data) {
  if (Array.isArray(data)) return data
  return data.data ?? data.productos ?? data.items ?? []
}

export { baseURL, cartURL, orderURL, resolveImage, unpack }
