<template>
  <div class="main-content">
    <div class="detail-container" style="margin-right: 30px;">
      <el-row type="flex" align="middle" class="activity-container">
        <el-col :span="16"><div class="grid-content bg-purple">
          <el-row class="a-info" type="flex">
            <div class="cover"><img :src="activity.cover" alt="" style="width: 100%; height: 100%"></div>
            <div class="desc">
              <h4>{{activity.title}}</h4>
              <p>创建时间: 2020-03-11 11:11:11</p>
            </div>
          </el-row>
          </div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">
          <el-row class="" style="text-align: right">
            <el-button size="mini">查看</el-button>
            <el-button size="mini" type="primary">编辑</el-button>
          </el-row>
          </div></el-col>
      </el-row>
      <el-menu :default-active="activeTabMenu" class="" mode="horizontal" router>
        <el-menu-item :index="'/activity/detail/share/' + activity.id">分享推广</el-menu-item>
        <el-menu-item :index="'/activity/detail/fenxiao/' + activity.id" >分销管理</el-menu-item>
        <el-menu-item :index="'/activity/detail/overview/' + activity.id">访客统计</el-menu-item>
        <el-menu-item :index="'/activity/detail/data/' + activity.id">数据汇总</el-menu-item>
        <el-menu-item :index="'/activity/detail/danmu/' + activity.id">留言管理</el-menu-item>
      </el-menu>
      <router-view />
    </div>
    <div class="secondary-sidebar" style="display: none"></div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      activity: {id:1, title: '活动标题可能很长', cover: 'https://file2.rrxh5.cc/g2/c1/2020/01/27/1580096585877.png'},
    }
  },
  computed: {
    activeTabMenu() {
      const route = this.$route
      const { meta, path } = route
      return path
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .main-content {
      display: -webkit-box;
      display: flex;
  }
  .secondary-sidebar {
      outline: none;
      -webkit-box-flex: 0;
      flex: 0 0 240px;
      margin-right: 40px;
    }
    .detail-container {
      position: relative;
        z-index: 1;
        -webkit-box-flex: 1;
        flex: 1;
        min-width: 420px;
        margin-left: 30px;
        outline: none;
    }
.activity-container {
  position: relative;
  background-color: #f4f4f5;
  padding: 16px;
  margin-bottom: 20px;
  border-radius: 4px;
  font-size: 13px;
  line-height: 18px;
  .cover {
    width: 80px;
    height: 80px;
    border-radius: 4px;
    overflow: hidden;
    margin-right: 20px;
    border: 1px solid #cbd5e0;
  }
  h4 {
    margin: 5px 0 8px 0;
  }
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
