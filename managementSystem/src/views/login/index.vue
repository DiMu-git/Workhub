<template>
  <div class="login-container" :style="login_bg">
    <div class="content_login">
      <div class="right_login" :style="right_login_bg">
        <div class="logoAndTitle">
          <img class="logo" src="@/assets/images/logo.png" alt="">
          <!-- <img class="title" src="@/assets/images/hj/hzgasfxt@2x.png" alt=""> -->
          <!-- <div class="title">workingshop</div> -->
          <div class="title">{{title}}</div>
        </div>
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
        <el-form-item prop="username">
          <!-- <span class="svg-container">
            <svg-icon icon-class="user" />
          </span> -->
          <span class="icon-container">
            <img src="@/assets/images/hj/accounts@2x.png" alt="">
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="Please enter the username"
            name="username"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>

        <el-tooltip v-model="capsTooltip" content="Caps" placement="right" manual>
          <el-form-item prop="password">
            <!-- <span class="svg-container">
              <svg-icon icon-class="password" />
            </span> -->
            <span class="icon-container">
              <img src="@/assets/images/hj/password@2x.png" alt="">
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="Password plz"
              name="password"
              tabindex="2"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
        </el-tooltip>
        <el-button :loading="loading" type="primary" round  style="width:100%;margin:30px 0px;"  @click.native.prevent="handleLogin">Login</el-button>
      </el-form>
      </div>
    </div>
  </div>
</template>

<script>
// import { validUsername } from '@/utils/validate'
// import SocialSign from './components/SocialSignin'

// import crypto from 'crypto'

const defaultSettings = require('@/settings.js')

export default {
  name: 'Login',
  // components: { SocialSign },
  data() {
    return {
      title:defaultSettings.title,
      loginForm: {
        username: 'admin',
        password: '888888'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: "Account cannot be null" }],
        password: [{ required: true, trigger: 'blur', message: "Password cannot be null" }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      // showDialog: false,
      redirect: undefined,
      otherQuery: {},
      login_bg:{
        backgroundImage: "url(" + require("@/assets/images/login_bg.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      },
      right_login_bg:{
        backgroundImage: "url(" + require("@/assets/images/tmbg-white.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      }
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    // Listen to whether case is turned on
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    // Show and hide passwords
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    // Login
    handleLogin() {
      // console.log(this.loginForm)
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('Failed')
          return false
        }
      })
    },
    // Obtain route parameters, record routes, and return to the corresponding route for login
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss">

// $bg:#283443;
$light_gray:#000;
$cursor: #000;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    // height: 47px;
    width: 83%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      // padding: 12px 5px 12px 15px;
      color: $light_gray;
      // height: 47px;
      caret-color: $cursor;
      &.el-input__inner{
        padding: 0px 10px;
      }
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #fff inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    // background: rgba(0, 0, 0, 0.1);
    border-radius: 22px;
    border: 1px solid #ECECEC;
    background: #fff;
    color: #454545;
    overflow: hidden;
  }

  // .nav{
  //   margin: 20px 0;
  //   text-align: center;
  //   .navTitle{
  //     display: inline-block;
  //     padding: 20px;
  //     color: #1890FF;
  //     border-bottom: 1px solid #1890FF;
  //   }
  // }
}
</style>

<style lang="scss" scoped>
// $bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#333;

.login-container {
  // background: #FEF4F2;
  min-height: 100%;
  height: 100vh;
  // width: 100%;
  // background-color: $bg;
  // overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center; 
  .content_login{
    display: flex;
    // width: 62.5%;
    box-shadow: 0px 0px 34px 0px rgba(212, 94, 63, 0.17);
    border-radius: 6px;
    overflow: hidden;
    // height: 640px;
    .left_login{
      width: 60%;
      background: #F5DAD3;
      padding: 6.983vw 12.5%;
      img{
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    .right_login{
      // width: 40%;
      padding: 0px 4.95vw;
      // background: #fff;

      .logoAndTitle{
        img{display: block;margin: 0 auto;}
        .logo{width: 64.1px;height: 63.1px;margin-top: 3vw;}
        .title{
          // width: 132px;
          // height: 16px;
          margin-top: 0.729vw;
          font-size: 22px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #E3693F;
          text-align: center;
        }
      }

      .login-form {
        position: relative;
        // width: 520px;
        max-width: 100%;
        // padding: 160px 35px 0;
        margin: 2.97vw auto;
        overflow: hidden;
      }

      // .tips {
      //   font-size: 14px;
      //   color: #000;
      //   margin-bottom: 10px;

      //   span {
      //     &:first-of-type {
      //       margin-right: 16px;
      //     }
      //   }
      // }
      .tip{
        color: #C3C3C3;
        line-height: 20px;
      }
      ::v-deep .el-form-item__content{
        display: flex;
      }
      .icon-container{
        padding: 0px 5px 0px 15px;
        // display: inline-block;
        line-height: 40px;
        width: 15%;
        display: flex;
        align-items: center;
        img{
          width: 16px;
          height: 18px;
        }
      }
      // .svg-container {
      //   padding: 0px 5px 0px 15px;
      //   color: $dark_gray;
      //   // vertical-align: middle;
      //   width: 17%;
      //   display: inline-block;
      // }
      
   
      .show-pwd {
        position: absolute;
        right: 10px;
        top: 3px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
      }

      // .thirdparty-button {
      //   position: absolute;
      //   right: 0;
      //   bottom: 6px;
      // }
    }
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
