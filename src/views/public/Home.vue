<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import api from '../../api'

const productos = ref([])

onMounted(async () => {
  const { data } = await api.get('/productos')
  productos.value = data
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white">
    <!-- Header -->
    <header class="border-b flex items-center justify-between px-8 py-4">
      <div class="flex items-center gap-2 font-semibold text-lg">
        <span class="w-7 h-7 rounded bg-acento text-white flex items-center justify-center text-sm">M</span>
        Muebles Loayza
      </div>
      <nav class="flex items-center gap-6 text-sm text-gray-600">
        <a href="#">Catálogo</a>
        <a href="#">Nosotros</a>
        <a href="#">Contacto</a>
        <!-- Enlace discreto a admin, no es la puerta principal -->
        <RouterLink to="/login" class="border rounded-full px-4 py-1.5 flex items-center gap-1">
          🔒 Ingresar como administrador
        </RouterLink>
      </nav>
    </header>

    <!-- Hero -->
    <section class="px-8 py-10">
      <h1 class="text-3xl font-bold">Muebles de melamina<br />hechos para tu hogar</h1>
      <p class="text-gray-500 mt-2">Roperos, cómodas y escritorios a medida — hechos en Cusco.</p>

      <div class="flex gap-3 mt-4">
        <button class="border rounded-full px-4 py-1.5 text-sm">Categoría</button>
        <button class="border rounded-full px-4 py-1.5 text-sm">Ambiente</button>
        <button class="border rounded-full px-4 py-1.5 text-sm">Precio</button>
        <button class="bg-black text-white rounded-full px-5 py-1.5 text-sm">Buscar</button>
      </div>
    </section>

    <!-- Destacados -->
    <section class="px-8 pb-16 flex-1">
      <h2 class="font-semibold mb-4">Muebles destacados</h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <RouterLink
          v-for="p in productos"
          :key="p.id"
          :to="`/producto/${p.id}`"
          class="border rounded-lg overflow-hidden hover:shadow-md transition"
        >
          <div class="h-40 bg-gray-100 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[length:10px_10px]"></div>
          <div class="p-3">
            <p class="font-medium text-sm">{{ p.nombre }}</p>
            <p class="text-acento text-sm">S/ {{ Number(p.precio).toFixed(2) }}</p>
          </div>
        </RouterLink>
      </div>
    </section>

    <footer class="border-t px-8 py-4 flex justify-between text-xs text-gray-400">
      <span>© 2026 Muebles Loayza</span>
      <span>Av. de la Cultura, Cusco</span>
    </footer>
  </div>
</template>
