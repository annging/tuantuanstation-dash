<template>
  <div style="padding: 20px 0; font-size: 13px;">
  	<div>
	  	<el-switch
			  v-model="isFenxiao"
			  active-color="#0070e0"
			  size="small">
			</el-switch>
			<span style="padding-left: 8px;">开启活动分销</span>
			<i class="el-icon-question" style="font-size: 18px"></i>
		</div>
		<div v-if="isFenxiao" class="fenxiao-container">
			<el-row type="flex" class="top">
				<el-col :span="8"><div class="grid-content">
					佣金推广：<span>5元/单</span>
				</div></el-col>
				<el-col :span="8"><div class="grid-content">
					参与次数/总次数：<span>10/50</span>
				</div></el-col>
				<el-col :span="6"><div class="grid-content">
					<el-button size="small" @click="dialogSettingVisible = true">分销设置</el-button>
				</div></el-col>
			</el-row>
			<el-row style="margin-bottom: 10px;">
				<el-button size="small" :loading="downloadLoading" @click="handleDownload">导出分销数据</el-button>
			</el-row>
			<el-row>
				<el-table v-loading="listLoading" :data="list" element-loading-text="Loading..." border fit highlight-current-row :header-cell-style="{
				    'background-color': '#f7f9fa',
				    'color': '#637282;'
				}" :default-sort = "{prop: 'success_number', order: 'descending'}">
			      <el-table-column label="排名" width="95">
			        <template slot-scope="scope">
			          {{ scope.$index }}
			        </template>
			      </el-table-column>
			      <el-table-column label="微信昵称">
			        <template slot-scope="scope">
			          {{ scope.row.name }}
			        </template>
			      </el-table-column>
			      <el-table-column label="邀请好友数" width="110">
			        <template slot-scope="scope">
			          <el-tag>{{ scope.row.tel }}</el-tag>
			        </template>
			      </el-table-column>
			      <el-table-column label="成功分销" width="115">
			        <template slot-scope="scope">
			          {{ scope.row.level }}
			        </template>
			      </el-table-column>
			      <el-table-column label="已获佣金" width="115">
			        <template slot-scope="scope">
			          {{ scope.row.level }}
			        </template>
			      </el-table-column>
			      <el-table-column label="参与时间" width="220">
			        <template slot-scope="scope">
			          <i class="el-icon-time" />
			          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
			        </template>
			      </el-table-column>
			      <el-table-column label="状态" width="50">
			        <template slot-scope="scope">
			          {{ scope.row.level }}
			        </template>
			      </el-table-column>
			      <el-table-column label="操作" width="220">
				      <template slot-scope="scope" style="display: none">
				      	<el-button
				          size="mini"
				          @click="handleView(scope.$index, scope.row)">查看</el-button>
				        <el-button
				          size="mini"
				          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
				        <el-button
				          size="mini"
				          type="danger"
				          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				      </template>
			    </el-table-column>
		    </el-table>
		  </el-row>
		</div>
		<el-dialog
      title="分销设置"
      :visible.sync="dialogSettingVisible"
      width="600px"
      :modal-append-to-body="false"
      :append-to-body="true">
      <el-form :model="setting">
		    <el-form-item label="每份佣金" label-width="120px">
		      <el-input v-model="setting.money" autocomplete="off" style="display: inline-block;width: 240px; margin-right: 10px"></el-input><span>元/单</span>
		    </el-form-item>
		    <el-form-item label="分销数量" label-width="120px">
		      <el-input v-model="setting.number" autocomplete="off" style="display: inline-block;width: 240px; margin-right: 10px"></el-input><span>单</span>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogSettingVisible = false">取 消</el-button>
		    <el-button type="primary" @click="handleSetting">确 定</el-button>
		  </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchActivtyFenxiao } from '@/api/activity'
import { parseTime } from '@/utils'

export default {
  data() {
    return {
      isFenxiao: true,
      list: null,
      listLoading: false,
	  	downloadLoading: false,
	  	filename: '',
	  	autoWidth: true,
      bookType: 'xlsx',
      dialogSettingVisible: false,
      setting: { money: '0', number: '0' }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
  	fetchData() {
		  // this.listLoading = true
		  fetchActivtyFenxiao().then(response => {
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
		},
		handleSetting() {
			this.dialogSettingVisible = false
			alert('保存数据')
		}
  }
}
</script>

<style lang="scss" scoped>
	.fenxiao-container {
		margin-top: 20px;
		.top {
			background-color: #f7f9fa;
	    border: 1px solid #e6e8eb;
	    border-radius: 4px;
	    padding: 16px;
	    margin-bottom: 20px;
	    	span {
	    		display: block;
	    		margin-top: 10px;
	    		font-size: 15px;
	    	}
	    }
	}
	.el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
    	border-right: 1px solid #e6e8eb;
	}
	.el-table td, .el-table th.is-leaf {
	    border-bottom: 1px solid #e6e8eb;
	}
	.el-table {
		color: #1b2733;
	}
</style>
<style type="text/css">
	.el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
    	border-right: 1px solid #e6e8eb;
	}
	.el-table td, .el-table th.is-leaf {
	    border-bottom: 1px solid #e6e8eb;
	}
</style>
