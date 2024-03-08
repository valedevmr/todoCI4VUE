import { createRouter, createWebHistory } from 'vue-router'
import authMiddleware from '../guards/beforeRouterLeave.js';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'todo',
      beforeEnter: authMiddleware,
      component: () => import('../views/Todos.vue')
    },
    {
      path: '/todos',
      name: 'todos',
      beforeEnter: authMiddleware,
      component: () => import('../views/Todos.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginVuew.vue')
    },
    {
      path: '/registrarte',
      name: 'registrarte',
      component: () => import('../views/RegistrateView.vue')
    },
    {
      path: '/recuperar_contrasena',
      name: 'recuperar_contrasena',
      component: () => import('../views/RecupararCView.vue')
    },
    {
      path: '/sendcp',
      name: 'sendcp',
      component: () => import('../views/SendCP.vue')
    }
  ]
})

export default router
