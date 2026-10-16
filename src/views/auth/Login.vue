<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../api'

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')

async function ingresar() {
  error.value = ''
  try {
    const { data } = await api.post('/login', { email: email.value, password: password.value })
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    router.push('/panel')
  } catch (e) {
    error.value = 'Usuario o contraseña incorrectos.'
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-white">
    <div class="w-full max-w-sm border rounded-lg p-8 shadow-sm">
      <div class="flex items-center gap-2 font-semibold text-lg mb-6">
        <span class="w-7 h-7 rounded bg-acento text-white flex items-center justify-center text-sm">M</span>
        Muebles Loayza
      </div>

      <form @submit.prevent="ingresar" class="space-y-4">
        <div>
          <label class="text-xs font-semibold tracking-wide text-gray-500">USUARIO</label>
          <input v-model="email" type="email" required class="w-full border rounded px-3 py-2 mt-1" />
        </div>
        <div>
          <label class="text-xs font-semibold tracking-wide text-gray-500">CONTRASEÑA</label>
          <input v-model="password" type="password" required class="w-full border rounded px-3 py-2 mt-1" />
        </div>

        <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>

        <button type="submit" class="w-full bg-black text-white rounded py-2.5 font-medium">Ingresar</button>

        <p class="text-xs text-green-600 flex items-center gap-1 justify-center">
          🔒 Conexión y contraseña cifradas
        </p>
      </form>
    </div>
  </div>
</template>
