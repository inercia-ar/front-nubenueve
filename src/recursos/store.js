import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore('store', () => {

  const mock = ref([

    { id: 1, name: 'Zapatillas Urbanas', price: 15000, stock: 10 },
    { id: 2, name: 'Remera Básica', price: 5000, stock: 25 },
    { id: 3, name: 'Pantalón Cargo', price: 12000, stock: 5 }

  ])

  return { mock }

})