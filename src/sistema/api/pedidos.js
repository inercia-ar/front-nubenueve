import { baseURL, orderURL, apiFetch } from './client'

function normalizeOrder(order) {

  /* BACKEND: sobreescribir para mapear la forma del frontend → forma del backend
     Frontend envía:
       { items, cliente: { nombre, email, direccion, ciudad, cp, telefono }, metodo, total }

     Ejemplo de mapeo:
       return {
         line_items: order.items.map(i => ({ product_id: i.id, qty: i.quantity })),
         customer:   { ...order.cliente, phone: order.cliente.telefono },
         payment:    order.metodo === 'mercadopago' ? 'mp' : 'transfer',
         total:      order.total,
       }
  */

  return order

}

export async function submitOrder(order) {

  const normalized = normalizeOrder(order)
  const url = orderURL || (baseURL && `${baseURL}/pedidos`)

  if (url) {
    return apiFetch(url, { method: 'POST', body: JSON.stringify(normalized) })
  }

  /* Mock: no hay llamada real, el store limpia el carrito */
  return null

}
