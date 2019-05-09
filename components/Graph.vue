<template>
  <div :id="graphName" :style="{'width':width,'height':height}">
  </div>
</template>
<script>
export default {
  data() {
    return {
      width: "100%",
      height:"100%"
    }
  },
  props: {
    dataSource: {
      default: function() {
        return {}
      },
      type: Object
    },
    graphName: {
      default: 'graph',
      type: String
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.setGraph()
    })
  },
  watch: {
    dataSource: function(val) {
      this.setGraph()
    },
    graphType: function(val) {
      this.setGraph()
    }
  },
  methods: {
    setGraph() {
      if (this.dataSource.nodes) {
        this.$echarts.graph(
          this.graphName,
          this.graphName,
          this.dataSource.categories,
          this.dataSource.nodes,
          this.dataSource.links
        )
      }
    }
  }
}
</script>

<style>
</style>