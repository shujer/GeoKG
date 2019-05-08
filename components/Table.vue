<template>
    <div>
        <el-table ref="filterTable" :data="data" style="width: 100%" height="500">
            <el-table-column prop="name" label="建筑名称" width="180" fixed>
            </el-table-column>
            <el-table-column prop="has_type" label="建筑类型" width="140" :formatter="formatter" :filters="types" :filter-method="filterType" filter-placement="bottom-end">
            </el-table-column>
            <el-table-column prop="address" label="建筑位置" width="200" :formatter="formatter">
            </el-table-column>
            <el-table-column prop="built_year" label="建筑年代" width="150" :formatter="formatter">
            </el-table-column>
            <el-table-column prop="region" label="地区" width="180" :formatter="formatter">
            </el-table-column>
            <el-table-column prop="description" label="描述" width="500" :formatter="formatter">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
  computed: {
    types: function(val) {
      let types = new Set()
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i]['has_type'].length)
          types.add(...this.data[i]['has_type'])
      }
      return [...types].map(val=>({text: val, value: val}))
    }
  },

  props: {
    data: {
      type: Array,
      default: []
    }
  },

  methods: {
    formatter(row, column) {
      let property = column['property']
      let value = row[property]
      if (Object.prototype.toString.call(value).slice(8, 13) === 'Array') {
        value = value.join('、')
      }
      return value || '——'
    },
    filterType(value, row) {
      return row.has_type.includes(value)
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    }
  }
}
</script>