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
        <button @click="submit">下一步</button>
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
          <input v-model="code" type="text" placeholder="验证码">
          <span @click="getCode">获取验证码</span>
        </div>
        <button>提交</button>
      </section>
      <AlertModal :class="{ active: showAlert }" :message="validateMsg"></AlertModal>
    </main>
  </div>
</template>

<script>
  import AlertModal from '@/components/popup/AlertModal.vue'
  import {validate} from '@/utils/validate'
  import {getCode} from '@/utils/utils'


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
        code: '',
        validateMsg: '',
        showAlert: false,
        show: 'register'
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
      submit() {
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
        let code = getCode(6);
        console.log(code)
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
