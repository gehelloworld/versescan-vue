import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import ProfilePage from '@/views/ProfilePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: LandingPage,
    },
    {
      path: '/profile',
      name: 'profile-page',
      component: ProfilePage,
    },

  ],
})

export default router
