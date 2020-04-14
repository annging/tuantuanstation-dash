<template>
	<el-row class="avtivity-editor-container" v-bind:class="{ fullScreen: isFullScreen}">
		<el-row class="action-bar" type="flex" align="middle" justify="end">
			<el-button size="small" type="text">保存</el-button>
			<el-button size="small">预览</el-button>
			<el-button size="small" type="primary" style="min-width: 120px;">发布</el-button>
			<el-button class="btn-fullScreen" size="small" @click="isFullScreen = !isFullScreen">全屏</el-button>
		</el-row>
		<el-scrollbar class="devicewin">
			<div class="device">
				<div class="device-header">
					<div class="icons">
						<svg-icon icon-class="wifi" style="float: left" />
						<svg-icon icon-class="battery" style="float: right" />
						<svg-icon icon-class="signal" style="float: right" />
					</div>
					<div style="position: relative;">
						<div class="text">{{activityPageDate.title}}</div>
						<svg-icon class="xiaochengxu" icon-class="xiaochengxu" style="display: none"/>
					</div>
				</div>
				<div class="device-frame" v-loading="pageLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">

				</div>
			</div>
		</el-scrollbar>
		<div id="propertywin">
			<el-tabs v-model="p_voteTab_activeName" type="card" class="top-tab">
    	<el-tab-pane label="基本设置" name="first">
    		<el-scrollbar class="tab-content-inner">
    			<div style="padding: 16px;">
    				<base-setting v-model="activityPageDate" />
    			</div>
    		</el-scrollbar>
    	</el-tab-pane>
    	<el-tab-pane :label="activityPageDate.typeName + '管理'" name="second">
    		<el-scrollbar class="tab-content-inner">
    			<div style="padding: 16px;">
    				<vote-setting v-model="activityPageDate"  v-if="activityPageDate.type == 'vote'"/>
    			</div>
    		</el-scrollbar>
    	</el-tab-pane>
    	<el-tab-pane label="高级设置" name="third">
    		<el-scrollbar class="tab-content-inner">
    			<div style="padding: 16px;">
    				<vote-more-setting  v-if="activityPageDate.type == 'vote'"/>
    			</div>
    		</el-scrollbar>
    	</el-tab-pane>
  	</el-tabs>
		</div>
	</el-row>
</template>

<script>
import { fetchList } from '@/api/activity'
import { parseTime } from '@/utils'
import BaseSetting from './BaseSetting'
import VoteSetting from './VoteSetting'
import VoteMoreSetting from './VoteMoreSetting'

const defaultForm = {
  status: 'draft', // 草稿/已发布
  title: '这是个活动标题', // 活动标题
  cover: '', //活动封面图
  timeBegin: '', // 活动开始时间
  timeEnd: '', // 活动结束时间
  address: '', // 活动地址
  content: '', // 活动详情
  type: 'vote', // 活动类型投票/报名/抽奖等等 假如1是投票
  typeName: '投票', // 活动类型名称
  voteData: { option: { group_list: [{ id: 1, name: '分组1' }, { id: 2, name: '分组2'}], lists: [{ id: 1, name: 'Wagner', avatar: '', piaoshu: '0', fenzu: '1', detail: '' }, { id: 2, name: '王大', avatar: '', piaoshu: '0', fenzu: '1', detail: '' }] }, 
  	vote_times: '0', // 投票总次数
  	vote_day_times: '' , // 用户每天投票次数
  	vote_repeat: '1', // 允许单日同一项重复被投票
  	show_captcha: '1', // 是否接受验证码
  	display_type: '0', // 0宫格1列表
  	show_result: '1', // 1显示投票结果，0不显示投票结果
  	show_user_avatar: '0', // 0不显示头像，1显示头像
  	show_user_name: '1', // 1显示用户昵称，这个不做筛选，默认显示
  	vote_button_text: '立即投票', //投票按钮的文字
  	share_defined: '0', // 0默认 1自定义分享文案于图片
  	share_defined_data: { banner: '', title: '', description: '' }, // 自定义分享相关数据
  	sign_in: '0', // 0不支持用户报名，1在线报名，2主办方报名
  	sign_form: [{ must: 0, use: 1, label: '姓名', type: '单行文本' }], // singn_in=1,must是否必须，user是否使用，label字段名称，type字段类型当行文本/多行文本/单选/多选
  	sign_in_text: '', // sign_in=2主办方报名
  	lottery_show: '0', // 0投票完不参加抽奖活动，1参加抽奖活动
  	kaijiang_show: '0', // 0投票完不参加开奖活动，1参加开奖活动
  	relate_lottery: [{ id: 1  }], // 相关抽奖活动 活动最新排在第一位 默认参加抽奖最新抽奖活动
  	relate_kaijiang: [{ id: 1 }]
  }, //对应类型设置  如果不在里面话，请求获取
  modules: [{ ModuleID: 1, ModuleType: 'ModuleImageText', Layout: 101, PaddingLR: true, LayoutColor: '', moduleData: { titleColor: "#333", descColor: "#999", editor_desc: '' } }], // 组件，除了背景图片外，音乐等，其他都各在一层，不嵌套。现在考虑单个活动所需的内容都在一个页面
  source_uri: '', // 外链
  id: undefined,
  comment_disabled: false,
  importance: 0
}

export default {
	name: 'ActivityEditor',
	components: { BaseSetting, VoteSetting, VoteMoreSetting },
	props: {
		isEdit: {
		  type: Boolean,
		  default: false
		}
	},
	created() {
		if (this.isEdit) {
			const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    }
  },
	data() {
		return {
			activityPageDate: Object.assign({}, defaultForm),
			pageLoading: false,
			isFullScreen: false,
			p_voteTab_activeName: 'first' // 右侧属性窗口中投票tab
		}
	},
	methods: {
		fetchData(id) {
		  this.pageLoading = true
		  fetchActivity(id).then(response => {
		    this.activityPageDate = response.data
		    this.pageLoading = false
		  })
		}
	}
}
</script>

<style lang="scss" scoped>
	.avtivity-editor-container {
		position: absolute;
		left: 30px;
		right: 30px;
		top: 85px;
		bottom: 10px;
		border: 1px solid #cbd5e0;
		background-color: #fff;
		border-radius: 4px;
		font-size: 13px;
	}
	.avtivity-editor-container.fullScreen {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9999;
	}
	.action-bar {
		position: absolute;
		top: 0;
		width: 100%;
		left: 0;
		height: 45px;
		background-color: #f7f9fa;
	}
	.devicewin {
		position: absolute;
		left: 0;
		top: 45px;
		bottom: 0;
		overflow: hidden;
		width: 415px;
	}
	.device {
		width: 375px;
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
    padding-bottom: 2px;
    background-color: #fff;
    .device-header {
	    width: 100%;
	    position: relative;
	    background-color: #fff;
	    color: #000;
	    border: 1px solid #e4e4e4;
	    border-bottom: none;
	    .text {
		    padding: 3px 0px;
		    width: 100%;
		    text-align: center;
		    line-height: 40px;
			}
			.icons {
				width: 100%;
				padding-top:3px;
				.svg-icon {
					margin: 0 4px;
					color: #333;
				}
			}
			.xiaochengxu {
				position: absolute;
				top: -1em;
		    right: 5px;
		    width: 5em;
		    height: 5em;
			}
		}
    .device-frame {
	    width: 100%;
	    border: 1px solid #e4e4e4;
	    border-top: 0;
	    min-height: 180px;
		}
	}
	#propertywin{
		position: absolute;
		right: 0;
		left: 415px;
		bottom: 0;
		top: 45px;
    border-radius: 5px;
    min-height: 100px;
    border-left: 1px solid #e4e4e4;
	}
	.tab-content-inner {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
</style>
<style lang="scss">
	#propertywin .el-tabs.top-tab {
		margin-left: -1px;
		.el-tabs__header {
		}
		.el-tabs__content {
			position: absolute;
			top: 40px;
			left: 0;
			right: 0;
			bottom: 0;
		}
		.el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
		}
	}
</style>