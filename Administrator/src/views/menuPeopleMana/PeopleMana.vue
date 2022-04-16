<template>
  <div>
    <div class="search_container">
      <el-form :model="searchParams" :inline="true" class="searchformContent" label-width="70px"  size="small">
        <el-row>
          <el-form-item label="登录账号">
            <el-input v-model="searchParams.userName" placeholder="请输入登录账号" clearable style="width:140px"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名">
            <el-input v-model="searchParams.realName" placeholder="请输入真实姓名" clearable style="width:140px"></el-input>
          </el-form-item>
          <el-form-item label="权限" label-width="40px">
            <el-select v-model="searchParams.level" placeholder="请选择权限" clearable filterable style="width:140px">
                <el-option v-for="item in levels" :label="item.val" :value="item.id" :key="item.id"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="部门" label-width="40px">
            <el-input v-model="searchParams.dept" placeholder="请输入部门" clearable style="width:140px"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="searchParams.tel" oninput="value=value.replace(/[^\d]/g,'')" style="width:140px"  placeholder="请输入联系方式" maxlength="11" clearable></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item>
            <el-button type="primary" @click="search()">查询</el-button>
            <el-button type="success" @click="add()">新建</el-button>
            <el-button type="warning" @click="edit()">编辑</el-button>
            <el-button type="danger" @click="del()">删除</el-button>
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
				<el-table-column prop="userName" label="登录账号">
          <template slot-scope="scope"> {{scope.row.userName?scope.row.userName:'--'}}</template>
        </el-table-column>
				<el-table-column prop="realName" label="真实姓名">
          <template slot-scope="scope"> {{scope.row.realName?scope.row.realName:'--'}}</template>
        </el-table-column>
				<el-table-column prop="level" label="权限" >
          <template slot-scope="scope"> {{scope.row.level?levels[scope.row.level-1].val:'--'}}</template>
        </el-table-column>
				<el-table-column prop="dept" label="部门">
          <template slot-scope="scope"> {{scope.row.dept?scope.row.dept:'--'}}</template>
        </el-table-column>
				<el-table-column prop="tel" label="联系方式">
          <template slot-scope="scope"> {{scope.row.tel?scope.row.tel:'--'}}</template>
        </el-table-column>
        <!-- <el-table-column prop="password" label="密码">
          <template slot-scope="scope"> {{scope.row.password?scope.row.password:'--'}}</template>
        </el-table-column> -->
				<el-table-column prop="createDate" label="创建时间" width="150px">
          <template slot-scope="scope">
              {{scope.row.createDate | dateFormat()}}
          </template>
        </el-table-column>

				<el-table-column label="操作">
          <template slot-scope="scope">
              <el-button class="defaultColor"  size="mini" round plain @click.stop="resetPassword(scope.row.id,scope.row.realName)">重置密码</el-button>
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
							<el-form-item label="登录账号" prop="userName">
								<el-input v-model="msg.userName" autocomplete="off" placeholder="请输入登录账号"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="真实姓名" prop="realName">
								<el-input v-model="msg.realName" autocomplete="off" placeholder="请输入真实姓名"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
          <el-row >
						<el-col :span="12">
							<el-form-item label="部门">
								<el-input v-model="msg.dept" autocomplete="off" placeholder="请输入部门"></el-input>
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
							<el-form-item label="权限" prop="level">
								<el-select v-model="msg.level" placeholder="请选择权限" clearable filterable style="width:100%">
									<el-option v-for="item in levels" :label="item.val" :value="item.id" :key="item.id"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="默认密码">
								<el-input v-model="msg.password" autocomplete="off" placeholder="默认密码" disabled></el-input>
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

import { getList,addOrEdit,del} from "api/menuPeopleMana/peopleMana";


import {resetPassword} from 'api/user'

export default {
  name: 'PeopleMana',
  components: {},

  data() {
    //手机号验证
    const checkPhone = (rule, value, callback) => {
      const reg = /^0?(13[0-9]|15[012356789]|18[0-9]|14[578]|16[6]|17[035768]|19[19])[0-9]{8}$/
      debugger
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
        userName:"",
        realName:"",
        level:null,
        dept:"",
        tel:"",
      },
      
      rules: {
        userName: [{ required: true, message: '登录账号不能为空', trigger: 'blur' }],
        realName: [{ required: true, message: '真实姓名不能为空', trigger: 'blur' }],
        level: [{ required: true, message: '权限不能为空', trigger: 'change' }],
        // tel: [{validator: checkPhone,required: true, trigger: 'blur',}],
      },

      /**
     * 权限：高等级拥有低等级的权限
     * 1、一级权限：拥有查询、新增销售单、明细单权限，客户管理的权限。
     * 2、二级权限：拥有查询、新建工资单的权限
     * 3、三级权限：拥有审核销售单、明细单以及工资单的权限，可以查询新增付款单、退款单
     * 4、四级权限：拥有审核付款单以及退款单的权限，修改所有单据的权限，其他权限都不能修改，审核不通过后才可进行修改
     * 5、管理员权限：拥有用户管理的权限
     */

      levels:[
        {id:1,val:"一级权限",intro:"拥有查询、新增销售单、明细单权限，客户管理的权限。"},
        {id:2,val:"二级权限",intro:"拥有查询、新建工资单的权限"},
        {id:3,val:"三级权限",intro:"拥有审核销售单、明细单以及工资单的权限，可以查询新增付款单、退款单"},
        {id:4,val:"四级权限",intro:"拥有审核付款单以及退款单的权限，修改所有单据的权限，其他权限都不能修改，审核不通过后才可进行修改"},
        {id:5,val:"管理员权限",intro:"拥有用户管理的权限"},
      ]
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
        userName:"",
        realName:"",
        level:null,
        dept:"",
        tel:"",
      }
    },
    resetPassword(id,realName){
      this.$confirm(`确认重置 ${realName} 密码？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        resetPassword([id]).then((res)=>{
          if(res.code == 0){
            this.$message({
              message: res.data,
              type: 'success'
            });
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
            userName: "",
            password: "888888",
            realName: "",
            dept: "",
            level: null,
            tel: "",
          }
          // this.msg={
          //   userName: "liu",
          //   password: "88888",
          //   realName: "刘先生",
          //   dept: "运营",
          //   level: 1,
          //   tel: "15699878989",
          // }
          
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