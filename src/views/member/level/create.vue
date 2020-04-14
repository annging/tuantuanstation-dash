<template>
<div class="main-content">
  <div class="level-container">
    <el-menu default-active="1" class="" mode="horizontal" router style="margin-bottom: 20px;">
      <el-menu-item index="1">添加等级</el-menu-item>
    </el-menu>
    <el-row>
      <el-form ref="form" :model="levelForm" label-width="80px" size="small">
        <el-form-item label="等级名称">
          <el-input v-model="levelForm.name"></el-input>
        </el-form-item>
        <el-form-item label="获取条件">
          <span>累计邀请的好友</span><el-input v-model="levelForm.condition" placeholder="0" style="display: inline-block; width: 200px; margin: 0 5px;"></el-input>位
        </el-form-item>
        <el-form-item label="权益">
          <div class="equity-list">
              <equity-item v-for="(equity, index) in levelForm.equitys"
              :key="index"
              :equity="equity"
              :index="index"
              @deleteEquity="deleteEquity"/>
              <el-button type="text" @click="addEquity">添加权益</el-button>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即添加</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
  <div class="secondary-sidebar">
  </div>
</div>
</template>

<script>
import EquityItem from './components/EquityItem'

const defaultForm = {
    name: '', //等级名称
    condition: '', // 获取条件
    equitys: [ {id: 1, type: '1', money: '10', condition: '100', number: 2, stores: ['1', '2']}, {id: 2, type: '1', money: '10', condition: '100', number: 2, stores: ['1', '2']} ], //权益
    id: undefined
}

export default {
  name: 'CreateStore',
  components: { EquityItem },
  data() {
    return {
    	stores: [ {id: 1, name: '门店一'}, {id: 2, name: '门店二'} ],
      levelForm: Object.assign({}, defaultForm)
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    deleteEquity(equity) {
      this.levelForm.equitys.splice(this.levelForm.equitys.indexOf(equity), 1)
    },
    addEquity(e) {
        this.levelForm.equitys.push({
          id: undefined,
          type: '0',
          money: '',
          condition: '',
          number: null,
          stores: ['1', '2']
        })
    },
  }
}
</script>

<style lang="scss" scoped>
  .main-content {
    display: -webkit-box;
    display: flex;
  }
  .level-container {
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
  .secondary-sidebar {
    outline: none;
    -webkit-box-flex: 0;
    flex: 0 0 240px;
    margin-right: 40px;
  }
  .level-container {
    .equity-list {
      border: 1px solid #fafafa;
      font-size: 12px;
      > div{
        padding: 35px;
        background-color: #fafafa;
        margin-bottom: 16px;
      }
    }
  }
</style>
