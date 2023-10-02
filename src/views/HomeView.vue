<template>
  <main>
    <p>Step 1</p>
        <datalist id="current_processes">
          <option value = "Here should"></option>
          <option value = "be a list of"></option>
          <option value = "all running ingest"></option>
          <option value = "processes, but"></option>
          <option value = "they must come"></option>
          <option value = "from the back-end"></option>
        </datalist>
        <h1>Ingest Module</h1>
        <h2>Start New Ingest Process - Choose Material</h2>
        <div>
          <form>
            <input type="radio" id="manuscript" name="ingest_option" value="manuscript">
            <label for="manuscript"> Import digitised manuscript</label><br>
            <input type="radio" id="book" name="ingest_option" value="book">
            <label for="book"> Import digitised book</label><br>
            <input type="radio" id="museum" name="ingest_option" value="museum" disabled>
            <label for="museum"> Import museum objects (to be added later)</label><br>
            <input type="radio" id="harddrive" name = "ingest_option" value ="harddrive" disabled>
            <label for="harddrive"> Import images from harddrive (to be added later)</label><br>


            <label for="ingest_id_new">Enter Ingest ID (leave blank for default ID): </label>
            <input type="text" id="ingest_id_new" name="ingest_id_new">
          </form>
        </div>
        <br>
        <br>
        <div>
          <form>
            <h2>Reopen Existing Ingest Process</h2>
            <p> Please choose Ingest Process ID from List</p>
            <input list = "current_processes" id="choose_process" name="choose_process">

          </form>
        </div>

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