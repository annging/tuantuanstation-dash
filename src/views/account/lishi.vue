<template>
	<div class="main-content">
	  	<div class="baseInfo-container">
	    	<el-menu default-active="2" class="" mode="horizontal" router style="margin-bottom: 20px;">
	      	<el-menu-item index="1" :route="{path:'/account/index'}">账户总览</el-menu-item>
	      	<el-menu-item index="2" :route="{path:'/account/plan'}">明细</el-menu-item>
	      	</el-menu>
		    <el-row>
		    	明细
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
