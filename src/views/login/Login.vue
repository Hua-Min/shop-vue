<template>
  <div class="login-container">
    <!--登录面板内容部分-->
    <div class="login-inner">
      <!--面板头部-->
      <div class="login-header">
        <div class="login-logo">
          <img src="./images/logo.jpg" alt width="300" />
        </div>
        <!--面板标题-->
        <div class="login-header-title">
          <a :class="{current:this.ifShow}" @click.prevent="changeIfShow">手机登录</a>
          <a :class="{current:!this.ifShow} " @click.prevent="changeIfShow">密码登录</a>
        </div>
      </div>
      <!--面板表单部分-->
      <div class="login-content">
        <form>
          <!--手机验证码登录部分-->
          <div :class="{current:this.ifShow}">
            <section class="login-message">
              <input
                autofocus="autofocus"
                type="tel"
                maxlength="11"
                placeholder="手机号"
                v-model="phone"
              />

              <button
                v-if="!this.countDown"
                class="get-verification"
                :class="{phone_right: phoneRight}"
                @click.prevent="getVerifyCoode"
              >获取验证码</button>
              <button v-else disabled="disabled" class="get-verification">已发送({{this.countDown}}s)</button>
            </section>
            <section class="login-verification">
              <input type="number" maxlength="8" placeholder="验证码" v-model="code" />
            </section>
            <section class="login-hint">
              温馨提示：未注册手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">服务协议与隐私政策</a>
            </section>
          </div>
          <!--账号登录部分-->
          <div :class="{current:!this.ifShow}">
            <section>
              <section class="login-message">
                <input type="tel" maxlength="11" placeholder="用户名" v-model="userName" />
              </section>
              <section class="login-verification">
                <input
                  type="password"
                  v-if="pwdModel"
                  maxlength="20"
                  placeholder="密码"
                  v-model="userPwd"
                  autocomplete="off"
                />
                <input
                  type="text"
                  v-else
                  maxlength="20"
                  placeholder="密码"
                  v-model="userPwd"
                  autocomplete="off"
                />

                <div class="switch-show">
                  <img
                    src="./images/hide_pwd.png"
                    @click.prevent="delPwdModel(true)"
                    :class="{on:!pwdModel}"
                    alt
                    width="20"
                  />
                  <img
                    src="./images/show_pwd.png"
                    @click.prevent="delPwdModel(false)"
                    :class="{on:pwdModel}"
                    alt
                    width="20"
                  />
                </div>
              </section>
              <section class="login-message">
                <input type="text" maxlength="4" placeholder="验证码" v-model="captcha" />
                <img
                  class="get-verification"
                  ref="captcha"
                  @click.prevent="getCaptcha"
                  alt="captcha"
                />
              </section>
            </section>
          </div>
          <button class="login-submit" @click.prevent="login">登录</button>
        </form>
        <button class="login-back" @click.prevent="$router.back()">返回</button>
      </div>
    </div>
  </div>
</template>
<script>
import { getPhoneCode, phoneCodeLogin, pwdLogin } from "./../../serve/index";
import { Toast } from "vant";
import { mapActions } from "vuex";
export default {
  name: "login",
  data() {
    return {
      ifShow: true,
      phone: null,
      countDown: null,
      code: null,

      //账号密码登陆
      userName: null,
      userPwd: null,
      pwdModel: true,
      captcha: null
    };
  },
  computed: {
    phoneRight() {
      return /^[1][3,5,7,9][0-9]{9}$/.test(this.phone);
    }
  },
  methods: {
    ...mapActions(["syncUserInfo"]),
    changeIfShow() {
      this.ifShow = !this.ifShow;
      this.getCaptcha();
    },
    //获取短信验证码
    async getVerifyCoode() {
      //test
      if (this.phoneRight) {
        this.countDown = 5;
        let timer = setInterval(() => {
          this.countDown--;
          if (this.countDown === 0) {
            clearInterval(timer);
          }
        }, 1000);
        let result = await getPhoneCode(this.phone);
        console.log(result);
      } else {
        Toast({ message: "请输入正确的手机号", duration: 500 });
      }
    },
    //点击登陆按钮
    async login() {
      //手机登陆
      if (this.ifShow) {
        //  输入数据校验
        if (!this.phone) {
          Toast({
            message: "请输入手机号码",
            duration: 500
          });
          return;
        } else if (!this.phoneRight) {
          // 手机号码不正确
          Toast({
            message: "请输入正确的手机号码",
            duration: 500
          });
          return;
        }

        if (!this.code.trim()) {
          Toast({
            message: "请输入验证码",
            duration: 500
          });
          return;
        } else if (!/^\d{6}$/gi.test(this.code)) {
          // 验证码不正确
          Toast({
            message: "请输入正确的验证码",
            duration: 500
          });
          return;
        }

        //提交登陆信息 并验证
        let result = await phoneCodeLogin(this.phone, this.code);
        console.log(result);
        if (result.success_code === 200) {
          //  保存用户信息
          this.syncUserInfo(result.data);
          // 回到主面板
          this.$router.back();
        } else {
          Toast({
            message: "登录失败，手机号码或者验证码不正确！",
            duration: 500
          });
        }
      } else {
        //账号密码登陆
        //  输入数据校验(可扩展)
        if (!this.userName) {
          Toast({
            message: "请输入用户名",
            duration: 500
          });
          return;
        }

        if (!this.userPwd.trim()) {
          Toast({
            message: "请输入密码",
            duration: 500
          });
          return;
        }
        if (!this.captcha.trim()) {
          Toast({
            message: "请输入密码",
            duration: 500
          });
          return;
        }

        let result = await pwdLogin(this.userName, this.userPwd, this.captcha);
        if (result.success_code === 200) {
          //保存用户信息
          this.syncUserInfo(result.data);
          //回到主面板
          this.$router.back();
        } else {
          console.log(result);
          Toast({
            message: "登录失败，用户名或者密码不正确！",
            duration: 500
          });
        }
      }
    },
    //密码是否显示
    delPwdModel(flag) {
      this.pwdModel = flag;
    },
    //获取随机验证码
    getCaptcha() {
      this.$set(
        this.$refs.captcha,
        "src",
        "http://demo.itlike.com/web/xlmc/api/captcha?time=" + new Date()
      );
    }
  }
};
</script>
<style lang="less" scoped>
.login-container,
.login {
  width: 100%;
  height: 100%;
  background: #fff;
}

.login-container .login-inner {
  padding-top: 60px;
  width: 80%;
  margin: 0 auto;
}

.login-container .login-inner .login-header .login-logo {
  font-size: 40px;
  font-weight: bold;
  color: #9370db;
  text-align: center;
}

.login-container .login-inner .login-header .login-header-title {
  padding-top: 40px;
  padding-bottom: 10px;
  text-align: center;
}

.login-container .login-inner .login-header .login-header-title > a {
  color: #333;
  font-size: 14px;
  padding-bottom: 4px;
}

.login-container
  .login-inner
  .login-header
  .login-header-title
  > a:first-child {
  margin-right: 40px;
}

.login-container .login-inner .login-header .login-header-title > a.current {
  color: #9370db;
  font-weight: 700;
  border-bottom: 2px solid #9370db;
}

.login-container .login-inner .login-content > form > div {
  display: none;
}

.login-container .login-inner .login-content > form > div.current {
  display: block;
}

.login-container .login-inner .login-content > form > div input {
  width: 100%;
  height: 100%;
  padding-left: 8px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: 0;
  font: 400 14px Arial;
}

.login-container .login-inner .login-content > form > div input:focus {
  border: 1px solid #9370db;
}

.login-container .login-inner .login-content > form > div .login-message {
  position: relative;
  margin-top: 16px;
  height: 48px;
  font-size: 14px;
  background: #fff;
}

.login-container
  .login-inner
  .login-content
  > form
  > div
  .login-message
  .get-verification {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  border: 0;
  color: #ccc;
  font-size: 14px;
  background: transparent;
}

.login-container
  .login-inner
  .login-content
  > form
  > div
  .login-message
  .get-verification.phone_right {
  color: #800080;
}

.login-container .login-inner .login-content > form > div .login-verification {
  position: relative;
  margin-top: 16px;
  height: 48px;
  font-size: 14px;
  background: #fff;
}

.login-container
  .login-inner
  .login-content
  > form
  > div
  .login-verification
  .switch-show {
  position: absolute;
  right: 10px;
  top: 12px;
}

.login-container
  .login-inner
  .login-content
  > form
  > div
  .login-verification
  .switch-show
  img {
  display: none;
}

.login-container
  .login-inner
  .login-content
  > form
  > div
  .login-verification
  .switch-show
  img.on {
  display: block;
}

.login-container .login-inner .login-content > form > div .login-hint {
  margin-top: 12px;
  color: #999;
  font-size: 12px;
  line-height: 20px;
}

.login-container .login-inner .login-content > form > div .login-hint > a {
  color: #9370db;
}

.login-container .login-inner .login-content > form .login-submit {
  display: block;
  width: 100%;
  height: 42px;
  margin-top: 30px;
  border-radius: 4px;
  background: #9370db;
  color: #fff;
  text-align: center;
  font-size: 16px;
  line-height: 42px;
  border: 0;
}

.login-container .login-inner .login-content .login-back {
  display: block;
  width: 100%;
  height: 42px;
  margin-top: 15px;
  border-radius: 4px;
  background: transparent;
  border: 1px solid #9370db;
  color: #9370db;
  text-align: center;
  font-size: 16px;
  line-height: 42px;
}
</style>