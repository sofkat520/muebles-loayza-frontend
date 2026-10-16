import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
})

// Adjunta el token guardado al iniciar sesión (RNF-02)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api
