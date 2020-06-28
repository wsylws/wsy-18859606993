<template>
  <section class="login">
    <el-header class="theader">
      <div class="bg-white">
        <a href="javascript:;" class="logo-box">
          <!-- <img class="logo" :src="require('@/admin/assets/images/logo-white.png')" alt /> -->
          <span>电销APP管理后台</span>
        </a>
      </div>
    </el-header>
    <!--用户登录-->
    <section class="login-wrap">
      <div class="login-box">
        <!-- <img class="login-img" :src="require('@/admin/assets/images/bg-1.png')" alt /> -->
        <!-- <div class="pull-left"></div> -->
        <div class="pull-right">
          <h3 class="my-20-text">
            <b>登录</b>
          </h3>
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-width>
            <el-form-item label prop="LoginId" :error="errorMsgid">
              <el-input placeholder="请输入手机号" v-model="loginForm.LoginId">
                <i slot="prefix" class="el-input__icon el-icon-user"></i>
              </el-input>
            </el-form-item>
            <el-form-item label prop="LoginPwd" :error="errorMsgpwd">
              <el-input
                placeholder="请输入密码"
                :type="!pwEnable?'password':'text'"
                v-model="loginForm.LoginPwd"
                @keyup.enter.native="handleLogin"
                class="eye"
              >
                <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                <i slot="suffix" class="eyes1" @click="pwEnable=!pwEnable" v-if="pwEnable"></i>
                <i slot="suffix" class="eyes2" @click="pwEnable=!pwEnable" v-else></i>
              </el-input>
            </el-form-item>
            <el-form-item label>
              <el-button type="primary" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
            </el-form-item>
          </el-form>
          <!-- <el-checkbox>请保存我这次的登录信息</el-checkbox> -->
        </div>
        <div class="clear"></div>
      </div>
    </section>
    <!-- <page-footer></page-footer> -->
  </section>
</template>
<script>
import { mapState } from "vuex";
import { setToken } from "../libs/auth";
import md5 from 'js-md5';
export default {
  data() {
    return {
      loginForm: {
        LoginId: "",
        LoginPwd: ""
      },
      loginRules: {
        LoginId: [
          { required: true, trigger: "blur", message: "请输入登录账户" }
        ],
        LoginPwd: [
          { required: true, trigger: "blur", message: "请输入登录密码" }
        ]
      },
      loading: false,
      pwEnable: false,
      errorMsgid: "", // 登录失败设置错误提示
      errorMsgpwd: ""
    };
  },
  computed: {
    ...mapState({
      ossUrl: state => state.ossUrl
    })
  },
  mounted() {
    this.getCookie();
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          try {
            this.setCookie(this.loginForm.LoginId, this.loginForm.LoginPwd, 30); // 保存期限为30天
            this.loading = true;
            let result = await this.$store.dispatch("postData", {
              url: "/api/v3/user/login",
              data: {
                loginName: this.loginForm.LoginId,
                passwordMd5: md5(this.loginForm.LoginPwd)
              }
            });
            console.log(result);
            if (result) {
              setToken("token", result.data);
              this.$store.dispatch("setUser", result.data);
              this.go('product/index');
            }
          } catch (e) {
            this.loading = false;
            this.$error(e.message);
          }
        }
      });
    },
    // 设置Cookie
    setCookie(username, password, exdays) {
      // 用户名, 密码, 保存天数
      let exdate = new Date(); // 获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays);
      // 字符串拼接cookie
      window.document.cookie =
        "userName=" + username + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "userPwd=" + password + ";path=/;expires=" + exdate.toGMTString();
    },
    // 读取Cookie
    getCookie() {
      if (document.cookie.length > 0) {
        let arr = document.cookie.split("; "); // 这里显示的格式需要切割一下自己可输出看下
        for (let i = 0; i < arr.length; i++) {
          let arr2 = arr[i].split("="); // 再次切割
          // 判断查找相对应的值
          if (arr2[0] === "userName") {
            this.loginForm.LoginId = arr2[1]; // 保存到保存数据的地方
          } else if (arr2[0] === "userPwd") {
            this.loginForm.LoginPwd = arr2[1];
          }
        }
      }
    }
  }
}
</script>
<style lang="less" type="text/less">
@bg: #2d3a4b;
@light_gray: #eee;
@dark_gray: #889aa4;
.login-box {
  position: relative;
  background: url("../assets/images/bg-1.png") no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100vh;
  .pull-right {
    height: 60vh !important;
    width: 450px;
    position: absolute;
    right: 20%;
    top: 50%;
    transform: translateY(-50%);
    box-shadow: 0px 2px 10px 0px rgba(184, 202, 255, 1);
  }
}
.login .theader {
  height: 60px;
  padding-top: 0;
  position: absolute;
  top: 30px;
  left: 30px;
}
.logo-box {
  .logo {
    width: 40px;
    height: 50px;
  }
  span {
    color: #333;
  }
}
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: @bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 360px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
    .el-form-item__label {
      color: @light_gray;
      font-size: 18px;
    }
    input {
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: @light_gray;
      background: transparent;
      -webkit-appearance: none;
    }
    .el-form-item.is-success .el-input__inner {
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: @light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: @dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>