import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/entry',
      name: 'entry',
      component: () => import('@/views/entrance/entry.vue'),
      children:[
        {
          path: '',
          name:'login',
          component: () => import('@/views/entrance/login.vue')
        },
        {
          path: 'register',
          name:'register',
          component: () => import('@/views/entrance/register.vue')
        },
      ]
    },
    
  ]
})

export default router
