<template>
  <div class="navList">
    <el-menu :default-active="activeRouter" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item v-for="(item, id) in navList" :key="id" :index="id.toString()">
        {{item.title}}
      </el-menu-item>
    </el-menu>
    <div class="line"></div>
  </div>
</template>
<script>
import Logo from '~/components/Logo.vue'
import {mapGetters, mapMutations} from 'vuex'

export default {
  components: {
    Logo
  },
  mounted() {
    let index = 0
    for (let i = 0; i < this.navList.length; i++) {
      if (this.$route.path === this.navList[i].url) {
        this.SET_ROUTER(i.toString())
        return;
      }
    }
    this.SET_ROUTER(null)
  },
  computed: {
    ...mapGetters(['navList', 'activeRouter'])
  },
  methods: {
    ...mapMutations(['SET_ROUTER']),
    handleSelect(key, keyPath) {
      this.$router.push({
        path: this.navList[key].url
      })
    }
  }
}
</script>

<style>
.navList {
  height: 60px;
  line-height: 60px;
}
.navList ul {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: nowrap;
}
.navList .el-menu-item {
  font-size: 20px;
  color: #5a9367;
}
</style>