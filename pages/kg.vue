<template>
  <div>

  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  computed: {
    ...mapGetters(['searchData'])
  },
  methods: {
    ...mapActions(['querySearchResult'])
  },
  mounted() {
    // this.querySearchResult({keyword: '立园'})
  }
}
</script>

<style>
</style>
