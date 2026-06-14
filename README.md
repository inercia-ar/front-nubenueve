# Cómo Conectar al Backend
*(Hacé estas 4 cosas y listo)*

---

## 1. Configurar las URLs

Si el backend corre en `http://localhost:8000/api`, modificá las siguientes variables:

| Variable | Endpoint Sugerido | Funcionalidad |
| :--- | :--- | :--- |
| `baseURL` | `'/api'` | Catálogo de productos |
| `cartURL` | `'/api/cart'` | Carrito de compras |
| `orderURL` | `'/api/pedidos'` | Crear pedido |

> **Nota sobre Datos Mock:**
> Si una URL queda vacía, esa funcionalidad usa datos mock (archivo local + `localStorage`) y no toca el backend. Podés setear solo algunas. Por ejemplo: si usás `baseURL = '/api'`, tendrás el catálogo real, pero el carrito y los pedidos seguirán siendo mock. También podés tener solo `cartURL = '/api/cart'` y dejar `baseURL` vacía.

## 2. Autenticación *(si hace falta)*

En el archivo `src/sistema/main.js` agregá el siguiente código:

```javascript
import { setAuthHeaders } from './api'

setAuthHeaders(() => {
    const token = localStorage.getItem('token')
    return token ? { Authorization: `Bearer ${token}` } : {}
})
```
*Esto aplica el header a **TODAS** las llamadas al backend.*

## 3. Imágenes *(si usan CDN)*

Buscá la función `resolveImage()` más abajo en este archivo. Ahí podés transformar las rutas de imágenes. 

**Ejemplo:**
```javascript
return `https://cdn.example.com${path}`
```

## 4. Forma del Pedido *(si no coincide con tu backend)*

En `api/pedidos.js` está la función `normalizeOrder()`. Ahí podés mapear la estructura de datos que envía el frontend a la que espera recibir tu API. *(El archivo ya incluye un ejemplo comentado).*

---

## Referencia de Endpoints REST

El frontend espera conectarse a estos endpoints:

| Método | Endpoint | Acción |
| :--- | :--- | :--- |
| **GET** | `/api/productos` | Obtener lista de productos |
| **GET** | `/api/productos/:id` | Obtener un producto específico |
| **GET** | `/api/cart` | Obtener el carrito del usuario |
| **POST** | `/api/cart/items` | Agregar un item al carrito |
| **PATCH** | `/api/cart/items/:id` | Cambiar la cantidad de un item |
| **DELETE** | `/api/cart/items/:id` | Sacar un item del carrito |
| **DELETE** | `/api/cart` | Vaciar el carrito por completo |
| **POST** | `/api/pedidos` | Crear un nuevo pedido |

## Detalles de Estructura de Datos

Para más detalles sobre la forma exacta de cada objeto, revisá las funciones normalizadoras en sus respectivos archivos:

* `api/productos.js` → Revisar `normalizeProduct()`
* `api/cart.js` → Revisar `normalizeCartItem()`
* `api/pedidos.js` → Revisar `normalizeOrder()`