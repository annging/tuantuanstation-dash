<template>
	<div class="main-content">
	  	<div class="member-container" style="margin-right: 30px;">
	  		<el-menu default-active="1" class="" mode="horizontal" router style="margin-bottom: 20px;">
	      	<el-menu-item index="1" :route="{path:'/member/index'}">会员管理</el-menu-item>
	    	</el-menu>
	    	<el-row class="common-seachbg" style="margin-bottom: 16px;">
	    		<el-col :span="24"><div class="grid-content" style=" margin-bottom: 16px;">
	    			<el-input
		    			placeholder="请输入会员名"
					    prefix-icon="el-icon-search"
					    v-model="memberSearchForm.member_name"
					    size="small"
					    style="width: 240px;margin-right: 16px;">
				  	</el-input>
				  	<div style="display: inline-block;margin-right: 16px;">
				  		<span>注册时间：</span>
				  		<el-date-picker
					      	v-model="memberSearchForm.reg_time_begin"
					      	type="datetime"
					      	placeholder="起始注册时间"
					      	size="small"
					      	style="width: 175px;">
					    </el-date-picker>
					    <span>-</span>
					    <el-date-picker
					      	v-model="memberSearchForm.reg_time_end"
					      	type="datetime"
					      	placeholder="截至注册时间"
					      	size="small"
					      	style="width: 175px;margin-right: 16px;">
					    </el-date-picker>
					    <el-button type="text" @click="pickTime(7)">最近7天</el-button>
					    <el-button type="text" @click="pickTime(30)">最近30天</el-button>
					    <el-button type="text" @click="pickTime(90)">最近90天</el-button>
				  	</div>
	    		</div></el-col>
	    		<el-col :span="24"><div class="grid-content" style=" margin-bottom: 16px;">
	    			<div style="display: inline-block;margin-right: 16px;">
				  		<span>会员等级：</span>
				  		 <el-select v-model="memberSearchForm.memebr_level" placeholder="请选择" size="small" style="width: 175px;">
				  		 	<el-option
						     v-for="item in levels"
						     :key="item.id"
						     :label="item.name"
						     :value="item.id">
						   </el-option>
						</el-select>
					</div>
					<div style="display: inline-block;margin-right: 16px;">
				  		<span>成交金额：</span>
				  		<el-input
			    			placeholder="最小金额"
						    v-model="memberSearchForm.money_count_min"
						    size="small"
						    style="width: 175px;">
					  	</el-input>
					  	<span>-</span>
					  	<el-input
			    			placeholder="最大金额"
						    v-model="memberSearchForm.money_count_max"
						    size="small"
						    style="width: 175px;">
					  	</el-input>
				  	</div>
	    		</div></el-col>
	    		<el-col :span="24"><div class="grid-content" style="margin-bottom: 16px;">
	    			<div style="display: inline-block;margin-right: 16px;">
				  		<span>会员状态：</span>
				  		 <el-select v-model="memberSearchForm.member_statu" placeholder="请选择" size="small" style="width: 175px;">
				  		 	<el-option value="">全部状态</el-option>
				  		 	<el-option
						     v-for="item in status"
						     :key="item.id"
						     :label="item.name"
						     :value="item.id">
						   </el-option>
						</el-select>
					</div>
					<div style="display: inline-block;margin-right: 16px;">
				  		<span>会员身份：</span>
				  		 <el-select v-model="memberSearchForm.member_role" placeholder="请选择" size="small" style="width: 175px;">
				  		 	<el-option value="">不限</el-option>
				  		 	<el-option value="">分销员</el-option>
				  		 	<el-option value="">非分销员</el-option>
						</el-select>
					</div>
	    		</div></el-col>
	    		<el-col :span="24"><div class="grid-content">
	    			<el-button size="small">查询</el-button>
	    			<el-button size="small" :loading="downloadLoading" @click="handleDownload">导出会员</el-button>
	    		</div></el-col>
	    	</el-row>
	    	<el-table v-loading="listLoading" :data="list" element-loading-text="Loading..." border fit highlight-current-row>
		      <el-table-column align="center" label="Id" width="95">
		        <template slot-scope="scope">
		          {{ scope.$index }}
		        </template>
		      </el-table-column>
		      <el-table-column label="会员名">
		        <template slot-scope="scope">
		          {{ scope.row.name }}
		        </template>
		      </el-table-column>
		      <el-table-column label="电话" width="110" align="center">
		        <template slot-scope="scope">
		          <el-tag>{{ scope.row.tel }}</el-tag>
		        </template>
		      </el-table-column>
		      <el-table-column label="等级" width="115" align="center">
		        <template slot-scope="scope">
		          {{ scope.row.level }}
		        </template>
		      </el-table-column>
		      <el-table-column label="余额" width="115" align="center">
		        <template slot-scope="scope">
		          {{ scope.row.level }}
		        </template>
		      </el-table-column>
		      <el-table-column align="center" label="注册时间" width="220">
		        <template slot-scope="scope">
		          <i class="el-icon-time" />
		          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
		        </template>
		      </el-table-column>
		      <el-table-column label="状态" width="50" align="center">
		        <template slot-scope="scope">
		          {{ scope.row.level }}
		        </template>
		      </el-table-column>
		    </el-table>
	  	</div>
	 	<div class="secondary-sidebar" style="display: none">
  		</div>
	</div>
</template>

<script>
import { fetchList } from '@/api/member'
import { parseTime } from '@/utils'

const defaultSearchForm = {
	member_name: '', //会员名称
	reg_time_begin: '', // 注册开始和结束时间
	reg_time_end: '', // 注册结束时间
	memebr_level: '', //会员等级
	money_count_min: '',//成交金额最小值
	money_count_max: '',//成交金额最大值
	member_statu: '',//会员状态
	member_role: ''//会员身份  分销员或者非分销员
}
export default {
	name: 'MemberManage',
	data() {
	    return {
	      	memberSearchForm: Object.assign({}, defaultSearchForm),
	      	levels: [ { id: 1, name: '等级一' }, {id: 2, name: '等级二' } ],
	      	status: [ { id: 1, name: '生效' }, {id: 2, name: '未生效' } ],
	      	list: null,
      		listLoading: true,
	      	downloadLoading: false,
	      	filename: '',
	      	autoWidth: true,
      		bookType: 'xlsx'
	   	};
	},
	created() {
    this.fetchData()
  },
	methods: {
	  	pickTime(days) {
	  		const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * days);
            this.memberSearchForm.reg_time_begin = start;
            this.memberSearchForm.reg_time_end = end;
	  	},
	  	fetchData() {
		    this.listLoading = true
		    fetchList().then(response => {
		       	this.list = response.data.items
		        this.listLoading = false
		    })
			},
	  	handleDownload() {
		    this.downloadLoading = true
		    import('@/vendor/Export2Excel').then(excel => {
		       	const tHeader = ['Id', '会员名', '电话', '状态', '注册时间']
		        const filterVal = ['id', 'namne', 'tel', 'status', 'display_time']
		        const list = this.list
		        const data = this.formatJson(filterVal, list)
		        excel.export_json_to_excel({
		          	header: tHeader,
		          	data,
		          	filename: this.filename,
		          	autoWidth: this.autoWidth,
		          	bookType: this.bookType
		        })
		        this.downloadLoading = false
		    })
			}
	}
}
</script>

<style lang="scss" scoped>
	.main-content {
	    display: -webkit-box;
	    display: flex;
	}
	.member-container {
      	position: relative;
      	z-index: 1;
      	-webkit-box-flex: 1;
      	flex: 1;
      	min-width: 420px;
      	margin-left: 30px;
      	outline: none;
      	.common-seachbg {
      		background: #f6f8fb;
    		padding: 16px;
    		font-size: 12px;
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
  	.el-button--text {
  		font-size: 12px;
  	}
</style>