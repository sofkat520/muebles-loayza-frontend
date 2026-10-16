<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '../../api'

const ventas = ref([])
const pedidos = ref([])
const productos = ref([])

onMounted(async () => {
  const [v, p, pr] = await Promise.all([api.get('/ventas'), api.get('/pedidos'), api.get('/productos')])
  ventas.value = v.data
  pedidos.value = p.data
  productos.value = pr.data
})

const ventasHoy = computed(() => {
  const hoy = new Date().toDateString()
  return ventas.value
    .filter((v) => new Date(v.created_at).toDateString() === hoy)
    .reduce((sum, v) => sum + Number(v.total), 0)
})
const pedidosPendientes = computed(() => pedidos.value.filter((p) => p.estado === 'pendiente').length)
const stockBajo = computed(() => productos.value.filter((p) => p.stock <= p.stock_minimo).length)
</script>

<template>
  <div>
    <div class="grid grid-cols-4 gap-4 mb-6">
      <div class="border rounded-lg p-4">
        <p class="text-xs text-gray-500">VENTAS DE HOY</p>
        <p class="text-xl font-bold">S/ {{ ventasHoy.toFixed(0) }}</p>
      </div>
      <div class="border rounded-lg p-4">
        <p class="text-xs text-gray-500">PEDIDOS PENDIENTES</p>
        <p class="text-xl font-bold">{{ pedidosPendientes }}</p>
      </div>
      <div class="border rounded-lg p-4">
        <p class="text-xs text-gray-500">STOCK BAJO</p>
        <p class="text-xl font-bold">{{ stockBajo }}</p>
      </div>
      <div class="border rounded-lg p-4">
        <p class="text-xs text-gray-500">CONEXIÓN</p>
        <p class="text-xl font-bold text-green-600">En línea</p>
      </div>
    </div>

    <h2 class="font-semibold mb-2">Últimas ventas</h2>
    <table class="w-full text-sm border rounded overflow-hidden">
      <thead class="bg-gray-50 text-left text-gray-500 text-xs">
        <tr><th class="px-4 py-2">Hora</th><th class="px-4 py-2">Cliente</th><th class="px-4 py-2">Total</th></tr>
      </thead>
      <tbody>
        <tr v-for="v in ventas.slice(0, 5)" :key="v.id" class="border-t">
          <td class="px-4 py-2">{{ new Date(v.created_at).toLocaleTimeString().slice(0, 5) }}</td>
          <td class="px-4 py-2">{{ v.cliente?.nombre_completo }}</td>
          <td class="px-4 py-2">S/ {{ Number(v.total).toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
