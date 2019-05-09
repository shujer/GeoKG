<template>
  <div class="analyseContainer">
    <el-row :gutter="20">
      <el-col :span="12" id="kg1">
        <Graph :dataSource="kgdata1" :key="name1" :graphName="name1"/>
      </el-col>
      <el-col :span="12" id="kg2">
        <Graph :dataSource="kgdata2" :key="name2" :graphName="name2"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Graph from '~/components/Graph.vue'
import {getDatafromKG} from '~/services/api'
import {filterKGData} from '~/utils/resultHelper'

export default {
  head: {
    title: 'Analyse | 图谱分析'
  },

  data() {
    return {
      name1: 'entity1',
      name2: 'entity2',
      kgdata1: {
        nodes: [],
        links: [],
        categories: []
      },
      kgdata2: {
        nodes: [],
        links: [],
        categories: []
      }
    }
  },

  components: {
    Graph
  },

  watch: {
    $route: function(route) {
      window.location.reload()
    }
  },

  mounted() {
    // this.loading = true
  },

  methods: {
    async getKGData() {
      try {
        let data = await getDatafromKG(this.name, 'graph', this.entity, 0)
        let {kgdata} = filterKGData(data)
        if (kgdata) {
          this.kgdata = kgdata
        }
      } catch (err) {}
    }
  }
}
</script>

<style>
.analyseContainer {
  width: 80%;
  margin: 2rem auto 2rem auto;
}
#kg1 {
  height: 500px;
  background-color: #42b983;
}
#kg2 {
  height: 500px;
  background-color: aqua;
}
</style>
