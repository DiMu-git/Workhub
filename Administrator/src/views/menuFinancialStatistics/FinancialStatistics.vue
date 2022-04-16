<template>
  <div>
		<div class="search_container">
      <el-form :model="searchParams" :inline="true" class="searchformContent" label-width="70px"  size="small">
          <el-form-item label="时间筛选">
            <el-date-picker
              style="width: 240px"
              v-model="searchDates"
              type="monthrange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
              :picker-options="pickerOptions"
              value-format="yyyy-MM"
              >
              </el-date-picker>
          </el-form-item>
					<el-form-item label="业务经理" v-if="userInfo.level>=4">
						<el-select v-model="searchParams.userId" placeholder="请选择业务经理" clearable filterable style="width:100%">
              <el-option v-for="item in userLevel1List" :label="item.realName" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
					<el-form-item label="公司名称" v-if="userInfo.level==1 || searchParams.userId">
            <el-input v-model="searchParams.company" placeholder="请输入公司名称" clearable style="width:140px"></el-input>
          </el-form-item>
					
          <el-form-item>
            <el-button type="primary" @click="search()">查询</el-button>
          </el-form-item>
      </el-form>
    </div>
		<div class="tableContent">
			<table cellspacing="0" cellpadding="0" border="0" v-if="userInfo.level!=1&&!searchParams.userId">
				<tr>
					<td width="25%">总收入</td><td width="25%">{{resData.inTotal}}</td>
					<td width="25%">总支出</td><td width="25%">{{resData.outTotal}}</td>
				</tr>
				<tr>
					<td>已收款金额</td><td>{{resData.payed}}</td>
					<td>工资</td><td>{{resData.payTotal}}</td>
				</tr>
				<tr>
					<td>未收款金额</td><td>{{resData.nonePay}}</td>
					<td>购买</td><td>{{resData.refund}}</td>
				</tr>
				<tr>
					<td>含税</td><td>{{resData.taxIn}}</td>
					<td>含税</td><td>{{resData.taxOut}}</td>
				</tr>
				<tr>
					<td>不含税</td><td>{{resData.nonTaxIn}}</td>
					<td>不含税</td><td>{{resData.nontaxOut}}</td>
				</tr>
				<tr>
					<td>开票</td><td>{{resData.billTypeIn}}</td>
					<td>开票</td><td>{{resData.billTypeOut}}</td>
				</tr>
				<tr>
					<td>未开票</td><td>{{resData.nonBillTypeIn}}</td>
					<td>未开票</td><td>{{resData.nonBillTypeOut}}</td>
				</tr>
				<tr>
					<td>营收情况</td><td colspan="3">{{resData.total}}</td>
				</tr>
			</table>
			<table cellspacing="0" cellpadding="0" border="0" v-if="userInfo.level==1 || searchParams.userId">
				<tr>
					<td width="25%">总销售额</td><td width="25%">{{resData.inTotal}}</td>
					<td width="25%">总提成</td><td width="25%">{{resData.commissionTotal}}</td>
				</tr>
				<tr>
					<td>已收款金额</td><td>{{resData.payed}}</td>
					<td>已结算</td><td>{{resData.commissioned}}</td>
				</tr>
				<tr>
					<td>未收款金额</td><td>{{resData.nonePay}}</td>
					<td>未结算</td><td>{{resData.commissionNo}}</td>
				</tr>
			</table>
		</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { getMoney} from "api/menuFinancialStatistics/financialStatistics";

import { getList as getUserList} from "api/menuPeopleMana/peopleMana";

export default {
  name: 'FinancialStatistics',
  components: {},
	computed: {
    ...mapGetters([
      "userInfo"
    ]),
  },
  data() {
    return {
			resData:{},
			searchParams:{},
			userLevel1List:[],
      searchDates:[],//日期范围
      pickerOptions: {
          shortcuts: [{
            text: '本月',
            onClick(picker) {
              picker.$emit('pick', [new Date(), new Date()]);
            }
          }, {
            text: '今年至今',
            onClick(picker) {
              const end = new Date();
              const start = new Date(new Date().getFullYear(), 0);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近六个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setMonth(start.getMonth() - 6);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
    }
  },

  methods: {
    search(){
			if(!this.searchDates || this.searchDates.length==0){
				this.$message({
          type: 'warning',
          message: '请选择日期'
        }); 
				return
			}

      this.searchParams.startDate = "";
      this.searchParams.endDate = "";
      if(this.searchDates&&this.searchDates.length>0){
        this.searchParams.startDate=this.searchDates[0]
        this.searchParams.endDate=this.searchDates[1]
      }
			getMoney(this.searchParams).then((res)=>{
        debugger
				if(res.code == 0){
					this.resData = res.data
				}
			})

    },
		getUserList(){
			let searchParams = {
				pageNo:1,
        pageSize:1000,
        userName:"",
        realName:"",
        level:1,
        dept:"",
        tel:"",
			}
			getUserList(searchParams).then((res)=>{
				let data = res.data;
        this.userLevel1List = data.content;
			})
		}
  },

  created() {
    let nowDate = this.$options.filters['dateFormat'](new Date(),'yyyy-mm');
    this.searchDates=[nowDate,nowDate]
    this.search();
		this.getUserList()
  },
  filters:{ 
	    dateFormat:function(dateStr,pattern = ''){
	      if(dateStr == "- - -"){
	        return dateStr
	      }
	      var dt = new Date(dateStr);
	      var y = dt.getFullYear();
	      var m = (dt.getMonth()+1) < 10? "0" + (dt.getMonth()+1) : (dt.getMonth()+1);
	      var d = dt.getDate() < 10? "0" + dt.getDate() : dt.getDate();
	      if(pattern.toLowerCase() == 'yyyy-mm'){
	        return `${y}-${m}`
	      }else if(pattern.toLowerCase() == 'yyyy-mm-dd'){
	        return `${y}-${m}-${d}`
	      }else{
	        var hh = dt.getHours() < 10? "0" + dt.getHours() : dt.getHours();
	        var mm = dt.getMinutes() < 10? "0" + dt.getMinutes() : dt.getMinutes();
	        var ss = dt.getSeconds() < 10? "0" + dt.getSeconds() : dt.getSeconds();
	        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
	      }
	    },
	  }
}
</script>

<style lang='scss' scoped>
.tableContent{
	width: 640px;
	table{
		width: 100%;
		tr td{
			font-size: 18px;
			text-align: center;
			border: 1px solid #000;
			padding:15px 0px;
		}
	}
	
}
</style>