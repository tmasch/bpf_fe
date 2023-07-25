<template>
  <header>
    <div>
      <nav>
        <RouterLink to="/">Home </RouterLink> | 
        <RouterLink to="/newRessource">New Ressource</RouterLink> | 
        <RouterLink to="/ressources">Ressource</RouterLink> | 
        <RouterLink to="/imageViewer">Image Viewer</RouterLink> |
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>
  <div>
    <RouterView />

  </div>
</template>


<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useImageViewerStore } from '@/stores/ImageViewerStore'

const imageViewerStore = useImageViewerStore()

</script>


