<template>
  <div>
    <div class="search_container">
      <el-form :model="searchParams" :inline="true" class="searchformContent" label-width="70px"  size="small">
        <el-row>
          <el-form-item label="公司名称">
            <el-input v-model="searchParams.company" placeholder="请输入公司名称" clearable style="width:140px"></el-input>
          </el-form-item>
          <el-form-item label="客户名称">
            <el-input v-model="searchParams.name" placeholder="请输入客户名称" clearable style="width:140px"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="searchParams.tel" oninput="value=value.replace(/[^\d]/g,'')" style="width:140px"  placeholder="请输入联系方式" maxlength="11" clearable></el-input>
          </el-form-item>
          <el-form-item label="微信名称">
            <el-input v-model="searchParams.wechatName" placeholder="请输入微信名称" clearable style="width:140px"></el-input>
          </el-form-item>
          <el-form-item label="业务经理">
            <el-input v-model="searchParams.realName" placeholder="请输入业务经理" clearable style="width:140px"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item>
            <el-button type="primary" @click="search()">查询</el-button>
            <el-button type="success" @click="add()">新建</el-button>
            <el-button type="warning" @click="edit()" v-if="userInfo.level>=4">编辑</el-button>
            <el-button type="danger" @click="del()" v-if="userInfo.level>=4">删除</el-button>
            <el-button type="info" @click="resetSearchParams()">重置</el-button>
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
				<el-table-column prop="company" label="公司名称">
          <template slot-scope="scope"> {{scope.row.company?scope.row.company:'--'}}</template>
        </el-table-column>
				<el-table-column prop="name" label="客户名称">
          <template slot-scope="scope"> {{scope.row.name?scope.row.name:'--'}}</template>
        </el-table-column>
        <el-table-column prop="tel" label="联系方式">
          <template slot-scope="scope"> {{scope.row.tel?scope.row.tel:'--'}}</template>
        </el-table-column>
				<el-table-column prop="wechat" label="微信号">
          <template slot-scope="scope"> {{scope.row.wechat?scope.row.wechat:'--'}}</template>
        </el-table-column>
        <el-table-column prop="wechatName" label="微信名称">
          <template slot-scope="scope"> {{scope.row.wechatName?scope.row.wechatName:'--'}}</template>
        </el-table-column>
        <el-table-column prop="mail" label="邮箱">
          <template slot-scope="scope"> {{scope.row.mail?scope.row.mail:'--'}}</template>
        </el-table-column>
        <el-table-column prop="know" label="认识途径">
          <template slot-scope="scope"> {{scope.row.know?scope.row.know:'--'}}</template>
        </el-table-column>
        <el-table-column prop="account" label="付款账号">
          <template slot-scope="scope"> {{scope.row.account?scope.row.account:'--'}}</template>
        </el-table-column>
        <el-table-column prop="bank" label="开户行">
          <template slot-scope="scope"> {{scope.row.bank?scope.row.bank:'--'}}</template>
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
						<el-col :span="12">
							<el-form-item label="公司名称" prop="company">
								<el-input v-model="msg.company" autocomplete="off" placeholder="请输入公司名称"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="客户名称" prop="name">
								<el-input v-model="msg.name" autocomplete="off" placeholder="请输入客户名称"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
          <el-row >
						<el-col :span="12">
							<el-form-item label="邮箱">
								<el-input v-model="msg.mail" autocomplete="off" placeholder="请输入邮箱"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="联系方式" prop="tel">
                <el-input v-model="msg.tel" oninput="value=value.replace(/[^\d]/g,'')"  placeholder="请输入联系方式" maxlength="11" clearable></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
				    <el-col :span="12">
							<el-form-item label="微信号">
								<el-input v-model="msg.wechat" autocomplete="off" placeholder="请输入微信号"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="微信名称">
								<el-input v-model="msg.wechatName" autocomplete="off" placeholder="请输入微信名称"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
          <el-row>
				    <el-col :span="12">
							<el-form-item label="付款账号">
								<el-input v-model="msg.account" autocomplete="off" placeholder="请输入付款账号"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="开户行">
								<el-input v-model="msg.bank" autocomplete="off" placeholder="请输入开户行"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
          <el-row>
				    <el-col :span="24">
							<el-form-item label="认识途径">
								<el-input v-model="msg.know" autocomplete="off" placeholder="请输入认识途径"></el-input>
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

import { getList,addOrEdit,del} from "api/menuCustomerMana/customerMana";

export default {
  name: 'CustomerMana',
  components: {},
  computed: {
    ...mapGetters([
      "userInfo"
    ]),
  },
  data() {
    //手机号验证
    const checkPhone = (rule, value, callback) => {
      const reg = /^0?(13[0-9]|15[012356789]|18[0-9]|14[578]|16[6]|17[035768]|19[19])[0-9]{8}$/
      if ( reg.test(value) ) {
        return callback();
      }else if(!value){
        return callback("手机号不能为空");
      }
      callback('请输入正确的手机号');
    };
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
        company: "",//公司名称
        name: "",//客户名称
        tel: "",//联系方式
        wechatName: "",//微信名称
        realName:"",//业务经理
        content:"",
      },

      rules: {
        company: [{ required: true, message: '公司名称不能为空', trigger: 'blur' }],
        name: [{ required: true, message: '客户名称不能为空', trigger: 'blur' }],
        // tel: [{validator: checkPhone,required: true, trigger: 'blur',}],
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
        company: "",//公司名称
        name: "",//客户名称
        tel: "",//联系方式
        wechatName: "",//微信名称
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
              company: null,//公司名称
              name: "",//客户名称
              tel: null,//联系方式
              wechat: null,//微信号
              wechatName: null,//微信名称
              mail: null,//邮箱
              know: null,//认识途径
              account: null,//付款账号
              bank: null,//开户行
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