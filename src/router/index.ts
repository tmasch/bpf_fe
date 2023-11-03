import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/newRessource',
      name: 'newRessource',
      component: () => import('../views/NewRessource.vue')
    },
    { 
      path: '/imageViewer',
      name: 'imageViewer',
      component: () => import('../views/ImageViewer.vue')  
    },
    { 
      path: '/ressources',
      name: 'ressources',
      component: () => import('../views/Ressources.vue')  
    },
    {
      path: '/Radiobutton - Experiment',
      name: 'Radiobutton - Experiment',
      component: () => import('../views/Radiobutton - Experiment.vue')
    }

  ]
})

export default router
