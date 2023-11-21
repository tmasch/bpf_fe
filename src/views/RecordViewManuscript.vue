<template>
    <h1> Detail view - Manuscript</h1>
    <v-table>
        <tr>
            <td>
                Manuscript id:
            </td>
                {{ record.id }}
        </tr>
        </v-table>
        <br>
        <br>
        <v-table v-for="(repository, repository_id) in record.repository" :key="repository_id">
        <tr>
        <td>Repository:</td>
        <td>{{ repository.preview }}</td>
        <td v-if="repository.current=true">(Current)</td>
        <td v-else>(Historical)</td>
        <td><button @click="showOrgRecord(repository.place_id)">Show repository</button></td>
        </tr>   
     
        <tr v-if="repository.id_preferred">
        <td>Current shelfmark: </td>
        <td>{{ repository.id_preferred }}</td>
        </tr>
        <tr v-if="repository.id_variant">
            <span v-if="repository.id_variant.length">
        <td>former shelfmarks:</td></span>
        <td v-for="(variant, variant_id) in repository.id_variant" :key="variant_id">{{ variant }}</td>
    
        </tr>
    </v-table>
    
</template>

<script>
import { useImageViewerStore } from '@/stores/ImageViewerStore'
const imageViewerStore = useImageViewerStore()
const personViewerStore = useImageViewerStore()

import axios from 'axios'
const API_URL = 'http://localhost:8000'

axios.interceptors.request.use(request => {
//  console.log('Starting Request', JSON.stringify(request, null, 2))
  return request
})

axios.interceptors.response.use(response => {
 // console.log('Response:', JSON.stringify(response, null, 2))
  return response
})

export default {
  data() {
    return {
      id : '',
      record : '',
    };
  },  mounted() {
    this.initDetails();
  },
  methods: {
        async initDetails() {
      console.log("ID")
      console.log(imageViewerStore.id)
      const record= await this.getManuscriptRecord(imageViewerStore.id)
      console.log(record)
      this.id = imageViewerStore.id
      this.record = record
    },
    getManuscriptRecord: async function(id)  {
            const url = `${API_URL}/getManuscriptRecord`
//            console.log(url)
//            id="TnvkOePmvMo3cUDoJLalS"
            console.log("getting book record")
            console.log(id)
            try{ 
            const response = await axios.get(url,
                {params: {id : id} },
                {}
                )
                //.then((response) => {
                  //  console.log("response now")
               //    console.log(response.data)
                    //this.items = response.data || ''
               // })
//            console.log(data)
              console.log(response.data)  
              return(response.data)

                } catch (e)
                {console.log(e)}
    },
    showOrgRecord(repository){
      console.log("single_org: ")
      console.log(repository)
      personViewerStore.id = repository
      console.log("ID in Book vue: ")
      console.log(personViewerStore.id)
      this.$router.push({ path: 'RecordViewOrg'})
    }
    }
  }

</script>