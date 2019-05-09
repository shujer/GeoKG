<template>
  <div id="graph">
  </div>
</template>
<script>
export default {
  data() {
    return {
      myChart: null
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
      default: '',
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
          'graph',
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
#graph {
  width: 100%;
  height: 100%;
}
</style>