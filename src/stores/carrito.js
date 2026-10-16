import { defineStore } from 'pinia'

export const useCarritoStore = defineStore('carrito', {
  state: () => ({
    items: [], // { producto, cantidad }
  }),
  getters: {
    total: (state) => state.items.reduce((sum, i) => sum + i.producto.precio * i.cantidad, 0),
  },
  actions: {
    agregar(producto, cantidad) {
      const existente = this.items.find((i) => i.producto.id === producto.id)
      if (existente) {
        existente.cantidad += cantidad
      } else {
        this.items.push({ producto, cantidad })
      }
    },
    vaciar() {
      this.items = []
    },
  },
})
