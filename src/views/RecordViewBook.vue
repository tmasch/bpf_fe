<template>
    <h1> Detail view - Printed Book</h1>
    
    <span v-if="record.bibliographic_id">
    <h3> Bibliographic records</h3>
    <v-table>
      <tr v-for="(single_bibliographic_id, bibliographic_id_index) in record.bibliographic_id" :key ="bibligraphic_id_index">
      <td> {{single_bibliographic_id.name}}</td>
      <td> {{single_bibliographic_id.id}}</td>
      <td v-if="single_bibliographic_id.uri"><a v-bind:href="single_bibliographic_id.uri" target="_blank"><button>Link</button></a></td>

      </tr>
      <tr>
        <td>Book id: </td>
        <td>{{ record.id }}</td>
      </tr>
    </v-table>
    <br>
    <br>
    </span>

    <h3> Title</h3>
    <v-table>
      <tr>
        <td></td>
        <td>{{ record.title }}</td>
      </tr>
      <tr v-if="record.volume_number">
        <td> volume: </td>
        <td> {{ record.volume_number }}</td>
      </tr>
      <tr v-if="record.part_title">
        <td> volume title:   </td>
        <td> {{ record.part_title }}</td>
      </tr>
    </v-table>
    <br>
    <br>

<span v-if="record.date_string">
<h3>Date</h3>
<v-table>
  <tr>
    <td>{{ record.date_string }} ({{ record.date_start[0] }}-{{record.date_start[1]}}-{{record.date_start[2]}} - {{ record.date_end[0] }}-{{ record.date_end[1] }}-{{ record.date_end[2] }})</td>
  </tr>
</v-table>
<br>
<br>
</span>

    <span v-if="record.persons">
      <span v-if="record.persons.length">
    <h3>Persons</h3>
    <v-table>
      <tr v-for="(single_person, person_index) in record.persons" :key="person_index">
      <td>{{ single_person.role }}</td>
      <td>{{ single_person.preview }}</td>
      <td><button @click="showPersonRecord(single_person.id)">Show person</button> </td>
      </tr>
    </v-table>
    <br>
    <br>
  </span>
  </span>
  <span v-if="record.organisations">
    <span v-if="record.organisations.length">
    <h3>Organisations</h3>
    <v-table v-if="record.organisations.length">
      <tr v-for="(single_org, organisation_index) in record.organisations" :key="organisation_index">
      <td>{{ single_org.role }}</td>
      <td>{{ single_org.preview }}</td>
      <td><button @click="showOrgRecord(single_org.id)">Show organisation</button> </td>
      </tr>
      

    </v-table>
    <br>
    <br>
  </span>
  </span>
  <span v-if="record.places">
  <span v-if="record.places.length">
    <h3>Places</h3>
    <v-table>
      <tr v-for="(single_place, place_index) in record.places" :key="place_index">
      <td>{{ single_place.role }}</td>
      <td>{{ single_place.preview }}</td>
      <td><button @click="showPlaceRecord(single_place.id)">Show place</button> </td>
      </tr>
    </v-table>
    <br>
    <br>
  </span>
</span>

    <tr>
      <td>Book ID: </td>
      <td>{{id}}</td>
 <!--     <td>{{ d.bibliograpic_information[0].title }}</td>=-->
    </tr>
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
      single_person : '',
      single_org : '',
      single_place : ''
    };
  },  mounted() {
    this.initDetails();
  },
  methods: {
        async initDetails() {
      console.log("ID")
      console.log(imageViewerStore.id)
      const record= await this.getBookRecord(imageViewerStore.id)
      console.log(record)
      this.id = imageViewerStore.id
      this.record = record
      personViewerStore.type_old = "book" // this determines, if a return from a person, organisation etc. file will go to a 'manuscript' record or a 'book' record
    },
    getBookRecord: async function(id)  {
            const url = `${API_URL}/getBookRecord`
//            console.log(url)
//            id="TnvkOePmvMo3cUDoJLalS"
            console.log("getting book record")
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
    showPersonRecord(single_person){
      console.log("single_person: ")
      console.log(single_person)
      console.log("current record: ")
      console.log(personViewerStore.id)
      personViewerStore.id_old = personViewerStore.id
      personViewerStore.id = single_person
      console.log("ID in Book vue: ")
      console.log(personViewerStore.id)
      this.$router.push({ path: 'RecordViewPerson'})
    },
    showOrgRecord(single_org){
      console.log("single_org: ")
      console.log(single_org)
      perxsonViewerStore.id_old = personViewerStore.id
      personViewerStore.id = single_org
      console.log("ID in Book vue: ")
      console.log(personViewerStore.id)
      this.$router.push({ path: 'RecordViewOrg'})
    },
    showPlaceRecord(single_place){
      console.log("single_place: ")
      console.log(single_place)
      personViewerStore.id_old = personViewerStore.id
      personViewerStore.id = single_place
      console.log("ID in Book vue: ")
      console.log(personViewerStore.id)
      this.$router.push({ path: 'RecordViewPlace'})
    }
    }
  }

</script>