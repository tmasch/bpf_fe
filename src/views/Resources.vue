<template>
    <div>
        <h1>List of Resources</h1>
    </div>
    <!--
    <button @click="$event => getResources()">
       Get resources
    </button>
-->
    <table class="table">
        <tbody>
            <tr v-for="(item, index) in items" :key="index">
                <td :key="indexColumn">{{ item.type }}</td>
                <td :key="indexColumn">{{ item.preview }}</td>
                <td :key="indexColumn">{{ item.id }}</td>
                <td>
                    <button @click="redirectToViewer(item.id)">View</button>
                    <button @click="redirectToDetails(item.id)">Details</button>
                    <button @click="redirectToImageTest(item.id)">Get Images</button>
                    <button @click="createImageRecord(item.id)">Create image record</button>
                    <button @click="redirectToRecordViewBook(item.id)" v-if="item.type == 'Book'">Book</button>
                    <button @click="redirectToRecordViewManuscript(item.id)"
                        v-if="item.type == 'Manuscript'">Manuscript</button>
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
    }, mounted() {
        this.getResources()
    },
    methods: {
        getResources() {
            const url = `${API_URL}/allResources`
            console.log(url)
            return axios.get(url,
                {
                }).then((response) => {
                    console.log(response.data)
                    this.items = response.data || ''
                })
        },
        getResource: async function (id) {
            const url = `${API_URL}/resource`
            console.log("getting resource")
            console.log(id)
            try {
                const response = await axios.get(url,
                    { params: { identifier: id } },
                    {}
                )
                return (response.data)
            } catch (e) { console.log(e) }
        },
        redirectToViewer(id) {
            console.log(id)
            imageViewerStore.id = id
            console.log(imageViewerStore.id)
            this.$router.push({ path: 'imageViewer' })
        },
        redirectToDetails(id) {
            console.log(id)
            imageViewerStore.id = id
            console.log(imageViewerStore.id)
            this.$router.push({ path: 'detailView' })
        },
        redirectToImageTest(id) {
            imageViewerStore.id = id
            this.$router.push({ path: 'imageTest' })
        },
        redirectToRecordViewBook(id) {
            console.log(id)
            imageViewerStore.id = id
            this.$router.push({ path: 'RecordViewBook' })
        },
        redirectToRecordViewManuscript(id) {
            console.log(id)
            imageViewerStore.id = id
            this.$router.push({ path: 'RecordViewManuscript' })
        },
        async createImageRecord(id) {
            console.log(id)
            const d = await this.getResource(id)
            console.log("Resource")
            console.log(d)
            var x_abs = d.metadata.images[0].frames[0].x_abs
            var y_abs = d.metadata.images[0].frames[0].y_abs
            var w_abs = d.metadata.images[0].frames[0].w_abs
            var h_abs = d.metadata.images[0].frames[0].h_abs
            console.log(x_abs)
            const url = `${API_URL}/createImageRecord`
            console.log("saving image")
            console.log(id)
            //var coords.id = id
            // params: { identifier: id, page : "0", x_abs: x_abs, y_abs: y_abs, w_abs: w_abs, h_abs: h_abs }
                        try {
                const response = await axios.post(url,
                { id: id, index : 0, x_abs: x_abs, y_abs: y_abs, w_abs: w_abs, h_abs: h_abs }
              )
            } catch (e) { console.log(e) }
        }
    }
}


</script>