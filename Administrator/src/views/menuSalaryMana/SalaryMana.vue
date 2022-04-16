<template>
  <div>
    <div class="search_container">
      <el-form :model="searchParams" :inline="true" class="searchformContent" label-width="70px"  size="small">
        <el-row v-if="userInfo.level>=2">
          <el-form-item label="姓名" label-width="40px">
            <el-input v-model="searchParams.name" placeholder="请输入姓名" clearable style="width:140px"></el-input>
          </el-form-item>
          <el-form-item label="职位" label-width="40px">
            <el-input v-model="searchParams.level" placeholder="请输入职位" clearable style="width:140px"></el-input>
          </el-form-item>
          <el-form-item label="全勤" label-width="40px">
            <el-input v-model="searchParams.fullPay" placeholder="请输入全勤" clearable style="width:140px"></el-input>
          </el-form-item>
          <el-form-item label="评优" label-width="40px">
            <el-input v-model="searchParams.apay" placeholder="请输入评优" clearable style="width:140px"></el-input>
          </el-form-item>
          <el-form-item label="月份" label-width="40px">
            <el-date-picker v-model="searchParams.mon" type="month" placeholder="请选择月份" style="width:140px" value-format="yyyy-MM"></el-date-picker>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item>
            <el-button type="primary" @click="search()">查询</el-button>
            <el-button type="success" @click="add()" v-if="userInfo.level>=2">新建</el-button>
            <el-button type="warning" @click="edit()" v-if="userInfo.level>=2">编辑</el-button>
            <el-button type="warning" @click="edit(1)" v-if="userInfo.level==1">查看</el-button>
            <el-button type="danger" @click="del()" v-if="userInfo.level>=2">删除</el-button>
            <el-button type="info" @click="resetSearchParams()" v-if="userInfo.level>=2">重置</el-button>
          </el-form-item>
        </el-row>
      </el-form>
      
    </div>
    <div class="table_container">
      <el-table
        ref="multipleTable"
				:data="tableData"
				tooltip-effect="dark"
				size="medium"
				style="width: 100%;"  
				:header-cell-style="{textAlign: 'center',color:'#fff',background:'#CFC39F',padding: '6px 0px'}"
				:cell-style="{textAlign: 'center'}" 
        @row-click="clickRow"   
				@selection-change="handleSelectionChange"
				>
        <el-table-column type="selection" fixed width="50px"></el-table-column>
        <el-table-column label="序号" type="index" fixed width="50px">
					<template slot-scope="scope">
            <span>{{(pageNo - 1) * pageSize + scope.$index + 1}}</span>
          </template>
				</el-table-column>
				<el-table-column prop="name" label="姓名">
          <template slot-scope="scope"> {{scope.row.name!=null?scope.row.name:'--'}}</template>
        </el-table-column>
				<el-table-column prop="level" label="职位">
          <template slot-scope="scope"> {{scope.row.level!=null?scope.row.level:'--'}}</template>
        </el-table-column>
        <el-table-column prop="pay" label="基本工资">
          <template slot-scope="scope"> {{scope.row.pay!=null?scope.row.pay:'--'}}</template>
        </el-table-column>
				<el-table-column prop="carPay" label="交通补贴">
          <template slot-scope="scope"> {{scope.row.carPay!=null?scope.row.carPay:'--'}}</template>
        </el-table-column>
        <el-table-column prop="telPay" label="话费补贴">
          <template slot-scope="scope"> {{scope.row.telPay!=null?scope.row.telPay:'--'}}</template>
        </el-table-column>
        <el-table-column prop="allowance" label="岗位津贴">
          <template slot-scope="scope"> {{scope.row.allowance!=null?scope.row.allowance:'--'}}</template>
        </el-table-column>
        <el-table-column prop="floatPay" label="浮动工资">
          <template slot-scope="scope"> {{scope.row.floatPay!=null?scope.row.floatPay:'--'}}</template>
        </el-table-column>
        <el-table-column prop="fullPay" label="全勤">
          <template slot-scope="scope"> {{scope.row.fullPay!=null?scope.row.fullPay:'--'}}</template>
        </el-table-column>
        <el-table-column prop="apay" label="评优">
          <template slot-scope="scope"> {{scope.row.apay!=null?scope.row.apay:'--'}}</template>
        </el-table-column>
        <el-table-column prop="overtimePay" label="加班工资">
          <template slot-scope="scope"> {{scope.row.overtimePay!=null?scope.row.overtimePay:'--'}}</template>
        </el-table-column>
        <el-table-column prop="deduction" label="社保">
          <template slot-scope="scope"> {{scope.row.deduction!=null?scope.row.deduction:'--'}}</template>
        </el-table-column>
        <el-table-column prop="latePay" label="迟到">
          <template slot-scope="scope"> {{scope.row.latePay!=null?scope.row.latePay:'--'}}</template>
        </el-table-column>
        <el-table-column prop="earlyPay" label="早退">
          <template slot-scope="scope"> {{scope.row.earlyPay!=null?scope.row.earlyPay:'--'}}</template>
        </el-table-column>
        <el-table-column prop="thingPay" label="事假">
          <template slot-scope="scope"> {{scope.row.thingPay!=null?scope.row.thingPay:'--'}}</template>
        </el-table-column>
        <el-table-column prop="sickPay" label="病假">
          <template slot-scope="scope"> {{scope.row.sickPay!=null?scope.row.sickPay:'--'}}</template>
        </el-table-column>
        <el-table-column prop="noworkPay" label="旷工">
          <template slot-scope="scope"> {{scope.row.noworkPay!=null?scope.row.noworkPay:'--'}}</template>
        </el-table-column>
        <el-table-column prop="total" label="合计">
          <template slot-scope="scope"> {{scope.row.total!=null?scope.row.total:'--'}}</template>
        </el-table-column>
        <el-table-column prop="tax" label="扣税">
          <template slot-scope="scope"> {{scope.row.tax!=null?scope.row.tax:'--'}}</template>
        </el-table-column>
        <el-table-column prop="real" label="实发工资">
          <template slot-scope="scope"> {{scope.row.real!=null?scope.row.real:'--'}}</template>
        </el-table-column>
        <el-table-column prop="mon" label="月份">
          <template slot-scope="scope"> 
            {{scope.row.mon | dateFormat('yyyy-mm')}}
          </template>
        </el-table-column>
				<el-table-column prop="createDate" label="创建时间" width="150px">
          <template slot-scope="scope">
              {{scope.row.createDate | dateFormat()}}
          </template>
        </el-table-column>
			</el-table>

      <div class="pageContent">
        <el-pagination
          background
          :page-sizes="[10, 25, 50, 100]"
          layout="total,sizes,prev, pager, next"
          :current-page="pageNo"
          :page-size="10"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>
      <el-dialog title="详情页" :visible.sync="visible" center class="defaultDialog" :close-on-click-modal="false" :close-on-press-escape="false">
				<el-form :model="msg" size="small" :rules="rules" :disabled="isLook" ref="ruleForm" :label-width="formLabelWidth">
					<el-row >
						<el-col :span="12">
							<el-form-item label="姓名" prop="name">
								<el-input v-model="msg.name" autocomplete="off" placeholder="请输入姓名"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="职位" prop="level">
								<el-input v-model="msg.level" autocomplete="off" placeholder="请输入职位"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
          <el-row >
						<el-col :span="12">
							<el-form-item label="基本工资" prop="pay">
								<!-- <el-input type="number" @input="limitInput($event,'pay')" v-model.number="msg.pay" autocomplete="off" placeholder="请输入基本工资"></el-input> -->
								<el-input v-model.number="msg.pay" autocomplete="off" placeholder="请输入基本工资" @input="limitInput($event,'pay')"  @blur="limitInputChange(msg.pay,'pay')"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="交通补贴" prop="carPay">
								<!-- <el-input type="number" @input="limitInput($event,'carPay')" v-model.number="msg.carPay" autocomplete="off" placeholder="请输入交通补贴"></el-input> -->
								<el-input v-model.number="msg.carPay" autocomplete="off" placeholder="请输入交通补贴" @input="limitInput($event,'carPay')" @blur="limitInputChange(msg.carPay,'carPay')"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
          <el-row >
						<el-col :span="12">
							<el-form-item label="话费补贴" prop="telPay">
								<!-- <el-input type="number" @input="limitInput($event,'telPay')" v-model.number="msg.telPay" autocomplete="off" placeholder="请输入话费补贴"></el-input> -->
								<el-input v-model.number="msg.telPay" autocomplete="off" placeholder="请输入话费补贴" @input="limitInput($event,'telPay')" @blur="limitInputChange(msg.telPay,'telPay')"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="岗位津贴" prop="allowance">
								<!-- <el-input type="number" @input="limitInput($event,'allowance')" v-model.number="msg.allowance" autocomplete="off" placeholder="请输入岗位津贴"></el-input> -->
								<el-input v-model.number="msg.allowance" autocomplete="off" placeholder="请输入岗位津贴" @input="limitInput($event,'allowance')" @blur="limitInputChange(msg.allowance,'allowance')"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
          <el-row >
						<el-col :span="12">
							<el-form-item label="浮动工资" prop="floatPay">
								<!-- <el-input type="number" @input="limitInput($event,'floatPay')" v-model.number="msg.floatPay" autocomplete="off" placeholder="请输入浮动工资"></el-input> -->
								<el-input v-model.number="msg.floatPay" autocomplete="off" placeholder="请输入浮动工资" @input="limitInput($event,'floatPay')" @blur="limitInputChange(msg.floatPay,'floatPay')"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="全勤" prop="fullPay">
								<!-- <el-input type="number" @input="limitInput($event,'fullPay')" v-model.number="msg.fullPay" autocomplete="off" placeholder="请输入全勤"></el-input> -->
								<el-input v-model.number="msg.fullPay" autocomplete="off" placeholder="请输入全勤" @input="limitInput($event,'fullPay')" @blur="limitInputChange(msg.fullPay,'fullPay')"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
          <el-row >
						<el-col :span="12">
							<el-form-item label="评优" prop="apay">
								<!-- <el-input type="number" @input="limitInput($event,'apay')" v-model.number="msg.apay" autocomplete="off" placeholder="请输入评优"></el-input> -->
								<el-input v-model.number="msg.apay" autocomplete="off" placeholder="请输入评优" @input="limitInput($event,'apay')" @blur="limitInputChange(msg.apay,'apay')"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="加班工资" prop="overtimePay">
								<!-- <el-input type="number" @input="limitInput($event,'overtimePay')" v-model.number="msg.overtimePay" autocomplete="off" placeholder="请输入加班工资"></el-input> -->
								<el-input v-model.number="msg.overtimePay" autocomplete="off" placeholder="请输入加班工资" @input="limitInput($event,'overtimePay')" @blur="limitInputChange(msg.overtimePay,'overtimePay')"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
          <el-row >
						<el-col :span="12">
							<el-form-item label="社保" prop="deduction">
								<!-- <el-input type="number" @input="limitInput($event,'deduction')" v-model.number="msg.deduction" autocomplete="off" placeholder="请输入社保"></el-input> -->
								<el-input v-model.number="msg.deduction" autocomplete="off" placeholder="请输入社保" @input="limitInput($event,'deduction')" @blur="limitInputChange(msg.deduction,'deduction')"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="迟到" prop="latePay">
								<!-- <el-input type="number" @input="limitInput($event,'latePay')" v-model.number="msg.latePay" autocomplete="off" placeholder="请输入迟到"></el-input> -->
								<el-input v-model.number="msg.latePay" autocomplete="off" placeholder="请输入迟到" @input="limitInput($event,'latePay')" @blur="limitInputChange(msg.latePay,'latePay')"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
          <el-row >
						<el-col :span="12">
							<el-form-item label="早退" prop="earlyPay">
								<!-- <el-input type="number" @input="limitInput($event,'earlyPay')" v-model.number="msg.earlyPay" autocomplete="off" placeholder="请输入早退"></el-input> -->
								<el-input v-model.number="msg.earlyPay" autocomplete="off" placeholder="请输入早退" @input="limitInput($event,'earlyPay')" @blur="limitInputChange(msg.earlyPay,'earlyPay')"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="事假" prop="thingPay">
								<!-- <el-input type="number" @input="limitInput($event,'thingPay')" v-model.number="msg.thingPay" autocomplete="off" placeholder="请输入事假"></el-input> -->
								<el-input v-model.number="msg.thingPay" autocomplete="off" placeholder="请输入事假" @input="limitInput($event,'thingPay')" @blur="limitInputChange(msg.thingPay,'thingPay')"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
          <el-row >
						<el-col :span="12">
							<el-form-item label="病假" prop="sickPay">
								<!-- <el-input type="number" @input="limitInput($event,'sickPay')" v-model.number="msg.sickPay" autocomplete="off" placeholder="请输入病假"></el-input> -->
								<el-input v-model.number="msg.sickPay" autocomplete="off" placeholder="请输入病假" @input="limitInput($event,'sickPay')" @blur="limitInputChange(msg.sickPay,'sickPay')"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="旷工" prop="noworkPay">
								<!-- <el-input type="number" @input="limitInput($event,'noworkPay')" v-model.number="msg.noworkPay" autocomplete="off" placeholder="请输入旷工"></el-input> -->
								<el-input v-model.number="msg.noworkPay" autocomplete="off" placeholder="请输入旷工" @input="limitInput($event,'noworkPay')" @blur="limitInputChange(msg.noworkPay,'noworkPay')"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
          <el-row >
						<el-col :span="12">
							<el-form-item label="合计" prop="total">
								<el-input type="number" v-model.number="msg.total" autocomplete="off" placeholder="请输入合计"></el-input>
							</el-form-item>
						</el-col>
            <el-col :span="12">
							<el-form-item label="扣税" prop="tax">
								<!-- <el-input type="number" @input="limitInput($event,'tax')" v-model.number="msg.tax" autocomplete="off" placeholder="请输入扣税"></el-input> -->
								<el-input v-model.number="msg.tax" autocomplete="off" placeholder="请输入扣税" @input="limitInput($event,'tax')" @blur="limitInputChange(msg.tax,'tax')"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
          <el-row >
            <el-col :span="12">
							<el-form-item label="实发工资" prop="real">
								<el-input type="number" v-model.number="msg.real" autocomplete="off" placeholder="请输入实发工资"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="月份" prop="mon">
                <el-date-picker v-model="msg.mon" type="month" placeholder="请选择月份" style="width:100%"  value-format="yyyy-MM"></el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>
          <!-- <div v-show="false">合计:{{total_auto}} 实发工资:{{real_auto}}</div> -->
      
      
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button size="small" @click="visible = false">取 消</el-button>
					<el-button size="small" type="primary" @click="save('ruleForm')" v-if="userInfo.level>=2">保 存</el-button>
				</div>
			</el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { getList,addOrEdit,del} from "api/menuSalaryMana/salaryMana";


export default {
  name: 'SalaryMana',
  components: {},
  computed: {
    ...mapGetters([
      "userInfo"
    ]),
  },
  data() {
    return {
      visible:false,
      tableData:[],
      multipleSelection: [],
      msg:{},
      formLabelWidth:"100px",
      isLook:false,

      pageNo:1,
      pageSize:10,
      total:0,
      searchParams:{
        pageNo:1,
        pageSize:10,
        name:"",
        level:"",
        fullPay:"",
        apay:"",
        mon:"",
      },

      rules: {
        name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        mon: [{ required: true, message: '月份不能为空', trigger: 'change' }],
      },
    }
  },

  methods: {
    init(){
      this.searchParams.pageNo = this.pageNo;
      this.searchParams.pageSize = this.pageSize;
      getList(this.searchParams).then((res)=>{
        let data = res.data;
        this.tableData = data.content;
        this.total=data.totalElements
      })
    },
    
    total_auto(){
      let total_auto = 
        // pay基本工资  carPay交通补贴  telPay话费补贴  allowance岗位津贴 floatPay浮动工资
        parseFloat(this.msg.pay)+parseFloat(this.msg.carPay)+parseFloat(this.msg.telPay)+parseFloat(this.msg.allowance)+parseFloat(this.msg.floatPay)+
        // fullPay全勤  apay评优  overtimePay加班工资 deduction社保 latePay迟到
        parseFloat(this.msg.fullPay)+parseFloat(this.msg.apay)+parseFloat(this.msg.overtimePay)+parseFloat(this.msg.deduction)+parseFloat(this.msg.latePay)+
        // earlyPay早退 thingPay事假  sickPay病假 noworkPay旷工
        parseFloat(this.msg.earlyPay)+parseFloat(this.msg.thingPay)+parseFloat(this.msg.sickPay)+parseFloat(this.msg.noworkPay);
        this.msg.total = parseFloat(total_auto).toFixed(2)
    },
    real_auto(){
      let real_auto = 
        // pay:基本工资  carPay:交通补贴  telPay:话费补贴  allowance:岗位津贴 floatPay:浮动工资
        parseFloat(this.msg.pay)+parseFloat(this.msg.carPay)+parseFloat(this.msg.telPay)+parseFloat(this.msg.allowance)+parseFloat(this.msg.floatPay)+
        // fullPay:全勤  apay:评优  overtimePay:加班工资 deduction:社保 latePay:迟到
        parseFloat(this.msg.fullPay)+parseFloat(this.msg.apay)+parseFloat(this.msg.overtimePay)+parseFloat(this.msg.deduction)+parseFloat(this.msg.latePay)+
        // earlyPay:早退 thingPay:事假  sickPay:病假 noworkPay:旷工 tax:扣税
        parseFloat(this.msg.earlyPay)+parseFloat(this.msg.thingPay)+parseFloat(this.msg.sickPay)+parseFloat(this.msg.noworkPay)+parseFloat(this.msg.tax);
        this.msg.real = parseFloat(real_auto).toFixed(2)
    },

    // 额外费用校验输入正负数， 保留2位小数 调用公共方法
    limitInput(values,name) {
      this.msg[name] = this.plusOrMinus(values.toString())
    },
    // 结合change事件对失去焦点进行判断，防止输入一些无效值
    limitInputChange(val,name) {
      // 防止删除为空
      if (!val) {
        this.msg[name] = '0'
        return
      }
      // 一些错误金额输入的判断
      if (val.toString().indexOf('.') > 0 && Number(val.toString().split('.')[1].length) < 1) {
        val = val.toString().split('.')[0]
      }
      // 一些错误金额输入的判断
      if (!val || val === '-' || val === '-0') {
        this.msg[name] = '0'
        return
      }
      this.msg[name] = parseFloat(val).toFixed(2)
      // 此时item.materielExtraCost的值即是最终有效值
      // .......在这里可以继续你的代码..........
      this.total_auto();
      this.real_auto();
    },

    // 公共方法部分
    /* 校验输入正负数， 保留2位小数 传来的需要是string类型*/
    plusOrMinus(values) {
      let newValue
      if (!(/[^0-9.-]/g.test(values))) {
        newValue = values.replace(/[^\-\d.]/g, '').replace(/\b(0+){2,}/g, '0').replace(/\-{2,}/g, '-').replace(/^\./g, '').replace(/\.{2,}/g, '.').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
        if (newValue.toString().indexOf('.') > 0 && Number(newValue.toString().split('.')[1].length) > 2) {
          newValue = parseInt(parseFloat(newValue) * 100) / 100
        }
        if ((newValue.toString().split('-').length - 1) > 1) {
          newValue = parseFloat(newValue) || ''
        }
        if ((newValue.toString().split('-').length) > 1 && newValue.toString().split('-')[0].length > 0) {
          newValue = parseFloat(newValue) || ''
        }
        if (newValue.toString().length > 1 && (newValue.toString().charAt(0) === '0' || (newValue.toString().length > 2 && newValue.toString().charAt(0) === '-' && newValue.toString().charAt(1) === '0' && newValue.toString().charAt(2) !== '.')) && newValue.toString().indexOf('.') < 1) {
          newValue = parseFloat(newValue) || ''
        }
        // 判断整数位最多为9位
        if (newValue.toString().indexOf('.') > 0 && Number(newValue.toString().split('.')[0].length) > 9) {
          newValue = newValue.toString().substring(0, 9) + '.' + newValue.toString().split('.')[1]
        } else if (newValue.toString().indexOf('.') < 0 && Number(newValue.toString().split('.')[0].length) > 9) {
          newValue = newValue.toString().substring(0, 9)
        }
      } else {
        newValue = values.replace(/[^0-9.-]/g, '')
      }
      return newValue
    },


    add(){
      this.reset().then((res)=>{
        this.visible = true;
      }) 
    },
    edit(type){
      this.isLook=false;
      if(type == 1){
        this.isLook=true;
      }
      if(this.multipleSelection.length!=1){
					this.$alert('', '请选择一条数据', {
            confirmButtonText: '确定',
          });	
          return
				}
        let msg = this.multipleSelection[0];
        this.msg=JSON.parse(JSON.stringify(msg))
        this.visible = true;
    },
    del(){
      if(this.multipleSelection.length==0){
        this.$alert('', '请选择删除的数据', {
          confirmButtonText: '确定',
        });	
        return
      }
      let ids = [];
      for (var i = 0; i < this.multipleSelection.length; i++) {
        ids.push(this.multipleSelection[i].id)
      }
      this.$confirm('确认删除该数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del(ids).then((res)=>{
          if(res.code == 0){
            this.$message({
              message: res.data,
              type: 'success'
            });

            let totalPage = Math.ceil((this.total - ids.length) / this.pageSize); // 总页数
            let pageNo = this.pageNo > totalPage ? totalPage : this.pageNo;
            this.pageNo = pageNo < 1 ? 1 : pageNo;
            this.init()
            return
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });          
      });
    },
    resetSearchParams(){
      this.searchParams={
        pageNo:1,
        pageSize:10,
        name:"",
        level:"",
        fullPay:"",
        apay:"",
        mon:"",
      }
    },
    save(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addOrEdit(this.msg).then((res)=>{
            if(res.code == 0){
              this.$message({
                message: res.data,
                type: 'success'
              });
              this.visible = false
              this.init()
              return
            }
          })

        } 
      });
    },

    //改变分页大小
    handleSizeChange(val) {
      this.pageSize = val;
      this.init();
    },
    //改变当前页
    handleCurrentChange(val) {
      this.pageNo=val;
      this.init();
    },
    // 单击表格某一行选中/取消选中
    clickRow(row) {
        this.$refs.multipleTable.toggleRowSelection(row)
    },
    //选中复选框
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    search(){
      this.pageNo=1;
      this.init()
    },
    //重置数据
    reset(){
      return new Promise((resolve, reject) => {
        Promise.all([]).then((result) => {
          this.msg={
            name: "",//姓名
            level: "",//职位
            pay: "0",//基本工资
            carPay: "0",//交通补贴
            telPay: "0",//话费补贴
            allowance: "0",//岗位津贴
            floatPay: "0",//浮动工资
            fullPay: "0",//全勤
            apay: "0",//评优
            overtimePay: "0",//加班工资
            deduction: "0",//社保
            latePay: "0",//迟到
            earlyPay: "0",//早退
            thingPay: "0",//事假
            sickPay: "0",//病假
            noworkPay: "0",//旷工
            total: "0",//合计
            tax:"0",//扣税
            real: "0",//实发工资
            mon: "",//月份
          }
       
          resolve('reset 成功了')
        }).catch((error) => {
          console.log(error)
        })
      
      })
    }
  },

  created() {
    this.reset().then(()=>{
      this.init()
    })
  },
  filters:{ 
    dateFormat:function(dateStr,pattern = ''){
      if(!dateStr){
        return '--'
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
  },
}
</script>

<style lang='scss' scoped>
</style>