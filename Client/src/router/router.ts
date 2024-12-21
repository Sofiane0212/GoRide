import { createRouter, createWebHistory } from 'vue-router'
import TripsListView from '@/views/TripsListView.vue'
import LoginView from '@/views/LoginView.vue'
import ProfileView from '@/views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(), // import.meta.env.BASE_URL, import.meta.env.VITE_API_URL
  routes: [
    {
      path: '/',
      name: 'trips',
      component: TripsListView
    },
    {
      path: '/trips',
      redirect: '/'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    }
  ],
})

export default router