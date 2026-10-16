<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import api from '../../api'
import { useCarritoStore } from '../../stores/carrito'

const carrito = useCarritoStore()
const router = useRouter()

const form = ref({ nombre_completo: '', documento: '', telefono: '', direccion: '' })
const enviando = ref(false)

async function confirmarPedido() {
  enviando.value = true
  try {
    // RF-03: el cliente se registra justo en este momento, no antes
    const { data: cliente } = await api.post('/clientes', form.value)

    // RF-04 / RF-06: registra la venta y descuenta stock
    await api.post('/ventas', {
      cliente_id: cliente.id,
      items: carrito.items.map((i) => ({ producto_id: i.producto.id, cantidad: i.cantidad })),
    })

    carrito.vaciar()
    alert('¡Pedido confirmado! Gracias por tu compra.')
    router.push('/')
  } finally {
    enviando.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white">
    <header class="border-b flex items-center justify-between px-8 py-4">
      <RouterLink to="/" class="flex items-center gap-2 font-semibold text-lg">
        <span class="w-7 h-7 rounded bg-acento text-white flex items-center justify-center text-sm">M</span>
        Muebles Loayza
      </RouterLink>
      <RouterLink to="/" class="text-sm text-gray-600">Catálogo</RouterLink>
    </header>

    <section class="flex-1 flex justify-center px-8 py-10">
      <div class="max-w-md w-full">
        <h1 class="text-lg font-bold mb-4">Finalizar compra</h1>

        <div class="border rounded mb-4">
          <div v-for="i in carrito.items" :key="i.producto.id" class="flex justify-between px-4 py-2 text-sm border-b">
            <span>{{ i.producto.nombre }} ×{{ i.cantidad }}</span>
            <span>S/ {{ (i.producto.precio * i.cantidad).toFixed(2) }}</span>
          </div>
          <div class="flex justify-between px-4 py-2 font-semibold bg-gray-50">
            <span>Total</span>
            <span>S/ {{ carrito.total.toFixed(2) }}</span>
          </div>
        </div>

        <form @submit.prevent="confirmarPedido" class="space-y-3">
          <div>
            <label class="text-xs font-semibold tracking-wide text-gray-500">NOMBRE COMPLETO</label>
            <input v-model="form.nombre_completo" required class="w-full border rounded px-3 py-2 mt-1" />
          </div>
          <div class="flex gap-3">
            <div class="flex-1">
              <label class="text-xs font-semibold tracking-wide text-gray-500">DNI O RUC</label>
              <input v-model="form.documento" required class="w-full border rounded px-3 py-2 mt-1" />
            </div>
            <div class="flex-1">
              <label class="text-xs font-semibold tracking-wide text-gray-500">TELÉFONO</label>
              <input v-model="form.telefono" class="w-full border rounded px-3 py-2 mt-1" />
            </div>
          </div>
          <div>
            <label class="text-xs font-semibold tracking-wide text-gray-500">DIRECCIÓN DE ENTREGA</label>
            <input v-model="form.direccion" class="w-full border rounded px-3 py-2 mt-1" />
          </div>

          <p class="bg-amber-50 text-amber-800 text-xs rounded px-3 py-2">
            🔒 Estos datos quedan registrados como cliente y se usan solo para esta compra.
          </p>

          <button :disabled="enviando" type="submit" class="w-full bg-black text-white rounded py-2.5 font-medium">
            {{ enviando ? 'Procesando...' : 'Confirmar pedido' }}
          </button>
        </form>
      </div>
    </section>

    <footer class="border-t px-8 py-4 flex justify-between text-xs text-gray-400">
      <span>© 2026 Muebles Loayza</span>
      <span>Av. de la Cultura, Cusco</span>
    </footer>
  </div>
</template>
