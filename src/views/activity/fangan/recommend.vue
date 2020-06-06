<template>
  <div class="main-content">
    <div class="left-container">
      <el-menu default-active="2" class="" mode="horizontal" router style="margin-bottom: 20px;">
        <el-menu-item index="1" :route="{path:'/activity/fangan/index/'}">方案列表</el-menu-item>
        <el-menu-item index="2" :route="{path:'/activity/fangan/recommend/'}">推荐方案列表</el-menu-item>
      </el-menu>
      <el-row type="flex" class="filter-container" style="margin-bottom: 20px;">
        <el-input
            v-model="listQuery.searchStr"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            size="small"
            @keyup.enter.native="handleFilter" />
      </el-row>
      <el-row class="list">
        <el-table
          v-loading="listLoading"
          :data="list"
          border
          fit
          highlight-current-row
          style="width: 100%"
          size="small"
          :header-cell-style="{
            'background-color': '#f7f9fa',
            'color': '#637282;'
          }"
          @sort-change="sortChange"
          >
            <el-table-column
              prop="id"
              label="ID"
              sortable
              width="60">
              <template slot-scope="{row}">
                <span>{{ row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="封面"
              width="120">
              <template slot-scope="row">
                <img :src="row.cover" style="width: 100px;height: 60px;">
              </template>
            </el-table-column>
            <el-table-column
              label="方案标题">
              <template slot-scope="{row}">
                <span>{{ row.title }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="类型"
              width="100">
              <template slot-scope="{row}">
                <span>{{ row.type }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="行业"
              width="100">
              <template slot-scope="{row}">
                <span>{{row.industry}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="浏览"
              width="100">
              <template slot-scope="{row}">
                <span>1000</span>
              </template>
            </el-table-column>
            <el-table-column
              label="领取"
              width="100">
              <template slot-scope="{row}">
                <span>88</span>
              </template>
            </el-table-column>
            <el-table-column
              label="推荐值"
              width="100">
              <template slot-scope="{row}">
                <span>2</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleRecommend(scope.$index, scope.row, 0)">取消推荐</el-button>
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
              </template>
            </el-table-column>
        </el-table>
      </el-row>
    </div>
    <!--<div class="secondary-sidebar"></div>-->
  </div>
</template>

<script>
import { fetchSchemeList } from '@/api/activity'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: { Pagination },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        searchStr: '',
        page: 1,
        limit: 20,
        sort: '+id'
      },
      clientHeight: '',
      maxHeight: 400
    };
  },
  watch: {
      // 如果 `clientHeight` 发生改变，这个函数就会运行
      clientHeight: function () {
        this.changeFixed(this.clientHeight)
      }
    },
  created() {
    this.getList()
  },
  mounted(){
      // 获取浏览器可视区域高度
      this.clientHeight =  `${document.documentElement.clientHeight}`;
      let that = this;
      window.onresize = function temp() {
        that.clientHeight = `${document.documentElement.clientHeight}`;
      };
    },
  methods: {
    changeFixed(clientHeight){
      this.maxHeight = clientHeight - 85 - 110 - 100;
    },
    getList() {
      this.listLoading = true
      fetchSchemeList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    goCreate() {
      this.$router.push({ path: '/activity/fangan/create' });
    },
    handleEdit(index, row) {
      this.$router.push({ path: '/activity/fangan/edit/' + row.id });
    },
    handleDetele(index, row) {
      this.$confirm('确认删除该方案?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //todo 删除
        this.$message({
          type: 'success',
          message: '操作成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });          
      });
    },
    handleRecommend(index, row, status) {
      this.$message({
        type: 'success',
        message: '取消推荐成功!'
      });
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
  .left-container {
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
