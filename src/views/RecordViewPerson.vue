<template>
    <h1> Detail view - Person</h1>

    <span v-if="record.external_id">
    <h3> Person records</h3>
    <v-table>
      <tr v-for="(single_external_id, external_id_index) in record.external_id" :key ="external_id_index">
      <td> {{single_external_id.name}}</td>
      <td> {{single_external_id.id}}</td>
      <td v-if="single_external_id.uri"><a v-bind:href="single_external_id.uri" target="_blank"><button>Link</button></a></td>
      </tr>
      <tr>
        <td>Person id: </td>
        <td>{{ record.id }}</td>
      </tr>
      <tr>
        <td>Person types: </td>
        <td v-for="(type1, type1_index) in record.person_type1" :key= "type1_index">{{ type1 }}</td>
      </tr>
      <tr v-if="record.sex">
      <td>Sex: </td>
      <td>{{ record.sex }}</td></tr>
    </v-table>
    <br>
    <br>
    </span>

    <h3> Name</h3>
    <v-table>
      <tr>
        <td></td>
        <td>{{ record.name_preferred }}</td>
      </tr>
      </v-table>   
      <span v-if="record.name_variant">
        <br>
        <br>
        <h3> Variant Names</h3>
      <v-table>
        <tr v-for="(variant, variants_index) in record.name_variant" :key="variants_index">
        <td></td>
        <td> {{ variant }}</td>
      </tr>
    </v-table>
    <br>
    <br>
  </span>
   


    <span v-if="record.dates_from_source">
  <span v-if="record.dates_from_source.length">
<h3>Dates</h3>
<v-table>
  <tr v-for="(date, dates_index) in record.dates_from_source" :key="dates_index">
    <td v-if="date.date_aspect=='a'">active </td>
    <td> {{ date.datestring }} </td>
    <td> ({{date.date_start[0]}}-{{date.date_start[1]}}-{{date.date_start[2]}} - {{date.date_end[0]}}-{{date.date_end[1]}}-{{date.date_end[2]}})</td>
    <td>; source: {{ date.datetype }} {{ date.datestring_raw }}</td>
  </tr>
</v-table>
<br>
<br>
</span>
</span>

    <span v-if="record.connected_persons">
      <span v-if="record.connected_persons.length">
    <h3>Connected Persons</h3>
    <v-table>
      <tr v-for="(single_person, person_index) in record.connected_persons" :key="person_index">
      <td v-if="single_person.connection_type">{{ single_person.connection_type }} </td>
      <td> {{ single_person.name }}</td>
      <td><div v-if="single_person.connection_comment"> {{single_person.connection_comment }}</div></td>
      <td><div v-if="single_person.connection_time">({{ single_person.connection_time }})</div></td>      
      <td v-if="single_person.id"><button @click="showConnectedPersonRecord(single_person.id)">Show connected person</button> </td>
      </tr>
    </v-table>
    <br>
    <br>
  </span>
  </span>
  <span v-if="record.connected_organisations">
    <span v-if="record.connected_organisations.length">
    <h3>Connected Organisations</h3>
    <v-table v-if="record.connected_organisations.length">
      <tr v-for="(single_organisation, organisation_index) in record.connected_organisations" :key="organisation_index">
        <td v-if="single_organisation.connection_type">{{ single_organisation.connection_type }} </td>      
      <td>{{ single_organisation.name }}</td>
      <td><div v-if ="single_organisation.connection_comment">{{ single_organisation.connection_comment }}</div></td>
      <td><div v-if="single_organisation.connection_time">({{ single_organisation.connection_time }})</div></td>            
      <td v-if ="single_organisation.id"><button @click="showConnectedOrgRecord(single_organisation.id)">Show connected organisation</button></td>
    </tr>
      

    </v-table>
    <br>
    <br>
  </span>
  </span>
  <span v-if="record.connected_locations">
  <span v-if="record.connected_locations.length">
    <h3>Connected Places</h3>
    <v-table>
      <tr v-for="(single_place, place_index) in record.connected_locations" :key="place_index">
      <td v-if="single_place.connection_type">{{ single_place.connection_type }} </td>
      <td>{{ single_place.name }}</td>
      <td><div v-if="single_place.connection_comment">({{ single_place.connection_comment }})</div></td>
      <td><div v-if="single_place.connection_time">({{ single_place.connection_time }})</div></td>
      <td v-if ="single_place.id"><button @click="showConnectedPlaceRecord(single_place.id)">Show connected place</button></td>
    </tr>
    </v-table>
    <br>
    <br>
  </span>
  </span>
  <span v-if="record.comments">
  <h3>Comments</h3>
  <v-table>
    <tr>
      <td>{{ record.comments }}</td>
    </tr>
  </v-table>
  </span>
<br>
<button @click="goBack()">Return</button>

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
      single_person : ''
    };
  },  mounted() {
    this.initDetails();
//  }, watch: {
//    loadNewPerson {if (loadNewPerson == true) {
//      console.log("loading new person")
//      this.initDetails}}
  },
  methods: {
        async initDetails() {
      console.log("ID")
      console.log(personViewerStore.id)
      const record= await this.getPersonRecord(personViewerStore.id)
      console.log(record)
      this.id = personViewerStore.id
      this.book_id = imageViewerStore.id
      console.log("book ID")
      console.log(this.book_id)
      this.record = record
    },
    getPersonRecord: async function(id)  {
            const url = `${API_URL}/getPersonRecord`
//            console.log(url)
//            id="TnvkOePmvMo3cUDoJLalS"
            console.log("getting person record")
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
              console.log(response.data)  
              return(response.data)

                } catch (e)
                {console.log(e)}
    },
    showConnectedPersonRecord(single_person){
      console.log("single_person: ")
      console.log(single_person)
      personViewerStore.id = single_person
//      let loadNewPerson = true
      console.log("ID in Book vue: ")
      console.log(personViewerStore.id)
      this.initDetails()
      //this.$router.push({ path: 'RecordViewPerson'})
    },
    showConnectedOrgRecord(single_organisation){
      console.log("single_organisation: ")
      console.log(single_organisation)
      personViewerStore.id = single_organisation
      this.$router.push({ path: 'RecordViewOrg'})
    },
    showConnectedPlaceRecord(single_place){
      console.log("single_place: ")
      console.log(single_place)
      personViewerStore.id = single_place
      this.$router.push({ path: 'RecordViewPlace'})
    },
    goBack() {
      console.log("Old address for going back: ")
      console.log(personViewerStore.id_old)
      console.log(imageViewerStore.id)
      personViewerStore.id = personViewerStore.id_old
      this.$router.push({ path: 'RecordViewBook'})
    }
}
}
</script>