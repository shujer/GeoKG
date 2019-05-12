<template>
  <div>
    <el-table ref="filterTable" :data="tableData" style="width: 100%" stripe>
      <el-table-column fixed type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="建筑位置">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="建筑年代">
              <span>{{ props.row.built_year }}</span>
            </el-form-item>
            <el-form-item label="地区">
              <span>{{ props.row.region }}</span>
            </el-form-item>
            <el-form-item label="描述">
              <span>{{ props.row.description }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="建筑名称" :formatter="formatter" :filters="types" :filter-method="filterType" filter-placement="bottom-end">
      </el-table-column>
      <el-table-column prop="has_type" label="建筑类型" :formatter="formatter" :filters="types" :filter-method="filterType" filter-placement="bottom-end">
      </el-table-column>
      <el-table-column prop="region" label="地区" :formatter="formatter">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  computed: {
    types: function(val) {
      let types = new Set()
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i]['has_type'].length)
          types.add(...this.tableData[i]['has_type'])
      }
      return [...types].map(val => ({text: val, value: val}))
    }
  },

  props: {
    tableData: {
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