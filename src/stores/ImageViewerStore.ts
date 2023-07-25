import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useImageViewerStore = defineStore('imageviewer', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  const id = ""
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
