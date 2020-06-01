<template>
  <div class="main-content">
    <div class="activity-container">
      <el-menu default-active="1" class="" mode="horizontal" router style="margin-bottom: 20px;">
        <el-menu-item index="1" :route="{path:'/account/store/list/'}">活动列表</el-menu-item>
      </el-menu>
      <el-row type="flex" style="margin-bottom: 20px;">
        <el-input
          v-model="listQuery.searchStr"
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          size="small" />
      </el-row>
      <el-row class="list">
        <el-table
          :data="activitiyList"
          style="width: 100%"
          border
          size="small"
          :header-cell-style="{
            'background-color': '#f7f9fa',
            'color': '#637282;'
          }"
          :default-sort = "{prop: 'id', order: 'ascending'}"
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
              <img :src="scope.row.cover" style="width: 40px;height: 40px;"></template>
          </el-table-column>
          <el-table-column
            prop="title"
            label="活动标题"
            width="200">
          </el-table-column>
          <el-table-column
            prop=""
            label="活动类型">
            拼团
          </el-table-column>
          <el-table-column
            sortable
            prop="merchant.name"
            label="商家"
            width="100">
          </el-table-column>
          <el-table-column
            label="活动时间"
            width="170">
            2020-05-11 ~ 2020-06-08
          </el-table-column>
          <el-table-column
            label="状态"
            width="80">
            <el-tag>正常</el-tag>
          </el-table-column>
          <el-table-column label="操作" width="220">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleView(scope.$index, scope.row)">查看</el-button>
              <!--<el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </div>
    <!--<div class="secondary-sidebar" />-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      listQuery: {
        searchStr: ''
      },
      activitiyList: [{ id: 1, title: '活动标题可能很长', cover: 'https://file2.rrxh5.cc/g2/c1/2020/01/27/1580096585877.png', merchant: {name: '印象'} },
        { id: 2, title: '我是活动标题', cover: 'https://file2.rrxh5.cc/g2/c1/2020/01/27/1580096585877.png', merchant: {name: '北国'} }]
    }
  },
  methods: {
    handleView(index, row) {
      this.$router.push({ path: '/activity/detail/' + row.id })
    },
    goCreate() {
      this.$router.push({ path: '/activity/create' })
    }
  }
}
</script>

<style lang="scss" scoped>
  .main-content {
    display: -webkit-box;
    display: flex;

    >div:last-child {
      margin-right: 40px;
    }
  }
  .secondary-sidebar {
    outline: none;
    -webkit-box-flex: 0;
    flex: 0 0 240px;
  }
  .activity-container {
    position: relative;
    z-index: 1;
    -webkit-box-flex: 1;
    flex: 1;
    min-width: 420px;
    margin-left: 30px;
    outline: none;
  }
  .el-menu-item {
    height: 37px;
    line-height: 39px;
    padding: 0;
    margin-right: 20px;
  }
  .el-menu--horizontal>.el-menu-item.is-active {
    border-bottom: 1px solid #000;
    color: #303133;
  }
</style>
