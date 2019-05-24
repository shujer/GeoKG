<template>
  <div class="container">
    <el-tabs type="border-card" tab-position="bottom" @tab-click="handleClick" style="margin-bottom: 4rem">
      <el-tab-pane label="图谱">
        <!-- <Graph/> -->
        <img src="/full.png" alt="all" class="graphImage"/>
      </el-tab-pane>
      <el-tab-pane label="地图">
        <Map :points="mapData" />
      </el-tab-pane>
    </el-tabs>
    <div style="border-right: 0.5px dashed gray; border-bottom: 0.5px dashed gray;">
      <p class="start">建筑统计图</p>
      <div id="view_bag"></div>
      <div id="view_line"></div>
    </div>
    <div id="table">
      <!--<Table :tableData="mapData" />-->
      <p class="start">建筑详细信息（左侧按钮点击查看）</p>
      <Table style="width: 100%" class="info-table"/>
    </div>
  </div>
</template>

<script>
import Graph from '~/components/Graph.vue'
import Map from '~/components/Map.vue'
import Table from '~/components/Table.vue'
import {mapGetters, mapActions} from 'vuex'
import echarts from 'echarts'
export default {
  head: {
    title: '岭南侨乡建筑知识图谱 | 首页'
  },
  data() {
    return {
      selected: 0,
      pie_charts: '',
      line_charts: '',
      total_view_info: {
        title : {
          text: '六大侨乡建筑分布统计',
          x:'center'
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient : 'vertical',
          x : 'left',
          data:['广府侨乡：13','五邑侨乡：18','潮汕侨乡：16','东江兴梅侨乡：12','琼东北侨乡：8','桂东南侨乡：4']
          //data:['广府侨乡','五邑侨乡','潮汕侨乡','东江兴梅侨乡','琼东北侨乡','桂东南侨乡']
        },
        toolbox: {
          show : true,
          feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {
              show: true,
              type: ['pie', 'funnel'],
              option: {
                funnel: {
                  x: '25%',
                  width: '50%',
                  funnelAlign: 'left',
                  max: 1548
                }
              }
            },
            restore : {show: true},
            saveAsImage : {show: true}
          }
        },
        calculable : true,
        series : [
          {
            name:'侨乡建筑分布',
            type:'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
              {value:13, name:'广府侨乡：13'},
              {value:18, name:'五邑侨乡：18'},
              {value:16, name:'潮汕侨乡：16'},
              {value:12, name:'东江兴梅侨乡：12'},
              {value:8, name:'琼东北侨乡：8'},
              {value:4, name:'桂东南侨乡：4'}
            ]
          }
        ]
      },
      line_charts_data: {
        title : {
          text: '知识图谱数据量统计',
          x:'center'
        },
        tooltip : {
          trigger: 'axis'
        },
        legend: {
          data:['建筑总数','实体总数', '三元组总数']
        },
        toolbox: {
          show : true,
          feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
          }
        },
        calculable : true,
        xAxis : [
          {
            type : 'category',
            data:['建筑总数','实体总数', '三元组总数']
          }
        ],
        yAxis : [
          {
            type : 'value'
          }
        ],
        series : [
          {
            name:'总数',
            type:'bar',
            data:[71, 786, 21017],
            markPoint : {
              data : [
                {type : 'max', name: '最大值'},
                {type : 'min', name: '最小值'},
              ]
            },
          },
        ]
      }


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
    await this.queryMapData();
    this.getGraphInfo('view_bag');
    this.getLineInfo('view_line');
  },
  methods: {
    ...mapActions(['queryMapData']),
    handleClick(tab, event) {
      this.selected = Number(tab.index)
    },
    getGraphInfo(id) {
      this.pie_charts = echarts.init(document.getElementById(id));
      this.pie_charts.setOption(this.total_view_info)
    },
    getLineInfo(id) {
      this.line_charts = echarts.init(document.getElementById(id));
      this.line_charts.setOption(this.line_charts_data);
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
.graphImage {
  width: 70%;
  margin: auto auto;
  margin: 0 15% 0 15%;
}

.info-table {
  list-style-type: armenian;
  font-size: 16px;
  letter-spacing: 1px;
  color: black;
}
.start {
  margin: 2rem 0 1rem 0;
  font-size: 20px;
  font-weight: bold;
  color: darkgreen;
  letter-spacing: 1px;
}
  #view_bag {
    margin-top: 3rem;
    width:100%;
    height: 350px;
  }
 #view_line {
   margin-top: 3rem;
   width:100%;
   height: 350px;

 }
</style>
