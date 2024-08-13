<template>
    Image Viewer testing with id
    <div style="width:100%; height:800px;" id="osd"></div>
</template>
<script>
import OpenSeadragon from "openseadragon";
window.OpenSeadragon = OpenSeadragon;

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
  name: "Viewer",
  data() {
    return {
      viewer: null,
      items : ''
    };
  },
  mounted() {
    this.initViewer();
  },
  methods: {
    getResource: async function(id)  {
            const url = `${API_URL}/resource`
//            console.log(url)
//            id="TnvkOePmvMo3cUDoJLalS"
            console.log("getting ressource")
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
    async initViewer() {
      console.log("ID")
      console.log(imageViewerStore.id)
      console.log("getting images")
      const d= await this.getResource(imageViewerStore.id)
      console.log("init Viewer here");
///      console.log(d)
  //    console.log(d.images)
      var source = []
      var overlays = []
//      for (let image in d.images){
      d.images.forEach(function (image){
//        console.log("images")
 //       console.log(image.baseurl)
        const url=image.baseurl+"/full/full/0/default.jpg"
   //     console.log(url)
        var im = { type: "image", url : url}
        source.push(im)
        console.log("frames")
        var frames = []
        if(image.frames){
//          console.log(image.frames)
          console.log("loop through frames")
          image.frames.forEach(function (frame){
            console.log(frame)
          var f = {
            px : frame.x_abs,
            py : frame.y_abs,
            width : frame.w_abs,
            height : frame.h_abs
          } 
          console.log(f)
          frames.push(f)
          })
          console.log("end loop")
        }
        overlays.push(frames)
        console.log(overlays)


     })
//     console.log(source)
      // var source = [
      //   {
      //     type: "image",
      //     url:
      //       "https://iiif.bodleian.ox.ac.uk/iiif/image/0ef4d2de-02ec-4837-a3ab-51c59bb81d65/full/1500,/0/default.jpg"
      //   }
      // ];
      var viewer = OpenSeadragon({
        id: "osd",
        prefixUrl: "//openseadragon.github.io/openseadragon/images/",
        showNavigator: true,
        sequenceMode: true,
    showReferenceStrip: true,
            tileSources: source
      });
      viewer.addHandler('open', function() {
        overlays.forEach(function(frames, setIndex) {
          var tiledImage = viewer.world.getItemAt(setIndex);
          if (!frames || !tiledImage) {
            console.log("no overlays")
            return;
          }
          
          frames.forEach(function(overlay) {
//            console.log(o)
//            if (o) {
 //           o.forEach(function(overlay){
            var rect = new OpenSeadragon.Rect(overlay.px, overlay.py, overlay.width, overlay.height);
            rect = tiledImage.imageToViewportRectangle(rect);
            overlay.x = rect.x;
            overlay.y = rect.y;
            overlay.width = rect.width;
            overlay.height = rect.height;
            overlay.className = 'frame';
//className: 'highlight'
            delete overlay.px;
            delete overlay.py;
            viewer.addOverlay(overlay);
   //         });
    //      }
          });
        })
      });
      this.viewer=viewer
      //this.viewer.initializeAnnotations()
      /* OpenSeadragon({
        animationTime: 0.4,
        id: "viewer-image",
        tileSources: {
          type: "image",
          url: "https://picsum.photos/id/237/200/300"
        },
        visibilityRatio: 0.2
      });*/
    }

  }
};
</script>