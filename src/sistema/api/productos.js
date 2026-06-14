import { baseURL, apiFetch, resolveImage, unpack } from './client'

function normalizeProduct(raw) {

  return {

    id:          raw.id ?? 0,
    artista:     raw.artista     ?? raw.artist?.name ?? 'Unknown',
    disco:       raw.disco       ?? raw.title        ?? 'Untitled',
    formato:     raw.formato     ?? raw.format?.key  ?? 'cd',
    fecha:       raw.fecha       ?? raw.releaseDate  ?? '',
    precio:      raw.precio      ?? raw.price        ?? 0,
    stock:       raw.stock       ?? raw.stock        ?? 0,
    descripcion: raw.descripcion ?? raw.description  ?? '',
    imagenes:    (raw.imagenes ?? raw.images ?? []).map(resolveImage),

  }

}

export async function fetchCatalog() {

  if (baseURL) {
    return unpack(await apiFetch(`${baseURL}/productos`)).map(normalizeProduct)
  }

  const res = await fetch('/productos.json')
  if (!res.ok) throw new Error('Failed to load catalog')
  return unpack(await res.json()).map(normalizeProduct)

}

export async function fetchItem(id) {

  if (baseURL) {
    return normalizeProduct(await apiFetch(`${baseURL}/productos/${id}`))
  }

  const all = await fetchCatalog()
  return all.find(i => i.id === Number(id)) ?? null

}
