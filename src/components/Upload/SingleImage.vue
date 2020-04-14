<template>
	<el-upload
  		class="image-uploader"
  		action="https://httpbin.org/pos/"
  		:show-file-list="false"
  		:on-success="handleimageSuccess"
  		:before-upload="beforeimageUpload">
  		<img v-if="imageUrl" :src="imageUrl" class="image">
  		<i v-else class="el-icon-plus image-uploader-icon"></i>
	</el-upload>
</template>

<script>
  export default {
  	name: 'SingleImageUpload',
	 props: {
	    value: {
	      type: String,
	      default: ''
	    }
	},
    data() {
      return {
      };
    },
    computed: {
	    imageUrl() {
	      return this.value
	    }
	},
    methods: {
      handleimageSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeimageUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>

<style>
  .image-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .image-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .image-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 300px;
    height: 150px;
    line-height: 178px;
    text-align: center;
  }
  .image {
    width: 300px;
    height: 150px;
    display: block;
  }
</style>
