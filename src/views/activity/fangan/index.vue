<template>
  <div class="main-content">
    <div class="left-container">
      <el-menu default-active="1" class="" mode="horizontal" router style="margin-bottom: 20px;">
        <el-menu-item index="1" :route="{path:'/activity/fangan/index/'}">方案列表</el-menu-item>
        <el-menu-item index="2" :route="{path:'/activity/fangan/recommend/'}">推荐方案列表</el-menu-item>
      </el-menu>
      <el-row type="flex" class="filter-container" style="margin-bottom: 20px;">
        <el-input
          class="filter-item"
          v-model="listQuery.searchStr"
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          size="small"
          @keyup.enter.native="handleFilter" />
        <el-select size="small" v-model="listQuery.type" style="width: 200px" class="filter-item" @change="handleFilter" placeholder="活动类型">
          <el-option  label="全部类型" value="" />
          <el-option v-for="item in activityTypes" :key="item.key" :label="item.label" :value="item.key" />
        </el-select>
        <el-select size="small" v-model="listQuery.industry" style="width: 200px" class="filter-item" @change="handleFilter" placeholder="行业">
          <el-option  label="全部行业" value="" />
          <el-option v-for="item in industrys" :key="item.key" :label="item.label" :value="item.key" />
        </el-select>
        <el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
            搜索
        </el-button>  
        <el-button type="primary" size="small" style="min-width: 120px;" icon="el-icon-circle-plus-outline" @click="goCreate">新增方案</el-button>
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
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleRecommend(scope.$index, scope.row)">推荐</el-button>
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  @click="handleDetele(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
      </el-row>
    </div>
    <!--<div class="secondary-sidebar"></div>-->
  </div>
</template>

<script>
import { fetchSchemeList } from '@/api/activity'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination、

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
        sort: '+id',
        type: '',
        industry: ''
      },
      clientHeight: '',
      maxHeight: 400,
      activityTypes: [{ key: 1, label: '报名' }, { key: 2, label: '抽奖' }, { key: 3, label: '海报' }, { key: 4, label: '砍价' }, { key: 5, label: '秒杀' }, { key: 6, label: '拼团' }, { key: 7, label: '投票' }, { key: 8, label: '预约' }, { key: 9, label: '助力' }, { key: 10, label: '代金券' }, { key: 11, label: '折扣券' }, { key: 12, label: '兑换券' }, { key: 13, label: '体验券' }],
      industrys: [{ key: 1, label: '教育' }, { key: 2, label: '体育' }, { key: 3, label: '珠宝' }]
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
    handleRecommend(index, row) {
       this.$prompt('请输入推荐值，值越大，越靠前', '推荐方案', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          //todo something
          this.$message({
            type: 'success',
            message: '推荐方案成功，推荐值: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消操作'
          });       
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
  .filter-item {
    margin-right: 10px;
  }
</style>
