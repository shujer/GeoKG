<template>
    <div id="map" ref="allmap" :style="{'height': height, 'width': width}"></div>
</template>  
<script>
import {MP} from '~/utils/baidumap.js'
export default {
  data() {
    return {
      ak: 'agIYcxFrxnd5BKUZMqomPyCVUTWCq2pm'
    }
  },
  props: {
    height: {
      type: String,
      default: '440px'
    },
    width: {
      type: String,
      default: '100%'
    }
  },
  methods: {
    loadMap() {
      MP(this.ak).then(BMap => {
        let map = new BMap.Map(this.$refs.allmap)
        map.centerAndZoom(new BMap.Point(114.3, 30.6), 11) // 初始化地图,设置中心点坐标（经纬度/城市的名称）和地图级别
        map.addControl(
          new BMap.MapTypeControl({
            mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
          })
        )
        map.setCurrentCity('武汉')
        map.enableScrollWheelZoom(true)
      })
    }
  },
  mounted() {
    console.log('map')
    this.loadMap()
  }
}
</script>