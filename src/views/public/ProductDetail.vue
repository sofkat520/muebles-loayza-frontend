<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import api from '../../api'
import { useCarritoStore } from '../../stores/carrito'

const route = useRoute()
const router = useRouter()
const carrito = useCarritoStore()

const producto = ref(null)
const cantidad = ref(1)

onMounted(async () => {
  const { data } = await api.get(`/productos/${route.params.id}`)
  producto.value = data
})

function comprar() {
  carrito.agregar(producto.value, cantidad.value)
  router.push('/checkout')
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white">
    <header class="border-b flex items-center justify-between px-8 py-4">
      <RouterLink to="/" class="flex items-center gap-2 font-semibold text-lg">
        <span class="w-7 h-7 rounded bg-acento text-white flex items-center justify-center text-sm">M</span>
        Muebles Loayza
      </RouterLink>
      <nav class="flex items-center gap-6 text-sm text-gray-600">
        <RouterLink to="/">Catálogo</RouterLink>
        <a href="#">Nosotros</a>
        <a href="#">Contacto</a>
        <RouterLink to="/login" class="border rounded-full px-4 py-1.5">🔒 Ingresar como administrador</RouterLink>
      </nav>
    </header>

    <section v-if="producto" class="flex-1 flex justify-center px-8 py-10">
      <div class="flex gap-10 max-w-3xl w-full">
        <div class="w-64 h-64 border rounded bg-gray-50 shrink-0"></div>
        <div>
          <h1 class="text-xl font-bold">{{ producto.nombre }}</h1>
          <p class="text-acento text-lg font-mono mt-1">S/ {{ Number(producto.precio).toFixed(2) }}</p>
          <p class="text-gray-500 text-sm mt-3 max-w-sm">{{ producto.descripcion }}</p>

          <div class="flex items-center gap-3 mt-6">
            <input
              type="number"
              min="1"
              v-model.number="cantidad"
              class="w-16 border rounded px-2 py-1.5 text-center"
            />
            <button @click="comprar" class="bg-black text-white rounded px-5 py-1.5 text-sm font-medium">
              Comprar
            </button>
          </div>
        </div>
      </div>
    </section>

    <footer class="border-t px-8 py-4 flex justify-between text-xs text-gray-400">
      <span>© 2026 Muebles Loayza</span>
      <span>Av. de la Cultura, Cusco</span>
    </footer>
  </div>
</template>
