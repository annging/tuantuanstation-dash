<template>
	<div style="position: relative;">
		<el-form ref="form" :model="equity" label-width="80px" size="small" label-position="left">
			<el-form-item :label="'权益' + (index*1+1)">
	          	<span></span>
	        </el-form-item>
	        <el-form-item label="券类型">
		    <el-radio-group v-model="equity.type" size="small">
		      <el-radio label="1" border>无</el-radio>
		      <el-radio label="2" border>代金券</el-radio>
		      <el-radio label="3" border>折扣券</el-radio>
		      <el-radio label="4" border>兑换券</el-radio>
		    </el-radio-group>
		 </el-form-item>
			<el-form-item label="优惠金额">
	          	<el-input v-model="equity.money"></el-input>
	        </el-form-item>
	        <el-form-item label="使用门槛">
	          	<el-input v-model="equity.condition" placeholder="满多少可用，0则无门槛"></el-input>
	        </el-form-item>
	        <el-form-item label="每月张数">
	          	<el-input v-model="equity.number" placeholder="满多少可用，0则无门槛"></el-input>
	        </el-form-item>
	         <el-form-item label="适用范围">
			    <el-select v-model="equity.stores" multiple placeholder="请选择门店">
			      <el-option label="全店通用" value="0"></el-option>
			      <el-option label="门店1" value="1"></el-option>
			      <el-option label="门店2" value="2"></el-option>
			    </el-select>
			  </el-form-item>
		</el-form>

		<el-button class="destroy" icon="el-icon-delete" @click="deleteEquity( equity )" /></el-button>
	</div>
</template>

<script>
export default {
	name: 'EquityItem',
 	props: {
	    equity: {
	     	type: Object,
	      	default: function() {
	        	return {}
	      	}
	    },
	    index: {
            type : Number,
            default: 0
        }
	 },
	computed: {
	},
	methods: {
	    deleteEquity(equity) {
	      this.$emit('deleteEquity', equity)
	    }
	}
}
</script>

<style>
	.destroy {
		position: absolute;
		right: 30px;
		top: 30px;
		cursor: pointer;
	}
</style>