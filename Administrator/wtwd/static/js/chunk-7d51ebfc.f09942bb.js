(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7d51ebfc"],{"25ec":function(t,e,a){"use strict";a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return l})),a.d(e,"b",(function(){return n}));var s=a("b775");a("7733");function o(t){return Object(s["a"])({url:"/param/find",method:"post",data:t})}function l(t){return Object(s["a"])({url:"/param/edit",method:"post",data:t})}function n(t){return Object(s["a"])({url:"/param/del",method:"post",data:t})}},5342:function(t,e,a){},c242:function(t,e,a){"use strict";a("5342")},ee97:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"search_container"},[a("el-form",{staticClass:"searchformContent",attrs:{model:t.searchParams,inline:!0,"label-width":"70px",size:"small"}},[a("el-row",[a("el-form-item",{attrs:{label:"公司名称"}},[a("el-input",{staticStyle:{width:"140px"},attrs:{placeholder:"请输入公司名称",clearable:""},model:{value:t.searchParams.company,callback:function(e){t.$set(t.searchParams,"company",e)},expression:"searchParams.company"}})],1),a("el-form-item",{attrs:{label:"客户名称"}},[a("el-input",{staticStyle:{width:"140px"},attrs:{placeholder:"请输入客户名称",clearable:""},model:{value:t.searchParams.customerName,callback:function(e){t.$set(t.searchParams,"customerName",e)},expression:"searchParams.customerName"}})],1),a("el-form-item",{attrs:{label:"联系电话"}},[a("el-input",{attrs:{oninput:"value=value.replace(/[^\\d]/g,'')",placeholder:"请输入联系电话",maxlength:"11",clearable:""},model:{value:t.searchParams.customerTel,callback:function(e){t.$set(t.searchParams,"customerTel",e)},expression:"searchParams.customerTel"}})],1),a("el-form-item",{attrs:{label:"付款情况"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择付款情况",clearable:"",filterable:""},model:{value:t.searchParams.payStatus,callback:function(e){t.$set(t.searchParams,"payStatus",e)},expression:"searchParams.payStatus"}},t._l(t.payStatuss,(function(t){return a("el-option",{key:t.id,attrs:{label:t.val,value:t.id}})})),1)],1),a("el-form-item",{attrs:{label:"是否含税"}},[a("el-select",{staticStyle:{width:"140px"},attrs:{placeholder:"请选择是否含税",clearable:"",filterable:""},model:{value:t.searchParams.tax,callback:function(e){t.$set(t.searchParams,"tax",e)},expression:"searchParams.tax"}},t._l(t.taxs,(function(t){return a("el-option",{key:t.id,attrs:{label:t.val,value:t.id}})})),1)],1),a("el-form-item",{attrs:{label:"审批状态"}},[a("el-select",{staticStyle:{width:"140px"},attrs:{placeholder:"请选择审批状态",clearable:"",filterable:""},model:{value:t.searchParams.checkStatus,callback:function(e){t.$set(t.searchParams,"checkStatus",e)},expression:"searchParams.checkStatus"}},t._l(t.searchCheckStatus,(function(t){return a("el-option",{key:t.id,attrs:{label:t.val,value:t.id}})})),1)],1),a("el-form-item",{attrs:{label:"订单日期"}},[a("el-date-picker",{staticStyle:{width:"240px"},attrs:{type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions,"value-format":"yyyy-MM-dd"},model:{value:t.searchDates,callback:function(e){t.searchDates=e},expression:"searchDates"}})],1),a("el-form-item",{attrs:{label:"业务经理"}},[a("el-input",{staticStyle:{width:"140px"},attrs:{placeholder:"请输入业务经理",clearable:""},model:{value:t.searchParams.realName,callback:function(e){t.$set(t.searchParams,"realName",e)},expression:"searchParams.realName"}})],1)],1),a("el-row",[a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.search()}}},[t._v("查询")]),a("el-button",{attrs:{type:"success"},on:{click:function(e){return t.add()}}},[t._v("新建")]),a("el-button",{attrs:{type:"warning"},on:{click:function(e){return t.edit()}}},[t._v("编辑")]),a("el-button",{attrs:{type:"danger"},on:{click:function(e){return t.del()}}},[t._v("删除")]),a("el-button",{attrs:{type:"info"},on:{click:function(e){return t.resetSearchParams()}}},[t._v("重置")]),t.userInfo.level>=3?a("el-button",{on:{click:function(e){return t.oneKeyPass()}}},[t._v("一键通过")]):t._e()],1)],1)],1)],1),a("div",{staticClass:"table_container"},[a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:t.tableData,"tooltip-effect":"dark",size:"medium","header-cell-style":{textAlign:"center",color:"#fff",background:"#CFC39F",padding:"6px 0px"},"cell-style":{textAlign:"center"},"row-class-name":t.tableRowClassName},on:{"row-click":t.clickRow,"selection-change":t.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",fixed:"",width:"50px"}}),a("el-table-column",{attrs:{label:"序号",type:"index",fixed:"",width:"50px"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s((t.pageNo-1)*t.pageSize+e.$index+1))])]}}])}),a("el-table-column",{attrs:{prop:"realName",label:"业务经理"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.realName?e.row.realName:"--"))]}}])}),a("el-table-column",{attrs:{prop:"realName",label:"销售单号",width:"130px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.id?e.row.id:"--"))]}}])}),a("el-table-column",{attrs:{prop:"company",label:"公司名称"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.company?e.row.company:"--"))]}}])}),a("el-table-column",{attrs:{prop:"customerName",label:"客户名称"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.customerName?e.row.customerName:"--"))]}}])}),a("el-table-column",{attrs:{prop:"customerTel",label:"联系电话",width:"100px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.customerTel?e.row.customerTel:"--"))]}}])}),a("el-table-column",{attrs:{prop:"saleDate",label:"订单日期",width:"90px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(t._f("dateFormat")(e.row.saleDate,"yyyy-mm-dd")))]}}])}),a("el-table-column",{attrs:{prop:"payTotal",label:"合计"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(null!=e.row.payTotal?e.row.payTotal:"--"))]}}])}),a("el-table-column",{attrs:{prop:"payStatus",label:"付款情况"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.payStatus?t.payStatuss[e.row.payStatus-1].val:"--"))]}}])}),a("el-table-column",{attrs:{prop:"tax",label:"是否含税"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(null!=e.row.tax?t.taxs[e.row.tax].val:"--"))]}}])}),a("el-table-column",{attrs:{prop:"tax",label:"销售提成金额"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.commissionTotal?e.row.commissionTotal:"--"))]}}])}),a("el-table-column",{attrs:{prop:"tax",label:"已结算"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.commissioned?e.row.commissioned:"--"))]}}])}),a("el-table-column",{attrs:{prop:"tax",label:"未结算"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.commissionNo?e.row.commissionNo:"--"))]}}])}),a("el-table-column",{attrs:{prop:"checkStatus",label:"审批状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(null!=e.row.checkStatus?t.checkStatuss[e.row.checkStatus]:"--"))]}}])}),a("el-table-column",{attrs:{prop:"checkContent",label:"审批说明",width:"140px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.checkContent?e.row.checkContent:"--"))]}}])}),a("el-table-column",{attrs:{prop:"createDate",label:"创建时间",width:"150px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(t._f("dateFormat")(e.row.createDate))+" ")]}}])}),a("el-table-column",{attrs:{label:"操作",fixed:"right",width:t.userInfo.level>1?"310px":"105px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.userInfo.level>=3?a("el-button",{staticClass:"defaultColor",attrs:{size:"mini",round:"",plain:""},on:{click:function(a){return a.stopPropagation(),t.addReceipt(e.row.id)}}},[t._v("新建收款单")]):t._e(),t.userInfo.level>=3?a("el-button",{staticClass:"defaultColor",attrs:{size:"mini",round:"",plain:""},on:{click:function(a){return a.stopPropagation(),t.searchReceipt(e.row.id)}}},[t._v("查询收款单")]):t._e(),null==e.row.checkStatus||-1==e.row.checkStatus?a("el-button",{staticClass:"defaultColor",attrs:{size:"mini",round:"",plain:""},on:{click:function(a){return a.stopPropagation(),t.changeCheck(e.row,1)}}},[t._v("提交审核")]):t._e(),1==e.row.checkStatus?a("el-button",{staticClass:"defaultColor",attrs:{size:"mini",round:"",plain:""},on:{click:function(a){return a.stopPropagation(),t.changeCheck(e.row,null)}}},[t._v("撤销审核")]):t._e(),0==e.row.checkStatus?a("el-button",{staticClass:"defaultColor",attrs:{disabled:"",size:"mini",round:"",plain:""}},[t._v("审核通过")]):t._e()]}}])})],1),a("div",{staticClass:"pageContent"},[a("el-pagination",{attrs:{background:"","page-sizes":[10,25,50,100],layout:"total,sizes,prev, pager, next","current-page":t.pageNo,"page-size":10,total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),a("el-dialog",{staticClass:"defaultDialog",attrs:{title:"详情页",width:"1000px",visible:t.visible,center:"","close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(e){t.visible=e}}},[a("el-form",{ref:"ruleForm",attrs:{model:t.msg,disabled:(1==t.msg.checkStatus||0==t.msg.checkStatus)&&t.userInfo.level<4,size:"small",rules:t.rules,"label-width":t.formLabelWidth}},[a("div",{staticClass:"detailContent"},[a("div",{staticClass:"leftContent"},[a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"公司名称",prop:"company"}},[a("el-dropdown",{attrs:{trigger:"click"},on:{command:t.handleCommand}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"请输入公司名称"},model:{value:t.msg.company,callback:function(e){t.$set(t.msg,"company",e)},expression:"msg.company"}}),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},t._l(t.companyList2,(function(e){return a("el-dropdown-item",{key:e.id,attrs:{item:t.msg,fieldName1:"company",command:e.value},domProps:{textContent:t._s(e.value+"("+e.remark+")")}})})),1)],1)],1)],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"客户名称",prop:"customerName"}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"请输入客户名称"},model:{value:t.msg.customerName,callback:function(e){t.$set(t.msg,"customerName",e)},expression:"msg.customerName"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"联系电话",prop:"customerTel"}},[a("el-input",{attrs:{oninput:"value=value.replace(/[^\\d]/g,'')",placeholder:"请输入联系电话",maxlength:"11",clearable:""},model:{value:t.msg.customerTel,callback:function(e){t.$set(t.msg,"customerTel",e)},expression:"msg.customerTel"}})],1)],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"业务经理",prop:"realName"}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"请输入业务经理"},model:{value:t.msg.realName,callback:function(e){t.$set(t.msg,"realName",e)},expression:"msg.realName"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{staticClass:"addDropdown",attrs:{label:"车牌号",prop:"plateNo"}},[a("el-dropdown",{attrs:{trigger:"click"},on:{command:t.handleCommand}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"请输入车牌号"},model:{value:t.msg.plateNo,callback:function(e){t.$set(t.msg,"plateNo",e)},expression:"msg.plateNo"}}),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},t._l(t.plateNoList6,(function(e){return a("el-dropdown-item",{key:e.id,attrs:{item:t.msg,fieldName1:"plateNo",command:e.value},domProps:{textContent:t._s(e.value+"("+e.remark+")")}})})),1)],1)],1)],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"司机电话",prop:"driverTel"}},[a("el-input",{attrs:{oninput:"value=value.replace(/[^\\d]/g,'')",placeholder:"请输入司机电话",maxlength:"11",clearable:""},model:{value:t.msg.driverTel,callback:function(e){t.$set(t.msg,"driverTel",e)},expression:"msg.driverTel"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{staticClass:"addDropdown",attrs:{label:"对公账号",prop:"pubAcount"}},[a("el-dropdown",{attrs:{trigger:"click"},on:{command:t.handleCommand}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"请输入对公账号"},model:{value:t.msg.pubAcount,callback:function(e){t.$set(t.msg,"pubAcount",e)},expression:"msg.pubAcount"}}),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},t._l(t.acountList7,(function(e){return a("el-dropdown-item",{key:e.id,attrs:{item:t.msg,fieldName1:"pubAcount",fieldName2:"pubAcountBank",fieldNameVal2:e.valueType,command:e.value},domProps:{textContent:t._s(e.value+"("+e.remark+")")}})})),1)],1)],1)],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"对公账号开户行",prop:"pubAcountBank"}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"请输入对公账号开户行"},model:{value:t.msg.pubAcountBank,callback:function(e){t.$set(t.msg,"pubAcountBank",e)},expression:"msg.pubAcountBank"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{staticClass:"addDropdown",attrs:{label:"对私账号",prop:"priAcount"}},[a("el-dropdown",{attrs:{trigger:"click"},on:{command:t.handleCommand}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"请输入对私账号"},model:{value:t.msg.priAcount,callback:function(e){t.$set(t.msg,"priAcount",e)},expression:"msg.priAcount"}}),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},t._l(t.acountList7,(function(e){return a("el-dropdown-item",{key:e.id,attrs:{item:t.msg,fieldName1:"priAcount",fieldName2:"priAcountBank",fieldNameVal2:e.valueType,command:e.value},domProps:{textContent:t._s(e.value+"("+e.remark+")")}})})),1)],1)],1)],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"对私账号开户行",prop:"priAcountBank"}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"请输入对私账号开户行"},model:{value:t.msg.priAcountBank,callback:function(e){t.$set(t.msg,"priAcountBank",e)},expression:"msg.priAcountBank"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"付款情况"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择付款情况",clearable:"",filterable:""},model:{value:t.msg.payStatus,callback:function(e){t.$set(t.msg,"payStatus",e)},expression:"msg.payStatus"}},t._l(t.payStatuss,(function(t){return a("el-option",{key:t.id,attrs:{label:t.val,value:t.id}})})),1)],1)],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"是否含税"}},[[a("el-radio",{attrs:{label:0},model:{value:t.msg.tax,callback:function(e){t.$set(t.msg,"tax",t._n(e))},expression:"msg.tax"}},[t._v("含税")]),a("el-radio",{attrs:{label:1},model:{value:t.msg.tax,callback:function(e){t.$set(t.msg,"tax",t._n(e))},expression:"msg.tax"}},[t._v("不含税")])]],2)],1)],1),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"合计"}},[a("el-input",{attrs:{type:"number",autocomplete:"off",placeholder:"请输入合计"},on:{blur:t.toChinese},model:{value:t.msg.payTotal,callback:function(e){t.$set(t.msg,"payTotal",t._n(e))},expression:"msg.payTotal"}})],1)],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"合计大写"}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"请输入合计大写"},model:{value:t.msg.payTotalA,callback:function(e){t.$set(t.msg,"payTotalA",e)},expression:"msg.payTotalA"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"已付款金额",prop:"payed"}},[a("el-input",{attrs:{type:"number",autocomplete:"off",placeholder:"请输入已付款金额"},on:{blur:t.blurPayed},model:{value:t.msg.payed,callback:function(e){t.$set(t.msg,"payed",t._n(e))},expression:"msg.payed"}})],1)],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"未付款金额",prop:"payedNo"}},[a("el-input",{attrs:{type:"number",autocomplete:"off",placeholder:"请输入未付款金额"},model:{value:t.msg.payedNo,callback:function(e){t.$set(t.msg,"payedNo",t._n(e))},expression:"msg.payedNo"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"订单日期"}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择订单日期",clearable:"","value-format":"yyyy-MM-dd"},model:{value:t.msg.saleDate,callback:function(e){t.$set(t.msg,"saleDate",e)},expression:"msg.saleDate"}})],1)],1),t.userInfo.level>=4?a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"司机提成",prop:"driverCommission"}},[a("el-input",{attrs:{type:"number",disabled:1==t.userInfo.level,autocomplete:"off",placeholder:"请输入司机提成"},model:{value:t.msg.driverCommission,callback:function(e){t.$set(t.msg,"driverCommission",t._n(e))},expression:"msg.driverCommission"}})],1)],1):t._e(),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"运费",prop:"freight"}},[a("el-input",{attrs:{type:"number",autocomplete:"off",placeholder:"请输入运费"},model:{value:t.msg.freight,callback:function(e){t.$set(t.msg,"freight",t._n(e))},expression:"msg.freight"}})],1)],1)],1),t.userInfo.level>=4?a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"销售提成金额",prop:"commissionTotal"}},[a("el-input",{attrs:{type:"number",disabled:1==t.userInfo.level,autocomplete:"off",placeholder:"请输入提成金额"},on:{blur:t.blurCommissionTotal},model:{value:t.msg.commissionTotal,callback:function(e){t.$set(t.msg,"commissionTotal",t._n(e))},expression:"msg.commissionTotal"}})],1)],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"已结算",prop:"commissioned"}},[a("el-input",{attrs:{type:"number",disabled:1==t.userInfo.level,autocomplete:"off",placeholder:"请输入已结算"},on:{blur:t.blurCommissioned},model:{value:t.msg.commissioned,callback:function(e){t.$set(t.msg,"commissioned",t._n(e))},expression:"msg.commissioned"}})],1)],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"未结算",prop:"commissionNo"}},[a("el-input",{attrs:{type:"number",disabled:1==t.userInfo.level,autocomplete:"off",placeholder:"请输入未结算"},model:{value:t.msg.commissionNo,callback:function(e){t.$set(t.msg,"commissionNo",t._n(e))},expression:"msg.commissionNo"}})],1)],1)],1):t._e()],1),a("div",{staticClass:"remark"},[a("div",{staticClass:"labelTitle"},[t._v("备注")]),a("el-input",{attrs:{type:"textarea",rows:"16 ",placeholder:"请输入备注"},model:{value:t.msg.payRemark,callback:function(e){t.$set(t.msg,"payRemark",e)},expression:"msg.payRemark"}})],1)]),a("el-row",{staticClass:"saleListContent"},[a("el-form-item",{attrs:{"label-width":"0px"}},[a("el-button",{staticStyle:{margin:"0px 0px 8px 10px"},attrs:{size:"small",disabled:1==t.msg.checkStatus,icon:"el-icon-plus"},on:{click:function(e){return e.preventDefault(),t.addGoods()}}}),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.msg.saleList,stripe:"",border:"","header-cell-style":{textAlign:"center",color:"#333",background:"#FAFAFA",padding:"6px 0px"},"cell-style":{textAlign:"center",padding:"0px 0px"}}},[a("el-table-column",{attrs:{label:"产品名称","min-width":"20%"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-dropdown",{attrs:{trigger:"click"},on:{command:t.handleCommand}},[a("el-input",{attrs:{placeholder:"请输入"},model:{value:e.row.productName,callback:function(a){t.$set(e.row,"productName",a)},expression:"scope.row.productName"}}),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},t._l(t.productNameList1,(function(s){return a("el-dropdown-item",{key:s.id,attrs:{item:e.row,fieldName1:"productName",command:s.value},domProps:{textContent:t._s(s.value+"("+s.remark+")")}})})),1)],1)]}}])}),a("el-table-column",{attrs:{label:"规格高","min-width":"10%"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-dropdown",{attrs:{trigger:"click"},on:{command:t.handleCommand}},[a("el-input",{attrs:{placeholder:"请输入"},model:{value:e.row.speH,callback:function(a){t.$set(e.row,"speH",a)},expression:"scope.row.speH"}}),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},t._l(t.speHList8,(function(s){return a("el-dropdown-item",{key:s.id,attrs:{item:e.row,fieldName1:"speH",command:s.value},domProps:{textContent:t._s(s.value+"("+s.remark+")")}})})),1)],1)]}}])}),a("el-table-column",{attrs:{label:"规格长","min-width":"10%"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-dropdown",{attrs:{trigger:"click"},on:{command:t.handleCommand}},[a("el-input",{attrs:{placeholder:"请输入"},model:{value:e.row.speW,callback:function(a){t.$set(e.row,"speW",a)},expression:"scope.row.speW"}}),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},t._l(t.speWList9,(function(s){return a("el-dropdown-item",{key:s.id,attrs:{item:e.row,fieldName1:"speW",command:s.value},domProps:{textContent:t._s(s.value+"("+s.remark+")")}})})),1)],1)]}}])}),a("el-table-column",{attrs:{label:"数量","min-width":"7%"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-input",{attrs:{placeholder:"请输入"},on:{blur:function(a){return t.priceTotal(e.row)}},model:{value:e.row.num,callback:function(a){t.$set(e.row,"num",a)},expression:"scope.row.num"}})]}}])}),a("el-table-column",{attrs:{label:"单位","min-width":"7%"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-dropdown",{attrs:{trigger:"click"},on:{command:t.handleCommand}},[a("el-input",{attrs:{placeholder:"请输入"},model:{value:e.row.unit,callback:function(a){t.$set(e.row,"unit",a)},expression:"scope.row.unit"}}),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},t._l(t.unitList10,(function(s){return a("el-dropdown-item",{key:s.id,attrs:{item:e.row,fieldName1:"unit",command:s.value},domProps:{textContent:t._s(s.value+"("+s.remark+")")}})})),1)],1)]}}])}),a("el-table-column",{attrs:{label:"单价","min-width":"10%"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-input",{attrs:{placeholder:"请输入"},on:{blur:function(a){return t.priceTotal(e.row)}},model:{value:e.row.price,callback:function(a){t.$set(e.row,"price",a)},expression:"scope.row.price"}})]}}])}),a("el-table-column",{attrs:{label:"金额","min-width":"10%"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-input",{attrs:{placeholder:"请输入"},on:{blur:t.priceTotalAll},model:{value:e.row.priceTotal,callback:function(a){t.$set(e.row,"priceTotal",a)},expression:"scope.row.priceTotal"}})]}}])}),a("el-table-column",{attrs:{label:"备注","min-width":"19%"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-input",{attrs:{placeholder:"请输入"},model:{value:e.row.remark,callback:function(a){t.$set(e.row,"remark",a)},expression:"scope.row.remark"}})]}}])}),a("el-table-column",{attrs:{"min-width":"7%"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini",type:"danger",disabled:1==t.msg.checkStatus},on:{click:function(a){return a.preventDefault(),t.delGoods(e.$index)}}},[t._v("删除")])]}}])},[a("template",{slot:"header"},[a("span",[t._v("操作")])])],2)],1)],1)],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small"},on:{click:function(e){t.visible=!1}}},[t._v("取 消")]),null==t.msg.checkStatus||-1==t.msg.checkStatus||t.userInfo.level>=4?a("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(e){return t.save("ruleForm")}}},[t._v("保 存")]):t._e(),0!=t.msg.checkStatus?a("el-button",{attrs:{size:"small",type:"primary",disabled:1==t.msg.checkStatus},on:{click:function(e){return t.submitCheck("ruleForm")}}},[t._v(t._s(1==t.msg.checkStatus?"审核中":"提交审核"))]):t._e(),1==t.msg.checkStatus&&t.userInfo.level>=3?a("el-button",{attrs:{size:"small",type:"danger"},on:{click:function(e){t.isShowCheck=!0,t.checkContent=""}}},[t._v("不通过")]):t._e(),1==t.msg.checkStatus&&t.userInfo.level>=3?a("el-button",{attrs:{size:"small",type:"success"},on:{click:function(e){return t.oneKeyPass(t.msg.id)}}},[t._v("通过")]):t._e(),a("el-button",{attrs:{size:"small",type:"warning"},on:{click:function(e){t.isShowPrintPre=!0}}},[t._v("打印预览")])],1)],1),a("el-dialog",{staticClass:"defaultDialog",attrs:{title:"不通过原因",width:"320px",visible:t.isShowCheck,center:"","close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(e){t.isShowCheck=e}}},[a("el-form",{attrs:{size:"small",rules:t.rules,"label-width":"40px"}},[a("el-form-item",{attrs:{label:"原因"}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"请输入不通过原因"},model:{value:t.checkContent,callback:function(e){t.checkContent=e},expression:"checkContent"}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small",type:"danger"},on:{click:function(e){return t.noPassCheck()}}},[t._v("提交")])],1)],1),a("el-dialog",{staticClass:"defaultDialog",attrs:{title:"打印预览",visible:t.isShowPrintPre,center:"","close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(e){t.isShowPrintPre=e}}},[a("table",{attrs:{id:"previewTable"}},[a("tr",{staticStyle:{height:"36px"}},[a("th",{attrs:{colspan:"8"}},[a("span",{staticStyle:{"font-size":"20px"}},[t._v(t._s(t.msg.company))])])]),a("tr",[a("th",[t._v("客户名字")]),a("td",{attrs:{colspan:"2"}},[t._v(t._s(t.msg.customerName))]),a("th",[t._v("联系电话")]),a("td",{attrs:{colspan:"2"}},[t._v(t._s(t.msg.customerTel))]),a("th",[t._v("车牌号")]),a("td",[t._v(t._s(t.msg.plateNo))])]),a("tr",[a("th",[t._v("订单日期")]),a("td",{attrs:{colspan:"2"}},[t._v(t._s(t.msg.saleDate))]),a("th",[t._v("业务经理")]),a("td",{attrs:{colspan:"2"}},[t._v(t._s(t.msg.realName))]),a("th",[t._v("司机电话")]),a("td",[t._v(t._s(t.msg.driverTel))])]),a("tr",[a("th",{attrs:{rowspan:"2"}},[t._v("产品名称")]),a("th",{attrs:{colspan:"2"}},[t._v("规格")]),a("th",{attrs:{rowspan:"2"}},[t._v("数量")]),a("th",{attrs:{rowspan:"2"}},[t._v("单位")]),a("th",{attrs:{colspan:"2"}},[t._v(t._s(null!=t.msg.tax?t.taxs[t.msg.tax].val:""))]),a("th",{attrs:{rowspan:"2"}},[t._v("备注")])]),a("tr",[a("th",[t._v("高")]),a("th",[t._v("长")]),a("th",[t._v("单价")]),a("th",[t._v("金额")])]),t._l(t.msg.saleList,(function(e,s){return a("tr",{key:s,staticStyle:{height:"26px"}},[a("td",[t._v(t._s(e.productName))]),a("td",[t._v(t._s(e.speH))]),a("td",[t._v(t._s(e.speW))]),a("td",[t._v(t._s(e.num))]),a("td",[t._v(t._s(e.unit))]),a("td",[t._v(t._s(e.price))]),a("td",[t._v(t._s(e.priceTotal))]),a("td",[t._v(t._s(e.remark))])])})),a("tr",[a("th",[t._v("对公账号")]),a("td",{attrs:{colspan:"4"}},[t._v(t._s(t.msg.pubAcount))]),a("th",{attrs:{rowspan:"2"}},[t._v("大写金额")]),a("td",{attrs:{colspan:"2",rowspan:"2"}},[t._v(t._s(t.msg.payTotalA))])]),a("tr",[a("th",[t._v("开户行")]),a("td",{attrs:{colspan:"4"}},[t._v(t._s(t.msg.pubAcountBank))])]),a("tr",[a("th",[t._v("对私账号")]),a("td",{attrs:{colspan:"4"}},[t._v(t._s(t.msg.priAcount))]),a("th",{attrs:{rowspan:"2"}},[t._v("合计")]),a("td",{attrs:{colspan:"2",rowspan:"2"}},[t._v(t._s(t.msg.payTotal))])]),a("tr",[a("th",[t._v("开户行")]),a("td",{attrs:{colspan:"4"}},[t._v(t._s(t.msg.priAcountBank))])]),a("tr",[a("th",{attrs:{colspan:"8"}},[t._v("1、如含安装，因客户原因不能一次性进场安装完毕的，由客户自行承担安装人员来回路费")])]),a("tr",[a("th",{attrs:{colspan:"8"}},[t._v("2、本公司所有产品，非质量问题外，概不退货！如客户需退货，产品完好如损的情况下按照售价75%结算（退货需按整套退）")])])],2),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small"},on:{click:function(e){t.isShowPrintPre=!1}}},[t._v("取 消")]),a("el-button",{directives:[{name:"print",rawName:"v-print",value:{id:"previewTable",popTitle:""},expression:"{id: 'previewTable',popTitle: ''}"}],attrs:{size:"small",type:"primary"}},[t._v("打 印")])],1)])],1)])},o=[],l=a("cc64"),n=(a("0132"),a("2027"),a("39dd"),a("f433"),a("5ede"),a("8195"),a("20f0"),a("0d8f"),a("5972"),a("ba49"),a("55b1"),a("3946"),a("6054"),a("52c1")),r=a("b775");a("7733");function i(t){return Object(r["a"])({url:"/sale/list",method:"post",data:t})}function c(t){return Object(r["a"])({url:"/sale/edit",method:"post",data:t})}function m(t){return Object(r["a"])({url:"/sale/del",method:"post",data:t})}function u(t){return Object(r["a"])({url:"/sale/check",method:"post",data:t})}function p(t){return Object(r["a"])({url:"/base/toChinese?num="+t,method:"get"})}var d=a("25ec"),h={name:"SalesSlipList",components:{},computed:Object(l["a"])({},Object(n["b"])(["userInfo"])),data:function(){return{visible:!1,tableData:[],multipleSelection:[],msg:{},formLabelWidth:"100px",pageNo:1,pageSize:10,total:0,searchParams:{pageNo:1,pageSize:10,company:"",customerName:"",customerTel:"",payStatus:"",tax:"",checkStatus:"",startDate:"",endDate:"",realName:"",content:""},payStatuss:[{id:1,val:"未支付"},{id:2,val:"部分支付"},{id:3,val:"全部支付"}],taxs:[{id:0,val:"含税"},{id:1,val:"不含税"}],checkStatuss:{1:"审核中","-1":"审核未通过",0:"已完成"},searchCheckStatus:[{id:1,val:"审核中"},{id:-1,val:"审核未通过"},{id:0,val:"已完成"}],isShowCheck:!1,checkContent:"",isShowPrintPre:!1,searchDates:[],pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-6048e5),t.$emit("pick",[a,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-2592e6),t.$emit("pick",[a,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-7776e6),t.$emit("pick",[a,e])}}]},rules:{},productNameList1:[],companyList2:[],payCompanyList3:[],receiptCompanyList4:[],payWayList5:[],plateNoList6:[],acountList7:[],speHList8:[],speWList9:[],unitList10:[],nameDescList11:[],sizeList12:[]}},methods:{init:function(){var t=this;this.searchParams.pageNo=this.pageNo,this.searchParams.pageSize=this.pageSize,i(this.searchParams).then((function(e){var a=e.data;t.tableData=a.content,t.total=a.totalElements}))},tableRowClassName:function(t){var e=t.row;t.rowIndex;return 1===e.payStatus?"red-row":2===e.payStatus?"orange-row":""},blurPayed:function(){null!=this.msg.payed&&(this.msg.payed=parseFloat(this.msg.payed).toFixed(1)),null!=this.msg.payTotal&&null!=this.msg.payed&&(this.msg.payTotal=parseFloat(this.msg.payTotal).toFixed(1),this.msg.payedNo=parseFloat(this.msg.payTotal)-parseFloat(this.msg.payed),this.msg.payedNo=parseFloat(this.msg.payedNo).toFixed(1))},toChinese:function(){var t=this;null!=this.msg.payTotal&&(this.msg.payTotal=parseFloat(this.msg.payTotal).toFixed(1)),null!=this.msg.payTotal&&null!=this.msg.payed&&(this.msg.payed=parseFloat(this.msg.payed).toFixed(1),this.msg.payedNo=parseFloat(this.msg.payTotal)-parseFloat(this.msg.payed),this.msg.payedNo=parseFloat(this.msg.payedNo).toFixed(1)),p(this.msg.payTotal).then((function(e){0==e.code&&(t.msg.payTotalA=e.data)}))},blurCommissionTotal:function(){null==this.msg.commissionTotal&&(this.msg.commissionTotal=""),null==this.msg.commissioned&&(this.msg.commissioned=""),""!=this.msg.commissionTotal&&(this.msg.commissionTotal=parseFloat(this.msg.commissionTotal).toFixed(1)),""!=this.msg.commissionTotal&&""!=this.msg.commissioned&&(this.msg.commissioned=parseFloat(this.msg.commissioned).toFixed(1),this.msg.commissionNo=parseFloat(this.msg.commissionTotal)-parseFloat(this.msg.commissioned),this.msg.commissionNo=parseFloat(this.msg.commissionNo).toFixed(1))},blurCommissioned:function(){null==this.msg.commissionTotal&&(this.msg.commissionTotal=""),null==this.msg.commissioned&&(this.msg.commissioned=""),""!=this.msg.commissioned&&(this.msg.commissioned=parseFloat(this.msg.commissioned).toFixed(1)),""!=this.msg.commissionTotal&&""!=this.msg.commissioned&&(this.msg.commissionTotal=parseFloat(this.msg.commissionTotal).toFixed(1),this.msg.commissionNo=parseFloat(this.msg.commissionTotal)-parseFloat(this.msg.commissioned),this.msg.commissionNo=parseFloat(this.msg.commissionNo).toFixed(1))},addGoods:function(){var t={productName:"",speH:"",speW:"",num:"",unit:"",price:"",priceTotal:"",remark:""};this.msg.saleList.push(t)},delGoods:function(t){var e=this;this.$confirm("确认删除该条数据？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.msg.saleList.splice(t,1),e.priceTotalAll()})).catch((function(){e.$message({type:"info",message:"已取消"})}))},priceTotal:function(t){parseFloat(t.num)&&parseFloat(t.price)&&(t.priceTotal=(parseFloat(t.num)*parseFloat(t.price)).toFixed(1)),this.priceTotalAll()},priceTotalAll:function(){var t=this,e=0;this.msg.saleList.forEach((function(a){var s=parseFloat(a.priceTotal);s&&(e=t.accAdd(e,s,"+"))})),this.msg.payTotal=e,this.toChinese()},accAdd:function(t,e,a){var s,o;try{s=t.toString().split(".")[1].length}catch(c){s=0}try{o=e.toString().split(".")[1].length}catch(c){o=0}n=Math.max(s,o);var l=0;if("+"==a&&(l=parseFloat((t+e).toFixed(n))),"*"==a){var n=0,r=t.toString(),i=e.toString();try{n+=r.split(".")[1].length}catch(c){}try{n+=i.split(".")[1].length}catch(c){}return Number(r.replace(".",""))*Number(i.replace(".",""))/Math.pow(10,n)}return l},add:function(){var t=this;this.reset().then((function(e){t.visible=!0}))},edit:function(){if(1==this.multipleSelection.length){var t=JSON.parse(JSON.stringify(this.multipleSelection[0]));t.saleList=JSON.parse(t.saleList),this.msg=t,this.visible=!0}else this.$alert("","请选择一条数据",{confirmButtonText:"确定"})},del:function(){var t=this;if(0!=this.multipleSelection.length){for(var e=[],a=0;a<this.multipleSelection.length;a++){var s=this.multipleSelection[a];if(0==s.checkStatus||1==s.checkStatus)return void this.$message({message:1==s.checkStatus?"不能删除审核中的数据":"不能删除审核通过的数据",type:"warning"});e.push(s.id)}this.$confirm("确认删除该数据？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){m(e).then((function(a){if(0==a.code){t.$message({message:a.data,type:"success"});var s=Math.ceil((t.total-e.length)/t.pageSize),o=t.pageNo>s?s:t.pageNo;return t.pageNo=o<1?1:o,void t.init()}}))})).catch((function(){t.$message({type:"info",message:"已取消"})}))}else this.$alert("","请选择删除的数据",{confirmButtonText:"确定"})},resetSearchParams:function(){this.searchParams={pageNo:1,pageSize:10,company:"",customerName:"",customerTel:"",payStatus:"",tax:"",checkStatus:"",startDate:"",endDate:""},this.searchDates=[]},changeCheck:function(t,e){var a=this,s=JSON.parse(JSON.stringify(t));s.checkStatus=e,c(s).then((function(t){if(0==t.code)return a.$message({message:1==s.checkStatus?"提交成功":"撤销成功",type:"success"}),void a.init()}))},submitCheck:function(t){this.msg.checkStatus=1,this.save(t)},oneKeyPass:function(t){var e=this,a=[];if(t)a.push(t);else{if(0==this.multipleSelection.length)return void this.$alert("","请选择一键通过的数据",{confirmButtonText:"确定"});for(var s=0;s<this.multipleSelection.length;s++){var o=this.multipleSelection[s];if(1!=o.checkStatus)return void this.$message({message:"请选择审核中的数据",type:"warning"});a.push(o.id)}}this.$confirm(t?"确认通过？":"确认一键通过？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){u({ids:a,checkStatus:0,checkContent:""}).then((function(t){e.$message({message:t.data,type:"success"}),e.visible=!1,e.init()}))}))},noPassCheck:function(){var t=this;this.checkContent?u({ids:[this.msg.id],checkStatus:-1,checkContent:this.checkContent}).then((function(e){t.$message({message:e.data,type:"success"}),t.isShowCheck=!1,t.visible=!1,t.init()})):this.$message({message:"审核原因不能为空",type:"warning"})},save:function(t){var e=this;this.$refs[t].validate((function(t){if(t){var a=JSON.parse(JSON.stringify(e.msg));a.saleList=JSON.stringify(a.saleList),c(a).then((function(t){if(0==t.code)return e.$message({message:1==e.msg.checkStatus?"提交成功":"保存成功",type:"success"}),e.visible=!1,void e.init()}))}}))},addReceipt:function(t){this.$router.push({name:"ReceiptList",params:{oper:"add",saleId:t}})},searchReceipt:function(t){this.$router.push({name:"ReceiptList",params:{oper:"search",saleId:t}})},handleSizeChange:function(t){this.pageSize=t,this.init()},handleCurrentChange:function(t){this.pageNo=t,this.init()},clickRow:function(t){this.$refs.multipleTable.toggleRowSelection(t)},handleSelectionChange:function(t){this.multipleSelection=t},search:function(){this.pageNo=1,this.searchParams.startDate="",this.searchParams.endDate="",this.searchDates&&this.searchDates.length>0&&(this.searchParams.startDate=this.searchDates[0],this.searchParams.endDate=this.searchDates[1]),this.init()},handleCommand:function(t,e){var a=e.$attrs,s=a.fieldName1,o=a.item||{};o[s]=t,a.fieldName2&&(o[a.fieldName2]=a.fieldNameVal2)},getDictionaryList:function(t){var e=this;return new Promise((function(a,s){Object(d["c"])({pageNo:1,pageSize:1e3,type:t}).then((function(s){"1"==t&&(e.productNameList1=s.data.content),"2"==t&&(e.companyList2=s.data.content),"6"==t&&(e.plateNoList6=s.data.content),"7"==t&&(e.acountList7=s.data.content),"8"==t&&(e.speHList8=s.data.content),"9"==t&&(e.speWList9=s.data.content),"10"==t&&(e.unitList10=s.data.content),a()}))}))},reset:function(){var t=this;return new Promise((function(e,a){Promise.all([t.getDictionaryList("1"),t.getDictionaryList("2"),t.getDictionaryList("6"),t.getDictionaryList("7"),t.getDictionaryList("8"),t.getDictionaryList("9"),t.getDictionaryList("10")]).then((function(a){t.msg={company:null,customerName:null,customerTel:null,realName:null,plateNo:null,driverTel:null,pubAcountBank:null,pubAcount:null,priAcountBank:null,priAcount:null,payStatus:null,payTotal:null,payTotalA:null,checkStatus:null,checkContent:null,saleList:[{productName:"",speH:"",speW:"",num:"",unit:"",price:"",priceTotal:"",remark:""},{productName:"",speH:"",speW:"",num:"",unit:"",price:"",priceTotal:"",remark:""},{productName:"",speH:"",speW:"",num:"",unit:"",price:"",priceTotal:"",remark:""},{productName:"",speH:"",speW:"",num:"",unit:"",price:"",priceTotal:"",remark:""},{productName:"",speH:"",speW:"",num:"",unit:"",price:"",priceTotal:"",remark:""}],saleDate:t.$options.filters["dateFormat"](new Date,"yyyy-mm-dd"),tax:1,payed:0,payedNo:null,commissionTotal:"",commissioned:"",commissionNo:"",driverCommission:null,freight:null},e("reset 成功了")})).catch((function(t){console.log(t)}))}))}},created:function(){this.init()},filters:{dateFormat:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";if(!t)return"--";var a=new Date(t),s=a.getFullYear(),o=a.getMonth()+1<10?"0"+(a.getMonth()+1):a.getMonth()+1,l=a.getDate()<10?"0"+a.getDate():a.getDate();if("yyyy-mm"==e.toLowerCase())return"".concat(s,"-").concat(o);if("yyyy-mm-dd"==e.toLowerCase())return"".concat(s,"-").concat(o,"-").concat(l);var n=a.getHours()<10?"0"+a.getHours():a.getHours(),r=a.getMinutes()<10?"0"+a.getMinutes():a.getMinutes(),i=a.getSeconds()<10?"0"+a.getSeconds():a.getSeconds();return"".concat(s,"-").concat(o,"-").concat(l," ").concat(n,":").concat(r,":").concat(i)}}},f=h,g=(a("c242"),a("cba8")),v=Object(g["a"])(f,s,o,!1,null,"257e2e13",null);e["default"]=v.exports}}]);