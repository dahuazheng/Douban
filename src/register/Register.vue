<template>
  <div class="login">
    <header>
      <router-link to="/login"><i class="iconfont icon-close"></i></router-link>
      <span class="title">注册豆瓣</span>
    </header>
    <main>
      <h1>欢迎加入豆瓣</h1>
      <div class="form">
        <input v-model="userInfo.username" type="text" placeholder="手机号 / 邮箱">
        <input v-model="userInfo.password" type="password" placeholder="密码（最少六位）">
        <input v-model="userInfo.nickname" type="text" placeholder="昵称">
      </div>
      <button @click="submit">下一步</button>
      <aside>
        点击下一步代表你已阅读并同意<a href="#">用户使用协议</a>
      </aside>
    </main>
  </div>
</template>

<script>
  import {validate} from '@/utils/validate'

  export default {
    name: 'Register',
    data() {
      return {
        userInfo: {
          username: '',
          password: '',
          nickname: ''
        }
      }
    },
    methods: {
      onFocus(value) {

      },
      onBlur(value) {

      },
      submit() {
        Object.keys(this.userInfo).some(item => {
          let meg = validate({
            label: item,
            value: this.userInfo[item]
          });
          console.log(meg);
          return meg !== '';
        });

        console.log(this.userInfo)
      }


    },
    mounted() {

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import '../assets/less/variables';

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
</style>
