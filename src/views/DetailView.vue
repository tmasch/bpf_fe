<template>
    Detail view<br>
    <tr>
      <td>{{id}}</td>
 <!--     <td>{{ d.bibliograpic_information[0].title }}</td>=-->
    </tr>
  <pre>{{ d }}</pre>
</template>

<script lang="ts">
import { useImageViewerStore } from '@/stores/ImageViewerStore'
const imageViewerStore = useImageViewerStore()

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
      d : ''
    };
  },  mounted() {
    this.initDetails();
  },
  methods: {
    async initDetails() {
      console.log("ID")
      console.log(imageViewerStore.id)
      const d= await this.getResource(imageViewerStore.id)
      console.log(d)
      this.id = imageViewerStore.id
      this.d = d
    },
    getResource: async function(id)  {
            const url = `${API_URL}/resource`
//            console.log(url)
//            id="TnvkOePmvMo3cUDoJLalS"
            console.log("getting resource")
            console.log(id)
            try{ 
            const response = await axios.get(url,
                {params: {identifier : id} },
                {}
                )
                //.then((response) => {
                  //  console.log("response now")
               //    console.log(response.data)
                    //this.items = response.data || ''
               // })
//            console.log(data)
                return(response.data)
                } catch (e)
                {console.log(e)}
       },
  }
};
</script>