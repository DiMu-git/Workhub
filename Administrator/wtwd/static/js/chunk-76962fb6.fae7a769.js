(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-76962fb6"],{"25ec":function(e,t,a){"use strict";a.d(t,"c",(function(){return n})),a.d(t,"a",(function(){return r})),a.d(t,"b",(function(){return i}));var l=a("b775");a("7733");function n(e){return Object(l["a"])({url:"/param/find",method:"post",data:e})}function r(e){return Object(l["a"])({url:"/param/edit",method:"post",data:e})}function i(e){return Object(l["a"])({url:"/param/del",method:"post",data:e})}},"9a9e":function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"search_container"},[a("el-form",{staticClass:"searchformContent",attrs:{model:e.searchParams,inline:!0,"label-width":"70px",size:"small"}},[a("el-row",[a("el-form-item",{attrs:{label:"字段名称"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择字段名称",clearable:"",filterable:""},model:{value:e.searchParams.type,callback:function(t){e.$set(e.searchParams,"type",t)},expression:"searchParams.type"}},e._l(e.fieldNameList,(function(e){return a("el-option",{key:e.type,attrs:{label:e.value,value:e.type}})})),1)],1)],1),a("el-row",[a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.search()}}},[e._v("查询")]),a("el-button",{attrs:{type:"success"},on:{click:function(t){return e.add()}}},[e._v("新建")]),a("el-button",{attrs:{type:"warning"},on:{click:function(t){return e.edit()}}},[e._v("编辑")]),e.userInfo.level>1?a("el-button",{attrs:{type:"danger"},on:{click:function(t){return e.del()}}},[e._v("删除")]):e._e()],1)],1)],1)],1),a("div",{staticClass:"table_container"},[a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.tableData,"tooltip-effect":"dark",size:"medium","header-cell-style":{textAlign:"center",color:"#fff",background:"#CFC39F",padding:"6px 0px"},"cell-style":{textAlign:"center"}},on:{"row-click":e.clickRow,"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",fixed:"",width:"50px"}}),a("el-table-column",{attrs:{label:"序号",type:"index",fixed:"",width:"50px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s((e.pageNo-1)*e.pageSize+t.$index+1))])]}}])}),a("el-table-column",{attrs:{prop:"type",label:"字段名称"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.type?e.fieldNameList[t.row.type-1].value:"--"))]}}])}),a("el-table-column",{attrs:{prop:"value",label:"候选值"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.value?t.row.value:"--"))]}}])}),a("el-table-column",{attrs:{prop:"valueType",label:"候选值绑定值"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.valueType?t.row.valueType:"--"))]}}])}),a("el-table-column",{attrs:{prop:"remark",label:"备注"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.remark?t.row.remark:"--"))]}}])}),a("el-table-column",{attrs:{prop:"createDate",label:"创建时间",width:"150px"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(e._f("dateFormat")(t.row.createDate))+" ")]}}])})],1),a("div",{staticClass:"pageContent"},[a("el-pagination",{attrs:{background:"","page-sizes":[10,25,50,100],layout:"total,sizes,prev, pager, next","current-page":e.pageNo,"page-size":10,total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),a("el-dialog",{staticClass:"defaultDialog",attrs:{title:"详情页",visible:e.visible,center:"","close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(t){e.visible=t}}},[a("el-form",{ref:"ruleForm",attrs:{model:e.msg,size:"small",rules:e.rules,"label-width":e.formLabelWidth}},[a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"字段名称",prop:"type"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择字段名称",clearable:"",filterable:""},model:{value:e.msg.type,callback:function(t){e.$set(e.msg,"type",t)},expression:"msg.type"}},e._l(e.fieldNameList,(function(e){return a("el-option",{key:e.type,attrs:{label:e.value,value:e.type}})})),1)],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"候选值",prop:"value"}},[a("el-input",{attrs:{placeholder:"请输入候选值"},model:{value:e.msg.value,callback:function(t){e.$set(e.msg,"value",t)},expression:"msg.value"}})],1)],1)],1),7==e.msg.type?a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"开户行",prop:"valueType"}},[a("el-input",{attrs:{placeholder:"请输入开户行"},model:{value:e.msg.valueType,callback:function(t){e.$set(e.msg,"valueType",t)},expression:"msg.valueType"}})],1)],1)],1):e._e(),a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"备注",prop:"remark"}},[a("el-input",{attrs:{placeholder:"请输入备注"},model:{value:e.msg.remark,callback:function(t){e.$set(e.msg,"remark",t)},expression:"msg.remark"}})],1)],1)],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small"},on:{click:function(t){e.visible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(t){return e.save("ruleForm")}}},[e._v("保 存")])],1)],1)],1)])},n=[],r=a("cc64"),i=(a("ba49"),a("39dd"),a("55b1"),a("3946"),a("6054"),a("52c1")),o=a("25ec"),s={name:"DataDictionary",components:{},computed:Object(r["a"])({},Object(i["b"])(["userInfo"])),data:function(){return{visible:!1,tableData:[],multipleSelection:[],msg:{},formLabelWidth:"100px",pageNo:1,pageSize:10,total:0,searchParams:{pageNo:1,pageSize:10,type:""},rules:{type:[{required:!0,message:"请选择字段名称",trigger:"blur"}],value:[{required:!0,message:"候选值不能为空",trigger:"blur"}]},fieldNameList:[{type:"1",value:"产品名称",remark:""},{type:"2",value:"公司名称",remark:""},{type:"3",value:"付款单位",remark:""},{type:"4",value:"收款单位",remark:""},{type:"5",value:"支付方式",remark:""},{type:"6",value:"车牌号",remark:""},{type:"7",value:"账号",remark:"对公/对私"},{type:"8",value:"规格高",remark:""},{type:"9",value:"规格长",remark:""},{type:"10",value:"单位",remark:""},{type:"11",value:"名称描述",remark:""},{type:"12",value:"尺寸",remark:""}]}},methods:{init:function(){var e=this;this.searchParams.pageNo=this.pageNo,this.searchParams.pageSize=this.pageSize,Object(o["c"])(this.searchParams).then((function(t){var a=t.data;e.tableData=a.content,e.total=a.totalElements}))},add:function(){var e=this;this.reset().then((function(t){e.visible=!0}))},edit:function(){if(1==this.multipleSelection.length){var e=this.multipleSelection[0];this.msg=JSON.parse(JSON.stringify(e)),this.visible=!0}else this.$alert("","请选择一条数据",{confirmButtonText:"确定"})},del:function(){var e=this;if(0!=this.multipleSelection.length){for(var t=[],a=!1,l=0;l<this.multipleSelection.length;l++)t.push(this.multipleSelection[l].id),"5"==this.multipleSelection[l].type&&(a=!0);a?this.$confirm("删除数据中有支付方式，删除后会影响已经选择过的数据，是否继续？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){Object(o["b"])(t).then((function(a){if(0==a.code){e.$message({message:"删除成功",type:"success"});var l=Math.ceil((e.total-t.length)/e.pageSize),n=e.pageNo>l?l:e.pageNo;return e.pageNo=n<1?1:n,void e.init()}}))})).catch((function(){e.$message({type:"info",message:"已取消"})})):this.$confirm("确认删除该数据？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){Object(o["b"])(t).then((function(a){if(0==a.code){e.$message({message:"删除成功",type:"success"});var l=Math.ceil((e.total-t.length)/e.pageSize),n=e.pageNo>l?l:e.pageNo;return e.pageNo=n<1?1:n,void e.init()}}))})).catch((function(){e.$message({type:"info",message:"已取消"})}))}else this.$alert("","请选择删除的数据",{confirmButtonText:"确定"})},save:function(e){var t=this;this.$refs[e].validate((function(e){e&&Object(o["a"])(t.msg).then((function(e){if(0==e.code)return t.$message({message:"保存成功",type:"success"}),t.visible=!1,void t.init()}))}))},handleSizeChange:function(e){this.pageSize=e,this.init()},handleCurrentChange:function(e){this.pageNo=e,this.init()},clickRow:function(e){this.$refs.multipleTable.toggleRowSelection(e)},handleSelectionChange:function(e){this.multipleSelection=e},search:function(){this.pageNo=1,this.init()},reset:function(){var e=this;return new Promise((function(t,a){Promise.all([]).then((function(a){e.msg={type:"",value:"",valueType:"",remark:""},t("reset 成功了")})).catch((function(e){console.log(e)}))}))}},created:function(){var e=this;this.reset().then((function(){e.init()}))},filters:{dateFormat:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";if(!e)return"--";var a=new Date(e),l=a.getFullYear(),n=a.getMonth()+1<10?"0"+(a.getMonth()+1):a.getMonth()+1,r=a.getDate()<10?"0"+a.getDate():a.getDate();if("yyyy-mm"==t.toLowerCase())return"".concat(l,"-").concat(n);if("yyyy-mm-dd"==t.toLowerCase())return"".concat(l,"-").concat(n,"-").concat(r);var i=a.getHours()<10?"0"+a.getHours():a.getHours(),o=a.getMinutes()<10?"0"+a.getMinutes():a.getMinutes(),s=a.getSeconds()<10?"0"+a.getSeconds():a.getSeconds();return"".concat(l,"-").concat(n,"-").concat(r," ").concat(i,":").concat(o,":").concat(s)}}},c=s,u=a("cba8"),p=Object(u["a"])(c,l,n,!1,null,"bef711d8",null);t["default"]=p.exports}}]);