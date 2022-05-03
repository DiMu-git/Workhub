<template>
  <div class="container">
    <div class="search_container">
      <el-form :model="searchParams" :inline="true" class="searchformContent"  size="small">
        <el-row>
          <el-form-item label="Name">
            <el-input v-model="searchParams.name" placeholder="Please enter" clearable style="width:180px"></el-input>
          </el-form-item>
          <el-form-item label="Venue Name">
            <el-input v-model="searchParams.venueName" placeholder="Please enter" clearable style="width:180px"></el-input>
          </el-form-item>
          <el-form-item label="Code">
            <el-input v-model="searchParams.code" placeholder="Please enter" clearable style="width:320px"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item>
            <el-button type="primary" @click="search()">search</el-button>
            <!-- <el-button type="success" @click="add()">add</el-button> -->
            <!-- <el-button type="warning" @click="edit()">edit</el-button> -->
            <!-- <el-button type="danger" @click="del()">delete</el-button> -->
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
        <el-table-column prop="code" label="orderCode" min-width="140px"></el-table-column>
				<el-table-column prop="name" label="name" min-width="150px">
          <template slot-scope="scope"> {{scope.row.name?scope.row.name:'--'}}</template>
        </el-table-column>
        <el-table-column prop="venueName" label="venueName" min-width="150px">
          <template slot-scope="scope"> {{scope.row.venueName?scope.row.venueName:'--'}}</template>
        </el-table-column>
        <el-table-column prop="price" label="price">
          <template slot-scope="scope"> {{scope.row.price?'£ '+scope.row.price:'--'}}</template>
        </el-table-column>
        <el-table-column prop="time" label="reserveTime" min-width="140px">
          <template slot-scope="scope"> {{scope.row.time?scope.row.time+scope.row.timeType:'--'}}</template>
        </el-table-column>
        <el-table-column prop="flag" label="state">
          <template slot-scope="scope">
            <span v-if="scope.row.flag!=null">{{flagList[scope.row.flag+1].val}}</span>
            <span v-else>--</span>
          </template>
          <!-- 0, used; 1, paid; 2, unpaid; 3, refunded; -1, reservation failed -->
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
        <el-table-column prop="id" label="oper" width="210px" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="success" :disabled="scope.row.flag==0" @click="changeState(scope.row)">ChangeState</el-button>
            <el-button size="mini" type="success" :disabled="scope.row.flag!=0&&scope.row.flag!=1" @click="receipt(scope.row)">receipt</el-button>
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
      <el-dialog title="Detail page" :visible.sync="visible" center width="320px" class="defaultDialog" @opened="$refs.ruleForm.clearValidate()" :close-on-click-modal="false" :close-on-press-escape="false">
				<el-form :model="msg" size="small" :rules="rules"  ref="ruleForm" label-width="90px">
          <el-row>
						<el-col :span="24">
              <el-form-item label="nowState" prop="flag">
                <el-select v-model="nowFlag" disabled placeholder="Please select state" filterable style="width:100%">
                  <el-option v-for="item in flagList" :label="item.val" :value="item.id" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
              <el-form-item label="changeState" prop="flag">
                <el-select v-model="msg.flag" placeholder="Please select state" filterable style="width:100%">
                  <el-option v-for="item in flagList2" :label="item.val" :value="item.id" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
						</el-col>
					</el-row>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button size="small" @click="visible = false">cancel</el-button>
					<el-button size="small" type="primary" @click="save('ruleForm')" >save</el-button>
				</div>
			</el-dialog>
      <el-dialog title="Receipt" :visible.sync="isShowReceipt" center class="defaultDialog" :close-on-click-modal="false" :close-on-press-escape="false">
				<div class="printBox" id="printId">
          <table style="width:100%;">
            <tr class="header">
              <th style="width:33.33%;text-align:left;"><img src="@/assets/images/print.png" alt=""></th>
              <th style="width:33.33%;font-size:30px;">receipt</th>
              <th style="width:33.33%"></th>
            </tr>
          </table>
          <table class="tableCnt" style="width:100%;">
            <tr><td colspan="2" style="font-size:22px;height: 40px;line-height: 40px;"><span>code:</span>{{receiptObj.code}}</td></tr>
            <tr><td colspan="2" style="font-size:22px;height: 40px;line-height: 40px;"><span>name:</span>{{receiptObj.name}}</td></tr>
            <tr><td colspan="2" style="font-size:22px;height: 40px;line-height: 40px;"><span>Venue Name:</span>{{receiptObj.venueName}}</td></tr>
            <tr><td colspan="2" style="font-size:22px;height: 40px;line-height: 40px;"><span>Reserve Time:</span>{{receiptObj.time}} {{receiptObj.timeType}}</td></tr>
            <tr>
              <td style="font-size:22px;height: 40px;line-height: 40px;"><span>state:</span>{{receiptObj.state}}</td>
              <td style="font-size:22px;height: 40px;line-height: 40px;"><span>price:</span>£ {{receiptObj.price}}</td>
            </tr>
            <tr><td colspan="2" style="font-size:22px;height: 40px;line-height: 40px;"><span>Create Time:</span>{{receiptObj.createTime|dateFormat()}}</td></tr>
            <tr><td colspan="2" style="text-align: center;"><img src="@/assets/images/qrcode.png" alt=""></td></tr>
          </table>
        </div>

				<div slot="footer" class="dialog-footer">
					<el-button size="small" @click="isShowReceipt = false">cancel</el-button>
					<el-button size="small" type="primary" v-print="'#printId'">Print</el-button>
				</div>
			</el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { orderFind,changgeState} from "api/workingShop";

export default {
  name: 'OrderManage',
  components: {},
  computed: {
    ...mapGetters([
      "userInfo"
    ]),
  },
  data() {
    return {
      visible:false,
      isShowReceipt:false,
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
        venueName:"",
        code:"",
      },
      rules: {},

      // 0, used; 1, paid; 2, unpaid; 3, refunded; -1, reservation failed
      flagList:[
        {id:-1,val:"failed"},
        {id:0,val:"Used"},
        {id:1,val:"Paid"},
        {id:2,val:"Unpaid"},
        {id:3,val:"Refunded"},
      ],
      flagList2:[
        {id:0,val:"Used"},
        {id:1,val:"Paid"},
        {id:3,val:"Refunded"},
      ],
      nowFlag:null,
      receiptObj:{}
    }
  },

  methods: {
    init(){
      this.searchParams.pageNo = this.pageNo;
      this.searchParams.pageSize = this.pageSize;
      orderFind(this.searchParams).then((res)=>{
        let data = res.data;
        this.tableData = data.content;
        this.total=data.totalElements
      })
    },
    changeState(item){
      this.msg = {
        id:item.id,
        flag:item.flag
      }
      this.nowFlag=item.flag
      this.visible = true;
    },
    receipt(item){
      console.log(item)
      this.receiptObj = JSON.parse(JSON.stringify(item))
      this.receiptObj.state = this.flagList[this.receiptObj.flag+1].val
      this.isShowReceipt = true;
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
        facilitiesDel(ids).then((res)=>{
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
          changgeState(bean).then((res)=>{
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
            "id":"",
            "flag":1//0, used; 1, paid; 2, unpaid; 3, refunded; -1, reservation failed
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
  .printBox{
    margin: 0 auto;
    border:1px solid #000;
    padding: 10px;
    font-size: 18px;
    .header{
      img{width: 30px;height: 30px;border-radius: 50%;}
      .noneDiv{width: 30px;}
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .tableCnt{
      tr td{
        height: 60px;
        line-height: 60px;
        img{
          width: 280px;height: 280px;
        }
      }
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
