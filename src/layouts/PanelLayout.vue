<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import api from '../api'

const router = useRouter()
const user = JSON.parse(localStorage.getItem('user') || '{"name":"Usuario"}')

const menu = [
  { to: '/panel', label: 'Panel', icon: '🏠' },
  { to: '/panel/productos', label: 'Productos', icon: '🪑' },
  { to: '/panel/clientes', label: 'Clientes', icon: '👤' },
  { to: '/panel/ventas', label: 'Ventas', icon: '🛒' },
  { to: '/panel/pedidos', label: 'Pedidos', icon: '📋' },
  { to: '/panel/inventario', label: 'Inventario', icon: '📦' },
]

async function salir() {
  try { await api.post('/logout') } catch (e) {}
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen flex bg-white">
    <!-- Menú lateral: mismo patrón e íconos en toda la sección interna -->
    <aside class="w-40 border-r flex flex-col py-4">
      <RouterLink
        v-for="item in menu"
        :key="item.to"
        :to="item.to"
        class="flex flex-col items-center gap-1 text-xs py-3 mx-2 rounded"
        active-class="bg-acento text-white"
        exact-active-class="bg-acento text-white"
      >
        <span class="text-lg">{{ item.icon }}</span>
        {{ item.label }}
      </RouterLink>
    </aside>

    <div class="flex-1 flex flex-col">
      <header class="border-b flex justify-end items-center px-6 py-3">
        <button @click="salir" class="flex items-center gap-2 text-sm text-gray-600">
          <span class="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold">
            {{ user.name?.[0] ?? 'U' }}
          </span>
          {{ user.name }} — Salir
        </button>
      </header>

      <main class="flex-1 p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>
