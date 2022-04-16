<template>
  <div>
    <div class="search_container">
      <el-form :model="searchParams" :inline="true" class="searchformContent" label-width="70px"  size="small">
        <el-row>
          <el-form-item label="字段名称">
            <el-select v-model="searchParams.type" placeholder="请选择字段名称" clearable filterable style="width:100%">
              <el-option v-for="item in fieldNameList" :label="item.value" :value="item.type" :key="item.type"></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item>
            <el-button type="primary" @click="search()">查询</el-button>
            <el-button type="success" @click="add()">新建</el-button>
            <el-button type="warning" @click="edit()">编辑</el-button>
            <el-button type="danger" @click="del()" v-if="userInfo.level>1">删除</el-button>
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
        <el-table-column prop="type" label="字段名称">
          <template slot-scope="scope"> {{scope.row.type?fieldNameList[scope.row.type-1].value:'--'}}</template>
        </el-table-column>
        <el-table-column prop="value" label="候选值">
          <template slot-scope="scope"> {{scope.row.value?scope.row.value:'--'}}</template>
        </el-table-column>
        <el-table-column prop="valueType" label="候选值绑定值">
          <template slot-scope="scope"> {{scope.row.valueType?scope.row.valueType:'--'}}</template>
        </el-table-column>
        <el-table-column prop="remark" label="备注">
          <template slot-scope="scope"> {{scope.row.remark?scope.row.remark:'--'}}</template>
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
				<el-form :model="msg" size="small" :rules="rules"  ref="ruleForm" :label-width="formLabelWidth">
					<el-row >
						<el-col :span="24">
							<el-form-item label="字段名称" prop="type">
                <el-select v-model="msg.type" placeholder="请选择字段名称" clearable filterable style="width:100%">
                  <el-option v-for="item in fieldNameList" :label="item.value" :value="item.type" :key="item.type"></el-option>
                </el-select>
							</el-form-item>
						</el-col>
					</el-row>
          <el-row >
						<el-col :span="24">
							<el-form-item label="候选值" prop="value">
								<el-input v-model="msg.value" placeholder="请输入候选值"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
          <el-row v-if="msg.type==7">
						<el-col :span="24">
							<el-form-item label="开户行" prop="valueType">
								<el-input v-model="msg.valueType" placeholder="请输入开户行"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
          <el-row >
						<el-col :span="24">
							<el-form-item label="备注" prop="remark">
								<el-input v-model="msg.remark" placeholder="请输入备注"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button size="small" @click="visible = false">取 消</el-button>
					<el-button size="small" type="primary" @click="save('ruleForm')">保 存</el-button>
				</div>
			</el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { getList,addOrEdit,del} from "api/menuDataDictionary/dataDictionary";

export default {
  name: 'DataDictionary',
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
        type:"",
      },
      rules: {
        type: [{ required: true, message: '请选择字段名称', trigger: 'blur' }],
        value: [{ required: true, message: '候选值不能为空', trigger: 'blur' }],
      },
      // 下拉自动识别  //客户名称 公司名称 获取客户列表
      fieldNameList:[
        {type:"1",value:"产品名称",remark:""},
        {type:"2",value:"公司名称",remark:""},
        {type:"3",value:"付款单位",remark:""},
        {type:"4",value:"收款单位",remark:""},
        {type:"5",value:"支付方式",remark:""},
        {type:"6",value:"车牌号",remark:""},
        // {type:"6",value:"开户行",remark:"对公/对私"},
        {type:"7",value:"账号",remark:"对公/对私"},
        {type:"8",value:"规格高",remark:""},
        {type:"9",value:"规格长",remark:""},
        {type:"10",value:"单位",remark:""},
        {type:"11",value:"名称描述",remark:""},
        {type:"12",value:"尺寸",remark:""},
      ],

      // 客户名称  公司名称

      // 产品名称
      // 付款单位
      // 收款单位
      // 支付方式
      // 车牌号
      // 对公账号开户行 对私账号开户行 开户行
      // 对公账号 对私账号 收款账号
      // 规格高
      // 规格长
      // 单位
      // 名称描述
      // 尺寸

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
      let isHavePayWay = false;
      for (var i = 0; i < this.multipleSelection.length; i++) {
        ids.push(this.multipleSelection[i].id)
        if(this.multipleSelection[i].type == "5"){
          isHavePayWay=true
        }
      }
      
      if(isHavePayWay){
          this.$confirm('删除数据中有支付方式，删除后会影响已经选择过的数据，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          del(ids).then((res)=>{
            if(res.code == 0){
              this.$message({
                message: "删除成功",
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
      }else{
        this.$confirm('确认删除该数据？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          del(ids).then((res)=>{
            if(res.code == 0){
              this.$message({
                message: "删除成功",
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
      }
    },
    save(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addOrEdit(this.msg).then((res)=>{
            if(res.code == 0){
              this.$message({
                message: "保存成功",
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
              type: "",//字段名称 type
              value: "",//字段名称 候选值     账号
              valueType:"",//候选值 绑定的 值 账号的开户行
              remark: "",//备注
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