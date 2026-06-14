╔══════════════════════════════════════════════════════════════════╗
║  CÓMO CONECTAR AL BACKEND  (hacé estas 4 cosas y listo)          ║
╚══════════════════════════════════════════════════════════════════╝

1. PONER LAS URLS (abajo)

    Si el backend corre en http://localhost:8000/api, cambiá:

    baseURL  → '/api'          (catálogo de productos)
    cartURL  → '/api/cart'     (carrito de compras)
    orderURL → '/api/pedidos'  (crear pedido)

    Si una URL queda vacía, esa funcionalidad usa datos mock
    (archivo local + localStorage) y no toca el backend.

    Podés setear solo algunas:
    baseURL = '/api'   → catálogo real, carrito y pedidos mock
    cartURL = '/api/cart' → carrito real (baseURL puede estar vacía)


2. AUTENTICACIÓN (si hace falta)

    En src/sistema/main.js agregá:

    import { setAuthHeaders } from './api'
    setAuthHeaders(() => {
        const token = localStorage.getItem('token')
        return token ? { Authorization: `Bearer ${token}` } : {}
    })

    Eso aplica el header a TODAS las llamadas al backend.


3. IMÁGENES (si usan CDN)

    Buscá la función resolveImage() más abajo en este archivo.
    Ahí podés transformar las rutas de imágenes, ej:
    return `https://cdn.example.com${path}`


4. FORMA DEL PEDIDO (si no coincide con tu backend)

    En api/pedidos.js está la función normalizeOrder().
    Ahí podés mapear la forma que envía el frontend a la que
    espera tu API. Ya tiene un ejemplo comentado.

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