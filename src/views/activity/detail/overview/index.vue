<template>
  <div>
  	<el-table
      :data="activitiyList"
      style="width: 100%"
      border
      size="small"
      :header-cell-style="{
        'background-color': '#f7f9fa',
        'color': '#637282;'
      }"
      >
      <el-table-column
        prop="id"
        label="ID"
        sortable
        width="60">
      </el-table-column>
      <el-table-column
        label="封面图"
        width="80">
        <template slot-scope="scope">
          <img :src="scope.row.cover" style="width: 40px;height: 40px;">
     	</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>