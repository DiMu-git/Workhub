<template>
  <div>
    <div class="search_container">
      <el-form :model="searchParams" :inline="true" class="searchformContent" label-width="70px"  size="small">
        <el-row>
          <el-form-item label="付款人">
            <el-input v-model="searchParams.realName" placeholder="请输入付款人" clearable style="width:140px"></el-input>
          </el-form-item>
          <el-form-item label="付款单位">
            <el-input v-model="searchParams.company" placeholder="请输入付款单位" clearable style="width:140px"></el-input>
          </el-form-item>
          <el-form-item label="支付方式">
            <el-select v-model="searchParams.type" placeholder="请选择支付方式" clearable filterable style="width:140px">
              <el-option v-for="item in payWayList5"  :label="item.value" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="收款单位">
            <el-input v-model="searchParams.getCompany" placeholder="请输入收款单位" clearable style="width:140px"></el-input>
          </el-form-item>
          <el-form-item label="收款人">
            <el-input v-model="searchParams.getName" placeholder="请输入收款人" clearable style="width:140px"></el-input>
          </el-form-item>
          <el-form-item label="开票情况">
            <el-select v-model="searchParams.billType" placeholder="请选择开票情况" clearable filterable style="width:140px">
              <el-option v-for="item in billTypes" :label="item.val" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否含税">
            <el-select v-model="searchParams.tax" placeholder="请选择是否含税" clearable filterable style="width:140px">
              <el-option v-for="item in taxs" :label="item.val" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审批状态">
            <el-select v-model="searchParams.checkStatus" placeholder="请选择审批状态" clearable filterable style="width:140px">
              <el-option v-for="item in searchCheckStatus" :label="item.val" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item>
            <el-button type="primary" @click="search()">查询</el-button>
            <el-button type="success" @click="add()">新建</el-button>
            <el-button type="warning" @click="edit()">编辑</el-button>
            <el-button type="danger" @click="del()">删除</el-button>
            <el-button type="info" @click="resetSearchParams()">重置</el-button>
            <el-button v-if="userInfo.level>=4" @click="oneKeyPass()">一键通过</el-button>
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
				<el-table-column prop="realName" label="付款人">
          <template slot-scope="scope"> {{scope.row.realName?scope.row.realName:'--'}}</template>
        </el-table-column>
        <el-table-column prop="company" label="付款单位">
          <template slot-scope="scope"> {{scope.row.company?scope.row.company:'--'}}</template>
        </el-table-column>
        <el-table-column prop="payTotal" label="付款金额">
          <template slot-scope="scope"> {{scope.row.payTotal!=null?scope.row.payTotal:'--'}}</template>
        </el-table-column>
        <el-table-column prop="payUse" label="付款用途">
          <template slot-scope="scope"> {{scope.row.payUse?scope.row.payUse:'--'}}</template>
        </el-table-column>
        <el-table-column prop="type" label="支付方式">
          <template slot-scope="scope"> {{scope.row.type | payWayFormat(payWayList5)}}</template>
        </el-table-column>
        <el-table-column prop="getCompany" label="收款单位">
          <template slot-scope="scope"> {{scope.row.getCompany?scope.row.getCompany:'--'}}</template>
        </el-table-column>
        <el-table-column prop="billType" label="开票情况">
          <template slot-scope="scope"> {{scope.row.billType?billTypes[scope.row.billType-1].val:'--'}}</template>
        </el-table-column>
        <el-table-column prop="tax" label="是否含税">
          <template slot-scope="scope"> {{scope.row.tax!=null?taxs[scope.row.tax].val:'--'}}</template>
        </el-table-column>
        <el-table-column prop="checkStatus" label="审批状态">
          <template slot-scope="scope"> {{scope.row.checkStatus!=null?checkStatuss[scope.row.checkStatus]:'--'}}</template>
        </el-table-column>
        <el-table-column prop="checkContent" label="审批说明">
          <template slot-scope="scope"> {{scope.row.checkContent?scope.row.checkContent:'--'}}</template>
        </el-table-column>
        <el-table-column prop="payDate" label="付款日期">
          <template slot-scope="scope"> {{scope.row.payDate?scope.row.payDate:'--'}}</template>
        </el-table-column>
				<el-table-column prop="createDate" label="申请时间" width="150px">
          <template slot-scope="scope">
              {{scope.row.createDate | dateFormat()}}
          </template>
        </el-table-column>

				<el-table-column label="操作" fixed="right" width="105px">
          <template slot-scope="scope">
             <!-- 审批状态  1、审核中  -1、审核未通过 0、已完成 -->
            <el-button class="defaultColor" v-if="scope.row.checkStatus==null || scope.row.checkStatus==-1" size="mini" round plain @click.stop="changeCheck(scope.row,1)">提交审核</el-button>
            <el-button class="defaultColor" v-if="scope.row.checkStatus==1" size="mini" round plain @click.stop="changeCheck(scope.row,null)">撤销审核</el-button>
            <el-button class="defaultColor" v-if="scope.row.checkStatus==0" disabled size="mini" round plain>审核通过</el-button>

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
				<el-form :model="msg" size="small" :disabled="(msg.checkStatus==1||msg.checkStatus==0)&&userInfo.level<4" :rules="rules"  ref="ruleForm" :label-width="formLabelWidth">
					<el-row >
						<el-col :span="12">
							<el-form-item label="付款单位" prop="company">
                <el-dropdown  trigger="click" @command="handleCommand">
								  <el-input v-model="msg.company" autocomplete="off" placeholder="请输入付款单位"></el-input>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="item in payCompanyList3" :item="msg" fieldName1="company" :command="item.value" :key="item.id" v-text="item.value+'('+item.remark+')'"></el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
							</el-form-item>
						</el-col>
						<el-col :span="12">
              <el-form-item label="付款人" prop="realName">
                <el-input v-model="msg.realName" autocomplete="off" placeholder="请输入付款人"></el-input>
              </el-form-item>	
						</el-col>
					</el-row>
          <el-row >
            <el-col :span="12">
              <el-form-item label="付款日期">
                <el-date-picker type="date" placeholder="选择付款日期" v-model="msg.payDate" style="width: 100%;" clearable value-format="yyyy-MM-dd"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="付款用途">
								<el-input v-model="msg.payUse" autocomplete="off" placeholder="请输入付款用途"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
          <el-row >
            <el-col :span="12">
              <el-form-item label="付款金额">
								<el-input type="number" @blur="toChinese" v-model="msg.payTotal" autocomplete="off" placeholder="请输入付款金额"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="付款金额大写">
								<el-input v-model="msg.payTotalA" autocomplete="off" placeholder="请输入付款金额大写"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
          <el-row >
            <el-col :span="12">
              <el-form-item label="支付方式">
                <el-select v-model="msg.type" multiple placeholder="请选择支付方式" clearable filterable style="width:100%">
                  <el-option v-for="item in payWayList5" :label="item.value" :value="item.id" :key="item.id"></el-option>
                </el-select>
							</el-form-item>
						</el-col>
            <el-col :span="12">
              <el-form-item label="开票情况">
                <el-select v-model="msg.billType" placeholder="请选择开票情况" clearable filterable style="width:100%">
                  <el-option v-for="item in billTypes" :label="item.val" :value="item.id" :key="item.id"></el-option>
                </el-select>
							</el-form-item>
						</el-col>
					</el-row>
          <el-row >
            <el-col :span="12">
							<el-form-item label="收款单位">
                <el-dropdown  trigger="click" @command="handleCommand">
								  <el-input v-model="msg.getCompany" autocomplete="off" placeholder="请输入收款单位"></el-input>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="item in receiptCompanyList4" :item="msg" fieldName1="getCompany" :command="item.value" :key="item.id" v-text="item.value+'('+item.remark+')'"></el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
							</el-form-item>
						</el-col>
            <el-col :span="12">
							<el-form-item label="收款人">
								<el-input v-model="msg.getName" autocomplete="off" placeholder="请输入收款人"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
          <el-row >
            <el-col :span="12">
							<el-form-item label="收款账号">
                <el-dropdown  trigger="click" @command="handleCommand">
								  <el-input v-model="msg.getAccount" autocomplete="off" placeholder="请输入收款账号"></el-input>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-for="item in acountList7" :item="msg" fieldName1="getAccount" fieldName2="getAccountBank" :fieldNameVal2="item.valueType"  :command="item.value" :key="item.id" v-text="item.value+'('+item.remark+')'"></el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
							</el-form-item>
						</el-col>
            <el-col :span="12">
              <el-form-item label="开户行">
								<el-input v-model="msg.getAccountBank" autocomplete="off" placeholder="请输入开户行"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
          <el-row >
            <el-col :span="12">
							<el-form-item label="是否含税">
                <template>
                  <el-radio v-model.number="msg.tax" :label="0">含税</el-radio>
                  <el-radio v-model.number="msg.tax" :label="1">不含税</el-radio>
                </template>
							</el-form-item>
						</el-col>	
					</el-row>
          <el-row >
						<el-col :span="24">
							<el-form-item label="备注">
								<el-input v-model="msg.remark" autocomplete="off" placeholder="请输入备注"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button size="small" @click="visible = false">取 消</el-button>
					<el-button size="small" type="primary" @click="save('ruleForm')" v-if="msg.checkStatus == null || msg.checkStatus == -1 || serInfo.level>4">保 存</el-button>
					<el-button size="small" type="primary" @click="submitCheck('ruleForm')" v-if="msg.checkStatus != 0" :disabled="msg.checkStatus==1">{{msg.checkStatus==1?"审核中":"提交审核"}}</el-button>
          	
          <el-button size="small" type="danger" @click="isShowCheck=true;checkContent=''" v-if="msg.checkStatus == 1&&userInfo.level>=4">不通过</el-button>
					<el-button size="small" type="success" @click="oneKeyPass(msg.id)" v-if="msg.checkStatus == 1&&userInfo.level>=4">通过</el-button>
				</div>
			</el-dialog>

      <el-dialog title="不通过原因" width="320px" :visible.sync="isShowCheck" center class="defaultDialog" :close-on-click-modal="false" :close-on-press-escape="false">
        <el-form size="small" :rules="rules" label-width="40px">
          <el-form-item label="原因">
            <el-input v-model="checkContent" autocomplete="off" placeholder="请输入不通过原因"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
      		<el-button size="small" type="danger" @click="noPassCheck()">提交</el-button>
        </div>
			</el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { getList,addOrEdit,del,toChinese,check} from "api/menuPaymentList/paymentList";

import { getList as getDictionaryList} from "api/menuDataDictionary/dataDictionary";

export default {
  name: 'PaymentList',
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

      pageNo:1,
      pageSize:10,
      total:0,
      searchParams:{
        pageNo:1,
        pageSize:10,
        realName:"",
        company:"",
        getCompany:"",
        getName:"",
        type:"",
        billType:"",
        tax:"",
        checkStatus:"",
      },

      // 支付方式
      // payWayList5:[
        // {id:1,val:"现金"},
        // {id:2,val:"银行转账"},
        // {id:3,val:"电汇"},
        // {id:4,val:"承兑"},
        // {id:5,val:"支票"},
        // {id:6,val:"其它"},
      // ],
      // 开票情况
      billTypes:[
        {id:1,val:"已开票"},
        {id:2,val:"未开票"},
        {id:3,val:"其它"},
      ], 
      // 是否含税  0含税 1不含税
      taxs:[
        {id:0,val:"含税"},
        {id:1,val:"不含税"},
      ], 

      //审批状态  1、审核中  -1、审核未通过 0、已完成
      checkStatuss:{
        "1":"审核中",
        "-1":"审核未通过",
        "0":"已完成",
      },
      searchCheckStatus:[
        {id:1,val:"审核中"},
        {id:-1,val:"审核未通过"},
        {id:0,val:"已完成"},
      ],
      isShowCheck:false,
      checkContent:"",//不通过原因

      rules: {
        company: [{ required: true, message: '付款单位不能为空', trigger: 'blur' }],
        realName: [{ required: true, message: '付款人不能为空', trigger: 'blur' }],
      },
      // productNameList1:[],//产品名称 候选值列表
      // companyList2:[],//公司名称 候选值列表
      payCompanyList3:[],//付款单位 候选值列表
      receiptCompanyList4:[],//收款单位 候选值列表
      payWayList5:[],//支付方式 候选值列表
      // plateNoList6:[],//车牌号 候选值列表
      acountList7:[],//账号 候选值列表
      // speHList8:[],//规格高 候选值列表
      // speWList9:[],//规格长 候选值列表
      // unitList10:[],//单位 候选值列表
      // nameDescList11:[],//名称描述 候选值列表
      // sizeList12:[],//尺寸 候选值列表
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
      this.getDictionaryList("5")
    },  
    toChinese(){
      this.msg.payTotal = parseFloat(this.msg.payTotal).toFixed(1)
      toChinese(this.msg.payTotal).then((res)=>{
        if(res.code == 0){
          this.msg.payTotalA = res.data
        }
      })
    },
    add(){
      this.reset().then((res)=>{
        this.visible = true;
      }) 
    },
    edit(){
      if(this.multipleSelection.length!=1){
					this.$alert('', '请选择一条数据', {
            confirmButtonText: '确定',
          });	
          return
				}
        let msg = this.multipleSelection[0];
        this.msg=JSON.parse(JSON.stringify(msg))
        debugger
        if(this.msg.type){
          this.msg.type = JSON.parse(this.msg.type)
        }
        debugger
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
        let item = this.multipleSelection[i]
        if(item.checkStatus == 0 || item.checkStatus == 1){
          this.$message({
            message: item.checkStatus==1?'不能删除审核中的数据':'不能删除审核通过的数据',
            type: 'warning'
          });
          return
        }
        ids.push(item.id)
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
        realName:"",
        company:"",
        getCompany:"",
        getName:"",
        type:"",
        billType:"",
        tax:"",
        checkStatus:"",
      }
    },
    changeCheck(row,checkStatus){
      let msg =JSON.parse(JSON.stringify(row))
      msg.checkStatus = checkStatus;
      addOrEdit(msg).then((res)=>{
        if(res.code == 0){
          this.$message({
            message: msg.checkStatus==1?"提交成功":"撤销成功",
            type: 'success'
          });
          this.init()
          return
        }
      })
    },

    submitCheck(formName){
      this.msg.checkStatus = 1;
      this.save(formName)
    },
    oneKeyPass(id){
      let ids = [];
      if(id){
        ids.push(id)
      }else{
        if(this.multipleSelection.length==0){
          this.$alert('', '请选择一键通过的数据', {
            confirmButtonText: '确定',
          });	
          return
        }      
        for (var i = 0; i < this.multipleSelection.length; i++) {
          let item = this.multipleSelection[i]
          if(item.checkStatus!=1){
            this.$message({
              message: '请选择审核中的数据',
              type: 'warning'
            });
            return
          }
          ids.push(item.id)
        }
      }

      this.$confirm(id?'确认通过？':'确认一键通过？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        check({ids:ids,checkStatus:0,checkContent:""}).then((res)=>{
          this.$message({
            message: res.data,
            type: 'success'
          });
          this.visible=false;
          this.init()
        })
      })
    },
    noPassCheck(){
      if(!this.checkContent){
        this.$message({
          message: "审核原因不能为空",
          type: 'warning'
        });
        return
      }
      check({ids:[this.msg.id],checkStatus:-1,checkContent:this.checkContent}).then((res)=>{
        this.$message({
          message: res.data,
          type: 'success'
        });
        this.isShowCheck=false;
        this.visible=false;
        this.init()
      })
    },
    save(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let bean = JSON.parse(JSON.stringify(this.msg));
          bean.userId =this.userInfo.id
          bean.updateUser =this.userInfo.realName

          if(bean.type){
            bean.type = JSON.stringify(bean.type)
          }
          addOrEdit(bean).then((res)=>{
            if(res.code == 0){
              this.$message({
                message: this.msg.checkStatus==1?"提交成功":"保存成功",
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
    // async getDictionaryList(){
    //   try {
    //     //调用接口名前加 await
        
    //     var {data} =  await getDictionaryList({pageNo:1,pageSize:1000,type:"3"});
    //     this.payCompanyList3 = data.content
        
    //     var {data} =  await getDictionaryList({pageNo:1,pageSize:1000,type:"4"});
    //     this.receiptCompanyList4 = data.content

    //     var {data} =  await getDictionaryList({pageNo:1,pageSize:1000,type:"5"});
    //     this.payWayList5 = data.content

    //     var {data} =  await getDictionaryList({pageNo:1,pageSize:1000,type:"7"});
    //     this.acountList7 = data.content
          
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
    handleCommand(command,{$attrs}){
      let fieldName1 = $attrs.fieldName1;
      let item = $attrs.item||{}
      item[fieldName1] = command
      if($attrs.fieldName2){
        item[$attrs.fieldName2] = $attrs.fieldNameVal2
      }
    }, 
    getDictionaryList(type){
      return new Promise((resolve, reject) => {
        getDictionaryList({pageNo:1,pageSize:1000,type:type}).then((res)=>{
          if(type=="3"){this.payCompanyList3=res.data.content}
          if(type=="4"){this.receiptCompanyList4=res.data.content}
          if(type=="5"){this.payWayList5=res.data.content}
          if(type=="7"){this.acountList7=res.data.content}
          resolve()
        })
      })  
    },
    //重置数据
    reset(){
      return new Promise((resolve, reject) => {
        Promise.all([
          this.getDictionaryList("3"),
          this.getDictionaryList("4"),
          this.getDictionaryList("5"),
          this.getDictionaryList("7")
          ]).then((result) => {
          this.msg={
            realName: "",//付款人
            company: "",//付款单位
            payUse: "",//付款用途
            payTotal: null,//付款金额
            payTotalA: "",//付款金额大写
            type: null,//支付方式
            getCompany: "",//收款单位
            getName: "",//收款人
            getAccountBank: "",//开户行
            getAccount: "",//收款账号
            billType: null,//开票情况
            tax: null,//是否含税
            checkStatus: null,//审批状态
            checkContent: "",//审批说明
            payDate:this.$options.filters['dateFormat'](new Date(),'yyyy-mm-dd'),//付款日期
            remark: ""//备注
          }
          
          resolve('reset 成功了')
        }).catch((error) => {
          console.log(error)
        })
      
      })
    }
  },

  created() {
    // this.reset().then(()=>{
      this.init()
    // })
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
    payWayFormat(type,payWayList5){
      if(!type){
        return "--"
      }
      let typeArr = JSON.parse(type);
      let typeValArr = []
      payWayList5.forEach((item)=>{
        if(Array.isArray(typeArr) && (typeArr.indexOf(item.id)>-1)){
          typeValArr.push(item.value)
        }
      })
      return typeValArr.join(',')
    }
  },
}
</script>

<style lang='scss' scoped>
</style>