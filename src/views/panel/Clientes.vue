<script setup>
import { ref, onMounted } from 'vue'
import api from '../../api'

const clientes = ref([])
const buscar = ref('')
const mostrarModal = ref(false)
const nuevo = ref({ nombre_completo: '', documento: '', telefono: '', direccion: '' })

async function cargar() {
  const { data } = await api.get('/clientes', { params: { buscar: buscar.value } })
  clientes.value = data
}

async function guardar() {
  await api.post('/clientes', nuevo.value)
  nuevo.value = { nombre_completo: '', documento: '', telefono: '', direccion: '' }
  mostrarModal.value = false
  cargar()
}

onMounted(cargar)
</script>

<template>
  <div>
    <div class="flex gap-3 mb-4">
      <input v-model="buscar" @input="cargar" placeholder="Buscar cliente..." class="border rounded px-3 py-2 text-sm flex-1" />
      <button @click="mostrarModal = true" class="bg-black text-white rounded px-4 py-2 text-sm font-medium">+ Nuevo</button>
    </div>

    <table class="w-full text-sm border rounded overflow-hidden">
      <thead class="bg-gray-50 text-left text-gray-500 text-xs">
        <tr><th class="px-4 py-2">Cliente</th><th class="px-4 py-2">DNI / RUC</th><th class="px-4 py-2">Teléfono</th></tr>
      </thead>
      <tbody>
        <tr v-for="c in clientes" :key="c.id" class="border-t">
          <td class="px-4 py-2">{{ c.nombre_completo }}</td>
          <td class="px-4 py-2 text-gray-500">{{ c.documento_oculto }}</td>
          <td class="px-4 py-2 text-gray-500">{{ c.telefono }}</td>
        </tr>
      </tbody>
    </table>

    <div v-if="mostrarModal" class="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div class="bg-white rounded-lg p-6 w-96">
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-semibold">Nuevo cliente</h3>
          <button @click="mostrarModal = false">✕</button>
        </div>
        <form @submit.prevent="guardar" class="space-y-3">
          <div>
            <label class="text-xs font-semibold text-gray-500">NOMBRE COMPLETO</label>
            <input v-model="nuevo.nombre_completo" required class="w-full border rounded px-3 py-2 mt-1" />
          </div>
          <div class="flex gap-3">
            <div class="flex-1">
              <label class="text-xs font-semibold text-gray-500">DNI O RUC</label>
              <input v-model="nuevo.documento" required class="w-full border rounded px-3 py-2 mt-1" />
            </div>
            <div class="flex-1">
              <label class="text-xs font-semibold text-gray-500">TELÉFONO</label>
              <input v-model="nuevo.telefono" class="w-full border rounded px-3 py-2 mt-1" />
            </div>
          </div>
          <p class="bg-amber-50 text-amber-800 text-xs rounded px-3 py-2">
            🔒 Estos datos se usan solo para la venta y el reparto.
          </p>
          <div class="flex justify-end gap-3 pt-2">
            <button type="button" @click="mostrarModal = false" class="px-4 py-2 text-sm border rounded">Cancelar</button>
            <button type="submit" class="px-4 py-2 text-sm bg-black text-white rounded">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
