import * as api from '~/services/api'
import {processResult} from '~/utils/resultHelper'

export const state = {
  mapData: [],
  kgData: {
    name: '',
    view: '',
    entity: '',
    query_layer: '',
    data: []
  },
  tableData: [],
  searchData: [],
  navList: [
    {title: '首页', url: '/'},
    {title: '知识图谱', url: '/kg'},
    {title: '图谱分析', url: '/analyse'},
    {title: '岭南侨乡', url: '/overview'},
    {title: '侨乡建筑', url: '/image'},
    {title: '关于我们', url: '/about'}
  ],
  activeRouter: '0'
}

export const getters = {
  //需要传个形参，用来获取 state 属性
  searchData(state) {
    return state.searchData
  },
  mapData(state) {
    return state.mapData
  },
  kgData(state) {
    return state.kgData
  },
  tableData(state) {
    return state.tableData
  },
  activeRouter(state) {
    return state.activeRouter
  },
  navList(state) {
    return state.navList
  }
}

export const mutations = {
  SET_MAP: function(state, mapData) {
    state.mapData = mapData
  },
  SET_KG: function(state, kgData) {
    state.kgData = kgData
  },
  SET_TABLE: function(state, tableData) {
    state.tableData = tableData
  },
  SET_SEARCH: function(state, searchData) {
    state.searchData = searchData
  },
  SET_ROUTER: function(state, activeRouter) {
    state.activeRouter = activeRouter
  }
}

export const actions = {
  async querySearchResult({state, commit}, {keyword}) {
    try {
      let data = await api.getSearchResult(keyword)
      commit('SET_SEARCH', processResult(data))
    } catch (err) {
      //
    }
  },
  async queryMapData({state, commit}) {
    try {
      if(!state.mapData.length) {
        let {data} = await api.getMapData()
        commit('SET_MAP', data)
      }
    } catch (err) {
      //
    }
  }
}
