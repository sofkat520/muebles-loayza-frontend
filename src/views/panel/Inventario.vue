<script setup>
import { ref, onMounted } from 'vue'
import api from '../../api'

const productos = ref([])

async function cargar() {
  const { data } = await api.get('/productos')
  productos.value = data
}

async function ajustar(p, delta) {
  await api.patch(`/productos/${p.id}/ajustar-stock`, { cantidad: delta })
  cargar()
}

onMounted(cargar)
</script>

<template>
  <div>
    <table class="w-full text-sm border rounded overflow-hidden mb-3">
      <thead class="bg-gray-50 text-left text-gray-500 text-xs">
        <tr><th class="px-4 py-2">Mueble</th><th class="px-4 py-2">Stock</th><th class="px-4 py-2">Mínimo</th><th class="px-4 py-2">Estado</th><th class="px-4 py-2"></th></tr>
      </thead>
      <tbody>
        <tr v-for="p in productos" :key="p.id" class="border-t">
          <td class="px-4 py-2">{{ p.nombre }}</td>
          <td class="px-4 py-2">{{ p.stock }}</td>
          <td class="px-4 py-2">{{ p.stock_minimo }}</td>
          <td class="px-4 py-2">
            <span
              class="px-2 py-0.5 rounded-full text-xs"
              :class="p.stock <= p.stock_minimo ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'"
            >
              {{ p.stock <= p.stock_minimo ? 'Bajo' : 'Normal' }}
            </span>
          </td>
          <td class="px-4 py-2 flex gap-2">
            <button @click="ajustar(p, 1)" class="border rounded px-2 py-1 text-xs">+1</button>
            <button @click="ajustar(p, -1)" class="border rounded px-2 py-1 text-xs">-1</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p class="text-xs text-gray-400">🖊 Ajustar stock: cantidad + motivo. Queda registrado con fecha y usuario.</p>
  </div>
</template>
