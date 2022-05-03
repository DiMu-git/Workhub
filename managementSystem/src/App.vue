<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
.app-main{
  background: #f5f5f5;
  font-family: PingFangSC-Regular, PingFang SC;
  padding: 20px;
}

.el-table th.gutter {
  display: table-cell!important;
}
.table_container{
  background: #fff;
  border-radius:14px;
  overflow: hidden;
  .pageContent{
    text-align: right;
    margin: 20px 0px;
  }
  .el-table__body{
    font-size: 12px;
  }
}

//Default modal style
.defaultDialog{
  .el-dialog{
    border-radius: 10px;
    overflow: hidden;
    .el-dialog__header{
      padding: 0px;
      font-size: 14px;
      line-height: 42px;
      color: #fff;
      background: $orange;
      .el-dialog__title{
        color: #fff;
        font-size: 14px;
      }
      .el-dialog__headerbtn{
        top: 12px;
      }
    }
  }
  .el-dialog--center .el-dialog__body{
    padding:20px 30px 0px 30px;
  }
  .el-form-item__label{
    font-size: 12px;
    color: #555555;
  }

  // dropdown menu style
  .el-dropdown{
    display: block;
  }
}

#app .sidebar-container .el-menu-item{
  display: flex;
  align-items: center;
  .svg-icon{
    font-size: 16px;
  }
}

</style>