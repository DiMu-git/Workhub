(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-02a6ad98"],{"25ec":function(e,t,a){"use strict";a.d(t,"c",(function(){return l})),a.d(t,"a",(function(){return n})),a.d(t,"b",(function(){return o}));var s=a("b775");a("7733");function l(e){return Object(s["a"])({url:"/param/find",method:"post",data:e})}function n(e){return Object(s["a"])({url:"/param/edit",method:"post",data:e})}function o(e){return Object(s["a"])({url:"/param/del",method:"post",data:e})}},"58bf":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"search_container"},[a("el-form",{staticClass:"searchformContent",attrs:{model:e.searchParams,inline:!0,"label-width":"70px",size:"small"}},[a("el-row",[a("el-form-item",{attrs:{label:"业务经理"}},[a("el-input",{staticStyle:{width:"140px"},attrs:{placeholder:"请输入业务经理",clearable:""},model:{value:e.searchParams.realName,callback:function(t){e.$set(e.searchParams,"realName",t)},expression:"searchParams.realName"}})],1),a("el-form-item",{attrs:{label:"客户名称"}},[a("el-input",{staticStyle:{width:"140px"},attrs:{placeholder:"请输入客户名称",clearable:""},model:{value:e.searchParams.customerName,callback:function(t){e.$set(e.searchParams,"customerName",t)},expression:"searchParams.customerName"}})],1),a("el-form-item",{attrs:{label:"审批状态"}},[a("el-select",{staticStyle:{width:"140px"},attrs:{placeholder:"请选择审批状态",clearable:"",filterable:""},model:{value:e.searchParams.checkStatus,callback:function(t){e.$set(e.searchParams,"checkStatus",t)},expression:"searchParams.checkStatus"}},e._l(e.searchCheckStatus,(function(e){return a("el-option",{key:e.id,attrs:{label:e.val,value:e.id}})})),1)],1),a("el-form-item",{attrs:{label:"出货日期"}},[a("el-date-picker",{staticStyle:{width:"240px"},attrs:{type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":e.pickerOptions,"value-format":"yyyy-MM-dd"},model:{value:e.searchDates,callback:function(t){e.searchDates=t},expression:"searchDates"}})],1)],1),a("el-row",[a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.search()}}},[e._v("查询")]),a("el-button",{attrs:{type:"success"},on:{click:function(t){return e.add()}}},[e._v("新建")]),a("el-button",{attrs:{type:"warning"},on:{click:function(t){return e.edit()}}},[e._v("编辑")]),a("el-button",{attrs:{type:"danger"},on:{click:function(t){return e.del()}}},[e._v("删除")]),a("el-button",{attrs:{type:"info"},on:{click:function(t){return e.resetSearchParams()}}},[e._v("重置")]),e.userInfo.level>=3?a("el-button",{on:{click:function(t){return e.oneKeyPass()}}},[e._v("一键通过")]):e._e()],1)],1)],1)],1),a("div",{staticClass:"table_container"},[a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.tableData,"tooltip-effect":"dark",size:"medium","header-cell-style":{textAlign:"center",color:"#fff",background:"#CFC39F",padding:"6px 0px"},"cell-style":{textAlign:"center"}},on:{"row-click":e.clickRow,"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",fixed:"",width:"50px"}}),a("el-table-column",{attrs:{label:"序号",type:"index",fixed:"",width:"50px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s((e.pageNo-1)*e.pageSize+t.$index+1))])]}}])}),a("el-table-column",{attrs:{prop:"realName",label:"业务经理"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.realName?t.row.realName:"--"))]}}])}),a("el-table-column",{attrs:{prop:"customerName",label:"客户名称"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.customerName?t.row.customerName:"--"))]}}])}),a("el-table-column",{attrs:{prop:"saleDetailDate",label:"出货日期"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.saleDetailDate?t.row.saleDetailDate:"--"))]}}])}),a("el-table-column",{attrs:{prop:"address",label:"送货地址"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.address?t.row.address:"--"))]}}])}),a("el-table-column",{attrs:{prop:"remark",label:"备注"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.remark?t.row.remark:"--"))]}}])}),a("el-table-column",{attrs:{prop:"checkStatus",label:"审批状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(null!=t.row.checkStatus?e.checkStatuss[t.row.checkStatus]:"--"))]}}])}),a("el-table-column",{attrs:{prop:"checkContent",label:"审批说明"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.checkContent?t.row.checkContent:"--"))]}}])}),a("el-table-column",{attrs:{prop:"createDate",label:"创建时间",width:"150px"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(e._f("dateFormat")(t.row.createDate))+" ")]}}])}),a("el-table-column",{attrs:{label:"操作",fixed:"right",width:"105px"},scopedSlots:e._u([{key:"default",fn:function(t){return[null==t.row.checkStatus||-1==t.row.checkStatus?a("el-button",{staticClass:"defaultColor",attrs:{size:"mini",round:"",plain:""},on:{click:function(a){return a.stopPropagation(),e.changeCheck(t.row,1)}}},[e._v("提交审核")]):e._e(),1==t.row.checkStatus?a("el-button",{staticClass:"defaultColor",attrs:{size:"mini",round:"",plain:""},on:{click:function(a){return a.stopPropagation(),e.changeCheck(t.row,null)}}},[e._v("撤销审核")]):e._e(),0==t.row.checkStatus?a("el-button",{staticClass:"defaultColor",attrs:{disabled:"",size:"mini",round:"",plain:""}},[e._v("审核通过")]):e._e()]}}])})],1),a("div",{staticClass:"pageContent"},[a("el-pagination",{attrs:{background:"","page-sizes":[10,25,50,100],layout:"total,sizes,prev, pager, next","current-page":e.pageNo,"page-size":10,total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),a("el-dialog",{staticClass:"defaultDialog",attrs:{title:"详情页",visible:e.visible,center:"","close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(t){e.visible=t}}},[a("el-form",{ref:"ruleForm",attrs:{model:e.msg,size:"small",disabled:(1==e.msg.checkStatus||0==e.msg.checkStatus)&&e.userInfo.level<4,rules:e.rules,"label-width":e.formLabelWidth}},[a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"产品名称",prop:"product"}},[a("el-dropdown",{attrs:{trigger:"click"},on:{command:e.handleCommand}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"请输入产品名称"},model:{value:e.msg.product,callback:function(t){e.$set(e.msg,"product",t)},expression:"msg.product"}}),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},e._l(e.productNameList1,(function(t){return a("el-dropdown-item",{key:t.id,attrs:{item:e.msg,fieldName1:"product",command:t.value},domProps:{textContent:e._s(t.value+"("+t.remark+")")}})})),1)],1)],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"公司名称",prop:"company"}},[a("el-dropdown",{attrs:{trigger:"click"},on:{command:e.handleCommand}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"请输入公司名称"},model:{value:e.msg.company,callback:function(t){e.$set(e.msg,"company",t)},expression:"msg.company"}}),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},e._l(e.companyList2,(function(t){return a("el-dropdown-item",{key:t.id,attrs:{item:e.msg,fieldName1:"company",command:t.value},domProps:{textContent:e._s(t.value+"("+t.remark+")")}})})),1)],1)],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"客户名称"}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"请输入客户名称"},model:{value:e.msg.customerName,callback:function(t){e.$set(e.msg,"customerName",t)},expression:"msg.customerName"}})],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"出货日期"}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择出货日期",clearable:"","value-format":"yyyy-MM-dd"},model:{value:e.msg.saleDetailDate,callback:function(t){e.$set(e.msg,"saleDetailDate",t)},expression:"msg.saleDetailDate"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"送货地址"}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"请输入送货地址"},model:{value:e.msg.address,callback:function(t){e.$set(e.msg,"address",t)},expression:"msg.address"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"备注"}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"请输入备注"},model:{value:e.msg.remark,callback:function(t){e.$set(e.msg,"remark",t)},expression:"msg.remark"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"收货人"}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"请输入收货人"},model:{value:e.msg.receiver,callback:function(t){e.$set(e.msg,"receiver",t)},expression:"msg.receiver"}})],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"接收电话"}},[a("el-input",{attrs:{oninput:"value=value.replace(/[^\\d]/g,'')",placeholder:"请输入接收电话",maxlength:"11",clearable:""},model:{value:e.msg.receiverTel,callback:function(t){e.$set(e.msg,"receiverTel",t)},expression:"msg.receiverTel"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"装货车牌"}},[a("el-dropdown",{attrs:{trigger:"click"},on:{command:e.handleCommand}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"请输入装货车牌"},model:{value:e.msg.plateNo,callback:function(t){e.$set(e.msg,"plateNo",t)},expression:"msg.plateNo"}}),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},e._l(e.plateNoList6,(function(t){return a("el-dropdown-item",{key:t.id,attrs:{item:e.msg,fieldName1:"plateNo",command:t.value},domProps:{textContent:e._s(t.value+"("+t.remark+")")}})})),1)],1)],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"司机名称"}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"请输入司机名称"},model:{value:e.msg.driver,callback:function(t){e.$set(e.msg,"driver",t)},expression:"msg.driver"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"司机电话"}},[a("el-input",{attrs:{oninput:"value=value.replace(/[^\\d]/g,'')",placeholder:"请输入司机电话",maxlength:"11",clearable:""},model:{value:e.msg.driverTel,callback:function(t){e.$set(e.msg,"driverTel",t)},expression:"msg.driverTel"}})],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"制单人"}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"请输入制单人"},model:{value:e.msg.maker,callback:function(t){e.$set(e.msg,"maker",t)},expression:"msg.maker"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"装货人"}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"请输入装货人"},model:{value:e.msg.loader,callback:function(t){e.$set(e.msg,"loader",t)},expression:"msg.loader"}})],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"复核人"}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"请输入复核人"},model:{value:e.msg.checker,callback:function(t){e.$set(e.msg,"checker",t)},expression:"msg.checker"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"业务经理"}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"请输入业务经理"},model:{value:e.msg.realName,callback:function(t){e.$set(e.msg,"realName",t)},expression:"msg.realName"}})],1)],1)],1),a("el-row",{staticClass:"saleDetailListContent"},[a("el-form-item",{attrs:{"label-width":"0px"}},[a("el-button",{staticStyle:{margin:"0px 0px 8px 10px"},attrs:{size:"small",disabled:1==e.msg.checkStatus,icon:"el-icon-plus"},on:{click:function(t){return t.preventDefault(),e.addGoods()}}}),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.msg.saleDetailList,stripe:"",border:"","header-cell-style":{textAlign:"center",color:"#333",background:"#FAFAFA",padding:"6px 0px"},"cell-style":{textAlign:"center",padding:"0px 0px"}}},[a("el-table-column",{attrs:{label:"序号","min-width":"8%"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-input",{attrs:{placeholder:"请输入"},model:{value:t.row.id,callback:function(a){e.$set(t.row,"id",a)},expression:"scope.row.id"}})]}}])}),a("el-table-column",{attrs:{label:"名称描述","min-width":"30%"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-dropdown",{attrs:{trigger:"click"},on:{command:e.handleCommand}},[a("el-input",{attrs:{placeholder:"请输入"},model:{value:t.row.name,callback:function(a){e.$set(t.row,"name",a)},expression:"scope.row.name"}}),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},e._l(e.nameDescList11,(function(s){return a("el-dropdown-item",{key:s.id,attrs:{item:t.row,fieldName1:"name",command:s.value},domProps:{textContent:e._s(s.value+"("+s.remark+")")}})})),1)],1)]}}])}),a("el-table-column",{attrs:{label:"尺寸","min-width":"11%"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-dropdown",{attrs:{trigger:"click"},on:{command:e.handleCommand}},[a("el-input",{attrs:{placeholder:"请输入"},model:{value:t.row.size,callback:function(a){e.$set(t.row,"size",a)},expression:"scope.row.size"}}),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},e._l(e.sizeList12,(function(s){return a("el-dropdown-item",{key:s.id,attrs:{item:t.row,fieldName1:"size",command:s.value},domProps:{textContent:e._s(s.value+"("+s.remark+")")}})})),1)],1)]}}])}),a("el-table-column",{attrs:{label:"数量","min-width":"11%"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-input",{attrs:{placeholder:"请输入"},model:{value:t.row.num,callback:function(a){e.$set(t.row,"num",a)},expression:"scope.row.num"}})]}}])}),a("el-table-column",{attrs:{label:"单位","min-width":"11%"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-dropdown",{attrs:{trigger:"click"},on:{command:e.handleCommand}},[a("el-input",{attrs:{placeholder:"请输入"},model:{value:t.row.unit,callback:function(a){e.$set(t.row,"unit",a)},expression:"scope.row.unit"}}),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},e._l(e.unitList10,(function(s){return a("el-dropdown-item",{key:s.id,attrs:{item:t.row,fieldName1:"unit",command:s.value},domProps:{textContent:e._s(s.value+"("+s.remark+")")}})})),1)],1)]}}])}),a("el-table-column",{attrs:{label:"备注","min-width":"30%"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-input",{attrs:{placeholder:"请输入"},model:{value:t.row.remark,callback:function(a){e.$set(t.row,"remark",a)},expression:"scope.row.remark"}})]}}])}),a("el-table-column",{attrs:{"min-width":"10%"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"danger",disabled:1==e.msg.checkStatus},on:{click:function(a){return a.preventDefault(),e.delGoods(t.$index)}}},[e._v("删除")])]}}])},[a("template",{slot:"header"},[a("span",[e._v("操作")])])],2)],1)],1)],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small"},on:{click:function(t){e.visible=!1}}},[e._v("取 消")]),null==e.msg.checkStatus||-1==e.msg.checkStatus||e.serInfo.level>4?a("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(t){return e.save("ruleForm")}}},[e._v("保 存")]):e._e(),0!=e.msg.checkStatus?a("el-button",{attrs:{size:"small",type:"primary",disabled:1==e.msg.checkStatus},on:{click:function(t){return e.submitCheck("ruleForm")}}},[e._v(e._s(1==e.msg.checkStatus?"审核中":"提交审核"))]):e._e(),1==e.msg.checkStatus?a("el-button",{attrs:{size:"small",type:"danger"},on:{click:function(t){e.isShowCheck=!0,e.checkContent=""}}},[e._v("不通过")]):e._e(),1==e.msg.checkStatus?a("el-button",{attrs:{size:"small",type:"success"},on:{click:function(t){return e.oneKeyPass(e.msg.id)}}},[e._v("通过")]):e._e(),a("el-button",{attrs:{size:"small",type:"warning"},on:{click:function(t){e.isShowPrintPre=!0}}},[e._v("打印预览")])],1)],1),a("el-dialog",{staticClass:"defaultDialog",attrs:{title:"不通过原因",width:"320px",visible:e.isShowCheck,center:"","close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(t){e.isShowCheck=t}}},[a("el-form",{attrs:{size:"small",rules:e.rules,"label-width":"40px"}},[a("el-form-item",{attrs:{label:"原因"}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"请输入不通过原因"},model:{value:e.checkContent,callback:function(t){e.checkContent=t},expression:"checkContent"}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small",type:"danger"},on:{click:function(t){return e.noPassCheck()}}},[e._v("提交")])],1)],1),a("el-dialog",{staticClass:"defaultDialog",attrs:{title:"打印预览",visible:e.isShowPrintPre,center:"","close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(t){e.isShowPrintPre=t}}},[a("table",{attrs:{id:"previewTable"}},[a("tr",{staticStyle:{height:"36px"}},[a("th",{attrs:{colspan:"6"}},[a("span",{staticStyle:{"font-size":"20px"}},[e._v(e._s(e.msg.product))])])]),a("tr",{staticStyle:{height:"26px"}},[a("th",{attrs:{colspan:"6"}},[e._v(e._s(e.msg.company))])]),a("tr",[a("th",[e._v("客户名称")]),a("td",{attrs:{colspan:"2"}},[e._v(e._s(e.msg.customerName))]),a("th",[e._v("出货日期")]),a("td",{attrs:{colspan:"2"}},[e._v(e._s(e.msg.saleDetailDate))])]),a("tr",[a("th",[e._v("送货地址")]),a("td",{attrs:{colspan:"2"}},[e._v(e._s(e.msg.address))]),a("th",[e._v("备注")]),a("td",{attrs:{colspan:"2"}},[e._v(e._s(e.msg.remark))])]),a("tr",[a("th",[e._v("序号")]),a("th",[e._v("名称描述")]),a("th",[e._v("尺寸")]),a("th",[e._v("数量")]),a("th",[e._v("单位")]),a("th",[e._v("备注")])]),e._l(e.msg.saleDetailList,(function(t,s){return a("tr",{key:s,staticStyle:{height:"26px"}},[a("td",[e._v(e._s(t.id))]),a("td",[e._v(e._s(t.name))]),a("td",[e._v(e._s(t.size))]),a("td",[e._v(e._s(t.num))]),a("td",[e._v(e._s(t.unit))]),a("td",[e._v(e._s(t.remark))])])})),a("tr",[a("th",[e._v("收货人签字")]),a("td",{attrs:{colspan:"2"}},[e._v(e._s(e.msg.receiver))]),a("th",[e._v("电话")]),a("td",{attrs:{colspan:"2"}},[e._v(e._s(e.msg.receiverTel))])]),a("tr",[a("th",[e._v("装货车牌")]),a("td",[e._v(e._s(e.msg.plateNo))]),a("th",[e._v("司机电话")]),a("td",[e._v(e._s(e.msg.driverTel))]),a("th",[e._v("司机签字")]),a("td",[e._v(e._s(e.msg.driver))])]),a("tr",[a("th",[e._v("制单")]),a("td",[e._v(e._s(e.msg.maker))]),a("th",[e._v("装货")]),a("td",[e._v(e._s(e.msg.loader))]),a("th",[e._v("复核")]),a("td",[e._v(e._s(e.msg.checker))])])],2),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small"},on:{click:function(t){e.isShowPrintPre=!1}}},[e._v("取 消")]),a("el-button",{directives:[{name:"print",rawName:"v-print",value:{id:"previewTable",popTitle:""},expression:"{id: 'previewTable',popTitle: ''}"}],attrs:{size:"small",type:"primary"}},[e._v("打 印")])],1)])],1)])},l=[],n=a("cc64"),o=(a("fd2d"),a("2027"),a("ba49"),a("39dd"),a("55b1"),a("3946"),a("6054"),a("52c1")),r=a("b775");a("7733");function i(e){return Object(r["a"])({url:"/saleDetail/list",method:"post",data:e})}function c(e){return Object(r["a"])({url:"/saleDetail/edit",method:"post",data:e})}function u(e){return Object(r["a"])({url:"/saleDetail/del",method:"post",data:e})}function m(e){return Object(r["a"])({url:"/saleDetail/check",method:"post",data:e})}function d(e){return Object(r["a"])({url:"/base/toChinese?num="+e,method:"get"})}var p=a("25ec"),h={name:"OutGoodsList",components:{},computed:Object(n["a"])({},Object(o["b"])(["userInfo"])),data:function(){return{visible:!1,tableData:[],multipleSelection:[],msg:{},formLabelWidth:"100px",pageNo:1,pageSize:10,total:0,searchParams:{pageNo:1,pageSize:10,realName:"",customerName:"",checkStatus:"",startDate:"",endDate:"",content:""},checkStatuss:{1:"审核中","-1":"审核未通过",0:"已完成"},searchCheckStatus:[{id:1,val:"审核中"},{id:-1,val:"审核未通过"},{id:0,val:"已完成"}],isShowCheck:!1,checkContent:"",isShowPrintPre:!1,rules:{},searchDates:[],pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-7776e6),e.$emit("pick",[a,t])}}]},productNameList1:[],companyList2:[],payCompanyList3:[],receiptCompanyList4:[],payWayList5:[],plateNoList6:[],acountList7:[],speHList8:[],speWList9:[],unitList10:[],nameDescList11:[],sizeList12:[]}},methods:{init:function(){var e=this;this.searchParams.pageNo=this.pageNo,this.searchParams.pageSize=this.pageSize,i(this.searchParams).then((function(t){var a=t.data;e.tableData=a.content,e.total=a.totalElements}))},toChinese:function(){var e=this;d(this.msg.payTotal).then((function(t){0==t.code&&(e.msg.payTotalA=t.data)}))},addGoods:function(){var e={id:"",name:"",size:"",num:"",unit:"",remark:""};this.msg.saleDetailList.push(e),this.msg.saleDetailList.map((function(e,t){return e.id=t+1,e}))},delGoods:function(e){var t=this;this.$confirm("确认删除该条数据？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.msg.saleDetailList.splice(e,1),t.msg.saleDetailList.map((function(e,t){return e.id=t+1,e}))})).catch((function(){t.$message({type:"info",message:"已取消"})}))},add:function(){var e=this;this.reset().then((function(t){e.visible=!0}))},edit:function(){if(1==this.multipleSelection.length){var e=JSON.parse(JSON.stringify(this.multipleSelection[0]));e.saleDetailList=JSON.parse(e.saleDetailList),this.msg=e,this.visible=!0}else this.$alert("","请选择一条数据",{confirmButtonText:"确定"})},del:function(){var e=this;if(0!=this.multipleSelection.length){for(var t=[],a=0;a<this.multipleSelection.length;a++){var s=this.multipleSelection[a];if(0==s.checkStatus||1==s.checkStatus)return void this.$message({message:1==s.checkStatus?"不能删除审核中的数据":"不能删除审核通过的数据",type:"warning"});t.push(s.id)}this.$confirm("确认删除该数据？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){u(t).then((function(a){if(0==a.code){e.$message({message:a.data,type:"success"});var s=Math.ceil((e.total-t.length)/e.pageSize),l=e.pageNo>s?s:e.pageNo;return e.pageNo=l<1?1:l,void e.init()}}))})).catch((function(){e.$message({type:"info",message:"已取消"})}))}else this.$alert("","请选择删除的数据",{confirmButtonText:"确定"})},resetSearchParams:function(){this.searchParams={pageNo:1,pageSize:10,customerName:"",checkStatus:"",startDate:"",endDate:""}},changeCheck:function(e,t){var a=this,s=JSON.parse(JSON.stringify(e));s.checkStatus=t,c(s).then((function(e){if(0==e.code)return a.$message({message:1==s.checkStatus?"提交成功":"撤销成功",type:"success"}),void a.init()}))},submitCheck:function(e){this.msg.checkStatus=1,this.save(e)},oneKeyPass:function(e){var t=this,a=[];if(e)a.push(e);else{if(0==this.multipleSelection.length)return void this.$alert("","请选择一键通过的数据",{confirmButtonText:"确定"});for(var s=0;s<this.multipleSelection.length;s++){var l=this.multipleSelection[s];if(1!=l.checkStatus)return void this.$message({message:"请选择审核中的数据",type:"warning"});a.push(l.id)}}this.$confirm(e?"确认通过？":"确认一键通过？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){m({ids:a,checkStatus:0,checkContent:""}).then((function(e){t.$message({message:e.data,type:"success"}),t.visible=!1,t.init()}))}))},noPassCheck:function(){var e=this;this.checkContent?m({ids:[this.msg.id],checkStatus:-1,checkContent:this.checkContent}).then((function(t){e.$message({message:t.data,type:"success"}),e.isShowCheck=!1,e.visible=!1,e.init()})):this.$message({message:"审核原因不能为空",type:"warning"})},save:function(e){var t=this;this.$refs[e].validate((function(e){if(e){var a=JSON.parse(JSON.stringify(t.msg));a.userId=t.userInfo.id,a.updateUser=t.userInfo.realName,a.saleDetailList=JSON.stringify(a.saleDetailList),c(a).then((function(e){if(0==e.code)return t.$message({message:1==t.msg.checkStatus?"提交成功":"保存成功",type:"success"}),t.visible=!1,void t.init()}))}}))},handleSizeChange:function(e){this.pageSize=e,this.init()},handleCurrentChange:function(e){this.pageNo=e,this.init()},clickRow:function(e){this.$refs.multipleTable.toggleRowSelection(e)},handleSelectionChange:function(e){this.multipleSelection=e},search:function(){this.pageNo=1,this.searchParams.startDate="",this.searchParams.endDate="",this.searchDates&&this.searchDates.length>0&&(this.searchParams.startDate=this.searchDates[0],this.searchParams.endDate=this.searchDates[1]),this.init()},handleCommand:function(e,t){var a=t.$attrs,s=a.fieldName1,l=a.item||{};l[s]=e,a.fieldName2&&(l[a.fieldName2]=a.fieldNameVal2)},getDictionaryList:function(e){var t=this;return new Promise((function(a,s){Object(p["c"])({pageNo:1,pageSize:1e3,type:e}).then((function(s){"1"==e&&(t.productNameList1=s.data.content),"2"==e&&(t.companyList2=s.data.content),"6"==e&&(t.plateNoList6=s.data.content),"10"==e&&(t.unitList10=s.data.content),"11"==e&&(t.nameDescList11=s.data.content),"12"==e&&(t.sizeList12=s.data.content),a()}))}))},reset:function(){var e=this;return new Promise((function(t,a){Promise.all([e.getDictionaryList("1"),e.getDictionaryList("2"),e.getDictionaryList("6"),e.getDictionaryList("10"),e.getDictionaryList("11"),e.getDictionaryList("12")]).then((function(a){e.msg={product:"",company:"",customerName:"",saleDetailDate:e.$options.filters["dateFormat"](new Date,"yyyy-mm-dd"),address:null,remark:null,receiver:null,receiverTel:null,plateNo:null,driver:null,driverTel:null,maker:"",loader:null,checker:null,realName:null,checkStatus:null,checkContent:"",saleDetailList:[{id:"1",name:"",size:"",num:"",unit:"",remark:""},{id:"2",name:"",size:"",num:"",unit:"",remark:""},{id:"3",name:"",size:"",num:"",unit:"",remark:""},{id:"4",name:"",size:"",num:"",unit:"",remark:""},{id:"5",name:"",size:"",num:"",unit:"",remark:""}]},t("reset 成功了")})).catch((function(e){console.log(e)}))}))}},created:function(){this.init()},filters:{dateFormat:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";if(!e)return"--";var a=new Date(e),s=a.getFullYear(),l=a.getMonth()+1<10?"0"+(a.getMonth()+1):a.getMonth()+1,n=a.getDate()<10?"0"+a.getDate():a.getDate();if("yyyy-mm"==t.toLowerCase())return"".concat(s,"-").concat(l);if("yyyy-mm-dd"==t.toLowerCase())return"".concat(s,"-").concat(l,"-").concat(n);var o=a.getHours()<10?"0"+a.getHours():a.getHours(),r=a.getMinutes()<10?"0"+a.getMinutes():a.getMinutes(),i=a.getSeconds()<10?"0"+a.getSeconds():a.getSeconds();return"".concat(s,"-").concat(l,"-").concat(n," ").concat(o,":").concat(r,":").concat(i)}}},f=h,g=(a("9f6f"),a("cba8")),v=Object(g["a"])(f,s,l,!1,null,"5ae70fa9",null);t["default"]=v.exports},"9f6f":function(e,t,a){"use strict";a("a523")},a523:function(e,t,a){}}]);