<template>
  <div class="main-content">
    <div class="activity-container">
      <div class="top">
        <el-dropdown>
          <span class="el-dropdown-link">
            全部活动(12)<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>抽奖</el-dropdown-item>
            <el-dropdown-item>报名</el-dropdown-item>
            <el-dropdown-item>砍价</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <el-row type="flex" class="activity-list" justify="start">
        <div class="item" style="cursor: pointer;">
          <el-card class="box-card" shadow="hover" :body-style="{ padding: '0px', position: 'relative' }">
            <div class="add" style="padding-top: 100px;" @click="dialogAddVisible = true">
              <i class="el-icon-plus" style="font-weight: bold"></i><br />
              <div style="margin-top: 20px;">创建活动</div>
            </div>
          </el-card>
        </div>
        <div class="item" style="cursor: pointer;" v-for="item in activities" v-bind:key="item.id">
          <el-card class="box-card" shadow="hover" :body-style="{ padding: '0px', position: 'relative' }">
            <span class="mask" style="display: none">未发布</span>
            <span class="mask" style="background-color: rgb(255, 152, 0);">有修改</span>
            <img class="image" :src="item.cover">
            <div class="shade">
              <router-link :to="'/activity/detail/share/'+ item.id" class="shade-button-share"><p class="icon-box"><i class="fa fa-share-alt"></i></p><p>分享</p></router-link>
                <el-row class="shade-buttons vertical-center " type="flex">
                  <router-link :to="'/activity/edit/'+ item.id" class="shade-button-item">
                    <p><i class="fa fa-edit"></i></p>
                    <p>编辑</p>
                  </router-link>
                  <router-link :to="'/activity/detail/data/'+ item.id" class="shade-button-item">
                    <p><i class="fa fa-bar-chart"></i></p>
                    <p>数据</p>
                  </router-link>
                  <router-link :to="'/activity/detail/overview/'+item.id" class="shade-button-item">
                    <p><i class="fa fa-user"></i></p>
                    <p>访客</p>
                  </router-link>
                </el-row>
                <el-dropdown class="shade-manage"  @command="handleCommand">
                  <span class="el-dropdown-link">
                    <i class="el-icon-setting"></i>管理
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="able">启用</el-dropdown-item>
                    <el-dropdown-item command="enable">禁用</el-dropdown-item>
                    <el-dropdown-item divided command="delete">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div class="content">
                <div class="hd-title">{{item.title}}
                </div>
                <div class="bottom layui-clear">
                  <div class="time">
                    <i class="fa fa-eye"></i><span>100</span>
                  </div>
                </div>
              </div>
          </el-card>
        </div>
      </el-row>
    </div>
    <el-dialog
      title="创建活动"
      :visible.sync="dialogAddVisible"
      width="400px">
        <div class="type-cho" style="padding: 10px;">
          <div style="margin-bottom: 10px;">选择活动类型</div>
          <el-radio-group v-model="createType" size="small">
            <el-radio-button label="1">抽奖</el-radio-button>
            <el-radio-button label="2">投票</el-radio-button>
            <el-radio-button label="3">报名</el-radio-button>
            <el-radio-button label="4">秒杀</el-radio-button>
          </el-radio-group>
        </div>
        <el-row class="create-box" type="flex" justify="space-between" style="padding: 20px;">
          <el-card :body-style="{ padding: '0px' }" shadow="hover" style="">
            <div class="card-item" @click="goCreate"><svg-icon icon-class="add" />空白活动</div>
          </el-card>
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <div class="card-item" style="background-color: rgba(0, 112, 224, 0.5); color: white;"><svg-icon icon-class="ku" />模板库</div>
          </el-card>
        </el-row>

    </el-dialog>
    <div class="secondary-sidebar"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activities: [ { id: 1, title: '活动标题可能很长', cover: 'https://file2.rrxh5.cc/g2/c1/2020/01/27/1580096585877.png' },
        { id: 2, title: '我是活动标题', cover: 'https://file2.rrxh5.cc/g2/c1/2020/01/27/1580096585877.png'} ],
      dialogAddVisible: false,
      createType: 1
    }
  },
  methods: {
    handleCommand(command) {
      this.$message('' + command)
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
  }
  .secondary-sidebar {
      outline: none;
      -webkit-box-flex: 0;
      flex: 0 0 240px;
      margin-right: 40px;
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
  .activity-container {
    .top {
      line-height: 32px;
      padding: 4px 0;
      border-bottom: 1px solid #e6e8eb;
      .el-dropdown-link {
        cursor: pointer;
      }
    }
    .activity-list {
      .item {
        position: relative;
        width: 200px;
        height: 273px;
        margin: 25px;
        &:hover {
          .shade {
            display: block;
          }
        }
        .box-card {
          width: 100%;
          height: 100%;
        }
        .add {
          display: block;
          text-align: center;
        }
        .mask {
          position: absolute;
          background-color: #9e9e9e;
          color: #fff;
          padding: 2px 5px;
          border-radius: 2px;
          font-size: 12px;
          left: -1px;
          top: -1px;
          border-bottom-right-radius: 5px;
        }
        .image {
          height: 198px;
          width: 100%;
          display: block;
          cursor: pointer;
        }
        .shade {
          text-align: center;
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          background-color: rgba(0,0,0,.7);
          display: none;
          .shade-button-share {
            color: #fff;
            width: 40px;
            position: absolute;
            top: 70px;
            left: 79px;
            cursor: pointer;
            .icon-box {
              background-color: hsla(0,0%,49%,.9);
              border-radius: 100%;
              width: 40px;
              height: 40px;
              line-height: 42px;
              font-size: 26px;
              font-weight: 500;
              margin-bottom: 2px
            }
            &:hover .icon-box {
              background-color: hsla(0,0%,100%,.9);
              color: #25a7fb
            }
          }
          .shade-buttons {
            background-color: #fff;
            position: absolute;
            width: 100%;
            left: 0;
            bottom: 0;
            height: 75px;
            font-size: 14px;
            i {
              margin-bottom: 2px;
              font-size: 24px;
            }
          }
          .shade-button-item {
            cursor: pointer;
            width: 100%;
            float: left;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            &:hover {
              cursor: pointer;
              color: #0070e0;
            }
          }
          .shade-manage {
            color: #fff;
            border: 1px solid #fff;
            border-radius: 14px;
            background-color: hsla(0,0%,49%,.9);
            font-size: 12px;
            width: 58px;
            height: 25px;
            line-height: 25px;
            display: inline-block;
            padding-right: 5px;
            margin-left: 118px;
            margin-top: 10px;
          }
        }
        .content {
          padding: 8px;
          height: 75px;
          vertical-align: baseline;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
        }
        .hd-title {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 188px;
          display: inline-block;
        }
        .bottom {
          margin-top: 13px;
          line-height: 12px;
        }
        .time {
          font-size: 13px;
          color: #999;
        }
      }
    }
  }
  .card-item {
    width: 135px;
    height: 200px;
    cursor: pointer;
    padding-top: 60px;
    text-align: center;
    svg {
      width: 2em;
      height: 2em;
      display: block;
      margin: 20px auto;
    }
  }
</style>
