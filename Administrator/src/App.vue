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

//默认模态框样式
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

  // 下拉菜单样式
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

  // .el-scrollbar{
  //   .el-submenu__title{
  //     font-size: 16px;
  //   }
  //   .el-submenu__title i{
  //     color:#FFFFFF
  //   }
  //  .el-submenu .el-menu-item:hover{
  //    color: #FFFFFF!important;
  //    font-weight: bolder;
  //  }
  // //  .el-submenu:hover{
  // //    background: #CB5A3C;
  // //  }
  // }

  // #app .sidebar-container .el-submenu .el-menu-item{
  //   border-radius: 100px 0px 0px 100px;
  //   overflow: hidden;
  //   height: 40px;
  //   line-height: 40px;
  //   text-align: center;
  //   padding-left: 22px!important;
  // }
  // #app .sidebar-container .el-submenu .el-menu-item.is-active{
  //     // width: 190px;
  //     // height: 40px;
  //     background-color: #FFFFFF!important;
  //     border-radius: 100px 0px 0px 100px;
  //     overflow: hidden;
  //     display: inline-block;
  //     color: $orange!important;
  //     font-weight: bolder;
  //  }
  //  #app .sidebar-container a{
  //    padding-left: 10px;
  //  }
  //  .el-scrollbar .el-submenu__title{
  //     padding: 0px 32px;
  //     // margin: 0 20px;
  //     display: flex;
  //     align-items: center;
  //     justify-content: center;
  //     .border_bottom{
  //       width: 78%;
  //       border-bottom: 1px solid #EBEBEB;
  //       margin-bottom: 5px;
  //       display: flex;
  //       align-items: center;
  //     }
  //     .el-submenu__icon-arrow{
  //       right: 50px;
  //     }
  //  }
  //  #app .sidebar-container .svg-icon{
  //     top: 1px;
  //     margin-right: 9px;
  //     width: 18px;
  //     height: 18px;
  //  }
  //  #app .hideSidebar{
  //   .el-scrollbar .el-submenu__title .border_bottom{
  //     width: 108%;
  //     display: inline-block;
  //     .svg-icon,.sub-el-icon{
  //       margin-right: 20px;
  //     }
  //   }
  //   .sidebar-logo-container{
  //     height: 50px;
  //   }
  //  }

  // .el-dialog__headerbtn:hover .el-dialog__close{color:#262729}

</style>