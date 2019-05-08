<template>
  <div id="map" ref="allmap" :style="{'height': height, 'width': width}"></div>
</template>  
<script>
import {MP} from '~/utils/baidumap.js'
export default {
  data() {
    return {
      ak: 'agIYcxFrxnd5BKUZMqomPyCVUTWCq2pm',
      map: null
    }
  },
  props: {
    height: {
      type: String,
      default: '450px'
    },
    width: {
      type: String,
      default: '100%'
    },
    data: {
      type: Array,
      default: []
    }
  },
  methods: {
    addMessage(marker) {
      this.map.addOverlay(marker);
      
    },

    addMarker(point) {
      let {name, location} = point
      console.log(name, location)
      if (!location) return
      let mp = new BMap.Point(location.lng, location.lat)
      let label = new BMap.Label(name, {offset: new BMap.Size(20, -10)})
      let marker = new BMap.Marker(mp)
      this.map.addOverlay(marker)
      marker.setLabel(label)
    },

    addMarkers(data) {
      for (let i = 0; i < data.length; i++) {
        this.addMarker(data[i])
      }
    },

    loadMap() {
      MP(this.ak).then(BMap => {
        this.map = new BMap.Map(this.$refs.allmap)
        this.map.enableScrollWheelZoom(true)
        let point = new BMap.Point(115.0, 23.0)
        this.map.centerAndZoom(point, 8)
        this.map.addControl(new BMap.ScaleControl())
        this.map.addControl(new BMap.OverviewMapControl())
        const top_right_navigation = new BMap.NavigationControl({
          anchor: BMAP_ANCHOR_TOP_RIGHT
        })
        this.map.addControl(top_right_navigation)
        this.map.enableInertialDragging()
        this.map.enableContinuousZoom()
        this.map.setCurrentCity('广东')
        this.map.clearOverlays()
        this.addMarkers(this.data)
      })
    },



  },

  mounted() {
    this.loadMap()
  }
}
</script>