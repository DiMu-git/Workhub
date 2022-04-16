<template>
  <div>
    <div class="search_container">
      <el-form :model="searchParams" :inline="true" class="searchformContent" label-width="70px"  size="small">
        <el-row>
          <el-form-item label="业务经理">
            <el-input v-model="searchParams.realName" placeholder="请输入业务经理" clearable style="width:140px"></el-input>
          </el-form-item>
          <el-form-item label="客户名称">
            <el-input v-model="searchParams.customerName" placeholder="请输入客户名称" clearable style="width:140px"></el-input>
          </el-form-item>
          <el-form-item label="审批状态">
            <el-select v-model="searchParams.checkStatus" placeholder="请选择审批状态" clearable filterable style="width:140px">
              <el-option v-for="item in searchCheckStatus" :label="item.val" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出货日期">
            <el-date-picker
              style="width: 240px"
              v-model="searchDates"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd"
              >
              </el-date-picker>
          </el-form-item>
          <!-- <el-form-item label="业务经理">
            <el-input v-model="searchParams.realName" placeholder="请输入业务经理" clearable style="width:140px"></el-input>
          </el-form-item> -->
        </el-row>
        <el-row>
          <el-form-item>
            <el-button type="primary" @click="search()">查询</el-button>
            <el-button type="success" @click="add()">新建</el-button>
            <el-button type="warning" @click="edit()">编辑</el-button>
            <el-button type="danger" @click="del()">删除</el-button>
            <el-button type="info" @click="resetSearchParams()">重置</el-button>
            <el-button v-if="userInfo.level>=3" @click="oneKeyPass()">一键通过</el-button>
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
        <el-table-column prop="realName" label="业务经理">
          <template slot-scope="scope"> {{scope.row.realName?scope.row.realName:'--'}}</template>
        </el-table-column>
        <el-table-column prop="customerName" label="客户名称">
          <template slot-scope="scope"> {{scope.row.customerName?scope.row.customerName:'--'}}</template>
        </el-table-column>
        <el-table-column prop="saleDetailDate" label="出货日期">
          <template slot-scope="scope"> {{scope.row.saleDetailDate?scope.row.saleDetailDate:'--'}}</template>
        </el-table-column>
        <el-table-column prop="address" label="送货地址">
          <template slot-scope="scope"> {{scope.row.address?scope.row.address:'--'}}</template>
        </el-table-column>
        <el-table-column prop="remark" label="备注">
          <template slot-scope="scope"> {{scope.row.remark?scope.row.remark:'--'}}</template>
        </el-table-column>
        <el-table-column prop="checkStatus" label="审批状态">
          <template slot-scope="scope"> {{scope.row.checkStatus!=null?checkStatuss[scope.row.checkStatus]:'--'}}</template>
        </el-table-column>
        <el-table-column prop="checkContent" label="审批说明">
          <template slot-scope="scope"> {{scope.row.checkContent?scope.row.checkContent:'--'}}</template>
        </el-table-column>
				<el-table-column prop="createDate" label="创建时间" width="150px">
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
							<el-form-item label="产品名称" prop="product">
                <el-dropdown  trigger="click" @command="handleCommand">
								  <el-input v-model="msg.product" autocomplete="off" placeholder="请输入产品名称"></el-input>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="item in productNameList1" :item="msg" fieldName1="product" :command="item.value" :key="item.id" v-text="item.value+'('+item.remark+')'"></el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="公司名称" prop="company">
                <el-dropdown  trigger="click" @command="handleCommand">
								  <el-input v-model="msg.company" autocomplete="off" placeholder="请输入公司名称"></el-input>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="item in companyList2" :item="msg" fieldName1="company" :command="item.value" :key="item.id" v-text="item.value+'('+item.remark+')'"></el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
							</el-form-item>
						</el-col>
					</el-row>
          <el-row >
						<el-col :span="12">
							<el-form-item label="客户名称">
								<el-input v-model="msg.customerName" autocomplete="off" placeholder="请输入客户名称"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
              <el-form-item label="出货日期">
                <el-date-picker type="date" placeholder="选择出货日期" v-model="msg.saleDetailDate" style="width: 100%;" clearable value-format="yyyy-MM-dd"></el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>
          <el-row >
						<el-col :span="24">
							<el-form-item label="送货地址">
								<el-input v-model="msg.address" autocomplete="off" placeholder="请输入送货地址"></el-input>
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
          <el-row >
						<el-col :span="12">
							<el-form-item label="收货人">
								<el-input v-model="msg.receiver" autocomplete="off" placeholder="请输入收货人"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="接收电话">
                <el-input v-model="msg.receiverTel" oninput="value=value.replace(/[^\d]/g,'')"  placeholder="请输入接收电话" maxlength="11" clearable></el-input>
							</el-form-item>
						</el-col>
					</el-row>
          <el-row >
						<el-col :span="12">
							<el-form-item label="装货车牌">
                <el-dropdown  trigger="click" @command="handleCommand">
								  <el-input v-model="msg.plateNo" autocomplete="off" placeholder="请输入装货车牌"></el-input>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="item in plateNoList6" :item="msg" fieldName1="plateNo" :command="item.value" :key="item.id" v-text="item.value+'('+item.remark+')'"></el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="司机名称">
								<el-input v-model="msg.driver" autocomplete="off" placeholder="请输入司机名称"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
          <el-row >
            <el-col :span="12">
							<el-form-item label="司机电话">
                <el-input v-model="msg.driverTel" oninput="value=value.replace(/[^\d]/g,'')"  placeholder="请输入司机电话" maxlength="11" clearable></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="制单人">
								<el-input v-model="msg.maker" autocomplete="off" placeholder="请输入制单人"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
          <el-row >
						<el-col :span="12">
							<el-form-item label="装货人">
								<el-input v-model="msg.loader" autocomplete="off" placeholder="请输入装货人"></el-input>
							</el-form-item>
						</el-col>
            <el-col :span="12">
							<el-form-item label="复核人">
								<el-input v-model="msg.checker" autocomplete="off" placeholder="请输入复核人"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
          <el-row >
            <el-col :span="12">
							<el-form-item label="业务经理">
								<el-input v-model="msg.realName" autocomplete="off" placeholder="请输入业务经理"></el-input>
							</el-form-item>
						</el-col>
					</el-row>

          <el-row class="saleDetailListContent">
						<el-form-item label-width="0px">
							<el-button size="small" :disabled="msg.checkStatus==1" icon="el-icon-plus" style="margin: 0px 0px 8px 10px" @click.prevent="addGoods()"></el-button>
							<el-table :data="msg.saleDetailList"  style="width: 100%;" stripe border  
								:header-cell-style="{textAlign: 'center',color:'#333',background:'#FAFAFA',padding: '6px 0px'}"
								:cell-style="{textAlign: 'center',padding: '0px 0px'}">
                  <el-table-column label="序号" min-width="8%">
                    <template slot-scope="scope">
                      <el-input placeholder="请输入" v-model="scope.row.id"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="名称描述" min-width="30%">
                    <template slot-scope="scope">
                      <el-dropdown  trigger="click" @command="handleCommand">
                        <el-input placeholder="请输入" v-model="scope.row.name"></el-input>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item v-for="item in nameDescList11" :item="scope.row" fieldName1="name" :command="item.value" :key="item.id" v-text="item.value+'('+item.remark+')'"></el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </template>
                  </el-table-column>
                  <el-table-column label="尺寸" min-width="11%">
                    <template slot-scope="scope">
                      <el-dropdown  trigger="click" @command="handleCommand">
                        <el-input placeholder="请输入" v-model="scope.row.size"></el-input>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item v-for="item in sizeList12" :item="scope.row" fieldName1="size" :command="item.value" :key="item.id" v-text="item.value+'('+item.remark+')'"></el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </template>
                  </el-table-column>
                  <el-table-column label="数量" min-width="11%">
                    <template slot-scope="scope">
                      <el-input placeholder="请输入" v-model="scope.row.num"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="单位" min-width="11%">
                    <template slot-scope="scope">
                      <el-dropdown  trigger="click" @command="handleCommand">
                        <el-input placeholder="请输入" v-model="scope.row.unit"></el-input>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item v-for="item in unitList10" :item="scope.row" fieldName1="unit" :command="item.value" :key="item.id" v-text="item.value+'('+item.remark+')'"></el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </template>
                  </el-table-column>
                  <el-table-column label="备注" min-width="30%">
                    <template slot-scope="scope">
                      <el-input placeholder="请输入" v-model="scope.row.remark"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column min-width="10%">
                      <template slot="header">
                          <span>操作</span>
                      </template>
                      <template slot-scope="scope">
                          <el-button size="mini" type="danger" :disabled="msg.checkStatus==1"  @click.prevent="delGoods(scope.$index)">删除</el-button>
                      </template>
                  </el-table-column>
              </el-table>
            </el-form-item>
					</el-row>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button size="small" @click="visible = false">取 消</el-button>
					<el-button size="small" type="primary" @click="save('ruleForm')" v-if="msg.checkStatus == null || msg.checkStatus == -1 || serInfo.level>4">保 存</el-button>
					<el-button size="small" type="primary" @click="submitCheck('ruleForm')" v-if="msg.checkStatus != 0" :disabled="msg.checkStatus==1">{{msg.checkStatus==1?"审核中":"提交审核"}}</el-button>
			
          <el-button size="small" type="danger" @click="isShowCheck=true;checkContent=''" v-if="msg.checkStatus == 1">不通过</el-button>
					<el-button size="small" type="success" @click="oneKeyPass(msg.id)" v-if="msg.checkStatus == 1">通过</el-button>
          <el-button size="small" type="warning" @click="isShowPrintPre=true">打印预览</el-button>	
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

      <el-dialog title="打印预览" :visible.sync="isShowPrintPre" center class="defaultDialog" :close-on-click-modal="false" :close-on-press-escape="false">
        <table id="previewTable">
          <tr style="height:36px"><th colspan="6"><span style="font-size: 20px">{{msg.product}}</span></th></tr>
          <tr style="height:26px"><th colspan="6">{{msg.company}}</th></tr>
          <tr>
            <th>客户名称</th>
            <td colspan="2">{{msg.customerName}}</td>
            <th>出货日期</th>
            <td colspan="2">{{msg.saleDetailDate}}</td>
          </tr>
          <tr>
            <th>送货地址</th>
            <td colspan="2">{{msg.address}}</td>
            <th>备注</th>
            <td colspan="2">{{msg.remark}}</td>
          </tr>
          <tr>
            <th>序号</th>
            <th>名称描述</th>
            <th>尺寸</th>
            <th>数量</th>
            <th>单位</th>
            <th>备注</th>
          </tr>
          <tr v-for="(item,index) in msg.saleDetailList" :key="index" style="height:26px">
            <td>{{item.id}}</td>
            <td>{{item.name}}</td>
            <td>{{item.size}}</td>
            <td>{{item.num}}</td>
            <td>{{item.unit}}</td>
            <td>{{item.remark}}</td>
          </tr>
					<tr>
            <th>收货人签字</th>
            <td colspan="2">{{msg.receiver}}</td>
            <th>电话</th>
            <td colspan="2">{{msg.receiverTel}}</td>
          </tr>
          <tr>
            <th>装货车牌</th>
            <td>{{msg.plateNo}}</td>
            <th>司机电话</th>
            <td>{{msg.driverTel}}</td>
            <th>司机签字</th>
            <td>{{msg.driver}}</td>
          </tr>
          <tr>
            <th>制单</th>
            <td>{{msg.maker}}</td>
            <th>装货</th>
            <td>{{msg.loader}}</td>
            <th>复核</th>
            <td>{{msg.checker}}</td>
          </tr>
        </table>
        <div slot="footer" class="dialog-footer">
					<el-button size="small" @click="isShowPrintPre = false">取 消</el-button>
					<el-button size="small" type="primary" v-print="{id: 'previewTable',popTitle: ''}">打 印</el-button>
				</div>
			</el-dialog>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { getList,addOrEdit,del,toChinese,check} from "api/menuOutGoodsList/outGoodsList";

import { getList as getDictionaryList} from "api/menuDataDictionary/dataDictionary";

export default {
  name: 'OutGoodsList',
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
        realName:"",//新增业务经理
        customerName:"",
        checkStatus:"",
        startDate:"",
        endDate:"",
        // realName:"",
        content:"",
      },

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
      isShowPrintPre:false,//是否显示打印预览

      rules: {
        // realName: [{ required: true, message: '付款人不能为空', trigger: 'blur' }],
      },

      searchDates:[],//日期范围
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      productNameList1:[],//产品名称 候选值列表
      companyList2:[],//公司名称 候选值列表
      payCompanyList3:[],//付款单位 候选值列表
      receiptCompanyList4:[],//收款单位 候选值列表
      payWayList5:[],//支付方式 候选值列表
      plateNoList6:[],//车牌号 候选值列表
      acountList7:[],//账号 候选值列表
      speHList8:[],//规格高 候选值列表
      speWList9:[],//规格长 候选值列表
      unitList10:[],//单位 候选值列表
      nameDescList11:[],//名称描述 候选值列表
      sizeList12:[],//尺寸 候选值列表
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
    toChinese(){
      toChinese(this.msg.payTotal).then((res)=>{
        if(res.code == 0){
          this.msg.payTotalA = res.data
        }
      })
    },
    // 出货明细 新增
    addGoods(){
      var obj={id:"", name:"",size:"",num:"",unit:"",remark:""}
      this.msg.saleDetailList.push(obj)

      this.msg.saleDetailList.map((item,index)=>{
        item.id = index+1
        return item
      })
    },
    // 出货明细 删除
    delGoods(index){
      this.$confirm('确认删除该条数据？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        this.msg.saleDetailList.splice(index,1);
        this.msg.saleDetailList.map((item,index)=>{
          item.id = index+1
          return item
        })
      }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
      });
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
        let bean = JSON.parse(JSON.stringify(this.multipleSelection[0]))
        bean.saleDetailList = JSON.parse(bean.saleDetailList)
        this.msg=bean
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
        customerName:"",
        checkStatus:"",
        startDate:"",
        endDate:"",
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
          bean.saleDetailList=JSON.stringify(bean.saleDetailList)
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
      this.searchParams.startDate = "";
      this.searchParams.endDate = "";
      if(this.searchDates&&this.searchDates.length>0){
        this.searchParams.startDate=this.searchDates[0]
        this.searchParams.endDate=this.searchDates[1]
      }
      this.init()
    },
    // async getDictionaryList(){
    //   try {
    //     //调用接口名前加 await
        
    //     var {data} =  await getDictionaryList({pageNo:1,pageSize:1000,type:"1"});
    //     this.productNameList1 = data.content
    //     var {data} =  await getDictionaryList({pageNo:1,pageSize:1000,type:"2"});
    //     this.companyList2 = data.content
    //     var {data} =  await getDictionaryList({pageNo:1,pageSize:1000,type:"6"});
    //     this.plateNoList6 = data.content
    //     var {data} =  await getDictionaryList({pageNo:1,pageSize:1000,type:"10"});
    //     this.unitList10 = data.content
    //     var {data} =  await getDictionaryList({pageNo:1,pageSize:1000,type:"11"});
    //     this.nameDescList11 = data.content
    //     var {data} =  await getDictionaryList({pageNo:1,pageSize:1000,type:"12"});
    //     this.sizeList12 = data.content
          
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
          if(type=="1"){this.productNameList1=res.data.content}
          if(type=="2"){this.companyList2=res.data.content}
          if(type=="6"){this.plateNoList6=res.data.content}
          if(type=="10"){this.unitList10=res.data.content}
          if(type=="11"){this.nameDescList11=res.data.content}
          if(type=="12"){this.sizeList12=res.data.content}
          resolve()
        })
      })  
    },
    //重置数据
    reset(){
      return new Promise((resolve, reject) => {
        Promise.all([
          this.getDictionaryList("1"),
          this.getDictionaryList("2"),
          this.getDictionaryList("6"),
          this.getDictionaryList("10"),
          this.getDictionaryList("11"),
          this.getDictionaryList("12"),
          ]).then((result) => {
          this.msg={
            product: "",//产品名称
            company: "",//公司名称
            customerName: "",//客户名称
            saleDetailDate: this.$options.filters['dateFormat'](new Date(),'yyyy-mm-dd'),//出货日期
            address: null,//送货地址
            remark: null,//备注
            receiver: null,//收货人
            receiverTel: null,//接收电话
            plateNo: null,//装货车牌
            driver: null,//司机名称
            driverTel: null,//司机电话
            maker: "",//制单
            loader: null,//装货
            checker: null,//复核
            realName:null,//新增业务经理，可随意修改
            checkStatus:null,
            checkContent:"",
            saleDetailList: [//明细项
              {id:"1", name:"",size:"",num:"",unit:"",remark:""},
              {id:"2", name:"",size:"",num:"",unit:"",remark:""},
              {id:"3", name:"",size:"",num:"",unit:"",remark:""},
              {id:"4", name:"",size:"",num:"",unit:"",remark:""},
              {id:"5", name:"",size:"",num:"",unit:"",remark:""},
            ],

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
  },
}
</script>

<style lang='scss' scoped>
::v-deep .saleDetailListContent{
  .el-table .cell{
    padding-left: 0px;
    padding-right: 0px;
  }
  .el-input__inner{
    padding:0 5px;
  }
}

#previewTable{
  border-collapse: collapse;
	text-align: center;
	width: 100%;
  td,th{
    border:1px solid #000;
	  font-size: 12px;
    padding: 6px 0px;
  }
}
</style>