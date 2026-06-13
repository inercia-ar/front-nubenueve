const baseURL = '' /* CAMBIAR BASEURL A API BACKEND HACE OVERRIDE A LA MOCK API  ('/api')      */
const cartURL = '' /* CAMBIAR CARTURL A API BACKEND HACE OVERRIDE A LOCALSTORAGE ('/api/cart') */

/* FORMA NORMALIZADA QUE ESPERA EL FRONTEND -------------------

   Producto: {
     id: number          // ID único del producto
     artista: string     // nombre del artista
     disco: string       // título del álbum
     formato: string     // clave: 'cd' | 'vinilo' | 'cinta' | 'box'
     fecha: string       // lanzamiento, formato decidido en backend
     precio: number      // precio en pesos
     stock: number       // unidades disponibles
     descripcion: string // descripción del producto
     imagenes: string[]  // [0] = foto producto, [1] = tapa raw
   }

   ItemCarro: {
     id: number
     quantity: number
     name: string        // disco
     price: number       // precio
     image: string       // imagenes[0]
   }

*/


function normalizeProduct(raw) {
  return {
    id:          raw.id,
    artista:     raw.artista     ?? raw.artist?.name ?? 'Unknown',
    disco:       raw.disco       ?? raw.title        ?? 'Untitled',
    formato:     raw.formato     ?? raw.format?.key  ?? 'cd',
    fecha:       raw.fecha       ?? raw.releaseDate  ?? '',
    precio:      raw.precio      ?? raw.price        ?? 0,
    stock:       raw.stock       ?? raw.stock        ?? 0,
    descripcion: raw.descripcion ?? raw.description  ?? '',
    imagenes:    raw.imagenes    ?? raw.images       ?? []
  }
}

function unpack(data) {
  if (Array.isArray(data)) return data
  return data.data ?? data.productos ?? []
}

export async function fetchCatalog() {
  const url = baseURL ? `${baseURL}/productos` : '/productos.json'
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to load catalog')
  return unpack(await res.json()).map(normalizeProduct)
}

export async function fetchItem(id) {
  if (baseURL) {
    const res = await fetch(`${baseURL}/productos/${id}`)
    if (!res.ok) throw new Error('Failed to load product')
    return normalizeProduct(await res.json())
  }
  const all = await fetchCatalog()
  return all.find(i => i.id === Number(id)) ?? null
}

export async function fetchCart() {
  if (cartURL) {
    const res = await fetch(cartURL)
    if (!res.ok) throw new Error('Failed to load cart')
    return res.json()
  }
  const stored = localStorage.getItem('cart')
  return stored ? JSON.parse(stored) : []
}

export async function updateCart(cart) {
  if (cartURL) {
    const res = await fetch(cartURL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cart)
    })
    if (!res.ok) throw new Error('Failed to save cart')
    return res.json()
  }
  localStorage.setItem('cart', JSON.stringify(cart))
}