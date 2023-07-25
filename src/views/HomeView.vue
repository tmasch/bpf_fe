<template>
  <main>
    BPF main page
  </main>
</template>


<script setup>
import { storeToRefs } from 'pinia';
import { useImageViewerStore } from '@/stores/ImageViewerStore'
const imageViewerStore = useImageViewerStore()
const { count, doubleCount, increment  } = storeToRefs(imageViewerStore)


imageViewerStore.count++

console.log(imageViewerStore.count)



</script>