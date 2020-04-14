<template>
<div class="main-content">
  <div class="store-container">
    <el-menu default-active="1" class="" mode="horizontal" router style="margin-bottom: 20px;">
      <el-menu-item index="1">添加门店</el-menu-item>
    </el-menu>
    <el-row>
      <el-form ref="form" :model="storeForm" label-width="80px" size="small">
        <el-form-item label="门店名称">
          <el-input v-model="storeForm.name"></el-input>
        </el-form-item>
        <el-form-item label="门店头像" prop="image_uri" style="margin-bottom: 30px;">
          <Upload v-model="storeForm.image_uri" />
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="storeForm.tele"></el-input>
        </el-form-item>
        <el-form-item label="微信号">
          <el-input v-model="storeForm.wx"></el-input>
        </el-form-item>
        <el-form-item label="门店定位">
          <el-input v-model="storeForm.location"></el-input>
        </el-form-item>
        <el-form-item label="补充地址">
          <el-input v-model="storeForm.address"></el-input>
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
  import Upload from '@/components/Upload/SingleImage'

  const defaultForm = {
    name: '', //店铺名称
    image_uri: '', // 门店头像
    tele: '', // 门店联系电话
    wx: '', //微信
    location: '',//门店地址
    address: '',
    id: undefined
  }

export default {
  name: 'CreateStore',
  components: { Upload },
  data() {
    return {
      storeForm: Object.assign({}, defaultForm)
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    }
  }
}
</script>

<style lang="scss" scoped>
  .main-content {
    display: -webkit-box;
    display: flex;
  }
  .store-container {
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
</style>
