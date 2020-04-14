<template>
  <div class="store-container" style="padding:0 30px;">
    <el-menu default-active="1" class="" mode="horizontal" router style="margin-bottom: 20px;">
      <el-menu-item index="1" :route="{path:'/account/store/list/'}">门店管理</el-menu-item>
      <el-menu-item index="2" :route="{path:'/account/vip'}">数量2/3，<span style="color: #0070e0">升级vip</span>提升店铺数量</el-menu-item>
    </el-menu>
    <el-button type="primary" size="small" style="min-width: 120px;" @click="goCreate">添加门店</el-button>
    <el-row class="store-list">
      <ul class="stores">
        <li class="s-item" v-for="item in stores.list" v-bind:key="item.id">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <div class="image-wrapper">
            <el-image
              style="width: 100%;"
              :src="item.cover"
              fit="cover"
              class="image"></el-image>
              </div>
            <div class="s-info">
              <div class="s-name"><svg-icon icon-class="password" /><span>{{item.name}}</span></div>
              <div class="s-addr"><svg-icon icon-class="password" /><span>{{item.address}}</span></div>
              <div class="tele"><svg-icon icon-class="password" /><span>{{item.tele}}</span></div>
              <div class="wx"><svg-icon icon-class="password" /><span>{{item.wx}}</span></div>
            </div>
            <div class="bottom clearfix">
              <el-button type="text" @click="goEdit(item.id)">编辑门店信息</el-button>
              <el-button type="text" @click="del(item.id)">删除门店</el-button>
            </div>
          </el-card>
        </li>
      </ul>
    </el-row>

  </div>
</template>

<script>
export default {
  data() {
    return {
      stores: {list:[{id:1, name: '门店标题', cover: 'https://file2.rrxh5.cc/g2/c1/2020/01/27/1580096585877.png', address: '北京市一大街二条路三快门', tele: "14565434567", wx: ""},
      {id:2, name: '新华校区', cover: 'https://file2.rrxh5.cc/g2/c1/2020/01/27/1580096585877.png', address: '北京市一大街二条路三快门', tele: "", wx: ""}, 
      {id:3, name: '新华校1区', cover: 'https://cdn.dribbble.com/users/758684/screenshots/10850859/task_mgt_2_4x.jpg?compress=1&resize=800x600', address: '北京市一大街二条路三快门', tele: "", wx: ""}], max: 4}
    }
  },
  methods: {
    goCreate() {
      this.$router.push({ path: '/account/store/create' });
    },
    goEdit(id) {
      this.$router.push({ path: '/account/store/edit/'+ id });
    },
    del(id) {
      console.log('删除id是' + id );
    }
  }
}
</script>

<style lang="scss" scoped>
  .store-list {
    margin-top: 20px;
    .stores {
      padding: 0;
      margin: 0;
      display: grid;
      list-style: none;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      grid-gap: 36px;
      .s-item {
        cursor: pointer;
        .image {
          position: absolute;
          width: 100%;
          max-width: 100%;
          height: 100%;
        }
        .image-wrapper {
          position: relative;
          width: 100%;
          height: 0;
          padding-bottom: 50%;
        }
        .bottom {
          font-size: 13px;
          padding: 5px 16px 20px;
        }
        .s-info {
          padding: 5px 16px;
          font-size: 13px;
          div {
            padding-top: 8px;
            span {
              padding-left: 5px;
            }
            svg {
              color: #0070e0;
            }
          }
        }
      }
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
