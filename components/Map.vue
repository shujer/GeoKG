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
    points: {
      type: Array,
      default: []
    }
  },
  methods: {
    showMessage(point, i) {
      let {name, has_picture} = this.points[i]
      let href = `/view?name=${name}&entity=BuildingComplex`
      let opt = {
        width: 150,
        height: 150,
        title: `<a href=${href} target='_blank'><h5>${name}</h5></a>`
      }
      let infoWindow = new BMap.InfoWindow(
        `<img style="float: left" id="imgDemo" src=${has_picture} width='150' height='150' />`,
        opt
      )
      this.map.openInfoWindow(infoWindow, point)
    },

    addMessage(marker, point, i) {
      this.map.addOverlay(marker)
      var that = this
      marker.addEventListener('mouseover', function(e) {
        that.showMessage(point, i)
      })
    },

    addMarker(data, i) {
      let {name, location} = data
      if (!location) return
      let point = new BMap.Point(location.lng, location.lat)
      let label = new BMap.Label(name, {offset: new BMap.Size(20, -10)})
      let marker = new BMap.Marker(point)
      this.map.addOverlay(marker)
      marker.setLabel(label)
      this.addMessage(marker, point, i)
    },

    addMarkers(data) {
      for (let i = 0; i < data.length; i++) {
        this.addMarker(data[i], i)
      }
    },

    loadMap() {
      MP(this.ak).then(BMap => {
        this.map = new BMap.Map(this.$refs.allmap)
        this.map.enableScrollWheelZoom(true)
        let point = new BMap.Point(110.0, 25.0)
        this.map.centerAndZoom(point, 7.5)
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
        this.addMarkers(this.points)
      })
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.loadMap()
    })
  }
}
</script>