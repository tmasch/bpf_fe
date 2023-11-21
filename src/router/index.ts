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
    },
    {
      path: '/detailView',
      name: 'Detail View',
      component:  () => import('../views/DetailView.vue')
    },
    {
        path: '/imageTest',
        name: 'Image Test',
        component: () => import('../views/ImageTest.vue')
    },
    {
      path: '/recordViewBook',
      name: 'Record View Book',
      component: () => import('../views/RecordViewBook.vue')
    },
    {
      path: '/recordViewManuscript',
      name: 'Record View Manuscript',
      component: () => import('../views/RecordViewManuscript.vue')
  },
  {
    path: '/recordViewPerson',
    name: 'Record View Person',
    component : () => import('../views/RecordViewPerson.vue')
  },
  {
    path: '/recordViewOrg',
    name: 'Record View Organisation',
    component : () => import('../views/RecordViewOrg.vue')
  },
  {
    path: '/recordViewPlace',
    name: 'Record View Place',
    component : () => import('../views/RecordViewPlace.vue')
  }
  ]
})

export default router
