<template>
  <div>
    <div class="search_container">
      <el-form :model="searchParams" :inline="true" class="searchformContent" label-width="70px"  size="small">
        <el-row>
          <el-form-item label="公司名称">
            <el-input v-model="searchParams.company" placeholder="请输入公司名称" clearable style="width:140px"></el-input>
          </el-form-item>
          <el-form-item label="客户名称">
            <el-input v-model="searchParams.customerName" placeholder="请输入客户名称" clearable style="width:140px"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
              <el-input v-model="searchParams.customerTel" oninput="value=value.replace(/[^\d]/g,'')"  placeholder="请输入联系电话" maxlength="11" clearable></el-input>
          </el-form-item>
          <el-form-item label="付款情况">
            <el-select v-model="searchParams.payStatus" placeholder="请选择付款情况" clearable filterable style="width:100%">
              <el-option v-for="item in payStatuss" :label="item.val" :value="item.id" :key="item.id"></el-option>
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
          <el-form-item label="订单日期">
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
          <el-form-item label="业务经理">
            <el-input v-model="searchParams.realName" placeholder="请输入业务经理" clearable style="width:140px"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item>
            <el-button type="primary" @click="search()">查询</el-button>
            <el-button type="success" @click="add()">新建</el-button>
            <el-button type="warning" @click="edit()">编辑</el-button>
            <el-button type="danger" @click="del()">删除</el-button>
            <el-button type="info" @click="resetSearchParams()">重置</el-button>
            <el-button v-if="userInfo.level>=3"  @click="oneKeyPass()">一键通过</el-button>
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
        :row-class-name="tableRowClassName"
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
        <el-table-column prop="realName" label="销售单号" width="130px">
          <template slot-scope="scope"> {{scope.row.id?scope.row.id:'--'}}</template>
        </el-table-column>
				<el-table-column prop="company" label="公司名称">
          <template slot-scope="scope"> {{scope.row.company?scope.row.company:'--'}}</template>
        </el-table-column>
        <el-table-column prop="customerName" label="客户名称">
          <template slot-scope="scope"> {{scope.row.customerName?scope.row.customerName:'--'}}</template>
        </el-table-column>
        <el-table-column prop="customerTel" label="联系电话" width="100px">
          <template slot-scope="scope"> {{scope.row.customerTel?scope.row.customerTel:'--'}}</template>
        </el-table-column>
        <el-table-column prop="saleDate" label="订单日期" width="90px">
          <template slot-scope="scope"> {{scope.row.saleDate | dateFormat("yyyy-mm-dd")}}</template>
        </el-table-column>
        <el-table-column prop="payTotal" label="合计">
          <template slot-scope="scope"> {{scope.row.payTotal!=null?scope.row.payTotal:'--'}}</template>
        </el-table-column>
        <el-table-column prop="payStatus" label="付款情况">
          <template slot-scope="scope"> {{scope.row.payStatus?payStatuss[scope.row.payStatus-1].val:'--'}}</template>
        </el-table-column>
        <!-- <el-table-column prop="payRemark" label="付款说明">
          <template slot-scope="scope"> {{scope.row.payRemark?scope.row.payRemark:'--'}}</template>
        </el-table-column> -->
        <el-table-column prop="tax" label="是否含税">
          <template slot-scope="scope"> {{scope.row.tax!=null?taxs[scope.row.tax].val:'--'}}</template>
        </el-table-column>
        <el-table-column prop="tax" label="销售提成金额">
          <template slot-scope="scope"> {{scope.row.commissionTotal?scope.row.commissionTotal:'--'}}</template>
        </el-table-column>
        <el-table-column prop="tax" label="已结算">
          <template slot-scope="scope"> {{scope.row.commissioned?scope.row.commissioned:'--'}}</template>
        </el-table-column>
        <el-table-column prop="tax" label="未结算">
          <template slot-scope="scope"> {{scope.row.commissionNo?scope.row.commissionNo:'--'}}</template>
        </el-table-column>
        <el-table-column prop="checkStatus" label="审批状态">
          <template slot-scope="scope"> {{scope.row.checkStatus!=null?checkStatuss[scope.row.checkStatus]:'--'}}</template>
        </el-table-column>
        <el-table-column prop="checkContent" label="审批说明" width="140px">
          <template slot-scope="scope"> {{scope.row.checkContent?scope.row.checkContent:'--'}}</template>
        </el-table-column>
				<el-table-column prop="createDate" label="创建时间" width="150px">
          <template slot-scope="scope">
              {{scope.row.createDate | dateFormat()}}
          </template>
        </el-table-column>
				<el-table-column label="操作" fixed="right" :width="userInfo.level>1?'310px':'105px'">
          <template slot-scope="scope">
            <el-button class="defaultColor" size="mini" round plain @click.stop="addReceipt(scope.row.id)" v-if="userInfo.level>=3">新建收款单</el-button>
            <el-button class="defaultColor" size="mini" round plain @click.stop="searchReceipt(scope.row.id)" v-if="userInfo.level>=3">查询收款单</el-button>
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

      <el-dialog title="详情页" width="1000px" :visible.sync="visible" center class="defaultDialog" :close-on-click-modal="false" :close-on-press-escape="false">
				<el-form :model="msg" :disabled="(msg.checkStatus==1||msg.checkStatus==0)&&userInfo.level<4" size="small" :rules="rules"  ref="ruleForm" :label-width="formLabelWidth">
					<div class="detailContent">
            <div class="leftContent">
              <el-row >
                <el-col :span="8">
                  <el-form-item label="公司名称" prop="company">
                    <el-dropdown  trigger="click" @command="handleCommand">
                      <el-input v-model="msg.company" autocomplete="off" placeholder="请输入公司名称"></el-input>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="item in companyList2" :item="msg" fieldName1="company" :command="item.value" :key="item.id" v-text="item.value+'('+item.remark+')'"></el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="客户名称" prop="customerName">
                    <el-input v-model="msg.customerName" autocomplete="off" placeholder="请输入客户名称"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row >
                <el-col :span="8">
                  <el-form-item label="联系电话" prop="customerTel">
                    <el-input v-model="msg.customerTel" oninput="value=value.replace(/[^\d]/g,'')"  placeholder="请输入联系电话" maxlength="11" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="业务经理" prop="realName">
                    <el-input v-model="msg.realName" autocomplete="off" placeholder="请输入业务经理"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row >
                <el-col :span="8">
                  <el-form-item label="车牌号" prop="plateNo" class="addDropdown">
                    <el-dropdown  trigger="click" @command="handleCommand">
                      <el-input v-model="msg.plateNo" autocomplete="off" placeholder="请输入车牌号"></el-input>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="item in plateNoList6" :item="msg" fieldName1="plateNo" :command="item.value" :key="item.id" v-text="item.value+'('+item.remark+')'"></el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="司机电话" prop="driverTel">
                    <el-input v-model="msg.driverTel" oninput="value=value.replace(/[^\d]/g,'')"  placeholder="请输入司机电话" maxlength="11" clearable></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row >
                <el-col :span="8">
                  <el-form-item label="对公账号" prop="pubAcount" class="addDropdown">
                    <el-dropdown  trigger="click" @command="handleCommand">
                      <el-input v-model="msg.pubAcount" autocomplete="off" placeholder="请输入对公账号"></el-input>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="item in acountList7" :item="msg" fieldName1="pubAcount" fieldName2="pubAcountBank" :fieldNameVal2="item.valueType"  :command="item.value" :key="item.id" v-text="item.value+'('+item.remark+')'"></el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="对公账号开户行" prop="pubAcountBank">
                    <el-input v-model="msg.pubAcountBank" autocomplete="off" placeholder="请输入对公账号开户行"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row >
                <el-col :span="8">
                  <el-form-item label="对私账号" prop="priAcount" class="addDropdown">
                    <el-dropdown  trigger="click" @command="handleCommand">
                      <el-input v-model="msg.priAcount" autocomplete="off" placeholder="请输入对私账号"></el-input>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="item in acountList7" :item="msg" fieldName1="priAcount" fieldName2="priAcountBank" :fieldNameVal2="item.valueType"  :command="item.value" :key="item.id" v-text="item.value+'('+item.remark+')'"></el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="对私账号开户行" prop="priAcountBank">
                    <el-input v-model="msg.priAcountBank" autocomplete="off" placeholder="请输入对私账号开户行"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row >
                <el-col :span="8">
                  <el-form-item label="付款情况">
                    <el-select v-model="msg.payStatus" placeholder="请选择付款情况" clearable filterable style="width:100%">
                      <el-option v-for="item in payStatuss" :label="item.val" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="是否含税">
                    <template>
                      <el-radio v-model.number="msg.tax" :label="0">含税</el-radio>
                      <el-radio v-model.number="msg.tax" :label="1">不含税</el-radio>
                    </template>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row >
                <el-col :span="8">
                  <el-form-item label="合计">
                    <el-input type="number" @blur="toChinese" v-model.number="msg.payTotal" autocomplete="off" placeholder="请输入合计"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="合计大写">
                    <el-input v-model="msg.payTotalA" autocomplete="off" placeholder="请输入合计大写"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row >
                <el-col :span="8">
                  <el-form-item label="已付款金额" prop="payed">
                    <el-input type="number"  @blur="blurPayed" v-model.number="msg.payed" autocomplete="off" placeholder="请输入已付款金额"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="未付款金额" prop="payedNo">
                    <el-input type="number"  v-model.number="msg.payedNo" autocomplete="off" placeholder="请输入未付款金额"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row >
                <el-col :span="8">
                  <el-form-item label="订单日期">
                    <el-date-picker type="date" placeholder="选择订单日期" v-model="msg.saleDate" style="width: 100%;" clearable value-format="yyyy-MM-dd"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="userInfo.level>=4">
                  <el-form-item label="司机提成" prop="driverCommission">
                    <el-input type="number" :disabled="userInfo.level==1" v-model.number="msg.driverCommission" autocomplete="off" placeholder="请输入司机提成"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="运费" prop="freight">
                    <el-input type="number"  v-model.number="msg.freight" autocomplete="off" placeholder="请输入运费"></el-input>
                  </el-form-item>
                </el-col>
                <!-- <el-col :span="8">
                  <el-form-item label="付款说明">
                    <el-input v-model="msg.payRemark" autocomplete="off" placeholder="请输入付款说明"></el-input>
                  </el-form-item>
                </el-col> -->           
              </el-row>
              <el-row v-if="userInfo.level>=4">
                <el-col :span="8">
                  <el-form-item label="销售提成金额" prop="commissionTotal">
                    <el-input type="number" :disabled="userInfo.level==1" @blur="blurCommissionTotal" v-model.number="msg.commissionTotal" autocomplete="off" placeholder="请输入提成金额"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="已结算" prop="commissioned">
                    <el-input type="number" :disabled="userInfo.level==1" @blur="blurCommissioned" v-model.number="msg.commissioned" autocomplete="off" placeholder="请输入已结算"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="未结算" prop="commissionNo">
                    <el-input type="number" :disabled="userInfo.level==1" v-model.number="msg.commissionNo" autocomplete="off" placeholder="请输入未结算"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div class="remark">
              <div class="labelTitle">备注</div>
              <el-input v-model="msg.payRemark" type="textarea" rows="16 " placeholder="请输入备注" ></el-input>
            </div>
          </div>
          <el-row class="saleListContent">
            <el-form-item label-width="0px">
              <el-button size="small" :disabled="msg.checkStatus==1" icon="el-icon-plus" style="margin: 0px 0px 8px 10px" @click.prevent="addGoods()"></el-button>
              <el-table :data="msg.saleList"  style="width: 100%;" stripe border  
                :header-cell-style="{textAlign: 'center',color:'#333',background:'#FAFAFA',padding: '6px 0px'}"
                :cell-style="{textAlign: 'center',padding: '0px 0px'}">
                  <el-table-column label="产品名称" min-width="20%">
                    <template slot-scope="scope">
                      <el-dropdown  trigger="click" @command="handleCommand">
                        <el-input placeholder="请输入" v-model="scope.row.productName"></el-input>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item v-for="item in productNameList1" :item="scope.row" fieldName1="productName" :command="item.value" :key="item.id" v-text="item.value+'('+item.remark+')'"></el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </template>
                  </el-table-column>
                  <el-table-column label="规格高" min-width="10%">
                    <template slot-scope="scope">
                      <el-dropdown  trigger="click" @command="handleCommand">
                        <el-input placeholder="请输入" v-model="scope.row.speH"></el-input>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item v-for="item in speHList8" :item="scope.row" fieldName1="speH" :command="item.value" :key="item.id" v-text="item.value+'('+item.remark+')'"></el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </template>
                  </el-table-column>
                  <el-table-column label="规格长" min-width="10%">
                    <template slot-scope="scope">
                      <el-dropdown  trigger="click" @command="handleCommand">
                        <el-input placeholder="请输入" v-model="scope.row.speW"></el-input>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item v-for="item in speWList9" :item="scope.row" fieldName1="speW" :command="item.value" :key="item.id" v-text="item.value+'('+item.remark+')'"></el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </template>
                  </el-table-column>
                  <el-table-column label="数量" min-width="7%">
                    <template slot-scope="scope">
                      <el-input placeholder="请输入" v-model="scope.row.num" @blur="priceTotal(scope.row)"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="单位" min-width="7%">
                    <template slot-scope="scope">
                      <el-dropdown  trigger="click" @command="handleCommand">
                        <el-input placeholder="请输入" v-model="scope.row.unit"></el-input>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item v-for="item in unitList10" :item="scope.row" fieldName1="unit" :command="item.value" :key="item.id" v-text="item.value+'('+item.remark+')'"></el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </template>
                  </el-table-column>
                  <el-table-column label="单价" min-width="10%">
                    <template slot-scope="scope">
                      <el-input placeholder="请输入" v-model="scope.row.price" @blur="priceTotal(scope.row)"></el-input>
                    </template>
                  </el-table-column><el-table-column label="金额" min-width="10%">
                    <template slot-scope="scope">
                      <el-input placeholder="请输入" v-model="scope.row.priceTotal" @blur="priceTotalAll"></el-input>
                    </template>
                  </el-table-column><el-table-column label="备注" min-width="19%">
                    <template slot-scope="scope">
                      <el-input placeholder="请输入" v-model="scope.row.remark"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column min-width="7%">
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
          <!-- saleList: null,//订单项 列表 json -->
          
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button size="small" @click="visible = false">取 消</el-button>
					<el-button size="small" type="primary" @click="save('ruleForm')" v-if="msg.checkStatus == null || msg.checkStatus == -1 || userInfo.level>=4">保 存</el-button>
					<el-button size="small" type="primary" @click="submitCheck('ruleForm')" v-if="msg.checkStatus != 0" :disabled="msg.checkStatus==1">{{msg.checkStatus==1?"审核中":"提交审核"}}</el-button>
			
      		<el-button size="small" type="danger" @click="isShowCheck=true;checkContent=''" v-if="msg.checkStatus == 1&&userInfo.level>=3">不通过</el-button>
					<el-button size="small" type="success" @click="oneKeyPass(msg.id)" v-if="msg.checkStatus == 1&&userInfo.level>=3">通过</el-button>
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
          <tr style="height:36px"><th colspan="8"><span style="font-size: 20px">{{msg.company}}</span></th></tr>
          <tr>
            <th>客户名字</th>
            <td colspan="2">{{msg.customerName}}</td>
            <th>联系电话</th>
            <td colspan="2">{{msg.customerTel}}</td>
            <th>车牌号</th>
            <td>{{msg.plateNo}}</td>
          </tr>
          <tr>
            <th>订单日期</th>
            <td colspan="2">{{msg.saleDate}}</td>
            <th>业务经理</th>
            <td colspan="2">{{msg.realName}}</td>
            <th>司机电话</th>
            <td>{{msg.driverTel}}</td>
          </tr>
          <tr>
            <th rowspan="2">产品名称</th>
            <th colspan="2">规格</th>
            <th rowspan="2">数量</th>
            <th rowspan="2">单位</th>
            <th colspan="2">{{msg.tax!=null?taxs[msg.tax].val:''}}</th>
            <th rowspan="2">备注</th>
          </tr>
          <tr>
            <th>高</th>
            <th>长</th>
            <th>单价</th>
            <th>金额</th>
          </tr>
          <tr v-for="(item,index) in msg.saleList" :key="index" style="height:26px">
            <td>{{item.productName}}</td>
            <td>{{item.speH}}</td>
            <td>{{item.speW}}</td>
            <td>{{item.num}}</td>
            <td>{{item.unit}}</td>
            <td>{{item.price}}</td>
            <td>{{item.priceTotal}}</td>
            <td>{{item.remark}}</td>
          </tr>
          <tr>
            <th>对公账号</th>
            <td colspan="4">{{msg.pubAcount}}</td>
            <th rowspan="2">大写金额</th>
            <td colspan="2" rowspan="2">{{msg.payTotalA}}</td>
          </tr>
          <tr>
            <th>开户行</th>
            <td colspan="4">{{msg.pubAcountBank}}</td>
          </tr>
          <tr>
            <th>对私账号</th>
            <td colspan="4">{{msg.priAcount}}</td>
            <th rowspan="2">合计</th>
            <td colspan="2" rowspan="2">{{msg.payTotal}}</td>
          </tr>
          <tr>
            <th>开户行</th>
            <td colspan="4">{{msg.priAcountBank}}</td>
          </tr>
          <tr>
            <th colspan="8">1、如含安装，因客户原因不能一次性进场安装完毕的，由客户自行承担安装人员来回路费</th>
          </tr>
          <tr>
            <th colspan="8">2、本公司所有产品，非质量问题外，概不退货！如客户需退货，产品完好如损的情况下按照售价75%结算（退货需按整套退）</th>
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

import { getList,addOrEdit,del,toChinese,check} from "api/menuSalesSlipList/salesSlipList";

import { getList as getDictionaryList} from "api/menuDataDictionary/dataDictionary";


export default {
  name: 'SalesSlipList',
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
        company:"",
        customerName:"",
        customerTel:"",
        payStatus:"",
        tax:"",
        checkStatus:"",
        startDate:"",
        endDate:"",
        realName:"",
        content:"",
      },

      //付款情况 1、未支付  2、部分支付  0、全部支付
      payStatuss:[
        {id:1,val:"未支付"},
        {id:2,val:"部分支付"},
        {id:3,val:"全部支付"},
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
      isShowPrintPre:false,//是否显示打印预览

      searchDates:[],//订单日期范围
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
        }],
      },
      
      rules: {
        // realName: [{ required: true, message: '付款人不能为空', trigger: 'blur' }],
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
    tableRowClassName({row, rowIndex}) {
      if (row.payStatus === 1) {
        return 'red-row';
      } else if (row.payStatus === 2) {
        return 'orange-row';
      }
      return '';
    },
    blurPayed(){
      if(this.msg.payed!=null){
        this.msg.payed = parseFloat(this.msg.payed).toFixed(1)
      }
      if(this.msg.payTotal!=null&&this.msg.payed!=null){
        this.msg.payTotal = parseFloat(this.msg.payTotal).toFixed(1)
        this.msg.payedNo = parseFloat(this.msg.payTotal)-parseFloat(this.msg.payed)
        this.msg.payedNo = parseFloat(this.msg.payedNo).toFixed(1)
      }
    },
    toChinese(){
      if(this.msg.payTotal!=null){
        this.msg.payTotal = parseFloat(this.msg.payTotal).toFixed(1)
      }
      if(this.msg.payTotal!=null&&this.msg.payed!=null){
        this.msg.payed = parseFloat(this.msg.payed).toFixed(1)
        this.msg.payedNo = parseFloat(this.msg.payTotal)-parseFloat(this.msg.payed)
        this.msg.payedNo = parseFloat(this.msg.payedNo).toFixed(1)

      }
      toChinese(this.msg.payTotal).then((res)=>{
        if(res.code == 0){
          this.msg.payTotalA = res.data
        }
      })
    },
    blurCommissionTotal(){
      if(this.msg.commissionTotal==null){this.msg.commissionTotal=""}
      if(this.msg.commissioned==null){this.msg.commissioned=""}
      if(this.msg.commissionTotal!=""){
        this.msg.commissionTotal = parseFloat(this.msg.commissionTotal).toFixed(1)
      }
      if(this.msg.commissionTotal!=""&&this.msg.commissioned!=""){
        this.msg.commissioned = parseFloat(this.msg.commissioned).toFixed(1)
        this.msg.commissionNo = parseFloat(this.msg.commissionTotal)-parseFloat(this.msg.commissioned)
        this.msg.commissionNo = parseFloat(this.msg.commissionNo).toFixed(1)
      }
    },
    blurCommissioned(){
      if(this.msg.commissionTotal==null){this.msg.commissionTotal=""}
      if(this.msg.commissioned==null){this.msg.commissioned=""}
      if(this.msg.commissioned!=""){
        this.msg.commissioned = parseFloat(this.msg.commissioned).toFixed(1)
      }
      if(this.msg.commissionTotal!=""&&this.msg.commissioned!=""){
        this.msg.commissionTotal = parseFloat(this.msg.commissionTotal).toFixed(1)
        this.msg.commissionNo = parseFloat(this.msg.commissionTotal)-parseFloat(this.msg.commissioned)
        this.msg.commissionNo = parseFloat(this.msg.commissionNo).toFixed(1)
      }
    },
    // 货物新增
    addGoods(){
      var obj={productName:"",speH:"",speW:"",num:"",unit:"",price:"",priceTotal:"",remark:""}
      this.msg.saleList.push(obj)
    },
    // 货物删除
    delGoods(index){
      this.$confirm('确认删除该条数据？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        this.msg.saleList.splice(index,1);
        this.priceTotalAll();
      }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
      });
    },
    priceTotal(row){
      if(parseFloat(row.num)&&parseFloat(row.price)){
        // row.priceTotal = this.accAdd(row.num,row.price,'*')
        row.priceTotal = (parseFloat(row.num) * parseFloat(row.price)).toFixed(1)
      }
      this.priceTotalAll();
    },
    priceTotalAll(){
      let total = 0;
      this.msg.saleList.forEach(item => {
        let priceTotal = parseFloat(item.priceTotal)
        if(priceTotal){
          total = this.accAdd(total,priceTotal,'+')
        }
      });
      this.msg.payTotal = total
      this.toChinese();
    },
    accAdd(arg1, arg2,oper){
        var r1, r2, m;
        try {
            r1 = arg1.toString().split(".")[1].length;
        }
        catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        }
        catch (e) {
            r2 = 0;
        }
        m = Math.max(r1, r2);
        let res = 0;
        if(oper == '+'){
          res = parseFloat((arg1+arg2).toFixed(m))
        }
        if(oper == '*'){
          var m=0,s1=arg1.toString(),s2=arg2.toString();
          try{m+=s1.split(".")[1].length}catch(e){}
          try{m+=s2.split(".")[1].length}catch(e){}
          return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
        }
        return res;
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
        bean.saleList = JSON.parse(bean.saleList)
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
        company:"",
        customerName:"",
        customerTel:"",
        payStatus:"",
        tax:"",
        checkStatus:"",
        startDate:"",
        endDate:"",
      }
      this.searchDates = [];
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
          bean.saleList = JSON.stringify(bean.saleList);
          // bean.userId =this.userInfo.id
          // bean.updateUser =this.userInfo.realName
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
    //收款单-新建
    addReceipt(id){
      this.$router.push({
        name: 'ReceiptList',
        params: {
          oper:"add",//新增
          saleId:id
        }
      })
    },
    //收款单-查询
    searchReceipt(id){
      this.$router.push({
        name: 'ReceiptList',
        params: {
          oper:"search",//查询
          saleId:id
        }
      })
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
    handleCommand(command,{$attrs}){
      let fieldName1 = $attrs.fieldName1;
      let item = $attrs.item||{}
      item[fieldName1] = command
      if($attrs.fieldName2){
        item[$attrs.fieldName2] = $attrs.fieldNameVal2
      }
    },
    // async getDictionaryList(){
    //   try {
    //     //调用接口名前加 await
        
    //     var {data} =  await getDictionaryList({pageNo:1,pageSize:1000,type:"2"});
    //     this.companyList2 = data.content
        
    //     var {data} =  await getDictionaryList({pageNo:1,pageSize:1000,type:"6"});
    //     this.plateNoList6 = data.content

    //     var {data} =  await getDictionaryList({pageNo:1,pageSize:1000,type:"7"});
    //     this.acountList7 = data.content

    //     var {data} =  await getDictionaryList({pageNo:1,pageSize:1000,type:"1"});
    //     this.productNameList1 = data.content

    //     var {data} =  await getDictionaryList({pageNo:1,pageSize:1000,type:"8"});
    //     this.speHList8 = data.content
    //     var {data} =  await getDictionaryList({pageNo:1,pageSize:1000,type:"9"});
    //     this.speWList9 = data.content
    //     var {data} =  await getDictionaryList({pageNo:1,pageSize:1000,type:"10"});
    //     this.unitList10 = data.content
          
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
    getDictionaryList(type){
      return new Promise((resolve, reject) => {
        getDictionaryList({pageNo:1,pageSize:1000,type:type}).then((res)=>{
          if(type=="1"){this.productNameList1=res.data.content}
          if(type=="2"){this.companyList2=res.data.content}
          if(type=="6"){this.plateNoList6=res.data.content}
          if(type=="7"){this.acountList7=res.data.content}
          if(type=="8"){this.speHList8=res.data.content}
          if(type=="9"){this.speWList9=res.data.content}
          if(type=="10"){this.unitList10=res.data.content}
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
          this.getDictionaryList("7"),
          this.getDictionaryList("8"),
          this.getDictionaryList("9"),
          this.getDictionaryList("10")
          ]).then((result) => {
          this.msg={
              company: null,//公司名称
              customerName: null,//客户名称
              customerTel: null,//联系电话
              realName: null,//业务经理
              plateNo: null,//车牌号
              driverTel: null,//司机电话
              pubAcountBank: null,//对公账号开户行
              pubAcount: null,//对公账号
              priAcountBank: null,//对私账号开户行
              priAcount: null,//对私账号
              payStatus: null,//付款情况
              // payRemark: null,//付款说明
              payTotal: null,//订单总金额 合计
              payTotalA: null,//订单总金额大写
              checkStatus:null,//审批状态
              checkContent: null,//审批说明
              saleList: [//订单项 列表 json
                {productName:"",speH:"",speW:"",num:"",unit:"",price:"",priceTotal:"",remark:""},
                {productName:"",speH:"",speW:"",num:"",unit:"",price:"",priceTotal:"",remark:""},
                {productName:"",speH:"",speW:"",num:"",unit:"",price:"",priceTotal:"",remark:""},
                {productName:"",speH:"",speW:"",num:"",unit:"",price:"",priceTotal:"",remark:""},
                {productName:"",speH:"",speW:"",num:"",unit:"",price:"",priceTotal:"",remark:""},
              ],
              saleDate: this.$options.filters['dateFormat'](new Date(),'yyyy-mm-dd'),//销售日期 订单日期
              tax:1,//是否含税

              payed:0,//已付款金额
              payedNo:null,//未付款金额
              commissionTotal:"",//提成金额
              commissioned:"",//已结算
              commissionNo:"",//未结算
              driverCommission:null,//司机提成
              freight:null,//运费


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
::v-deep.el-table .red-row {
  // background: red;
  color: red;
}
::v-deep.el-table .orange-row {
  // background: orange;
  color: orange;
}

::v-deep .saleListContent{
  .el-table .cell{
    padding-left: 0px;
    padding-right: 0px;
  }
  .el-input__inner{
    padding:0 5px;
  }
}
.detailContent{
  // display: flex;
  // justify-content: space-between;
  position: relative;
  // .leftContent{
    // width: calc(100% - 310px);
  // }
  .remark{
    width: 300px;
    position: absolute;
    top:0px;
    right: 0px;
    .labelTitle{
      text-align: center;
      font-size: 14px;
      line-height: 42px;
      border: 1px solid #DCDFE6;
      border-radius: 4px;
      background-color: #FFFFFF;
    }
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