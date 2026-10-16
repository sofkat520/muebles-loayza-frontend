import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // Sitio público (Figuras 2, 3, 4)
  { path: '/', name: 'home', component: () => import('../views/public/Home.vue') },
  { path: '/producto/:id', name: 'producto', component: () => import('../views/public/ProductDetail.vue') },
  { path: '/checkout', name: 'checkout', component: () => import('../views/public/Checkout.vue') },

  // Login (Figura 5)
  { path: '/login', name: 'login', component: () => import('../views/auth/Login.vue') },

  // Panel interno (Figuras 5 a 10) — todas requieren sesión
  {
    path: '/panel',
    component: () => import('../layouts/PanelLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'panel.dashboard', component: () => import('../views/panel/Dashboard.vue') },
      { path: 'productos', name: 'panel.productos', component: () => import('../views/panel/Productos.vue') },
      { path: 'clientes', name: 'panel.clientes', component: () => import('../views/panel/Clientes.vue') },
      { path: 'ventas', name: 'panel.ventas', component: () => import('../views/panel/Ventas.vue') },
      { path: 'pedidos', name: 'panel.pedidos', component: () => import('../views/panel/Pedidos.vue') },
      { path: 'inventario', name: 'panel.inventario', component: () => import('../views/panel/Inventario.vue') },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Protección simple de rutas del panel (RNF-02)
router.beforeEach((to) => {
  if (to.meta.requiresAuth && !localStorage.getItem('token')) {
    return { name: 'login' }
  }
})

export default router
