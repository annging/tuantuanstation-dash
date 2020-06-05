<template>
<div class="main-content">
  <div class="left-container">
    <el-menu default-active="1" class="" mode="horizontal" router style="margin-bottom: 20px;">
      <el-menu-item index="1" :route="{path:'/activity/fangan/create/'}">添加方案</el-menu-item>
    </el-menu>
    <el-row>
      <el-form ref="form" :rules="rules" :model="schemeForm" label-width="80px" size="small">
        <el-form-item label="方案标题">
          <el-input v-model="schemeForm.title"></el-input>
        </el-form-item>
        <el-form-item label="封面图">
          <el-upload
            :multiple="false"
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleSuccess"
            :on-preview="handlePicturePreview"
            :on-remove="handleRemove">
            <img v-if="schemeForm.cover" :src="schemeForm.cover" class="avatar">
            <i  v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-dialog
            :visible.sync="dialogVisible"
            :modal-append-to-body="false"
            :append-to-body="true">
            <img width="100%" :src="schemeForm.cover" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="方案介绍">
           <tinymce v-model="schemeForm.desc" :height="380" />
        </el-form-item>
        <el-form-item label="活动类型">
          <el-select v-model="schemeForm.type" placeholder="请选择活动类型">
            <el-option v-for="item in activityTypes" :key="item.key" :label="item.label" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="活动类型">
          <el-select v-model="schemeForm.industry" placeholder="请选择活动类型">
            <el-option v-for="item in industrys" :key="item.key" :label="item.label" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="权重">
          <el-input v-model="schemeForm.power" placeholder="值越大，越靠前"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即添加</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
  <!--<div class="secondary-sidebar"></div>-->
</div>
</template>

<script>
import Tinymce from '@/components/Tinymce'

const defaultForm = {
    title: '', //方案标题
    cover: '',
    type: '',
    industry: '',
    desc: '',
    power: '',
    id: ''
}

export default {
  name: 'CreateScheme',
  components: { Tinymce },
  data() {
    return {
      schemeForm: Object.assign({}, defaultForm),
      activityTypes: [{ key: 1, label: '报名' }, { key: 2, label: '抽奖' }, { key: 3, label: '海报' }, { key: 4, label: '砍价' }, { key: 5, label: '秒杀' }, { key: 6, label: '拼团' }, { key: 7, label: '投票' }, { key: 8, label: '预约' }, { key: 9, label: '助力' }, { key: 10, label: '代金券' }, { key: 11, label: '折扣券' }, { key: 12, label: '兑换券' }, { key: 13, label: '体验券' }],
      industrys: [{ key: 1, label: '教育' }, { key: 2, label: '体育' }, { key: 3, label: '珠宝' }],
      rules: {
        title: [
          { required: true, message: '请输入方案标题', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请选择一个活动类型', trigger: 'change' }
        ],
        industry: [
          { required: true, message: '请选择一个行业', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写方案介绍', trigger: 'blur' }
        ],
        cover: [
          { required: true, message: '请上传封面图', trigger: 'change' }
        ]
      },
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleSuccess(res, file) {
      this.schemeForm.cover = URL.createObjectURL(file.raw);
    },
    handlePicturePreview() {
      this.dialogVisible = true;
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

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
</style>
