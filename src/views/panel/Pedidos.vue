<script setup>
import { ref, onMounted } from 'vue'
import api from '../../api'

const pedidos = ref([])

async function cargar() {
  const { data } = await api.get('/pedidos')
  pedidos.value = data
}

async function marcarEntregado(p) {
  await api.put(`/pedidos/${p.id}`, { estado: 'entregado' })
  cargar()
}

onMounted(cargar)
</script>

<template>
  <div>
    <table class="w-full text-sm border rounded overflow-hidden">
      <thead class="bg-gray-50 text-left text-gray-500 text-xs">
        <tr><th class="px-4 py-2">Cliente</th><th class="px-4 py-2">Entrega</th><th class="px-4 py-2">Estado</th><th class="px-4 py-2"></th></tr>
      </thead>
      <tbody>
        <tr v-for="p in pedidos" :key="p.id" class="border-t">
          <td class="px-4 py-2">{{ p.cliente?.nombre_completo }}</td>
          <td class="px-4 py-2">{{ p.fecha_entrega }}</td>
          <td class="px-4 py-2">
            <span
              class="px-2 py-0.5 rounded-full text-xs"
              :class="p.estado === 'entregado' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'"
            >
              {{ p.estado === 'entregado' ? 'Entregado' : 'Pendiente' }}
            </span>
          </td>
          <td class="px-4 py-2">
            <button v-if="p.estado === 'pendiente'" @click="marcarEntregado(p)" class="text-xs border rounded px-2 py-1">
              Marcar entregado
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
