<template>
	<div class="main-content">
	  	<div class="staff-container">
	    	<el-menu default-active="1" class="" mode="horizontal" router style="margin-bottom: 20px;">
	      	<el-menu-item index="1" :route="{path:'/account/staff/list/'}">员工管理</el-menu-item>
	    	</el-menu>
	    	<el-row type="flex">
	    		<el-button type="primary" size="small" style="min-width: 120px;margin-right: 30px;" @click="goCreate">添加员工</el-button>
	    		<el-select v-model="listQuery.store" placeholder="选择门店" clearable size="small" class="filter-item" style="margin-right: 30px;">
	    			<el-option value="">全部门店</el-option>
			        <el-option v-for="item in stores" :key="item.id" :label="item.name" :value="item.id" />
			      </el-select>
	    		<el-input
    				placeholder="请输入内容"
    				prefix-icon="el-icon-search"
    				v-model="listQuery.searchStr"
    				size="small">
  				</el-input>
	    	</el-row>
	    	<el-row class="staff-list">
	    		<el-table
			    :data="staffData"
			    style="width: 100%"
			    border
			    size="small"
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
			      label="姓名"
			      sortable
			      width="100">
			    </el-table-column>
			    <el-table-column
			      label="头像"
			      width="80">
			      <template slot-scope="scope">
			      	<img :src="scope.row.avatar" style="width: 40px;height: 40px;"></template>
			    </el-table-column>
			    <el-table-column
			      prop="tel"
			      label="电话">
			    </el-table-column>
			    <el-table-column
			      prop="store.name"
			      label="门店">
			    </el-table-column>
			    <el-table-column
			      prop="role"
			      label="角色">
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
    	<div class="secondary-sidebar">
  		</div>
  	</div>
</template>

<script>
export default {
  data() {
    return {
      staffData: [ { id:1, name: '王大王', avatar: 'https://file2.rrxh5.cc/g2/c1/2020/01/27/1580096585877.png',  tele: "14565434567", wx: "", role: '管理员', store: { id:1, name: '门店11111111新华小区' } },
      {id:2, name: '李大力', avatar: 'https://file2.rrxh5.cc/g2/c1/2020/01/27/1580096585877.png',  tele: "", wx: "" , role: 'Boss', store: { id:1, name: '门店1' } }, 
      {id:3, name: '余大鱼', cover: 'https://cdn.dribbble.com/users/758684/screenshots/10850859/task_mgt_2_4x.jpg?compress=1&resize=800x600',  tele: "", wx: "", role: '员工', store: { id:2, name: '门店2' } } ],
      listQuery: { searchStr: '', store: '' },
      stores: [ { id: 1, name: '门店一' }, { id: 2, name: '门店二' } ]
    }
  },
  methods: {
  	formatter(row, column) {
        return row.address;
     },
    goCreate() {
      this.$router.push({ path: '/account/staff/create' });
    },
    handleView(index, row) {
        console.log(index, row);
    },
    handleEdit(index, row) {
        this.$router.push({ path: '/account/staff/edit/'+ row.id });
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
  	.staff-container {
  		position: relative;
      	z-index: 1;
      	-webkit-box-flex: 1;
      	flex: 1;
      	min-width: 420px;
      	margin-left: 30px;
      	outline: none;
  	}
	.staff-list {
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
	.el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
    	border-right: 1px solid #e6e8eb;
	}
	.el-table td, .el-table th.is-leaf {
	    border-bottom: 1px solid #e6e8eb;
	}
</style>
