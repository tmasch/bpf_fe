<template>
    <div>
        <h1>Create new ressource</h1>
    </div>
    <div>
        iiif manifest url <input v-model="iiifUrl" /><br>
        VD16-Nummer <input v-model="vd16" /><br>

        <button @click="getMetadata()">
            Get Metadata
        </button>

    </div>
    <h3>Metadata:</h3>
    <v-table>
        <tr v-if="metadata">
            <td>Title:</td>
            <td>{{ metadata.title }}</td>
        </tr>
        <tr v-if="metadata">
            <td>Location:</td>
            <td>{{ metadata.location }}</td>
        </tr>
        <tr v-if="metadata">
            <td>Number of Images:</td>
            <td>{{ metadata.numberOfImages }}</td>
        </tr>
        <tr v-if="metadata">
            <td>MARCXML:</td>
            <td><a :href="metadata.markxml" target="_blank">{{ metadata.markxml }}</a></td>
        </tr>
        <tr v-if="metadata">
            <td>IIIF URL</td>
            <td><a :href="metadata.iiifUrl" target="_blank">{{ metadata.iiifUrl }}</a></td>
        </tr>
    </v-table>
    <button @click="$event => createNewRessource(metadata)">
        Create new ressource
    </button>
</template>
// https://api.digitale-sammlungen.de/iiif/presentation/v2/bsb00087481/manifest

<script>
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
            iiifurl: '',
            vd16: '',
            message: '',
            metadata: ''
        };
    },
    methods: {
        getMetadata() {
            const url = `${API_URL}/getMetadata`
            console.log(url)
            return axios.get(url,
                {
                    params: {
                        iiifUrl: this.iiifUrl
                    }
                }).then((response) => {
                    console.log(response.data)
                    this.metadata = response.data || ''
                })
        },
        createNewRessource(metadata) {
            const url = `${API_URL}/createNewRessource`
            console.log(url)
            console.log(metadata)
            console.log(this.metadata)
            return axios.post(url,
                metadata
                ).then((response) => {
                    console.log(response.data)
                    this.message = response.data || ''
                })
        }
    }
}


</script>