<template>
   <!--
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
        iiif manifest url  <input v-model="iiifUrl" />   
        <input type="radio" id="Book" value="b" v-model="material" />
        <label for="Book">printed book</label>
        <input type="radio" id="Manuscript" value="m" v-model="material" />
        <label for="Manuscript">manuscript</label>
        
        

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
    <!----<v-table v-if="metadata">
        <tr>
            <td width = 150></td>
            <td width = 450></td>
            <td width = 200></td>
            <td width = 400></td>
        </tr>
        <tr v-if="metadata.material">
            <td>Material:</td> 
            <td>{{ metadata.material }}</td>   
        </tr>
        <tr v-if="metadata.bibliographic_information[0]">
            <td>Bibliographic ID:</td>
            <td>{{ metadata.bibliographic_information[0].bibliographic_id[0].name }} {{ metadata.bibliographic_information[0].bibliographic_id[0].id}}</td>
        </tr>
        <tr v-if="metadata.bibliographic_information[0]">
            <td>Title:</td>
            <td>{{ metadata.bibliographic_information[0].title }}</td>
        </tr>
    
        <tr v-if="metadata.bibliographic_information[0]">
            <td>Imprint:</td>
            <td>{{ metadata.bibliographic_information[0].printing_information }}</td>
        </tr>
        <tr v-if="metadata.bibliographic_information[0]" v-for="(person, index) in metadata.bibliographic_information[0].persons" :key="index">
            <td>Person ({{ person["role"] }}): </td>  
            <td :key="indexColumn">{{person["name"]}}</td>
            <td :key="indexColumn">{{person["id_name"]}} {{person["id"]}}</td>
            <td :key="indexColumn" v-if="metadata.bibliographic_information[0].persons[index].internal_id"> {{person["internal_id_preview"]}}</td>
            <td v-else v-for="(candidate, number) in metadata.bibliographic_information[0].persons[index].potential_candidates" :key="number"> 
            <input type="radio" id="candidate" value="number" v-model="chosen_person" />
            <label for="candidate">{{ candidate.preview }}<br></label>
            
            </td>
        </tr>
             
        <tr v-if="metadata.bibliographic_information[0]" v-for="(place, index) in metadata.bibliographic_information[0].places" :key="index">
            <td>Place ({{place["role"] }}): </td>  
            <td :key="indexColumn">{{place["name"]}}</td>
            <td :key="indexColumn">{{place["id_name"]}} {{place["id"]}}</td>
        </tr>
        <tr v-if="metadata.bibliographic_information[0]">
            <td>Date:</td>
            <td>{{ metadata.bibliographic_information[0].printing_date }}</td>
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
            <td>Number of Pages:</td>
            <td>{{ metadata.numberOfImages }}</td>
        </tr>
        <tr>
            <td>IIIF URL</td>
            <td><a :href="metadata.iiifUrl" target="_blank">{{ metadata.iiifUrl }}</a></td>
        </tr>
    </v-table>
    <br>
-->     


    <v-table v-if="metadata">
        <tr>
            <td width = 220></td>
            <td width = 450></td>
            <td width = 450></td>
        </tr>
        <tr v-if="metadata.material">
            <td>Material:</td> 
            <td>{{ metadata.material }}</td>   
        </tr>
        <tr v-if="metadata.bibliographic_information[0]">
            <td>Bibliographic ID:</td>
            <td>{{ metadata.bibliographic_information[0].bibliographic_id[0].name }} {{ metadata.bibliographic_information[0].bibliographic_id[0].id}}</td>
        </tr>
        <tr v-if="metadata.bibliographic_information[0]">
            <td>Title:</td>
            <td>{{ metadata.bibliographic_information[0].title }}</td>
        </tr>
    
        <tr v-if="metadata.bibliographic_information[0]">
            <td>Imprint:</td>
            <td>{{ metadata.bibliographic_information[0].printing_information }}</td>
        </tr>
        <tr v-if="metadata.bibliographic_information[0]" v-for="(person, index_persons) in metadata.bibliographic_information[0].persons" :key="index_persons">
            <td v-if="person.role=='prt' || person.role== 'pbl'"> Person (
                <input type="radio" id="publisher" value="pbl" v-model="metadata.bibliographic_information[0].persons[index_persons].role">
                <label for="publisher"> Publisher</label>
                <input type="radio" id="printer" value="prt" v-model="metadata.bibliographic_information[0].persons[index_persons].role">
                <label for="printer"> Printer)</label>

                </td>  
                <td v-else> Person ({{ person["role"] }})</td>
            <td>{{person["name"]}} <span v-if="metadata.bibliographic_information[0].persons[index_persons].id">({{person["id_name"]}} {{person["id"]}}) </span></td>
            <td> 
                <table>
                <tr> <td v-if="metadata.bibliographic_information[0].persons[index_persons].internal_id"> {{person["internal_id_preview"]}}</td></tr>
                <tr v-if="!metadata.bibliographic_information[0].persons[index_persons].internal_id" v-for="(candidate, number) in metadata.bibliographic_information[0].persons[index_persons].potential_candidates" :key="number">
                <td> <input type="radio" v-bind:id="candidate.preview" v-bind:value= "number" v-model="metadata.bibliographic_information[0].persons[index_persons].chosen_candidate">
                <label for="candidate">{{ candidate.preview }} </label>
                </td></tr>
                <tr v-if="!metadata.bibliographic_information[0].persons[index_persons].internal_id"> 
                    <td><!-- <input type="radio" id="new" vbind:value="len(metadata.bibliographic_information[0].persons[index_persons].potential_candidates)" v-model="metadata.bibliographic_information[0].persons[index_persons].chosen_candidate"> -->
                        or enter other GND number: <input v-model="new_authority_id[index_persons]" /> 
                        <div v-if="additional_person_authority"> 
                            <label for="new">{{ additional_person_authority.preview }}</label></div>
                        <button @click="loadNewAuthorityRecord(new_authority_id, index_persons)">load</button>

                </td></tr>

                <tr><td> 

                </td></tr>
            </table>
            
            
            

            
            </td>
        </tr>
        
        <tr v-if="metadata.bibliographic_information[0]" v-for="(place, index) in metadata.bibliographic_information[0].places" :key="index">
            <td>Place ({{place["role"] }}): </td>  
            <td>{{place["name"]}}</td>
            <td>{{place["id_name"]}} {{place["id"]}}</td>
        </tr>
        <tr v-if="metadata.bibliographic_information[0]">
            <td>Date:</td>
            <td>{{ metadata.bibliographic_information[0].printing_date }}</td>
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
            <td>Number of Pages:</td>
            <td>{{ metadata.numberOfImages }}</td>
        </tr>
        <tr>
            <td>IIIF URL</td>
            <td><a :href="metadata.iiifUrl" target="_blank">{{ metadata.iiifUrl }}</a></td>
        </tr>
    </v-table>

    <p v-if="metadata.bibliographic_information"> {{ metadata.bibliographic_information[0] }}             </p>


<!--        
    </v-table>
    <span v-if="metadata.bibliographic_information">
    <span v-for="(candidate, person_number) in metadata.bibliographic_information[0].persons[2].potential_candidates">
        <input type= "radio" v-bind:id="candidate" v-bind:value="person_number" v-model="choice_experiment">
        <label for="{{ candidate}}">{{ candidate.preview }}<br></label>
    </span>
    <p>Chosen Number: {{ choice_experiment }}</p>
    </span>

    <span v-if="metadata.bibliographic_information">
        <input type="radio" id="candidate0" value="0" v-model="choice_experiment2" />
        <label for="candidate0"> label candidate0</label>
        <input type="radio" id="candidate1" value="1" v-model="choice_experiment2" />
        <label for="candidate1">label candidate1</label>
        <input type="radio" id="candidate2" value="2" v-model="choice_experiment2" />
        <label for="candidate2">label candidate 2</label>
        <p>Chosen Number: {{ choice_experiment2 }}</p>
        
    </span>

-->

    <span v-if="metadata && metadata.bibliographic_information[0] == undefined && material == 'b'">
        additional bibliographical information  <input v-model="additional_bid" />  
    
        <button @click="$event => callAdditionalBibliographicInformation(additional_bid)">
        Import missing information
        </button>      
        </span>
        
    <button @click="$event => shownumber()">
        Show number in console
    </button>


    <button @click="$event => createNewRessource(metadata)">
        Create new ressource
    </button>

</template>
// https://api.digitale-sammlungen.de/iiif/presentation/v2/bsb00087481/manifest

<script>
import axios from 'axios'
const API_URL = 'http://localhost:8000'
let number = 0



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
            metadata: '',
            material: '',
            additional_bid: '',
            additional_bi: '',
            choice_experiment: '',
            choice_experiment2: '',
            chosen_person1:'',
            new_authority_id: []
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
                        iiifUrl: this.iiifUrl,
                        material: this.material
                    }
                }).then((response) => {
                    console.log(response.data)
                    this.metadata = response.data || ''
                    console.log(this.material)
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
        },
        callAdditionalBibliographicInformation(additional_bid) {
            const url = `${API_URL}/callAdditionalBibliographicInformation`
            console.log(url)
            console.log(additional_bid)

            return axios.get(url,
                {
                    params: {
                        additional_bid: this.additional_bid
                    }
                }).then((response) =>  {
                    console.log(response.data)
                    this.additional_bi = response.data || ''                    
                    this.metadata.bibliographic_information.push(this.additional_bi)
                })
            
        },
        loadNewAuthorityRecord(new_authority_id, index_persons) {
            console.log(this.new_authority_id)
            const url = `${API_URL}/loadNewAuthorityRecord`
            return axios.get(url,
                {
                    params: {
                        new_authority_id: this.new_authority_id[index_persons]
                    }
                }).then((response) =>  {
                    console.log(response.data)
                    this.additional_person_authority = response.data || ''                    
                    this.metadata.bibliographic_information[0].persons[index_persons].potential_candidates.push(this.additional_person_authority[0])
                    let position = this.metadata.bibliographic_information[0].persons[index_persons].potential_candidates.length -1
                    console.log(position)
                    this.metadata.bibliographic_information[0].persons[index_persons].chosen_candidate = position
                })

        }
    
    }
}

//if(this.material) {
//    Bibliographic_information_missing = true
//    console.log("Material is indicated") 
//}

</script>