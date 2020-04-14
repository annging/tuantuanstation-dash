<template>
	<div class="main-content">
	  	<div class="level-container" style="margin-right: 30px;">
	    	<el-menu default-active="1" class="" mode="horizontal" router style="margin-bottom: 20px;">
	      	<el-menu-item index="1" :route="{path:'/member/level/list'}">会员等级管理</el-menu-item>
	    	</el-menu>
	    	<el-row type="flex">
	    		<el-button type="primary" size="small" style="min-width: 120px;margin-right: 30px;" @click="goCreate">添加等级</el-button>
	    	</el-row>
	    	<el-row class="level-list">
	    		<el-table
	    		v-loading="listLoading"
			    :data="list"
			    style="width: 100%"
			    border
			    size="small"
			    element-loading-text="Loading..."
			    :header-cell-style="{
				    'background-color': '#f7f9fa',
				    'color': '#637282;'
				}"
			    :default-sort = "{prop: 'id', order: 'ascending'}"
			    >
			    <el-table-column
			      prop="id"
			      label="ID"
			      sortable
			      width="60">
			    </el-table-column>
			    <el-table-column
			      prop="name"
			      label="等级名称"
			      sortable
			      width="150">
			    </el-table-column>
			    <el-table-column
			      label="每月权益">
			      <template slot-scope="scope">
			      	每月1张10元代金券。使用条件： 满50，全店通用。
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop=""
			      label="升级条件">
			      <template slot-scope="scope">
			      	邀请好友10人
			      </template>
			    </el-table-column>
			    <el-table-column label="操作" width="220">
			      <template slot-scope="scope">
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
    	<div class="secondary-sidebar" style="display: none">
  		</div>
  	</div>
</template>

<script>
import { fetchList } from '@/api/member'

export default {
name: 'MemberLevel',
data() {
    return {
      list: [ { id:1, name: '金卡？', right: {},  tele: "14565434567" },
      {id:2, name: '体验卡', right: {} }, 
      {id:3, name: '。。。', right: {} } ],
      listLoading: false
    }
  },
  methods: {
  	fetchData() {
		this.listLoading = true
		fetchLevelList().then(response => {
		    this.list = response.data.items
		    this.listLoading = false
		})
	},
  	formatter(row, column) {
        return row.address;
     },
    goCreate() {
      this.$router.push({ path: '/member/level/create' });
    },
    handleView(index, row) {
        console.log(index, row);
    },
    handleEdit(index, row) {
        this.$router.push({ path: '/member/level/edit/'+ row.id });
    },
    handleDelete(index, row) {
        console.log(index, row);
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
  	.level-container {
  		position: relative;
      	z-index: 1;
      	-webkit-box-flex: 1;
      	flex: 1;
      	min-width: 420px;
      	margin-left: 30px;
      	outline: none;
  	}
	.level-list {
	    margin-top: 20px;

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
	.el-table {
		color: #1b2733;
	}
	
</style>
<style type="text/css">
	.level-list .el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
    	border-right: 1px solid #e6e8eb;
	}
	.level-list .el-table td, .el-table th.is-leaf {
	    border-bottom: 1px solid #e6e8eb;
	}
</style>
