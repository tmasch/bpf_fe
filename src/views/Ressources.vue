<template>
    <div>
        <h1>List of Ressources</h1>
    </div>

    <button @click="$event => getRessources()">
       Get ressources
    </button>

    <table class="table">
      <tbody>
          <tr v-for="(item, index) in items" :key="index">
              <td :key="indexColumn">{{item.type}}</td>
              <td :key="indexColumn">{{item.preview}}</td>
              <td :key="indexColumn">{{item.id}}</td>
              <td>
                <button @click="redirectToViewer(item.id)">View</button>
                <button @click="redirectToDetails(item.id)">Details</button>    
                <button @click="redirectToImageTest(item.id)">Get Images</button>
                <button @click="redirectToRecordViewBook(item.id)" v-if="item.type=='Book'">Book</button>
                <button @click="redirectToRecordViewManuscript(item.id)" v-if="item.type=='Manuscript'">Manuscript</button>                    
            </td>
          </tr>
      </tbody>
    </table>
</template>
// https://api.digitale-sammlungen.de/iiif/presentation/v2/bsb00087481/manifest
//@click='goToViewer({{item["id"] }})'

<script>
import { useImageViewerStore } from '@/stores/ImageViewerStore'
const imageViewerStore = useImageViewerStore()


import axios from 'axios'
const API_URL = 'http://localhost:8000'
axios.interceptors.request.use(request => {
 // console.log('Starting Request', JSON.stringify(request, null, 2))
  return request
})

axios.interceptors.response.use(response => {
//  console.log('Response:', JSON.stringify(response, null, 2))
  return response
})

export default {
    data() {
        return {
            items: ''
        };
    },
    methods: {
        getRessources() {
            const url = `${API_URL}/allRessources`
            console.log(url)
            return axios.get(url,
                {
                }).then((response) => {
                    console.log(response.data)
                    this.items = response.data || ''
                })
       },
       redirectToViewer(id){
        console.log(id)
        imageViewerStore.id=id
        console.log(imageViewerStore.id)
        this.$router.push({ path: 'imageViewer'})
       },
       redirectToDetails(id){
        console.log(id)
        imageViewerStore.id=id
        console.log(imageViewerStore.id)
        this.$router.push({ path: 'detailView'})
       },
       redirectToImageTest(id){
        imageViewerStore.id=id
        this.$router.push({ path: 'imageTest'})    
       },
       redirectToRecordViewBook(id){
        console.log(id)
        imageViewerStore.id = id
        this.$router.push({ path: 'RecordViewBook'})
    },
       redirectToRecordViewManuscript(id){
        console.log(id)
        imageViewerStore.id = id
        this.$router.push({ path: 'RecordViewManuscript'})
       }
    }
}


</script>