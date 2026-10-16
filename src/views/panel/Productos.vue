<script setup>
import { ref, onMounted } from 'vue'
import api from '../../api'

const productos = ref([])
const buscar = ref('')
const mostrarModal = ref(false)
const nuevo = ref({ nombre: '', categoria: '', precio: '', stock: '' })

async function cargar() {
  const { data } = await api.get('/productos', { params: { buscar: buscar.value } })
  productos.value = data
}

async function guardar() {
  await api.post('/productos', nuevo.value)
  nuevo.value = { nombre: '', categoria: '', precio: '', stock: '' }
  mostrarModal.value = false
  cargar()
}

onMounted(cargar)
</script>

<template>
  <div>
    <div class="flex gap-3 mb-4">
      <input
        v-model="buscar"
        @input="cargar"
        placeholder="Buscar mueble por nombre o código..."
        class="border rounded px-3 py-2 text-sm flex-1"
      />
      <button @click="mostrarModal = true" class="bg-black text-white rounded px-4 py-2 text-sm font-medium">+ Nuevo</button>
    </div>

    <table class="w-full text-sm border rounded overflow-hidden">
      <thead class="bg-gray-50 text-left text-gray-500 text-xs">
        <tr><th class="px-4 py-2">Mueble</th><th class="px-4 py-2">Precio</th><th class="px-4 py-2">Stock</th></tr>
      </thead>
      <tbody>
        <tr v-for="p in productos" :key="p.id" class="border-t">
          <td class="px-4 py-2">{{ p.nombre }}</td>
          <td class="px-4 py-2">S/ {{ Number(p.precio).toFixed(2) }}</td>
          <td class="px-4 py-2">
            <span
              class="px-2 py-0.5 rounded-full text-xs"
              :class="p.stock <= p.stock_minimo ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'"
            >
              {{ p.stock }} disp.
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal nuevo mueble -->
    <div v-if="mostrarModal" class="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div class="bg-white rounded-lg p-6 w-96">
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-semibold">Nuevo mueble</h3>
          <button @click="mostrarModal = false">✕</button>
        </div>
        <form @submit.prevent="guardar" class="space-y-3">
          <div>
            <label class="text-xs font-semibold text-gray-500">NOMBRE</label>
            <input v-model="nuevo.nombre" required class="w-full border rounded px-3 py-2 mt-1" />
          </div>
          <div class="flex gap-3">
            <div class="flex-1">
              <label class="text-xs font-semibold text-gray-500">CATEGORÍA</label>
              <input v-model="nuevo.categoria" class="w-full border rounded px-3 py-2 mt-1" />
            </div>
            <div class="flex-1">
              <label class="text-xs font-semibold text-gray-500">PRECIO</label>
              <input v-model="nuevo.precio" type="number" step="0.01" required class="w-full border rounded px-3 py-2 mt-1" />
            </div>
          </div>
          <div>
            <label class="text-xs font-semibold text-gray-500">CANTIDAD INICIAL</label>
            <input v-model="nuevo.stock" type="number" required class="w-full border rounded px-3 py-2 mt-1" />
          </div>
          <div class="flex justify-end gap-3 pt-2">
            <button type="button" @click="mostrarModal = false" class="px-4 py-2 text-sm border rounded">Cancelar</button>
            <button type="submit" class="px-4 py-2 text-sm bg-black text-white rounded">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
