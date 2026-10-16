<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '../../api'

const clientes = ref([])
const productos = ref([])
const buscarProducto = ref('')
const clienteId = ref('')
const metodoPago = ref('')
const carrito = ref([]) // { producto, cantidad }

onMounted(async () => {
  const [c, p] = await Promise.all([api.get('/clientes'), api.get('/productos')])
  clientes.value = c.data
  productos.value = p.data
})

const resultados = computed(() =>
  buscarProducto.value
    ? productos.value.filter((p) => p.nombre.toLowerCase().includes(buscarProducto.value.toLowerCase()))
    : []
)

function agregar(p) {
  const existente = carrito.value.find((i) => i.producto.id === p.id)
  if (existente) existente.cantidad++
  else carrito.value.push({ producto: p, cantidad: 1 })
  buscarProducto.value = ''
}

const total = computed(() => carrito.value.reduce((s, i) => s + i.producto.precio * i.cantidad, 0))

async function registrarVenta() {
  await api.post('/ventas', {
    cliente_id: clienteId.value,
    metodo_pago: metodoPago.value,
    items: carrito.value.map((i) => ({ producto_id: i.producto.id, cantidad: i.cantidad })),
  })
  carrito.value = []
  clienteId.value = ''
  metodoPago.value = ''
  alert('Venta registrada y stock actualizado.')
  const { data } = await api.get('/productos')
  productos.value = data
}
</script>

<template>
  <div class="grid grid-cols-2 gap-6">
    <div>
      <div class="flex gap-3 mb-3">
        <select v-model="clienteId" class="border rounded px-3 py-2 text-sm flex-1">
          <option value="" disabled>Cliente</option>
          <option v-for="c in clientes" :key="c.id" :value="c.id">{{ c.nombre_completo }}</option>
        </select>
        <input v-model="metodoPago" placeholder="Método de pago" class="border rounded px-3 py-2 text-sm flex-1" />
      </div>

      <input
        v-model="buscarProducto"
        placeholder="Buscar mueble para agregar (ej. ropero, cómoda, escritorio)..."
        class="w-full border rounded px-3 py-2 text-sm mb-2"
      />

      <div v-for="p in resultados" :key="p.id" class="flex justify-between items-center border-b py-2 text-sm">
        <span>{{ p.nombre }} <span class="text-gray-400">S/ {{ Number(p.precio).toFixed(2) }} · {{ p.stock }} disponibles</span></span>
        <button @click="agregar(p)" class="border rounded px-3 py-1 text-xs">+ Agregar</button>
      </div>
    </div>

    <div class="border rounded p-4">
      <div v-for="i in carrito" :key="i.producto.id" class="flex justify-between text-sm py-1">
        <span>{{ i.producto.nombre }} ×{{ i.cantidad }}</span>
        <span>S/ {{ (i.producto.precio * i.cantidad).toFixed(2) }}</span>
      </div>
      <div class="flex justify-between font-semibold border-t mt-2 pt-2">
        <span>Total</span>
        <span>S/ {{ total.toFixed(2) }}</span>
      </div>
      <button
        @click="registrarVenta"
        :disabled="!clienteId || carrito.length === 0"
        class="w-full bg-black text-white rounded py-2.5 mt-4 font-medium disabled:opacity-40"
      >
        Registrar venta
      </button>
    </div>
  </div>
</template>
