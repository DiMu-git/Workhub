<template>
  <div class="container">
    <div class="search_container">
      <el-form :model="searchParams" :inline="true" class="searchformContent"  size="small">
        <el-row>
          <el-form-item label="nickName">
            <el-input v-model="searchParams.nickName" placeholder="Please enter" clearable style="width:180px"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item>
            <el-button type="primary" @click="search()">search</el-button>
            <!-- <el-button type="success" @click="add()">add</el-button> -->
            <el-button type="warning" @click="edit()">edit</el-button>
            <el-button type="danger" @click="del()">delete</el-button>
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
        <el-table-column label="no." type="index" fixed width="50px">
					<template slot-scope="scope">
            <span>{{(pageNo - 1) * pageSize + scope.$index + 1}}</span>
          </template>
				</el-table-column>
        <el-table-column prop="userName" label="userName" width="120px">
          <template slot-scope="scope"> {{scope.row.userName?scope.row.userName:'--'}}</template>
        </el-table-column>
				<el-table-column prop="nickName" label="nickName" width="120px">
          <template slot-scope="scope"> {{scope.row.nickName?scope.row.nickName:'--'}}</template>
        </el-table-column>
        <el-table-column prop="tel" label="tel" width="100px">
          <template slot-scope="scope"> {{scope.row.tel?scope.row.tel:'--'}}</template>
        </el-table-column>
        <el-table-column prop="mail" label="mail" width="140px">
          <template slot-scope="scope"> {{scope.row.mail?scope.row.mail:'--'}}</template>
        </el-table-column>
        <!-- <el-table-column prop="bank" label="bank" width="200px">
          <template slot-scope="scope"> {{scope.row.bank?scope.row.bank:'--'}}</template>
        </el-table-column> -->
        <el-table-column prop="userGender" label="sex">
          <template slot-scope="scope"> {{scope.row.userGender!=null?['female','male'][scope.row.userGender]:'--'}}</template>
        </el-table-column>
        <el-table-column prop="vip" label="vip">
          <template slot-scope="scope"> {{scope.row.vip?'yes':'no'}}</template>
        </el-table-column>
        <el-table-column prop="url" label="picture">
          <template slot-scope="scope"> 
            <img class="tableImg" v-if="scope.row.url" :src="scope.row.url" alt="">
            <span v-else>--</span>
          </template>
        </el-table-column>
				<el-table-column prop="createTime" label="createTime" width="150px">
          <template slot-scope="scope">
              {{scope.row.createTime | dateFormat()}}
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
      <el-dialog title="Detail page" :visible.sync="visible" center class="defaultDialog" @opened="$refs.ruleForm.clearValidate()" :close-on-click-modal="false" :close-on-press-escape="false">
				<el-form :model="msg" size="small" :rules="rules"  ref="ruleForm" :label-width="formLabelWidth">
					<el-row >
						<el-col :span="12">
              <el-form-item label="nickName" prop="nickName">
                <el-input v-model="msg.nickName" autocomplete="off" placeholder="Please enter nickName"></el-input>
              </el-form-item>	
						</el-col>
            <el-col :span="12">
              <el-form-item label="tel" prop="tel">
                <el-input v-model="msg.tel" autocomplete="off" placeholder="Please enter tel"></el-input>
              </el-form-item>	
						</el-col>
					</el-row>
          <el-row >
						<el-col :span="12">
              <el-form-item label="mail" prop="mail">
                <el-input v-model="msg.mail" autocomplete="off" placeholder="Please enter mail"></el-input>
              </el-form-item>	
						</el-col>
            <el-col :span="12">
              <el-form-item label="bank" prop="bank">
                <el-input v-model="msg.bank" autocomplete="off" placeholder="Please enter bank"></el-input>
              </el-form-item>	
						</el-col>
					</el-row>
          <el-row >
						<el-col :span="12">
              <el-form-item label="sex" prop="userGender">
                <el-radio-group v-model="msg.userGender">
                  <el-radio :label="1">male</el-radio>
                  <el-radio :label="0">female</el-radio>
                </el-radio-group>
              </el-form-item>	
						</el-col>
            <el-col :span="12">
              <el-form-item label="isVip" prop="vip">
                <el-radio-group v-model="msg.vip">
                  <el-radio :label="1">yes</el-radio>
                  <el-radio :label="0">no</el-radio>
                </el-radio-group>
              </el-form-item>	
						</el-col>
					</el-row>
          <el-row >
						<el-col :span="24">
              <el-form-item label="picture" prop="url">
                <el-upload
                  class="avatar-uploader"
                  action="http://42.193.41.204:8088/workhub/base/upload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="msg.url" :src="msg.url" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>	
						</el-col>
					</el-row>
          
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button size="small" @click="visible = false">cancel</el-button>
					<el-button size="small" type="primary" @click="save('ruleForm')" >save</el-button>
				</div>
			</el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import {userFind,userAddOrEdit,userDel} from "api/workingShop";

export default {
  name: 'UserManage',
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
      formLabelWidth:"80px",

      pageNo:1,
      pageSize:10,
      total:0,
      searchParams:{
        pageNo:1,
        pageSize:10,
        name:"",
      },
      rules: {
        name: [{ required: true, message: 'facility name cannot be empty', trigger: 'blur' }],
        startDate: [{ required: true, message: 'startDate cannot be empty', trigger: 'change' }],
        endDate: [{ required: true, message: 'endDate cannot be empty', trigger: 'change' }],
        num: [{ required: true, message: 'total cannot be empty', trigger: 'blur' }],
        price: [{ required: true, message: 'price cannot be empty', trigger: 'blur' }],
        url: [{ required: true, message: 'picture cannot be empty', trigger: 'change' }],
      },

      venueList:[],
    }
  },

  methods: {
    init(){
      this.searchParams.pageNo = this.pageNo;
      this.searchParams.pageSize = this.pageSize;
      userFind(this.searchParams).then((res)=>{
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
					this.$alert('', 'Please select a piece of data', {
            confirmButtonText: 'confirm',
          });	
          return
				}
        let msg = this.multipleSelection[0];
        this.msg=JSON.parse(JSON.stringify(msg))
        this.visible = true;
    },
    del(){
      if(this.multipleSelection.length==0){
        this.$alert('', 'Please select the data to delete', {
          confirmButtonText: 'confirm',
        });	
        return
      }
      let ids = [];
      for (var i = 0; i < this.multipleSelection.length; i++) {
        let item = this.multipleSelection[i]
        ids.push(item.id)
      }
      this.$confirm('Are you sure to delete this data?', 'Tips', {
        confirmButtonText: 'confirm',
        cancelButtonText: 'cancel',
        type: 'warning'
      }).then(() => {
        userDel(ids).then((res)=>{
          if(res.code == 0){
            this.$message({
              message: res.data,
              type: 'success'
            });

            let totalPage = Math.ceil((this.total - ids.length) / this.pageSize); // total pages
            let pageNo = this.pageNo > totalPage ? totalPage : this.pageNo;
            this.pageNo = pageNo < 1 ? 1 : pageNo;
            this.init()
            return
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'cancelled'
        });          
      });
    },
    save(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let bean = JSON.parse(JSON.stringify(this.msg));
          userAddOrEdit(bean).then((res)=>{
            if(res.code == 0){
              this.$message({
                message: "Saved successfully",
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
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      this.msg.url = res.data
    },
    beforeAvatarUpload(file) {
      const fileSuffix= file.name.substring(file.name.lastIndexOf(".")+1).toLowerCase();
      let fileTypes = ["png","jpg","jpeg"]
      var isEXT = (fileTypes.indexOf(fileSuffix) > -1);

      if (!isEXT) {
        this.$message.error('The uploaded avatar image can only be in png,jpg,jpeg format!');
      }
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isLt2M) {
        this.$message.error('The size of the uploaded avatar image cannot exceed 10MB!');
      }
      return isEXT && isLt2M;
    },
    //change page size
    handleSizeChange(val) {
      this.pageSize = val;
      this.init();
    },
    //change current page
    handleCurrentChange(val) {
      this.pageNo=val;
      this.init();
    },
    // Click on a row in the table to select/cancel to select
    clickRow(row) {
        this.$refs.multipleTable.toggleRowSelection(row)
    },
    //Check the box
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    search(){
      this.pageNo=1;
      this.init()
    },  
    //reset data
    reset(){
      return new Promise((resolve, reject) => {
        Promise.all([]).then((result) => {
          this.msg={
            "nickName": "tourist",
            "tel": null,
            "mail": null,
            "bank": null,
            "userGender": null,
            "vip": 0,
            "url": null,
          }
          
          resolve('reset ')
        }).catch((error) => {
          console.log(error)
        })
      
      })
    }
  },

  created() {
    this.init()
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
  }

}
</script>

<style lang='scss' scoped>
.container{
  .table_container{
    .tableImg{
      width: 40px;
      max-height: 50px;
      display: block;
      margin: 0 auto;
    }
  }
  .defaultDialog{
    .el-radio{
      margin-right:16px;
    }
  }
}
</style>
<style lang='scss'>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar {
    width: 80px;
    height: 80px;
    display: block;
    object-fit: contain;
  }
</style>
