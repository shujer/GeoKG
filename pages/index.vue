<template>
  <div class="container">
    <el-tabs type="border-card" tab-position="bottom" @tab-click="handleClick">
      <el-tab-pane label="图谱">
        <Graph/>
      </el-tab-pane>
      <el-tab-pane label="地图">
        <Map :points="mapData" />
      </el-tab-pane>
    </el-tabs>
    <div id="table">
      <Table :tableData="mapData" />
    </div>
  </div>
</template>

<script>
import Graph from '~/components/Graph.vue'
import Map from '~/components/Map.vue'
import Table from '~/components/Table.vue'
import {mapGetters, mapActions} from 'vuex'

export default {
  head: {
    title: 'Home | 首页'
  },
  data() {
    return {
      selected: 0
    }
  },
  components: {
    Graph,
    Map,
    Table
  },
  computed: {
    ...mapGetters(['mapData'])
  },
  async mounted() {
    await this.queryMapData()
  },
  methods: {
    ...mapActions(['queryMapData']),
    handleClick(tab, event) {
      this.selected = Number(tab.index)
    }
  }
}
</script>

<style>
#table {
  margin-top: 3rem;
}
.el-tabs__nav-scroll {
  display: flex;
  justify-content: center;
  overflow: hidden;
}

.el-tabs__content {
  width: 100%;
  height: 460px !important;
  overflow: hidden;
  height: 100%;
}
</style>
