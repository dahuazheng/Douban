<template>
  <div class="find-password">
    <header>
      <router-link to="/login"><i class="iconfont icon-close"></i></router-link>
      <span class="title">找回密码</span>
    </header>
    <main>

      <div class="form">
        <div class="input-box">
          <input v-model="userInfo.username" type="text" placeholder="手机号 / 邮箱">
        </div>
        <div class="input-box">
          <input v-model="userCode" type="text" placeholder="验证码">
          <span @click="getCode">获取验证码</span>
        </div>
        <button @click="next">提交</button>
      </div>
    </main>
  </div>

</template>

<script>
  export default {
    name: 'FindPassword',
    data() {
      return {
        userInfo: {
          username: ''
        },
        userCode: ''
      }
    },
    methods: {
      getCode() {

      },
      next() {

      }
    }
  }
</script>

<style scoped lang="less">
  @import '../../assets/less/variables';

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

  .find-password {
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

</style>
