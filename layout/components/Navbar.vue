<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <div class="leftTitle">{{title}}</div>

    <!-- <breadcrumb id="breadcrumb-container" class="breadcrumb-container" /> -->

    <div class="right-menu">
      <!-- <template v-if="device!=='mobile'"> -->
        <!-- <search id="header-search" class="right-menu-item" /> -->

        <!-- <error-log class="errLog-container right-menu-item hover-effect" /> -->

        <!-- <screenfull id="screenfull" class="right-menu-item hover-effect" /> -->


        <!-- <el-tooltip content="Global Size" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip> -->

      <!-- </template> -->


      <!-- <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>回首页</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->

      <div class="rightMenu">
        <div class="rightMenuItem headPic" >
          <!-- <img src="@/assets/images/hj/avatar.png" alt=""> -->
          <!-- <img src="data:image/png;base64,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" alt=""> -->

          <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'"> -->
        </div>
        <!-- <div class="rightMenuItem roleName">{{roles[0]}}</div> -->
        
        <el-dropdown trigger="click" style="cursor: pointer;" @command="handleCommand">
          <span class="el-dropdown-link" style="color:#555555;font-size:12px;">
            {{userInfo.realName || "未设置"}}
            <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-key" command="1">修改密码</el-dropdown-item>
            <el-dropdown-item icon="el-icon-switch-button" @click="logout" command="2">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <!-- <div class="rightMenuItem logout" @click="logout">退出</div> -->
      </div>
    </div>

    <el-dialog title="修改密码" width="480px" :visible.sync="visible" center class="defaultDialog" :close-on-click-modal="false" :close-on-press-escape="false">
				<el-form :model="msg" size="small" label-width="100px">
					<!-- <el-row > -->
            <!-- <el-col :span="24"> -->
              <el-form-item label="原密码">
                <el-input v-model="msg.oldPass" placeholder="请输入原密码" style="width:240px"></el-input>
              </el-form-item>
              <el-form-item label="新密码">
                <el-input v-model="msg.newPass" placeholder="请输入新密码" style="width:240px"></el-input>
              </el-form-item>
            <!-- </el-col> -->
					<!-- </el-row> -->
          <!-- <el-row > -->
            <el-form-item label="再次输入">
              <el-input v-model="againNewPass" placeholder="请再次输入新密码" style="width:240px"></el-input>
            </el-form-item>
					<!-- </el-row> -->
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button size="small" @click="visible = false">取 消</el-button>
					<el-button size="small" type="primary" @click="save()">保 存</el-button>
				</div>
			</el-dialog>
  </div>
</template>

<script>
const defaultSettings = require('@/settings.js')

import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
// import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'

import {changePassword} from 'api/user'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    // SizeSelect,
    Search
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device',
      'roles',
      'userInfo',
    ])
  },
  data() { 
    return{
      visible:false,
      msg:{
        oldPass:"",
        newPass:"",
        uuid:"",
      },
      againNewPass:"",
      title:defaultSettings.title
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    logout(){
      this.$store.dispatch('user/resetToken').then(() => {
        this.$router.push(`/login`)
        // location.reload()
      })
    },
    handleCommand(command){
      if(command == 1){
        this.msg={
          oldPass:"",
          newPass:"",
          uuid:"",
        },
        this.againNewPass="",

        this.visible=true;
      }
      if(command == 2){
        this.logout();
      }
    },
    save(){
      let bean = JSON.parse(JSON.stringify(this.msg))

      if(!bean.oldPass){
        this.$message({
          message: "请输入原密码",
          type: 'warning'
        });
        return
      }
      if(!bean.newPass){
        this.$message({
          message: "请输入新密码",
          type: 'warning'
        });
        return
      }
      if(!this.againNewPass){
        this.$message({
          message: "请再次输入新密码",
          type: 'warning'
        });
        return
      }
      if(this.userInfo.password != bean.oldPass){
        this.$message({
          message: "原密码错误",
          type: 'warning'
        });
        return
      }

      if(bean.oldPass == bean.newPass){
        this.$message({
          message: "新密码与旧密码一致，请重新填写",
          type: 'warning'
        });
        return
      }
      
      if(this.againNewPass != bean.newPass){
        this.$message({
          message: "请两次新密码不一致,重新输入",
          type: 'warning'
        });
        return
      }
      
      changePassword({id:this.userInfo.id,password:bean.newPass}).then((res)=>{
          
          if(res.code == 0){
            this.$message({
              message: res.data,
              type: 'success'
            });
            this.visible = false
          }
        })
    }
    // async logout() {
    //   await this.$store.dispatch('user/logout')
    //   this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    // }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 60px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .leftTitle{
    width: 90px;
    height: 60px;
    line-height: 60px;
    display: inline-block;
    font-size: 22px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #E3693F;
    // color: #FFFFFF;
    // background: linear-gradient(360deg, #D33333 0%, #F29949 100%);
    // -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
    // float: left;
  }
  .hamburger-container {
    line-height: 60px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    // line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }


    .rightMenu{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      margin-right: 50px;
      .rightMenuItem{
        margin: 0 5px;
        height: auto;
      }
      .headPic{
        img{
          cursor: pointer;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid #E5E5E5;
          padding: 1px;
        }
      }
      .roleName{
        color: #555555;
      }
      .logout{
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        width: 50px;
        height: 24px;
        line-height: 22px;
        text-align: center;
        border-radius: 16px;
        border: 1px solid #E05D1C;
        color: #E05D1C;
        cursor: pointer;
      }
    }
    
    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
