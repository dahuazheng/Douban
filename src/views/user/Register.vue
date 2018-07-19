<template>
  <div class="login">
    <header>
      <router-link to="/login"><i class="iconfont icon-close"></i></router-link>
      <span class="title">注册豆瓣</span>
    </header>
    <main>
      <section class="register" v-show="show=='register'">
        <h1>欢迎加入豆瓣</h1>
        <div class="form">
          <input v-model="userInfo.username" type="text" placeholder="手机号 / 邮箱">
          <input v-model="userInfo.password" type="password" placeholder="密码（最少六位）">
          <input v-model="userInfo.nickname" type="text" placeholder="昵称">
        </div>
        <button @click="next">下一步</button>
        <aside @click="toAccountValidate">
          点击下一步代表你已阅读并同意<a href="#">用户使用协议</a>
        </aside>
      </section>
      <section class="account" v-show="show=='account'">
        <p>
          <label>接收验证码的{{ usernameLabel }}：</label>
          <span>{{ userInfo.username }}</span>
        </p>
        <div class="input-box">
          <input v-model="userCode" type="text" placeholder="验证码">
          <span @click="getCode">获取验证码</span>
        </div>
        <button @click="submit">提交</button>
      </section>
      <AlertModal :class="{ active: showAlert }" :message="validateMsg"></AlertModal>
    </main>
  </div>
</template>

<script>
  import AlertModal from '@/components/popup/AlertModal.vue'
  import {validate} from '@/utils/validate'
  import {getCode} from '@/utils/utils'
  import {userRegister} from '@/utils/user'

  export default {
    name: 'Register',
    components: {
      AlertModal
    },
    data() {
      return {
        userInfo: {
          username: '',
          password: '',
          nickname: ''
        },
        userCode: '',
        code: '',
        validateMsg: '',
        showAlert: false,
        show: 'register',
        timeOut: 0
      }
    },
    computed: {
      usernameLabel() {
        let reg = /^[0-9]+.?[0-9]*$/;
        if (reg.test(this.userInfo.username)) {
          return '手机'
        } else {
          return '邮箱'
        }
      }
    },
    methods: {
      next() {
        Object.keys(this.userInfo).some(item => {
          this.validateMsg = validate({
            label: item,
            value: this.userInfo[item]
          });
          return this.validateMsg !== '';
        });
        if (this.validateMsg) {
          this.closeAlert();
          return true;
        }
        this.toAccountValidate();
      },
      submit() {
        this.validateMsg = validate({
          label: 'code',
          value: this.userCode
        });
        if (this.validateMsg) {
          this.closeAlert();
          return true;
        }
        if (this.code !== this.userCode) {
          this.validateMsg = '验证码错误';
          this.closeAlert();
        } else {
          userRegister(this.userInfo);
          this.validateMsg = '注册成功，正在跳转';
          this.closeAlert();
          setTimeout(function () {
            this.$router.push({path: '/login'})
          }, 3000)
        }
      },
      closeAlert() {
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false
        }, 3000)
      },
      toAccountValidate() {
        this.show = 'account'
      },
      getCode() {
        if (this.timeOut <= 0) {
          this.code = getCode(6);
          this.validateMsg = this.code;
          this.timeOut = 60;
          this.closeAlert();
          this.codeStale()
        } else {
          this.validateMsg = this.code;
          this.closeAlert();
        }
      },
      codeStale() {
        if (this.timeOut <= 0) {
          return;
        }
        setTimeout(() => {
          this.timeOut--;
          this.codeStale()
        }, 1000)
      }
    },
    mounted() {

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import '../../assets/less/variables';

  .login {
    background-color: #fff;
  }

  header {
    position: relative;
    height: @headerHeight;
    box-sizing: border-box;
    text-align: center;
    line-height: @headerHeight;
    font-size: @headerFont;

    i {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 20px;
      margin: auto;
      color: @themColor;
      font-weight: bold;
    }
  }

  main {
    margin-left: 20px;
    margin-right: 20px;

    .register {
      h1 {
        text-align: center;
        color: @themColor;
        font-weight: normal;
      }
      .form {
        margin-bottom: 15px;
        border: 1px solid #ccc;
        border-radius: 3px;
        input {
          width: 100%;
          height: 36px;
          box-sizing: border-box;
          padding-left: 8px;
          padding-right: 8px;
          border: none;
          border-bottom: 1px solid #ccc;
          outline: none;

          &:last-child {
            border-bottom: none;
          }
        }
      }
      button {
        width: 100%;
        height: 40px;
        margin-bottom: 10px;
        border: none;
        border-radius: 2px;
        background-color: @themColor;
        color: #fff;
        outline: none;
      }
      aside {
        width: 100%;
        text-align: center;
        color: #999;
        a {
          color: #999;
        }
      }
    }
    .account {
      p {
        color: #666;
      }
      .input-box {
        position: relative;
        width: 100%;
        margin-bottom: 15px;
        box-sizing: border-box;
        height: 36px;
        border: 1px solid #ccc;
        border-radius: 2px;

        input {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          padding: 0 8px;
          border: none;
        }
        span {
          position: absolute;
          top: 0;
          right: 8px;
          bottom: 0;
          margin: auto;
          line-height: 36px;
          color: @themColor;
        }
      }
      button {
        width: 100%;
        height: 36px;
        border: none;
        border-radius: 2px;
        background-color: @themColor;
        color: #fff;
      }
    }
  }
</style>
