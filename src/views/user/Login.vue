<template>
  <div class="login">
    <header :class="{focus: onKeyboard}">
      <i class="iconfont icon-fanhui"></i>
      <span class="title">登录豆瓣</span>
    </header>
    <main>
      <h1 v-show="!onKeyboard">欢迎来到豆瓣</h1>
      <div class="form">
        <input v-model="userInfo.username" type="text" placeholder="手机号/邮箱">
        <input v-model="userInfo.password" type="password" placeholder="密码">
        <button @click="submit">登录</button>
      </div>
      <aside>
        <span @click="toRegister">注册豆瓣</span>
        <span @click="toFindPassword">忘记密码</span>
      </aside>
    </main>
    <!--<footer>
      <span>微信登录</span>
      <span>微博登录</span>
    </footer>-->
    <AlertModal :class="{ active: showAlert }" :message="validateMsg"></AlertModal>
  </div>
</template>

<script>
  import AlertModal from '@/components/popup/AlertModal.vue'
  import {validate} from '@/utils/validate'
  import {userLogin} from '@/utils/user'

  export default {
    name: 'Login',
    components: {
      AlertModal
    },
    data() {
      return {
        userInfo: {
          username: '',
          password: ''
        },
        onKeyboard: false,
        clientHeight: 0,
        validateMsg: '',
        showAlert: false
      }
    },
    methods: {
      openKeyboard() {
        const nowClientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        if (this.clientHeight > nowClientHeight) {
          this.onKeyboard = true;
        } else {
          this.onKeyboard = false;
        }
      },
      toRegister() {
        this.$router.push({path: '/register'})
      },
      toFindPassword() {
        this.$router.push({path: '/find-password'})
      },
      closeAlert() {
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false
        }, 3000)
      },
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
        let res = userLogin(this.userInfo);
        this.validateMsg = res.message;
        this.closeAlert();
        let self = this;
        if(res.status ===1){
          setTimeout(function () {
            self.$router.push({path: '/'})
          },3000)
        }
        let users = JSON.parse(localStorage.getItem('users'));
        console.log(users)
      }
    },
    mounted() {
      this.clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
      window.addEventListener('resize', this.openKeyboard)
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

    &.focus {
      border-bottom: 1px solid #f6f6f6;

      span {
        opacity: 1;
      }
    }
    span {
      display: inline-block;
      opacity: 0;
      transition: all 0.25s;
    }
    i {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 20px;
      margin: auto;
      color: @themColor;
    }
  }

  main {
    margin-left: 20px;
    margin-right: 20px;
    padding-top: 30px;

    h1 {
      margin: 20px 0 50px;
      text-align: center;
      color: @themColor;
      font-weight: normal;
    }
    .form {
      input {
        width: 100%;
        height: 2rem;
        box-sizing: border-box;
        margin-bottom: 20px;
        padding-left: 8px;
        border: none;
        border-bottom: 1px solid #ccc;
        outline: none;
      }
      button {
        width: 100%;
        height: 40px;
        margin-bottom: 20px;
        border: none;
        border-radius: 2px;
        background-color: @themColor;
        color: #fff;
        outline: none;
      }
    }
    aside {
      width: 100%;
      text-align: center;
      font-size: 0;

      span {
        display: inline-block;
        padding: 0 15px;
        font-size: 1rem;

        &:first-child {
          color: @themColor;
          border-right: 1px solid #ccc;
        }
      }
    }
  }
</style>
