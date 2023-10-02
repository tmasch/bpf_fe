<template>
   <!----
           <p>Step 2 (Books)</p>
        <p>Ingest ID: <samp>ingest_id</samp></p>
         <h1>Ingest Module</h1>
        <h2>Enter Book ID</h2>
        
        <form>
            <label for="manifest">Enter IIIF manifest of manuscript: </label>
            <input type="URL" id="manifest" name="manifest">
            <label for="range"> Canvasses: </label>
            <input type="text" id="range" name="range">
            <label for="bibliographic_ID">Additional bibliographic record: </label>
            <input type ="text" id="bibliographic_ID" name="bibliographic_ID">
            
        
        <br>
        <p> Separate canvas numbers by ";" or "-" for ranges (e.g., "1-10;350-370")</p>
        <p> If no canvas numbers are given, all canvasses will be downloaded and analysed</p>
        <br>
        <p> If the IIIF manifest does contain bibliographic references (e.g. to the GW, VD16 etc.), you can add a reference here.</p>
        <p> It should consist of the name of the bibliography and the ID of the book, e.g. "VD16 H 1234" or "GW M40784. </p>
        <p> This information will supersede any bibliographical reference in the IIIF manifest.</p>
        <input type="button" value="Check and complete catalogue records">
        </form>

-->
<div>
        <h1>Create new ressource</h1>
    </div>
    <div>
        iiif manifest url <input v-model="iiifUrl" /><br>
        

        <button @click="getMetadata()">
            Get Metadata
        </button>

    </div>

   <!----
        <button @click="getMetadata()">
            Start Download and Analysis
        </button>
    -->     
    
    <h3>Metadata:</h3>
    <v-table v-if="metadata">
        <tr v-if="metadata.bibliographic_information[0]">
            <td>Title:</td>
            <td>{{ metadata.bibliographic_information[0].title }}</td>
        </tr>
        <tr v-if="metadata.bibliographic_information[0]" v-for="(person, index) in metadata.bibliographic_information[0].persons" :key="index">
            <td>Person:</td>  
            <td :key="indexColumn">{{person["name"]}}</td>
            <td :key="indexColumn">{{person["id"]}}</td>
            <td :key="indexColumn">{{ person["role"] }}</td>
        </tr>      
        <tr v-if="metadata.bibliographic_information[0]" v-for="(place, index) in metadata.bibliographic_information[0].places" :key="index">
            <td>Place:</td>  
            <td :key="indexColumn">{{place["name"]}}</td>
            <td :key="indexColumn">{{place["id"]}}</td>
            <td :key="indexColumn">{{place["role"] }}</td>
        </tr>      
        <tr>
            <td>Repository:</td>
            <td>{{ metadata.repository }}</td>
        </tr>
        <tr>
            <td> Shelfmark:</td>
            <td> {{ metadata.shelfmark }}</td>
        </tr>
        <tr>
            <td>Number of Images:</td>
            <td>{{ metadata.numberOfImages }}</td>
        </tr>
        <tr>
            <td>MARCXML:</td>
            <td><a :href="metadata.markxml" target="_blank">{{ metadata.markxml }}</a></td>
        </tr>
        <tr>
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
            vd17: '',
            message: '',
            metadata: ''
        };
    },
    methods: {
        getMetadata() {
            const url = `${API_URL}/getMetadata`
            console.log(url)
            console.log(this.vd17)
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