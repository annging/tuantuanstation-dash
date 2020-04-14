<template>
	<div class="main-content">
	  	<div class="baseInfo-container">
	    	<el-menu default-active="1" class="" mode="horizontal" router style="margin-bottom: 20px;">
	      	<el-menu-item index="1" :route="{path:'/account/index'}">基本资料</el-menu-item>
	      	<el-menu-item index="2" :route="{path:'/account/plan'}">套餐</el-menu-item>
	      	<el-menu-item index="3" :route="{path:'/account/connected_acc'}">绑定账号</el-menu-item>
	    	</el-menu>
		    <el-row>
		    	<div class="plan-status-section">
		    		<div class="plan-status-section__icon">
		    			<img src="vip" alt="">
		    		</div>
		    		<div class="plan-status-section__description">
		    			<h1 class="plan-status-section__title">基础版</h1>
		    			<el-link>查看其他套餐</el-link>
		    		</div>
		    		<div class="plan-status-section__upgrade_btn">
		    			<el-button type="primary" size="small">升级</el-button>
		    		</div>
		    	</div>
		    	<div class="account-page-block">
		    		<div class="account-page-module">
		    			<div class="account-key-value-block__key">头像</div>
		    			<div class="account-key-value-block__value">
		    				<div class="avatar"><img src="" style="width: 40px;height: 40px;"></div>
		    			</div>
		    			<div class="account-key-value-block__links">
		    				<el-button type="text">编辑</el-button>
		    			</div>
		    		</div>
		    		<div class="account-page-module">
		    			<div class="account-key-value-block__key">名称</div>
		    			<div class="account-key-value-block__value">
		    				低调
		    			</div>
		    			<div class="account-key-value-block__links">
		    				<el-button type="text">编辑</el-button>
		    			</div>
		    		</div>
		    		<div class="account-page-module">
		    			<div class="account-key-value-block__key">联系电话</div>
		    			<div class="account-key-value-block__value">
		    				13899999999
		    			</div>
		    			<div class="account-key-value-block__links">
		    				<el-button type="text">编辑</el-button>
		    			</div>
		    		</div>
		    		<div class="account-page-module">
		    			<div class="account-key-value-block__label">所在地址</div>
		    			<div>
		    			<el-input
						  	placeholder="请输入内容"
						  	v-model="input"
						  	size="small">
						</el-input>
						</div>
		    		</div>
		    		<div class="account-page-module">
		    			<div class="account-key-value-block__label" style="min-width: 80px;">简介</div>
		    			<div style="width: 100%;">
			    			<el-input
							  	type="textarea"
							  	:rows="2"
							  	placeholder="请输入内容"
							  	v-model="textarea">
							</el-input>
						</div>
		    		</div>
		    		<div class="account-page-module module-block" style="height: auto; min-height: 270px;">
		    			<div class="account-page-block__heading">品牌风采</div>
		    			<div class="account-page-block__subtext">最多上传9张</div>
		    			<div style="width: 100%;">
		    			<el-upload
						 	action="https://jsonplaceholder.typicode.com/posts/"
						  	list-type="picture-card"
						  	:on-preview="handlePictureCardPreview"
						  	:on-remove="handleRemove">
						  	<i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
						  <img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
						</div>
		    		</div>
		    	</div>
		    </el-row>

	  	</div>
	  	<div class="secondary-sidebar">
  		</div>
	</div>
</template>

<script>
export default {
  	data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false
      };
    },
  	methods: {
  		handleRemove(file, fileList) {
        	console.log(file, fileList);
      	},
      	handlePictureCardPreview(file) {
        	this.dialogImageUrl = file.url;
        	this.dialogVisible = true;
      	}
  	}
}
</script>

<style lang="scss" scoped>
	.main-content {
	    display: -webkit-box;
	    display: flex;
	}
	.baseInfo-container {
      	position: relative;
      	z-index: 1;
      	-webkit-box-flex: 1;
      	flex: 1;
      	min-width: 420px;
      	margin-left: 30px;
      	outline: none;
      	.plan-status-section {
		    display: -webkit-box;
		    display: flex;
		    padding: 36px 0;
		    border-bottom: 1px solid #e6e8eb;
		}
		.plan-status-section__icon {
		    width: 36px;
		    margin: 16px 16px auto 8px;
		    height: 69px;
		}
		.plan-status-section__description {
		    -webkit-box-flex: 1;
		    flex-grow: 1;
		    color: #637282;
		    font-size: 12px;
		    line-height: 1.5em;
		}
		.plan-status-section__title {
		    font-size: 17px;
		    margin-bottom: 5px;
		    color: #1b2733;
		}
		.plan-status-section__link {
		    font-size: 12px;
		    color: #0070e0;
		}
		.plan-status-section__upgrade_btn {
		    flex-basis: 140px;
		    text-align: right;
		    display: -webkit-box;
		    display: flex;
		    -webkit-box-orient: vertical;
		    -webkit-box-direction: normal;
		    flex-direction: column;
		    -webkit-box-pack: center;
		    justify-content: center;
		}
		.account-page-block {
			padding-bottom: 30px;
		}
		.account-page-module {
		    font-size: 14px;
		    display: -webkit-box;
		    display: flex;
		    -webkit-box-align: center;
		    align-items: center;
		    -webkit-box-pack: justify;
		    justify-content: space-between;
		    color: #1b2733;
		    line-height: 1.5em;
		    height: 72px;
		    padding-left: 8px;
    		padding-right: 8px;
		    .account-key-value-block__key {
			    -webkit-box-flex: 1;
			    flex-grow: 1;
			}
			.account-key-value-block__value {
			    margin-right: 16px;
			}
			.account-key-value-block__links {
			    display: -webkit-box;
			    display: flex;
			}
			.account-dropdown-block__label {
			    -webkit-box-flex: 1;
			    flex-grow: 1;
			    display: -webkit-box;
			    display: flex;
			    -webkit-box-pack: center;
			    justify-content: center;
			    -webkit-box-orient: vertical;
			    -webkit-box-direction: normal;
			    flex-direction: column;
			}
			.account-page-block__heading {
			    font-size: 14px;
			    color: #1b2733;
			}
			.account-page-block__subtext {
			    font-size: 12px;
			    color: #637282;
			    margin: 4px 0 16px 0;
			}
		}
		.account-page-module.module-block {
			display: block;
			padding: 24px 8px;
    		line-height: 1.5em;
		}
		.account-page-module:not(:first-child) {
		    border-top: 1px solid #e6e8eb;
		}

  	}
  	.secondary-sidebar {
    	outline: none;
    	-webkit-box-flex: 0;
    	flex: 0 0 240px;
    	margin-right: 40px;
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
